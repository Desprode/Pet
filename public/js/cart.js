//加载购物车
function loadCart(){
    $.ajax({
        url:"http://localhost:3000/users/islogin",
        type:"get",
        dataType:"json",
        success:function(data){
            if(data.ok==1){
                $.ajax({
                    url:"http://localhost:3000/cartItems",
                    type:"get",
                    dataType:"json",
                    success:function(items){
                        //循环插入选中的商品
                        for(var item of items){
                            var {title,price,count,iid,is_checked,lid,sm,spec}=item;
                            var sum = (count*price).toFixed(2);
                            console.log(item)
                            if(is_checked==1){
                                $(`<div class="row bg-white mb-3">
                                <div class="col-md-1 border text-center Each">
                                    <span class="true btn">
                                      <img class="mt-5" src="images/cart/product_true.png" alt="">
                                    </span>
                                </div>
                                <div class="col-md-5 card flex-md-row box-shadow">
                                    <a href="productDetail.html?lid=${lid}">
                                        <img class="card-img-left flex-auto d-none d-md-block mt-4" src="${sm}">
                                    </a>
                                    <div class="card-body d-flex flex-column align-items-start">
                                        <a class="text-dark small" href="productDetail.html?lid=${lid}">${title}</a>
                                        <p class="card-text mb-auto mt-2">
                                            <span class="small">规格：</span>
                                            <span class="color-desc small">${spec}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2 border text-center pt-5">
                                    <h6 class="text-primary small">会员专享价</h6>
                                    <span>¥</span>
                                    <span>${price}</span>
                                </div>
                                <div class="col-md-1 border px-0 py-5 text-center">
                                    <button class="btn btn-secondary p-0 py-0 border-1 reduce" type="button">-</button>
                                    <input type="text" class="p-0 w-25 m-0 text-center" value="${count}" >
                                    <button class="btn btn-secondary p-0 py-0 border-1 add" type="button">+</button>
                                </div>
                                <div class="col-md-2 border pt-5 text-center totle">
                                    <span>¥</span>
                                    <span class="d-inline-block py-1 totle_information">${sum}</span>
                                </div>
                                <div class="col-md-1 border py-5 pudc">
                                    <a class="btn btn-sm btn-link text-muted text-center small del_d pudc_information" href="#" data-iid="${iid}">删除</a>
                                </div>
                            </div>`)
                                    .insertBefore(".container>div:last-child");

                            }
                            else{
                                $(`<div class="row bg-white mb-3">
                                <div class="col-md-1 border text-center Each">
                                    <span class="normal btn">
                                      <img class="mt-5" src="images/cart/product_normal.png" alt="">
                                    </span>
                                </div>
                                <div class="col-md-5 card flex-md-row box-shadow">
                                    <a href="productDetail.html?lid=${lid}">
                                        <img class="card-img-left flex-auto d-none d-md-block mt-4" src="${sm}">
                                    </a>
                                    <div class="card-body d-flex flex-column align-items-start">
                                        <a class="text-dark small" href="productDetail.html?lid=${lid}">${title}</a>
                                        <p class="card-text mb-auto mt-2">
                                            <span class="small">规格：</span>
                                            <span class="color-desc small">${spec}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-2 border text-center pt-5">
                                    <h6 class="text-primary small">会员专享价</h6>
                                    <span>¥</span>
                                    <span>${price}</span>
                                </div>
                                <div class="col-md-1 border px-0 py-5 text-center">
                                    <button class="btn btn-secondary p-0 py-0 border-1 reduce" type="button">-</button>
                                    <input type="text" class="p-0 w-25 m-0 text-center" value="${count}" >
                                    <button class="btn btn-secondary p-0 py-0 border-1 add" type="button">+</button>
                                </div>
                                <div class="col-md-2 border pt-5 text-center totle">
                                    <span>¥</span>
                                    <span class="d-inline-block py-1 totle_information">${count*price}</span>
                                </div>
                                <div class="col-md-1 border py-5 pudc">
                                    <a class="btn btn-sm btn-link text-muted text-center small del_d pudc_information" href="#" data-iid="${iid}">删除</a>
                                </div>
                            </div>`)
                                    .insertBefore(".container>div:last-child");
                            }
                        }
                        //调用amountadd()方法计算选中商品总数和总价钱
                        amountadd();
                    }
                })
            }
        }
    })
}
//调用加载按钮
loadCart();
$(function(){
    adddel();
    amountadd();
    //全选
    $(".all").click(function () {
        //检查 商品选中图标 含不含有normal 如果有 就都改成true  同时移除normal 更换图片 计算总价 及数量
        if ($('.all>span').hasClass('normal')) {
            $('.all>span').addClass('true').removeClass('normal');
            $('.all>span>img').attr('src', 'img/cart/product_true.png');
            $(".Each>span").each(function () {
                $(this).addClass('true').removeClass('normal');
                $(this).children('img').attr('src', 'img/cart/product_true.png');
            })
            amountadd();
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/cartItems/update_allchecked',
                data: {checked: 1},
                success: function(result){
                    console.log(result);
                }
            })
        } else {
            $('.all>span').addClass('normal').removeClass('true');
            $('.all>span>img').attr('src', 'img/cart/product_normal.png');
            $('.Each>span').addClass('normal').removeClass('true');
            $('.Each>span>img').attr('src', 'img/cart/product_normal.png');
            //不全选时候总价和总数量清零
            $(".susum").text(0.00);
            $(".susumOne").text(0.00);
            $('.total').text(0);
            $('.totalOne').text(0);
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/cartItems/update_allchecked',
                data: {checked: 0},
                success: function(result){
                    console.log(result);
                }
            })
        }
    })
    //单选
    $('.container').on('click', '.Each>span', function () {
        //点击商品单选，增加.normal属性，移除.true属性  将图片更改为未选中状态
        $('.all>span').addClass('normal').removeClass('true');
        $('.all>span>img').attr('src', 'img/cart/product_normal.png');
        //如果点击的span含有normal 增加true属性 移除normal属性  将其图片更改为选中状态
        if ($(this).hasClass('normal')) {
            $(this).addClass('true').removeClass('normal');
            $(this).children('img').attr('src', 'img/cart/product_true.png');
            var amou = parseInt($('.total').text());
             amou++;
            $('.total').text(amou);
            $('.totalOne').text(amou);
            amountadd();
            //将数据存放到数据库
             var iid = $(this).parent().siblings('.pudc').children('.pudc_information').attr('data-iid');
            console.log(iid);
             $.ajax({
                 type: 'POST',
                 url: 'http://localhost:3000/cartItems/update_checked',
                 data: {iid:iid, checked: 1},
                 success: function(result){
                     console.log(result);
                 }
             })
        } else {
            //否则点击的span增加normal 移除true属性  将其图片更改为未选中状态
            $(this).addClass('normal').removeClass('true');
            $(this).children('img').attr('src', 'img/cart/product_normal.png');
            var amou = parseInt($('.total').text());
            amou--;
            $('.total').text(amou);
            $('.totalOne').text(amou);
            //调用amountadd()计算总价
            amountadd();
            //将数据存放到数据库
            var iid = $(this).parent().siblings('.pudc').children('.pudc_information').attr('data-iid');
             $.ajax({
                 type: 'POST',
                 url: 'http://localhost:3000/cartItems/update_checked',
                 data: {iid:iid, checked: 0},
                 success: function(result){
                     console.log(result);
                 }
             })
        }
        if(!$('.Each>span').hasClass('normal')){
            $('.all>span').addClass('true').removeClass('normal');
            $('.all>span>img').attr('src', 'img/cart/product_true.png');
        }
     })
})
//删除当前行
$('#main').on('click', '.del_d', (function () {
    var me = this;
    //获得当前商品在数据库中的iid，方便在购物车中删除商品
    var id = $(this).attr('data-iid');
    confirm("确定删除商品吗？");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/cartItems/delete",
        data: {iid: id},
        success: function (result) {
            if(result.ok==1){
                $(me).parent().parent().remove();
                amountadd();
                alert(result.msg);
            }else {
                alert('<b>删除失败！</b><p>错误原因为：'+result.msg+'</p>')
            }
        }
    });
}));

function adddel() {
    //小计和加减
    //加
    $(".container").on('click', '.add', (function () {
        var  $add = 0;
        var vall = $(this).prev().val();
        vall++;
        $(this).prev().val(vall);
         $add = (parseFloat(vall).toFixed(2) * $(this).parent().prev().children().eq(2).text());
         console.log($add);
        $(this).parent().next().children().eq(1).text($add.toFixed(2));
        amountadd();
        //获得商品id将数据存放到服务器
         var iid = $(this).parent().siblings('.pudc').children('.pudc_information').attr('data-iid');
         var num = $(this).prev().val();
         $.ajax({
          type: "POST",
          url: "http://localhost:3000/cartItems/update",
          data: {iid: iid, count: num},
          success: function (data) {
              console.log(data);
          }
          });
    }));
    //减
    $(".container").on('click', '.reduce', (function () {
        var $reduce = 0;
        var vall = $(this).next().val();
        vall--;
        if (vall <= 0) {
            vall = 1;
        }
        $(this).next().val(vall);
        $reduce = parseFloat(vall) * $(this).parent().prev().children().eq(2).text();
        $(this).parent().next().children().eq(1).text($reduce.toFixed(2));
         amountadd();
        //获得商品id将数据存放到服务器
         var iid = $(this).parent().siblings('.pudc').children('.pudc_information').attr('data-iid');
        var num = $(this).next().val();
         $.ajax({
             type: "POST",
             url: "http://localhost:3000/cartItems/update",
             data: {iid: iid, count: num},
             success: function (data) {
                 console.log(data);
             }
         });
    }));
}
//合计数量及金额
//function totl() {
//    var sum = 0.00;
//    var amount = 0;
//    //单个商品的总价
//    $(".totle_information").each(function () {
//        sum += parseInt($(this).text());
//        $(".susum").text(sum.toFixed(2));
//        $(".susumOne").text(sum.toFixed(2));
//        amount++;
//        $('.total').text(amount);
//        $('.totalOne').text(amount);
//    })
//}
// 单独点击 计算总价
function amountadd() {
    var amo = 0;
    var num = 0;
    $('.Each>span').each(function () {
        if ($(this).hasClass('true')) {
            amo += parseFloat($(this).parent().siblings('.totle').children('.totle_information').text());
            num += parseInt($(this).parent().parent().children().eq(3).children().eq(1).val());
        }
    })
    $('.susum').text(amo.toFixed(2));
    $('.susumOne').text(amo.toFixed(2));
    $('.total').text(num);
    $('.totalOne').text(num);
}


