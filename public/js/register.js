//用户名的验证 使用匿名函数自调
(()=>{
    var uname=$("#uname");
    var span=$("#uname-msg");
    uname.focus(()=>{
    span.html("用户名长度为3-9位").addClass("msg-default");
    }).blur(function(){
        if(uname.val()==""){
         span.html("用户名不能为空！").removeClass("msg-default").addClass("msg-err");
        }else if(uname.val().length<3){
         span.html("用户名长度不能小于3！").removeClass("msg-default").addClass("msg-err");
        }else{
		 $.ajax({
		 type:"GET",
		 url:"http://localhost:3000/register/checkname",
		 data:{uname:$(this).val()},
		 success:(data)=>{
		   if(data.ok==1){
		    span.html(data.msg).removeClass("msg-default").removeClass("msg-err").addClass("msg-succ");
		   }else if(data.ok==0){
		    span.html(data.msg).removeClass("msg-default").removeClass("msg-succ").addClass("msg-err"); 
		   }
		 },
		 error:function(){
		   alert("网络出现错误!");
		 }
		});
		}
    });
})();
//密码验证
(()=>{
    var upwd=$("#upwd");
    var span=$("#upwd-msg");
    upwd.focus(()=>{
        span.html("密码长度为6-12位").addClass("msg-default");
    }).blur(function(){
        if(upwd.val()==""){
            span.html("密码不能为空！").removeClass("msg-default").addClass("msg-err");
        }else if(upwd.val().length<6){
            span.html("密码长度不能小于6位！").removeClass("msg-default").addClass("msg-err");
        }else{
            span.html("密码格式正确").removeClass("msg-default").removeClass("msg-err").addClass("msg-succ");
        }
    });
      var cpwd=$("#cpwd");
       cpwd.focus(function(){
          $("#show-msg").html("请确认密码").addClass("msg-default");
       }).blur(function(){
        if($("#upwd").val()!=cpwd.val()){
            $("#show-msg").html("俩次输入的密码不一致！").removeClass("msg-default").addClass("msg-err");
        }else if(cpwd.val()==""){
            $("#show-msg").html("密码不能为空！").removeClass("msg-default").addClass("msg-err");
        }else{
            $("#show-msg").html("俩次输入的密码一致").removeClass("msg-err").removeClass("msg-default").addClass("msg-succ");
        }
    });
})();
//邮箱验证
(()=>{
 var emial=$("#email");
 var span=$("#email-msg");
    emial.focus(function(){
        span.html("请输入您的邮箱").addClass("msg-default");
    }).blur(function(){
		var emailReg=/^([A-Za-z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if($(this).val()==""){
            span.html("邮箱地址不可以为空!").removeClass("msg-default").addClass("msg-err");
        }else if(!emailReg.test($(this).val())){
			span.html("邮箱格式不正确").removeClass("msg-default").addClass("msg-err");
		}else{
            // ajax请求验证邮箱是否已经存在
            $.ajax({
                 type:"GET",
                 url:"http://localhost:3000/register/checkemail",
                 data:{email:$(this).val()},
                 success:(data)=>{
                   if(data.ok==1){
                    span.html(data.msg).removeClass("msg-default").removeClass("msg-err").addClass("msg-succ");
                   }else if(data.ok==0){
                    span.html(data.msg).removeClass("msg-default").removeClass("msg-succ").addClass("msg-err");
                   }
                 },
                 error:function(){
                   alert("网络出现错误!");
                 }
            });
		}
    });
})();
//手机号验证
(()=>{
    var phoneReg=/^\d{11}$/;
    var phone=$("#phone");
    var span=$("#phone-msg");
    phone.focus(function(){
            span.html("请输入您的手机号").addClass("msg-default");
    }).blur(function(){
        if($(this).val()==""){
            span.html("手机号不可以为空!").removeClass("msg-default").addClass("msg-err");
        }else if(!phoneReg.test($(this).val())){
            span.html("手机号格式不正确!").removeClass("msg-default").addClass("msg-err");
        }else{
            span.html("手机号可用").removeClass("msg-default").removeClass("msg-err").addClass("msg-succ");
        }  
    });
})();
//表单提交
(()=>{
  $("#btn_register").click(function(e){
      e.preventDefault();
	   var count = 0;
  $('tr').each(function () {
    if ($(this).find('span').hasClass('msg-succ')) {
      count++;
    }
   });
   if(count<5){
    alert("注册信息有误,请检查后再试");
   }else if(count==5){  
    $.ajax({
	 type:"POST",
	 url:"http://localhost:3000/register/register",
	 data:$('#form-register').serialize(),
	 success:function(data){
	  if(data.ok==1){
	   alert(data.msg+"点击确定跳转至登录页面");
          var uname=$("#uname");
		 location.href="login.html?uname="+uname;
		 console.log(location.href);
	  }else{
	   alert(data.msg);
	  }
	 },
	 error:function(){
	  alert("网络出现错误,请检查网络!");
	 }
	});
   }
  });
})();

