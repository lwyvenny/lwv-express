const express = require('express');
const auth = require("../middlewares/auth");
const PostModel = require("../models/post");
const router = express.Router();

// 文章列表
router.get("/",auth(), async (req,res) =>{

    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    let total = 5; //总共的页数

    let count = await PostModel.find().countDocuments();
    total = Math.ceil(count / pageSize);
// 从数据库中查找文章
    let list = await PostModel.find()
    .sort({ updatedAt: -1 })
    .skip((pageNum -1)*pageSize)
    .limit(pageSize);
    res.render('posts/index',{
        list,
        total,
        pageNum
    });
})

// 新增文章页面
router.get("/create",auth(), (req,res) =>{
    res.render('posts/create');
})

//文章详情
router.get('/:id',auth(), async (req,res) =>{
    //1.获取到文章ID
    let id = req.params.id;
    let data = await PostModel.findById(id);
    res.render('posts/show',{
        postInfo : data
    })
})



// 新增文章
router.post('/store',auth(),  async (req,res) =>{
    if(!req.body.title || !req.body.content){
        res.send('参数有错误');
        return;
    }

    let newPost = new PostModel(req.body);
    await newPost.save();
    res.redirect('/posts');
});

//编辑文章页面
router.get('/:id/edit',auth(), async (req,res) =>{
    //根据id获取信息
    let id = req.params.id;
    let post = await PostModel.findById(id);
    res.render('posts/edit',{
        title:post.title,
        content: post.content,
        id:post._id
    });
});

//编辑文章操作
router.post('/update',auth(), async(req,res) =>{
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;

    let data = await PostModel.updateOne({_id:id},{title:title,content:content});
    res.send('修改成功');
});

//删除文章
router.delete('/:id',auth(), async(req,res) =>{
    let id = req.params.id;
    await PostModel.deleteOne({_id:id});
    res.send({
        code:0,
        mag:"删除成功"
    })
})

module.exports = router;