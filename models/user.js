//use 表的 model 文件

// 1. 引入 mongoose .是已经链接了 mongodb 的 mongoose
const mongoose = require("../config/db");

// 2. 定义好你要操作的表的数据结构 schema
const schema = new mongoose.Schema({
    //数据表的结构描述
    username: String,
    email: String,
    password:String
});

// 3. 生成 model
const model = mongoose.model("user", schema);

//4.暴露model
module.exports = model;