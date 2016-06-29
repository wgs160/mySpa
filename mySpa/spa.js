/**
 * Created by 15031493 on 2016/1/12.
 */

var spa = spa || {};

//自身初始化
spa.init = function () {
    spa.clearUrl();
}

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

//
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

/**
 * 后端交互获取数据
 * @param url 请求地址
 * @param data 请求参数
 * @param callback 回调方法
 */
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
spa.initFunc = function(viewName) {
    var fn = spa.view[viewName].init;
    if(typeof fn === 'function') {
        fn();
    }
}

//数据渲染
spa.render = function(targetDiv,result) {
    var spaElem = targetDiv.find("[spa-data]");
    for (var i = 0; i < spaElem.length; i++) {
        var elem = spaElem[i];
        var $elem = $(elem);
        var data = result[$elem.attr("spa-data")];

        //数据为空则跳过
        if(!data)continue;
        console.log($.type(data));
        //循环判断
        if($elem.attr("spa-repeat")){
            //var itemName = $elem.attr("spa-item")
            if($.type(data) != "array"){
                alert("不是数组");
                return false
            }

            for (var j = 0; j < data.length; j++) {
                var itemData = data[j];
                var elemClone = $elem.clone().removeAttr("spa-data").removeAttr("spa-repeat");
                $elem.after(spa.dataFill(elemClone.prop('outerHTML'),itemData));
            }
        }else{
            var elemClone = $elem.clone().removeAttr("spa-data");
            $elem.after(spa.dataFill(elemClone.prop('outerHTML'),data));
        }
        $elem.remove();
    }

}

//占位符替换
spa.dataFill = function (html,objData) {
    return html.replace(/\{\{([^}]+)\}\}/gi, function (match,p1) {
        var prop = p1.split(".");
        var result = objData;
        //循环处理最底层对象
        for(var key in prop){
            result = result[prop[key]];
            if(!result){
                result = "error!no value!";
            }
        }
        return result;
    })
}

spa.clearUrl = function () {
    var url  = location.href;
    var index = url.indexOf("#");
    var newurl = url.slice(0,index);
    if(index != -1){
        location.href = newurl;
    }
}

spa.init();


