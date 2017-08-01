/**
 * Created by dell on 2017/7/31.
 */
/*index.html*/
$(function () {
    var index = 0;
    var adTimer = null;
    var $imgRolls = $("#wdImageRoll div a");
    $imgRolls.css("opacity","0.7");
    var len = $imgRolls.length;

    $imgRolls.mouseover(function () {
        index = $imgRolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    $("#wdImageRoll").hover(function () {
        if(adTimer){
            clearInterval(adTimer);
        }
    },function () {
        adTimer = setInterval(function () {
            showImg(index);
            index++;
            if(index == len){
                index = 0;
            }
        },3000);
    }).trigger("mouseleave");
});
function showImg(index) {
    var $rollObj = $("#wdImageRoll");
    var $rollList = $rollObj.find("div a");
    var newHref = $rollList.eq(index).attr("href");
    $("#wdImgWrap").attr("href",newHref)
        .find("img").eq(index).stop(true,true).fadeIn()
        .siblings().fadeOut();
    $rollList.removeClass("chos").css("opacity","0.7")
        .eq(index).addClass("chos").css("opacity","1");
}
$(function () {
    var x = 10;
    var y = 20;
    $("a.toolTip").mouseover(function (e) {
        this.myTitle = this.title;
        this.title = "";
        var toolTip = "<div id = 'toolTip'>"+this.myTitle+"</div>";
        $("body").append(toolTip);
        $("#toolTip").css({
            "top":(e.pageY+y) + "px",
            "left":(e.pageX+x) + "px"
        }).show("fast");
    }).mouseout(function () {
        this.title = this.myTitle;
        $("#toolTip").remove();
    }).mousemove(function (e) {
        $("#toolTip").css({
            "top":(e.pageY+y)+"px",
            "left":(e.pageX+x) + "px"
        });
    });
});
$(function () {
    $brandAs = $("#wdBrandTab li a");
    $brandAs.click(function () {
        $(this).parent().addClass("chos").siblings().removeClass("chos");
        var idx = $brandAs.index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();
});
function showBrandList(index) {
    var $rollObj = $("#wdBrandList");
    var rollWidth = $rollObj.find("li").outerWidth();
    rollWidth = rollWidth*4;
    $rollObj.stop(true,false).animate({left:-rollWidth*index},1000);
}
$(function () {
    $("#wdBrandList li").each(function (index) {
        var $img = $(this).find("img");
        var imgWidth = $img.width();
        var imgHeight = $img.height();
        $(this).hover(function () {
            $img.css({
                "width":(imgWidth+10)+"px",
                "height":(imgHeight+10)+"px",
                "top":0,
                "left":4+"px"
            })
        },function () {
            $img.css({
                "width":imgWidth+"px",
                "height":imgHeight+"px",
                "top":0,
                "left":4+"px"
            })
        });
    })
});