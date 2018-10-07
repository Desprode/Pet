//用户登录界面js
$(function(){
    $("#btn_login").click(function(){
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        $.ajax({
            url:"http://localhost:3000/users/signin",
            type:"post",
            data:{uname,upwd},
            dataType:"json",
            success:function(data){
                if(data.ok==0) alert(data.msg);
                else{
                    alert("登录成功!");
                    if(location.search.indexOf("back=")!=-1){
                        var back=location.search.slice(6);
                        location.href=back;
                    }else{
                        location.href="http://localhost:3000/index.html"
                    }
                }
            }
        })
    })
})

