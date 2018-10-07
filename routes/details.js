const express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
    var lid=req.query.lid;
    //创建空数组，存储查询到的数据
    var output={};
    var sql="SELECT * FROM `pet_laptop` where lid=?";
    query(sql,[lid])
    //open(result)->then(result=>{...})
        .then(result=>{
            //result[0]取出查询结果的第一个值
            output.product=result[0];
            //取出商品family_id;
            var fid=output.product.family_id;
            //查询商品family_id;
            var sql="SELECT spec,lid FROM `pet_laptop` where family_id=?";
            //要想继续用then，必须返回Promise对象
            return query(sql,[fid]);//return Promise

        })
        //open(result)->then(result=>{...})
        .then(result=>{
            output.specs=result;
            var sql="SELECT * FROM `pet_laptop_pic` where laptop_id=?";
            return query(sql,[lid]);
        })
        //open(result)->then(result=>{...})
        .then(result=>{
            output.pics=result;
            res.send(output);
        })
        //err(error)->catch(error=>{...})
        .catch(error=>console.log(error))
})
module.exports=router;
//http://localhost:3000/details?lid=3