   //楼层效果
var  $divLift=$("#main>div:last-child");
$(window).scroll(function(){
  var $fs=$("#main>div:nth-child(4)>div>div:first-child");
  // console.log($fs);
  var $f1=$fs.first();
  // console.log($f1);
  var scrollTop=$("html,body").scrollTop();
   var offsetTop=$f1.offset().top;
  // console.log(scrollTop);
  //  console.log(offsetTop);
   if(innerHeight/2+scrollTop>offsetTop){
       $divLift.removeClass(" d-none");
   }else{
       $divLift.addClass(" d-none");
   }
   $fs.each((i,f)=>{
       offsetTop=$(f).offset().top;
       if(innerHeight/2+scrollTop>offsetTop){
            $divLift
                .children(`:eq(${i})`)
                .addClass("btn-warning")
                .siblings()
                .removeClass("btn-warning")
       }
   })
});
$divLift.on("click","button",function(){
   //获取点击的第几个按钮
   var i=$(this).index();
   //获得对应楼层距离页面顶部的总距离
   var offsetTop=$(`#main>div:nth-child(4)>div>div:first-child:eq(${i})`)
       .offset().top;
   //让页面滚动到和楼层距离body顶部总距离相同的位置
   $("html").animate({
       scrollTop:offsetTop
   },1000)
})