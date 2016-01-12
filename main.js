/**
 * Created by 15031493 on 2016/1/11.
 */

    var menu = $(".menu");
    var cont = $(".container");

var oldWay = function () {
    menu.on("click","a", function (event) {
        event.preventDefault();
        var url = "tpl/"+$(this).attr("data-url")+".html";;
        ajaxRequest(url);
    });



}

var hashWay = function () {
    window.addEventListener("hashchange", function () {
        var hash =  location.hash.replace('#','');
        var url = "tpl/"+hash+".html";
        ajaxRequest(url);
    }, false);
};

var pushStateWay = function () {

    window.onpopstate = function(event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        var state = event.state;
        ajaxRequest(state.url);
    };

    menu.on("click","a", function (event) {
        event.preventDefault();
        var hash = "?view="+$(this).attr("data-url");
        var url = "tpl/"+$(this).attr("data-url")+".html";;
        history.pushState({url:url}, "title 1", hash);
        ajaxRequest(url);
    });
};

function ajaxRequest(url,data){
    $.ajax({
        type:"get",
        url:url,
        data:data,
        dataType:"html",
        success: function (result) {
            cont.empty().append(result);
        },
        error: function () {
            cont.empty().append("not Found!!!");
        }
    })
}

//清除hash
function clearUrl(){
    var url  = location.href;
    var index = url.indexOf("#");
    var newurl = url.slice(0,index);
    if(index != -1){
        location.href = newurl;
    }
}

//定位hash
function initUrl(){
    var url  = location.href;
    var hash =  location.hash.replace('#','');
    var index = url.indexOf("#")
    var url = "tpl/"+hash+".html";
    if(index != -1){
        ajaxRequest(url);
    }
}



$(function () {
   // clearUrl();
  //  initUrl();
  //  oldWay();
    hashWay();
    //pushStateWay();
})
