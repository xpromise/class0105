const express = require('express');
const db = require('./db');
const Cities = require('./models/cities');

const app = express();

app.use(express.static('public'));

db
  .then(() => {
    // 获取省份数据的路由
    app.get('/province', async (req, res) => {
      // 需要将所有省份数据返回  {level: 1}
      // 需要不要请求参数？ 不需要：因为参数是固定不变的
      // 投影 {name: 1, province: 1, _id: 0} 过滤掉不想要的数据
      // 操作不管成功还是失败，都必须要返回响应（成功响应、失败响应）
      try { // 专门用来处理异常错误
        // try 里面放可能出错的代码，一旦代码出错，立即中断try中代码的执行，直接进入到catch
        const result = await Cities.find({level: 1}, {name: 1, province: 1, _id: 0});
        // 返回成功的响应给前端
        res.json({code: 0, data: result});
      } catch (e) {
        // catch就用来处理错误
        console.log(e);
        // 返回失败的错误给前端
        res.json({code: 1, err: '网络错误，请刷新试试'});
      }
    });
    // 获取城市数据的路由
    app.get('/city', async (req, res) => {
      try {
        // 查询条件： {province: xxx, level: 2}
        // province 应该是请求参数
        const { province } = req.query;

        const result = await Cities.find({province, level: 2}, {name: 1, city: 1, _id: 0});
        // 返回成功的响应
        res.json({code: 0, data: result});
      } catch (e) {
        // 返回失败的响应
        res.json({code: 1, err: e});
      }

    });
    // 获取区县数据的路由
    app.get('/county', async (req, res) => {
      // 查询条件 {province: xx, city: xx, level: 3}
      try {
        const { province, city } = req.query;
        const result = await Cities.find({province, city, level: 3});
        res.json({code: 0, data: result});
      } catch {
        res.json({code: 1, err: '网络错误~'});
      }

    });

  })
  .catch(() => {
    console.log('数据库连接失败~');
  })



app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});