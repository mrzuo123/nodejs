const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.json({
    status: 'success',
    info: 'api is ok!'
  })
})

app.use('/api/v1', require('./api/v1/auth'));

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

