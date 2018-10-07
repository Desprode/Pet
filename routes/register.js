const express = require("express");
const pool = require("../pool");
var router = express.Router();

//检查用户名是否存在
router.get('/checkname',(req,res)=>{
    var $uname = req.query.uname;
    if(!$uname){
        res.send({ok:0,msg:'uname required'});
        return;
    }
    var sql = "SELECT * FROM `pet_user` where uname=?";
    pool.query(sql,[$uname],(err,result)=>{
       if(err) throw err;
       if(result.length>0){
           res.send({ok:0,msg:"用户名已存在"});
       }else{
           res.send({ok:1,msg:"用户名可以使用"});
       }
    });
});
//检查邮箱是否存在
router.get('/checkemail',(req,res)=>{
    var $email = req.query.email;
    if(!$email){
        res.send({ok:0,msg:'email required'});
        return;
    }
    var sql = "SELECT * FROM `pet_user` where email=?";
    pool.query(sql,[$email],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({ok:0,msg:"邮箱已存在"});
        }else{
            res.send({ok:1,msg:"邮箱可以使用"});
        }
    });
});


router.post('/register', (req,res)=>{
    //获取表单中的数据
    //console.log(req.body);
    //在这块执行把数据插入到数据库中
    //1.检测用户名不能为空
    var $uname = req.body.uname;
    if(!$uname){
        res.send({ok: 401,msg: 'uname required'});
        return;//阻止程序继续往后执行
    }
    //2.检测密码不能为空
    var $upwd = req.body.upwd;
    if(!$upwd){
        res.send({ok: 402,msg: 'upwd required'});
        return;
    }
    //3.检测邮箱不能为空
    var $email = req.body.email;
    //false  '' null undefined NaN 0
    if(!$email){
        res.send({ok: 403,msg: 'email required'});
        return;
    }
    //4.检测电话不能为空
    var $phone = req.body.phone;
    if(!$phone){
        res.send({ok: 404,msg: 'phone required'});
        return;
    }
    var sql = "INSERT INTO pet_user VALUES(NULL,?,?,?,?,NULL,NULL,NULL)";
    pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
        if(err){
            throw error; //抛出异常
        }
        res.send({ok: 1, msg: '注册成功，请登录'});
    });
});

module.exports = router;