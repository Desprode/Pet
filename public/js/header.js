//动态加载header
$(function(){
    ajax("http://localhost:3000/header.html")
    .then(res=>{
        document.getElementById("header").innerHTML = res;
        var btnSearch=document.getElementById("search");
        var input=btnSearch.previousElementSibling;
        btnSearch.onclick=function(){
            if(input.value.trim()!=="")
                location.href=`http://localhost:3000/products.html?kw=${input.value}`;
        }
        //按回车进行页面跳转
        input.onkeyup=function(e){
           if(e.keyCode==13)
               btnSearch.onclick();
        }
        //获取页面中参数
        if(location.search.indexOf("kw=")!=-1){
           // input.value=decodeURI(location.search.split("=")[1]);
        }
        function isLogin(){
            $.ajax({
                url:"http://localhost:3000/users/islogin",
                type:"get",
                dataType:"json",
                success:function(data){
                    if(data.ok==0){
                        $("#signout").show().prevAll("li").hide();
                    }else{
                        $("#signout").hide().prevAll("li").show();
                        $("#uname").html(data.uname);
                    }
                }
            })
        }
        isLogin();
        //注销按钮
        $("#btnSignout").click(function(e){
          e.preventDefault();
          $.ajax({
              url:"http://localhost:3000/users/signout",
              type:"get",
              success:isLogin
          })
        })
        //点击按钮进行跳转
        $("#btnLogin").click(function(e){
            e.preventDefault();
            location.href=
                "http://localhost:3000/login.html?back="+location.href;
        })

    });
})