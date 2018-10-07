const express = require("express");
const pool = require("../pool");
var router = express.Router();
var query=require("./query");
//刚登陆购物车加载内容
router.get("/",(req,res)=>{
    var sql= `select *,(select sm from pet_laptop_pic  where laptop_id=lid limit 1) as sm  from pet_shoppingcart_item inner join
     pet_laptop on product_id=lid where user_id=? order by iid desc`;
    var uid=req.session.uid;
    pool.query(sql,[uid],(err,result)=>{
        res.send(result);
    })
});


router.post("/add",(req,res)=>{
    var lid=req.body.lid;
    var buyCount=req.body.buyCount;
    var uid=req.session.uid;
    //检查用户是否登录 让用户先登录
    if(!uid){
        res.send({ok:0,msg:"请先登录"});
        return;
    }
    //根据页面传来的 lid 和buyCount进行数据操作
    var sql="select * from pet_shoppingcart_item where user_id=? and product_id=?";
    query(sql,[uid,lid])
        .then(result=>{
            if(result.length==0){
                var sql="insert into pet_shoppingcart_item values(null,?,?,?,0)";
                pool.query(sql,[uid,lid,buyCount],(err,result)=>{
                    res.send({ok:1,msg:result});
                })
            }else{
                var sql="update pet_shoppingcart_item set count=count+? where user_id=? and product_id=?";
                pool.query(sql,[buyCount,uid,lid],(err,result)=>{
                    res.send({ok:1,msg:result});
                })
            }
        })
});
//删除商品
router.get("/delete",(req,res)=>{
    var iid=req.query.iid;
    if(iid!==""){
        var sql=`delete from pet_shoppingcart_item where iid=?`;
        pool.query(sql,[iid],(err,result)=>{
            res.send({ok:1,msg:"删除成功"});
        })
    }
    else{
        res.send({ok:0,msg:"删除失败"});
    }
});
//更新商品数量
 router.post("/update",(req,res)=>{
     var {iid,count}=req.body;
     var sql=`update pet_shoppingcart_item set count=? where iid=?`;
     pool.query(sql,[count,iid],(err,result)=>{
         if(err)throw err;
         res.send({ok:1})
     });
 });
//更新商品is_checked
router.post("/update_checked",(req,res)=>{
    var {iid,checked}= req.body;
    var sql=`update pet_shoppingcart_item set is_checked=? where iid=?`;
    pool.query(sql,[checked,iid],(err,result)=>{
        if(err) throw err;
        res.send({ok:1,msg:"更新成功"})
    });
});
//全选和不全选时候更新该商品is_checked
router.post("/update_allchecked",(req,res)=>{
    var checked = req.body.checked;
    var uid = req.session.uid;
    var sql=`update pet_shoppingcart_item set is_checked=? where user_id=?`;
    pool.query(sql,[checked,uid],(err,result)=>{
        if(err)throw err;
        res.send({ok:1,msg:"更新成功"});
    });
});
//付款页面加载用户选中商品
router.get("/list_checked",(req,res)=>{
    var uid = req.session.uid;
    var sql=`select * ,(select sm from pet_laptop_pic  where laptop_id=lid limit 1) as sm from pet_shoppingcart_item
    INNER JOIN pet_laptop on pet_shoppingcart_item.product_id=pet_laptop.lid where user_id=? and is_checked=1`;
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send({ok:1,msg:result});
    });
});

module.exports=router;