const express = require('express');
const { User } = require('../../models');//引入数据库表
const { Product } = require('../../models');
const router = express.Router();


//注册接口

router.post('/reg', async (req, res) => {
  if(!req.body.userName) {
    res.json({
      status: 'error',
      info: '用户名不能为空'
    })
    return;
  }
  const userCount = await User.countDocuments({userName: req.body.userName})
  //判断用户名是否存在
  if(userCount > 0) {
    res.json({
      status: 'error',
      info: '用户名已存在'
    })
  } else {
    try {
      const user = new User(req.body);
      await user.save()
      res.json({
        status: 'success',
        info: '注册成功'
      })
    } catch(err) {
      res.json({
        status: 'error',
        info: err
      })
    }
    
  }
})
//登录接口
router.post('/login', async (req, res) => {
 if( await User.countDocuments({userName: req.body.userName,password:req.body.password})>0) {
  res.json({
        status: 'success',
        info: '登录成功！',
      })
 } else {
    res.json({
      status: 'error',
      info: '用户名或者密码错误！'
    })
  }
})

//管理员后台
//此接口为假数据,只验证用户名和密码都是admin
router.post('/admin_login', (req,res)=>{ 
  try {
    if(req.body.userName=='admin' && req.body.password=='admin'){
      res.json({
        status:'success',
        info:'登录成功',
        return:req.body
      })   
    }else{
      res.json({
        status:'error',
        info:'用户名或密码有误',
        return:req.body
      })   
    }        
  } catch (error) {
    res.json({
      status:error,
      info:'登录失败'
    })
  }
 
})

//商品新增

router.post('/admin/addPro',async (req,res)=>{ 
  try {
    var product=new Product(req.body);
    await product.save();
    res.json({
      status:'success',
      info:'商品增加成功'
    })
  } catch (error) {
    res.json({
      status:'error',
      info:'添加商品失败'
    })
  }
})

//查询商品信息
router.post('/admin/products', async (req,res)=>{
  try {
    const per=Number(req.body.per);
    const page=req.body.page || 1;
    const allCount=await Product.count({name:new RegExp(req.body.name)});
    const productList=await Product.find({name:new RegExp(req.body.name)}).skip((page-1)*per).limit(per);
    //limit获取指定数量的记录，skip跳过指定数量的记录

    pageNum=Math.ceil(allCount/req.body.per);//分页的页数

    res.json({
      status:'success',
      info:"查询成功",
      return:productList,
      count:allCount,
      pageNum:pageNum
    })
  } catch (error) {
    res.json({
      status:'error',
      info:error,
    })
  }

}) 
//商品修改
router.post('/admin/modifyPro/:id',async (req,res)=>{ 
  try { 
    var id=req.params.id;
    await Product.findByIdAndUpdate({
      _id:id,
    },{
      name:req.body.name ,
      price:req.body.price,
      productType: req.body.productType,
      content: req.body.content,
    });

    res.json({
      status:'success',
      info:"修改成功",
      return:req.body  //返回修改后的数据
    })

  }  catch (error) {
    res.json({
      status:'error',
      info:error
    })
  } 
})

//删除商品
router.delete('/admin/Delpro/:id',async (req,res)=>{
  try {
    var id=req.params.id;
    await Product.findByIdAndDelete({_id:id});
    res.json({
      status:'success',
      info:'删除成功'
    })
    
  } catch (error) {
    res.json({
      status:"error",
      info:error
    })
  }
 
})

module.exports = router;