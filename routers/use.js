const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

//注册页面路由
router.get('/create',(req,res) =>{
    res.render('register');
})

//注册操作路由
router.post('/store',(req,res) =>{
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

    UserModel.findOne({email:req.body.email}).then(data =>{
        if(data){
            //data存在，邮箱已经存在
            res.send('邮箱已经被注册')
        }else{

            let user =new UserModel(req.body);
            user.save().then(() =>{
                //成功
                res.send("注册成功")
            }).catch(() =>{
                res.send("注册失败")
            })
        }
    })

    
})

module.exports = router;