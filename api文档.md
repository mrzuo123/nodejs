### 用户注册

新用户注册个人信息

```
url
  /api/v1/reg
method
  post
params
  userName    用户名
  password    密码
  nickName    昵称
  avatars     头像
result
  成功
    {
      status: 'success',
      info: '用户注册成功'
    }
  失败
    {
      status: 'error',
      info: '失败的提示消息内容'
    }
```

### 用户登录

```
url
  /api/v1/login
metod
  post
params
  userName    用户名
  password    密码
result
  成功
  {
    status: 'success',
    info: '用户登录成功'
  }

  失败
  {
    status: 'error',
    info: '失败原因'
  }
```

### 管理后台登录

此接口为假数据,只验证用户名和密码都是admin

```
url
  /api/v1/admin_login
method
  post
params
  userName    用户名
  password    密码
result
  {
    status: 'success',
    info: ''    // 返回一个数据
  }
```

### 商品管理

此为管理后台接口

1. 获取商品信息

```
url
  /api/v1/admin/products
method
  get
params
  per     每页显示的数量
  page    页码
  name    名字(模糊匹配)
result
  {
    status: 'success',
    info: {
      allCount: 100,    总数
      pageCount: 10,    总页数
      page: 1,          当前页
      list: [....]      商品数据
    }
  }
```

2. 商品新增

```
url
  /api/v1/admin/products
method
  post
params
  name          名字
  descriptions  描述
  cover_img     封面图
  price         价格
  content       详情
  quantity      库存
result
  {
    status: 'success',
    info: '新增成功'
  }
```

3. 商品修改

```
url
  /api/v1/admin/products/:id
method
  put
params
  name          名字
  descriptions  描述
  cover_img     封面图
  price         价格
  content       详情
  quantity      库存
result
  {
    status: 'success',
    info: '修改成功'
  }
```

4. 商品删除

```
url
  /api/v1/admin/products/:id
method
  delete
result
  {
    status: 'success',
    info: '删除成功'
  }
```
