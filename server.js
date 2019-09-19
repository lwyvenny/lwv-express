const express = require("express");
const cookiePraser = require('cookie-parser');
const userRouter = require('./routers/use')
const session = require('express-session');
const postRouter = require('./routers/post')
const app = express();

//模板引擎
app.set('views','views');
app.set('view engine','ejs');

//session中间件
app.use(session({
    secret:"hello",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}));

//处理静态资源托管
app.use(express.static('public'))

//处理req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//处理req.cookies
app.use(cookiePraser());

//处理各种路由中间件
app.use('/use',userRouter);
app.use('/posts',postRouter);


app.listen(3000);

//nice