const express = require("express");
const cookiePraser = require('cookie-parser');
const userRouter = require('./routers/use')
const app = express();

//模板引擎
app.set('views','views');
app.set('view engine','ejs');

//处理静态资源托管
app.use(express.static('public'))

//处理req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//处理req.cookies
app.use(cookiePraser());

//处理各种路由中间件
app.use('/use',userRouter);


app.listen(3000);