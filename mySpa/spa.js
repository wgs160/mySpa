/**
 * Created by 15031493 on 2016/1/12.
 */

var spa = spa || {};

//缓存的代码片段
spa.cacheTpl = {};

//存放视图对象和初始方法
spa.view  = {};

//默认视图对象
spa.view.home = {
    url:"tpl/home",
    init: function () {

    }
};
spa.view.notfound = {
    url:"tpl/404.html",
    init: function () {
        alert("页面找不到");
    }
};

spa.div = $(".container");

spa.changeUrl = function () {
    var viewName = location.hash.replace('#','');
    if(viewName === ''){
        viewName = 'home';
    }
    if(! spa.view[viewName]){
        viewName = "notfound";
    }
    spa.ajaxRequest(spa.view[viewName].url,"", function (status,result) {
        if(status == 404){
            viewName = "notfound";
            spa.ajaxRequest(spa.view[viewName].url,"", function (status,result) {
                spa.div.empty().append(result);
                spa.initFunc(viewName);
            });
        }else{
            spa.div.empty().append(result);
            spa.initFunc(viewName);
        }
    });

}

//
spa.ajaxRequest = function(url,data,callback){
    if(spa.cacheTpl[url]){
        callback(200,spa.cacheTpl[url]);
    }else{
        $.ajax({
            type:"get",
            url:url,
            data:data,
            dataType:"html",
            success: function (result) {
                callback(200,result);
                spa.cacheTpl[url] = result;
            },
            error: function () {
                callback(404);
            }
        })
    }
}

//view对象初始化方法
spa.initFunc = function(url) {
    var fn = spa.view[url].init;
    if(typeof fn === 'function') {
        fn();
    }
}

function clearUrl(){
    var url  = location.href;
    var index = url.indexOf("#");
    var newurl = url.slice(0,index);
    if(index != -1){
        location.href = newurl;
    }
}

$(function () {
    clearUrl();
    spa.view.aa = {
        url:"tpl/aa.html",
        init: function () {
            alert("我是aa")
        }
    };
    spa.view.bb = {
        url:"tpl/bb.html",
        init: function () {
            alert("我是bb")
        }
    };
})