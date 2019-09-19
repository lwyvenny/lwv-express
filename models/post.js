const mongoose = require('../config/db');

const schema = new mongoose.Schema({
    title : String,
    content :String,
    
},{
    //可以让每篇文章都自动携带创建时间和更新时间两个字段
    timestamps : true
});

const model = mongoose.model('post',schema);

module.exports = model;