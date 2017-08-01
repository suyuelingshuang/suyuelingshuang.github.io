/**
 * Created by dell on 2017/8/1.
 */
/*放大镜效果*/
$(function () {
    $(".myZoom").myZoom({
        lens:1,
        preload:true,
        zoomWidth:400,
        zoomHeight:400,
        xOffset:10,
        yOffset:0,
        xZoom:100,
        yZoom:100,
        position:"right"
    });
});
/*更换展示图片*/
$(function () {
   $("#wdProItem ul.imgList li img").bind("click",function () {
       var $img = $(this);
       var $parent = $img.parent();
       $parent.addClass("cli").siblings().removeClass();
       var imgNow = $img.clone().get(0);
       var $myZoom = $(".myZoom");
       $myZoom.html(imgNow);
   });
});
/*产品属性选项卡*/
$(function () {
    var $li = $("div.tab_menu ul li");
    $li.click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        var index = $li.index(this);

        $("div.tab_box>div").eq(index).show().siblings().hide();
    }).hover(function () {
        $(this).addClass("hover");
    },function () {
        $(this).removeClass("hover");
    })
});
/*更新选择*/
$(function () {
   $("#wdDetails .colorList li img").bind("click",function () {
       var $img = $(this);
       var $parent = $img.parent();

       var $singlePrice = $("#singlePrice");
       var $colorChos = $("#colorChos");
       var oPrice = $img.attr("price");
       var oColor = $img.attr("alt");

       $parent.addClass("cli").siblings().removeClass();
       $singlePrice.html(oPrice);
       $colorChos.html(oColor);
   });
    $("#wdDetails .sizeList li").bind("click",function (e) {
        var $li = $(this);
        var $sizeChos = $("#sizeChos");
        var oSize = $li.html();

        $li.addClass("selected").siblings().removeClass();
        $sizeChos.html(oSize);
    });
    $("#wdDetails .sizeList").bind("click",updatePrice);
    $("#wdDetails .colorList").bind("click",updatePrice);
    $("#num").bind("change",updatePrice);
});
function updatePrice() {
    var oColor = $("#colorChos").html();
    var oSize = $("#sizeChos").html();

    if(oColor != " 未选择"){
        var oPrice = $("#singlePrice").html().match(/\d+(\.?\d+)?/g)[0];
        var oNum = $("#num").val();
        $("#totalPrice").html("￥ "+oNum*oPrice);
    }
}
/*星级评价*/
$(function () {
    var oStar = document.getElementById("star");
    var aLi = oStar.getElementsByTagName("li");
    var oUl = oStar.getElementsByTagName("ul")[0];
    var oSpan = oStar.getElementsByTagName("span")[1];
    var oP = oStar.getElementsByTagName("p")[0];
    var i = 0,iScore = 0, iStar = 0;
    var aMsg = [
        "很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
        "不满意|部分有破损，与卖家描述的不符，不满意",
        "一般|质量一般，没有卖家描述的那么好",
        "满意|质量不错，与卖家描述的基本一致，还是挺满意的",
        "非常满意|质量非常好，与卖家描述的完全一致，非常满意"
    ];
    for (i = 1; i <= aLi.length; i++)
    {
        aLi[i - 1].index = i;
        //鼠标移过显示分数
        aLi[i - 1].onmouseover = function ()
        {
            fnPoint(this.index);
            //浮动层显示
            oP.style.display = "block";
            //计算浮动层位置
            oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
            //匹配浮动层文字内容
            oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
        };
        //鼠标离开后恢复上次评分
        aLi[i - 1].onmouseout = function ()
        {
            fnPoint();
            //关闭浮动层
            oP.style.display = "none"
        };
        //点击后进行评分处理
        aLi[i - 1].onclick = function ()
        {
            iStar = this.index;
            oP.style.display = "none";
            oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
        }
    }
    //评分处理
    function fnPoint(iArg)
    {
        //分数赋值
        iScore = iArg || iStar;
        for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
    }
});
/*加入购物车*/
$(function () {
    var $addPro = $("#addPro img");
    var $details = $("#wdDetails");
    $addPro.bind("mouseenter",function () {
        $(this).addClass("hover");
    }).bind("mouseleave",function () {
        $(this).removeClass("hover");
    });
    updatePrice();
    $addPro.bind("click",function () {
        var oTotal = $("#totalPrice").html().match(/\d+(\.?\d+)?/g)[0];
        if(oTotal != 0){
            //在移除元素前需先解除它身上绑定的事件，防止内存泄漏
            $(this).unbind("mouseenter");
            $(this).unbind("mouseleave");
            $(this).unbind("click");
            $addPro.parent().parent().remove();

            var oTitle = $("#wdDetails h2").html();
            var oPrice = $("#singlePrice").html();
            var oColor = $("#colorChos").html();
            var oSize = $("#sizeChos").html();
            var oNum = $("#num").val();

            var str = $details.html()+"<div class='purInfo'><h2>"+oTitle+"</h2>"+"<em>单 价 ："+oPrice+"</em>"+"<em>颜 色 ："+oColor+"</em>"+"<em> 尺 寸 ："+oSize+"</em>"+"<em>数 量："+oNum+"</em>"+"<em>总 价：<strong>"+oTotal+"</strong></em>";
            $details.html(str);
        }else {
            alert("请确认已选择了您喜欢的产品！");
        }
    });
});








