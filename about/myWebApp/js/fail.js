/**
 * Created by Administrator on 2017/7/12.
 */
/**
 * Created by Administrator on 2017/7/11.
 */
var birds = [{"top":-3,"left":0},{"top":-1,"left":-2.5},{"top":-2,"left":-7.2},{"top":0,"left":-12}];
var monkeys = [{"top":0,"left":0},{"top":0,"left":-1.25},{"top":0,"left":-2.5},{"top":0,"left":-3.75},
    {"top":0,"left":-5},{"top":0,"left":-6.25},{"top":0,"left":-7.5},{"top":0,"left":-8.75},{"top":0,"left":-10}];
var words = [{"info":"表白","lineHeight":12,"fontSize":1.55},{"info":"谈过几次恋爱","lineHeight":12,"fontSize":1.55},{"info":"你第一个喜欢的异性叫什么名字","lineHeight":4,"fontSize":1.55},
    {"info":"最害怕的事情或者东西（说出三件）","lineHeight":4,"fontSize":1.55},{"info":"打算什么时候结婚","lineHeight":6,"fontSize":1.55},{"info":"会不会在意ta的过去","lineHeight":6,"fontSize":1.55},
    {"info":"结婚后想生男孩还是女孩（说出原因）","lineHeight":4,"fontSize":1.55},{"info":"做过最丢脸的事情","lineHeight":6,"fontSize":1.55},{"info":"做自己最性感、最妩媚的表情或动作","lineHeight":4,"fontSize":1.55}];
var images = [{"src":"../img/change_0.jpg"},{"src":"../img/change_2.jpg"},{"src":"../img/change_3.jpg"}];

$(function () {
    var $monkey = $("#monkey");
    var $bird = $("#bird");
    var $porker_box = $("#poker_box");
    var monkey = $monkey.find("img")[0];
    var bird = $bird.find("img")[0];
    var porker_wrap = $porker_box.find(".poker_wrap")[0];
    var monkeyBox = $monkey.find(".monkey_box")[0];
    var birdBox = $bird.find(".bird_box")[0];

    //解决左右滑动页面的事件
    document.querySelector("body").addEventListener("touchmove",function (e) {
        e.preventDefault();
    });

    updatePic(bird,birds,200);
    updatePic(monkey,monkeys,500);

    clickPic(porker_wrap);
});


function updatePic(obj,arr,v) {
    clearInterval(obj.timer);
    var len = arr.length;
    var i = 0;
    obj.timer = setInterval(function () {
        $(obj).css({"top":arr[i].top+"rem","left":arr[i].left+"rem"});
        i++;
        if(i >= len){
            i = 0;
        }
    },v);
}

function clickPic(obj) {
    $(obj).bind("click",function (e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        var $parent = $(target).parents(".poker");
        if($parent.length>0){
            $parent.siblings().css("display","none");
            $parent.text("");
            var $grandParent = $parent.parent();
            var randomArr = [0,1,2,3,4,5,6,7,8];
            randomArr.sort(function (n1,n2) {
                return Math.random()-0.5;
            });

            for(var i=0;i<randomArr.length;i++){
                var pokers = getMyElementsByClassName($grandParent[0],"poker");
                pokers[i].index = i;
            }
            var iNow = randomArr[$parent[0].index];
            $parent.css({"width":12+"rem","height":12+"rem","background-color":"#bff","transition":"0.5s","border":"2px solid #ccc","border-radius":"10px","top":0,"left":0,"zIndex":999,"line-height":words[iNow].lineHeight+"rem","font-size":words[iNow].fontSize+"rem"});
            setTimeout(function () {
                console.log(words[iNow]);
                $parent.text(words[iNow].info);
                $parent.css({"-webkit-transform":"rotateY(360deg)","transition":"1s","-webkit-transform-origin": "center center 0"})
            },800);
            setTimeout(function () {
                $parent.css({"width":4+"rem","height":4+"rem","top":Math.floor($parent[0].index/3)*4+"rem","left":($parent[0].index%3)*4+"rem","background-color":"#bff","transition":"0.5s","border":"2px solid #ccc","border-radius":"10px","zIndex":999,"line-height":words[iNow].lineHeight/3+"rem","font-size":words[iNow].fontSize/3+"rem"});
                for(var i=0;i<9;i++){
                    if(i != $parent[0].index){
                        $(pokers[i]).css({"display":"block","background-color": "#87cefa","border":"2px solid #ccc","border-radius":"10px","line-height":words[randomArr[i]].lineHeight/3+"rem","font-size":words[randomArr[i]].fontSize/3+"rem"});
                        $(pokers[i]).text(words[randomArr[i]].info);
                    }
                }
            },2000);
            $(obj).unbind("click");
            $parent.bind("click",function (ev) {
                window.location.href = "fail.html";
            });
        }
    });
}

//getMyElementsByClassName(node,className)的实现
function getMyElementsByClassName(node,className) {
    var reg = new RegExp('\\b'+className+'\\b');
    if(node.getElementsByClassName){
        return node.getElementsByClassName(className);
    }else {
        var results = [];
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elems.length;i++){
            if(reg.test(elems[i].className)){
                results.push(elems[i]);
            }
        }
        return results;
    }
}


