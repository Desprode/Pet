//避免回调地狱封装了一个query.js   用于服务器防止回调地狱
var pool=require("../pool");
module.exports=function(sql,params){
    return new Promise(function(open,err){
        pool.query(sql,params,(error,result)=>{
            if(error) err(error);
            else open(result);
        })
    })
}