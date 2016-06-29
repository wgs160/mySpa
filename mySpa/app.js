/**
 * Created by 15031493 on 2016/1/12.
 */
$(function () {
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
    spa.view.dogInfo = {
        url:"tpl/dog.html",
        init: function () {
            $.ajax({
                url:"data/dog.json",
                type:"get",
                dataType:"json",
                success: function (result) {
                    spa.render(spa.div,result);
                }
            })

        }
    };
    spa.view.peopleInfo = {
        url:"tpl/people.html",
        init: function () {
            $.ajax({
                url:"data/people.json",
                type:"get",
                dataType:"json",
                success: function (result) {
                    spa.render(spa.div,result);
                }
            })
        }
    };
})