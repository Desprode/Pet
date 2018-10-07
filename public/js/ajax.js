//支持增加参数  用于前端防止回调地狱
function ajax(url,data){
    return new Promise(function(open,err){
        //ajax异步请求四步
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                open(xhr.responseText);
            }
        }
        if(data!==undefined){
            var arr=[];
            for(var key in data){
                arr.push(`${key}=${data[key]}`);
            }
            url+=`?${arr.join("&")}`;
        }
        xhr.open("get",url,true);
        xhr.send(null);
    })
}


