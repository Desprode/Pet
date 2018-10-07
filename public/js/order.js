/**加载已勾选的购物车条目**/
$.ajax({
  type:'GET',
  data:[],
  url: 'http://localhost:3000/cartItems/list_checked',
  success: function(result){
    if(result.ok==1){
        console.log(result);
      var totalPrice = 0;
      var html = '';
      $.each(result.msg, function(i, l){
       totalPrice += l.price*l.count;
      html += `
        <ul class="item_detail">
            <li class="p_info">
                <b><img src="${l.sm}"/></b>
                <b class="product_name lf">
                    ${l.title}
                </b>
                <br/>
            <span class="product_color ">
               规格：${l.spec}
            </span>
            </li>
            <li class="p_price">
                <i>会员专属价</i>
                <br/>
                <span class="pro_price">￥<span class="ppp_price">${l.price}</span></span>
            </li>
            <li class="p_count">X<span>${l.count}</span></li>
            <li class="p_tPrice">￥<span>${l.price*l.count}</span></li>
        </ul>
        `;
      })
      $('#product_list').html(html);
       order();
    }
  }
});
function order(){
    var num=0;
    var total=0;
    $(function(){
        $(".item_detail").each(function() {
            var p=parseFloat($(this).children('.p_price').children('.pro_price').children('.ppp_price').html());
            var sl=parseFloat($(this).children('.p_count').children('span').html());
            var xj=parseFloat(p*sl).toFixed(2);
            $(this).children('.p_tPrice').children('span').html(xj);
            total+=xj-0;
            num+=sl;
        })
        $("#count").html(num);
        $(".zj").html(total.toFixed(2));
        var input_zj=parseFloat($(".zj").html()).toFixed(2);
        $('#payment').val(input_zj);
    })
}
