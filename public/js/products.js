$(function(){
    if(location.search.indexOf("kw=")!=-1){
        var kw=decodeURI(location.search.split("=")[1]);
        console.log(kw);
        function loadPage(pno=0){
          $.ajax({
            url:"http://localhost:3000/products",
            type:"get",
            data:{kw,pno},
            dataType:"json",
            success:function(output){
                var {data,pageCount,pno}=output;
                var html="";
                for(var p of data){
                    var {lid,md,price,title}=p;
                    html+=`<div class="col-md-4 product_show">
						    <a href=""><img class="w-100" src="${md}" alt="" /></a>
							<p class="product_price">¥${price}</p>
							<p>
								<a href="">${title}
				                </a>
							</p>
							<p>总销量:<span class="sale_count">45285</span> 
							    <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="productDetail.html?lid=${lid}" data-lid="lid">查看详情</a>
							</p>
					      </div>`;
                }
                $("#p-list").html(html);
                var html=`<li class="page-item"><a class="page-link bg-transparent" href="#">上一页</a></li>`;
                for(var i=0;i<pageCount;i++){
                    html+=`<li class="page-item ${i==pno?'active':''}"><a class="page-link bg-transparent " href="#">${i+1}</a></li>`
                }
                html+=`<li class="page-item"><a class="page-link bg-transparent" href="#">下一页</a></li>`;
                var $ul=$("#p-list+h6>nav>ul")
                $ul.html(html);
                if(pno==0)
                    $ul.children(":first-child")
                        .addClass("disabled");
                if(pno==pageCount-1)
                    $ul.children(":last-child")
                        .addClass("disabled");
            }
          })
        }
        loadPage();
        $("#p-list+h6>nav>ul")
            .on("click","li>a",function(e){
                e.preventDefault();
                var $a=$(this);
                //如果点击的li不是被激活，也不是被禁用
                if($a.parent().is(":not(.active,.disabled)")){
                    //除了第一个和最后一个li
                    var $lis=$("#p-list+h6>nav>ul>li:gt(0):not(:last)");
                    var i=$("#p-list+h6>nav>ul>li.active>a").html()-1;
                    if($a.parent().is(":first-child")){
                        loadPage(i-1);
                    }else if($a.parent().is(":last-child")){
                        loadPage(i+1);
                    }else
                        loadPage($a.html()-1);
                }
            });
        if(kw=="窝具")
          $("#title").html("宠物窝具").css("color","#FF9501");
         else if(kw=="服装")
          $("#title").html("宠物服饰").css("color","#FF9501");
         else if(kw=="清洁")
          $("#title").html("美容清洁").css("color","#FF9501");
         else if(kw=="零食")
          $("#title").html("美味零食").css("color","#FF9501");
         else if(kw=="玩具")
          $("#title").html("宠物玩具").css("color","#FF9501");
         else
          $("#title").html("您感兴趣的商品如下").css("color","#FF9501");
    }
});

// (()=>{
// $("#header").load("data/header.php");
// $("#footer").load("data/footer.php");
//  var kw=decodeURIComponent(location.search.split("=")[1]);
//  function loadProductsPage(pno){
//  console.log(kw);
//  $.ajax({
//    type:"GET",
//    url:"data/products_page.php",
//    data:{kw:kw,pno:pno},
//    success:function(data){
//     pageCount=data.pageCount;
// 	console.log(data);
//     var html="";
// 	for(var obj of data.data){
// 	 html+=`<div class="col-md-4 product_show">
// 				    <a href="${obj.href}"><img src="${obj.img}" /></a>
// 						<p class="product_price">¥${obj.price}</p>
// 						<p><a href="${obj.href}">${obj.title}
//             </a></p>
// 						<p>总销量:<span class="sale_count">${obj.sold_count}</span> <a href="" class="comment">评价:${obj.comment_count}</a></p>
// 				 </div>`;
// 	}
// 	$("#p-list").html(html);
// //	动态加载页码
//    var html="";
//    html+=`<li><a href="" class="site">上一页</a></li>`;
//    if(data.pno-2>0){html += `<li><a href="${data.pno-2}">${data.pno-2}</a></li>`;}
//    if(data.pno-1>0){html += `<li><a href="${data.pno-1}">${data.pno-1}</a></li>`;}
//    html+=`<li><a href="${data.pno}" class="active">${data.pno}</a></li>`;
//    if(data.pno+1<=data.pageCount){html += `<li><a href="${data.pno+1}">${data.pno+1}</a></li>`;}
//    if(data.pno+2<=data.pageCount){html += `<li><a href="${data.pno+2}">${data.pno+2}</a></li>`;}
//    html+=`<li><a href="" class="site">下一页</a></li>`;
//    $("#yema").html(html);
//    },
//    error:function(a,b,c){
// //    alert("网络出现错误,请检查");
// 		console.log(a,b,c);
//    }
//   });
//  }
//  loadProductsPage(1);
// //为页码绑定单击事件
//   $("#yema").on("click","li a:not(.site)",function(e){
//      e.preventDefault();
// 	 var pno=$(this).attr("href");
// 	 console.log(pno);
// 	 loadProductsPage(pno);
//  }).on("click","li a:first",function(e){
// 	 //实现上一页的功能
// 	  e.preventDefault();
//     var pno=$("#yema .active").attr("href");
// 	loadProductsPage(pno-1);
//   }).on("click","li a:last",function(e){
//     //实现下一页
//      e.preventDefault();
//      var pno=parseInt($("#yema .active").attr("href"));
// 	 console.log(pageCount);
// 	 if(pno+1>=pageCount){
// 	  loadProductsPage(pageCount);
// 	 }else if(pno+1<=pageCount){
// 	   loadProductsPage(pno+1);
// 	 }
//  });

// })();

 

