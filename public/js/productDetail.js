(()=>{
    var lid = location.search.split("=")[1];
    ajax("http://localhost:3000/details",{lid})
        .then(res=>{
            res=JSON.parse(res);
            var {product,specs,pics}=res;
            var {title,subtitle,price,promise}=product;
            var html=`<h6 class="font-weight-bold">${title}</h6>
    <h6>
      <a class="small text-dark font-weight-bold" href="javascript:;">${subtitle}</a>
    </h6>
    <div class="alert alert-secondary small" role="alert">
      <div>
        <span>学员售价：</span>
        <h2 class="d-inline text-primary font-weight-bold">¥${price.toFixed(2)}</h2>
      </div>
      <div>
        <span>服务承诺：</span>
        <span>${promise}</span>
      </div>
    </div>`;
            var divDetails=document.getElementById("details");
            divDetails.innerHTML=html+divDetails.innerHTML;

            var html="";
            for(var {lid:id,spec} of specs){
                html+=`<a class="btn btn-sm btn-outline-secondary ${id==lid?'active':''}" href="productDetail.html?lid=${id}" class="">${spec}</a>`;
            }
            document.querySelector(
                "#details>div:nth-child(5)>div:nth-child(2)"
            ).innerHTML=html;

            var html="";
            for(var {sm,md,lg} of pics){
                html+=`<li class="float-left p-1">
        <img src="${sm}" data-md="${md}" data-lg="${lg}">
      </li>`;
            }
            var ulImgs=document.querySelector(
                "#preview>div>div:nth-child(5)>div:nth-child(2)>ul"
            )
            ulImgs.innerHTML=html;
            ulImgs.style.width=`${pics.length*62}px`;
            var mImg=document.querySelector(
                "#preview>div>img"
            );
            mImg.src=pics[0].md;
            var divLg=document.getElementById("div-lg");
            divLg.style.backgroundImage=`url(${pics[0].lg})`;

            ulImgs.onmouseover=function(e){
                if(e.target.nodeName=="IMG"){
                    var img=e.target;
                    mImg.src=img.dataset.md;
                    divLg.style.backgroundImage=
                        `url(${img.dataset.lg})`;
                }
            }
            /*放大镜效果 */
            var mask=document.getElementById("mask");
            var sMask=document.getElementById("super-mask");
            sMask.onmouseover=function(){
                mask.className=mask.className.replace("d-none","");
                divLg.className=divLg.className.replace("d-none","");
            }
            sMask.onmousemove=function(e){
                //获得鼠标的X,Y值
                var {offsetX,offsetY}=e;
                var top=offsetY-88;
                var left=offsetX-88;
                //防止mask超出边框
                top=top<0?0:top>176?176:top;
                left=left<0?0:left>176?176:left;
                mask.style.top=`${top}px`;
                mask.style.left=`${left}px`;
                divLg.style.backgroundPosition=`${-16/7*left}px ${-16/7*top}px`;
            }
            sMask.onmouseout=function(){
                mask.className+=" d-none";
                divLg.className+=" d-none";
            }

            /*大图下小图移动的效果 */
            var btnLeft=document.querySelector(
                "#preview>div>div:nth-child(5)>img"
            );
            var btnRight=
                btnLeft.nextElementSibling.nextElementSibling;
            /*当图片小于等于四张时候左右移动按钮都不能点*/
            if(pics.length<=4)
                btnRight.className+=" disabled";
            var moved=0;
            btnLeft.onclick=function(){
                var btn=this;
                /*indexOf查找字符串*/
                if(btn.className.indexOf("disabled")==-1){
                    moved--;
                    ulImgs.style.marginLeft=`${-moved*62}px`;
                    if(moved==0) btn.className+=" disabled";
                    if(moved<pics.length-4)
                        btnRight.className=btnRight.className.replace("disabled","");
                }
            }
            btnRight.onclick=function(){
                var btn=this;
                if(btn.className.indexOf("disabled")==-1){
                    moved++;
                    ulImgs.style.marginLeft=`${-moved*62}px`;
                    if(pics.length-moved==4)
                        btn.className+=" disabled";
                    if(moved>0){
                        btnLeft.className=btnLeft.className.replace("disabled","");
                    }
                }
            }
            /*商品详情显示的内容 */
            var {lname,os,memory,resolution,video_card,cpu,video_memory,category,disk}=product;
            var html=`<li class="float-left mb-2"><a class="text-muted small" href="#">商品名称：${lname}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">系统：${os}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">内存容量：${memory}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">分辨率：${resolution}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">显卡型号：${video_card}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">处理器：${cpu}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">显存容量：${video_memory}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">分类：${category}</a></li>
                        <li class="float-left mb-2"><a class="text-muted small" href="#">硬盘容量: ${disk}</a></li>`;
            document.querySelector(
                "#params>div>div:first-child>div:nth-child(3)>ul"
            ).innerHTML=html;
        })
    $("body").on('click', "#add_cart,#buy-num>div>button", function (e) {
        e.preventDefault();
        var $btn=$(this);
        var buyCount = $("#buy-num").children("input").val();
        //获取购买数量
        if($btn.is("button")){
            var n=parseInt($btn.parent().siblings("input").val());
            if($btn.html()=="+")
                n++;
            else if(n>1)
                n--;
            $btn.parent().siblings("input").val(n);
        }else{
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/cartItems/add',
                data: {lid:lid, buyCount: buyCount},
                success: function(result){
                    if(result.ok==0){
                        alert('您尚未登录！');
                        location.href="http://localhost:3000/login.html?back="+"cart.html";
                    }else if(result.ok==1){
                        alert('添加成功！');
                        //location.href = 'cart.html';
                    }
                }
            })
        }
    })
})();
