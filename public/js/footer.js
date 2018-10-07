//动态加载footer
ajax("http://localhost:3000/footer.html")
    .then(res=>{
        document.getElementById("footer").innerHTML = res;
    });