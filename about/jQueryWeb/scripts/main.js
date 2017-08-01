/**
 * Created by dell on 2017/7/31.
 */
/*导航栏搜索框*/
$(function () {
    $("#inputSearch").focus(function () {
        $(this).addClass("focus");
        if($(this).val() == this.defaultValue){
            $(this).val("");
        }
    }).blur(function () {
        $(this).removeClass("focus");
        if($(this).val() == ""){
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if(e.which == 13){
            alert("回车提交表单！");
        }
    })
});
/*网页换肤*/
$(function () {
    var $li = $("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });
    var cookie_skin = $.cookie("mySkin");
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
});
function switchSkin(skinName) {
    $("#"+skinName).addClass("selected").siblings().removeClass("selected");
    $("body").attr("background","imgs/"+skinName+".jpg");
    $.cookie("mySkin",skinName,{path:'/',expires:10});
}
/*导航栏span效果*/
$(function () {
    $("#nav li").hover(function () {
        $(this).find(".wdNav").show();
    },function () {
        $(this).find(".wdNav").hide();
    })
});
/*侧边栏添加热销效果*/
$(function () {
    $(".wdCataInfo .promoted").append("<s class='hot'></s>");
});

























