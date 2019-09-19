const express = require('express');
const UserModel = require('../models/user');
const bcryptjs = require('bcryptjs');
const router = express.Router();

//注册页面路由
router.get('/create',(req,res) =>{
    res.render('register');
})

//注册操作路由
router.post('/store', async (req,res) =>{
    // 1.获取form 表单，前端传递过来的参数
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    // 2.对参数做一些校验
    if(!username || !password || !email){
        res.send('参数有错误');
        return;
    }
    // 3.存储到数据库中

    let data = await UserModel.findOne({email:req.body.email})
    if(data){
        res.send('邮箱已经被注册');
    }else{
        let user =new UserModel({
            username : req.body.username,
            email:req.body.email,
            password : bcryptjs.hashSync(req.body.password)
        });
        await user.save();
        res.send("注册成功");
    }
    // .then(data =>{
    //     if(data){
    //         //data存在，邮箱已经存在
    //         res.send('邮箱已经被注册')
    //     }else{

    //         let user =new UserModel(req.body);
    //         user.save().then(() =>{
    //             //成功
    //             res.send("注册成功")
    //         }).catch(() =>{
    //             res.send("注册失败")
    //         })
    //     }
    // })

})

// 登录页面
router.get('/login',(req,res) =>{
    res.render('login');
})

//登录操作
router.post('/login',async(req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        res.send("用户名或密码错误")
        return;
    }
    let user = await UserModel.findOne({email:email});
    if(!user){
        res.send("用户名或密码错误");
        return;
    }

    //密码校验
    let isOk = bcryptjs.compareSync(password,user.password);
    if(!isOk){
        res.send("用户名或密码错误");
        return;
    }

    //登录成功
    req.session.user = user;

    res.redirect('/posts');

})

module.exports = router;