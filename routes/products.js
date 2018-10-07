const express = require("express");
var router = express.Router();
var query = require("./query");
router.get("/",(req,res)=>{
    var output={
        count:0,
        pageSize:9,
        pageCount:0,
        pno:req.query.pno,
        data:[]
    }
   var kw=req.query.kw;
   var kws=kw.split(" ");
   kws.forEach((elem,i,arr)=>{//遍历数组中每个元素 执行相同的操作
       arr[i]=`title like '%${elem}%'`;
   })
   var where = kws.join(" and ");
   var sql=`SELECT *,(select md from pet_laptop_pic where laptop_id=lid limit 1) as md FROM pet_laptop where ${where}`;
   query(sql,[])
       .then(result=> {
           output.count = result.length;
           output.pageCount = Math.ceil(output.count / output.pageSize);
           sql+=` limit ?,?`;
           return query(sql,[output.pageSize*output.pno,output.pageSize]);
       })
       .then(result=>{
           output.data=result;
           res.send(output);

       });
});
module.exports = router;