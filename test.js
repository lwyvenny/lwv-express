//1.引入模块
const bcryptjs = require("bcryptjs");

//2. 调用它的方法 hash（）

let password = '123';
// bcryptjs.hash(password,10,(err,hash) =>{
//     if(err){
//         console.log('加密失败')
//     }else{
//         console.log('加密成功');
//         console.log(hash);
//     }
// })
// let hash = bcryptjs.hashSync(password,10);
// console.log(hash)

//3.使用bcryptjs compare 来做校验
// bcryptjs.compare(password,"$2a$10$CfV4eDXjcInULLs6fYssU.k1ZWxyG6pMfM3LR9UaVRCKuv7xZumnG",(err,success) =>{
//     if(err){
//         console.log('校验失败')
//     }else{
//         if(success){
//             console.log('校验成功')
//         }else{
//             console.log('密码不一致')
//         }
//     }
// })
//同步

let isOk = bcryptjs.compareSync(password,"$2a$10$CfV4eDXjcInULLs6fYssU.k1ZWxyG6pMfM3LR9UaVRCKuv7xZumnG")

