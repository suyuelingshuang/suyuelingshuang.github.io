/**
 * Created by Administrator on 2017/7/11.
 */
var birds = [{"top":-3,"left":0},{"top":-1,"left":-2.5},{"top":-2,"left":-7.2},{"top":0,"left":-12}];
var monkeys = [{"top":0,"left":0},{"top":0,"left":-1.25},{"top":0,"left":-2.5},{"top":0,"left":-3.75},
    {"top":0,"left":-5},{"top":0,"left":-6.25},{"top":0,"left":-7.5},{"top":0,"left":-8.75},{"top":0,"left":-10}];
var dis = [2,5];
var wid = [0.5,1.5];

$(function () {
    var $monkey = $("#monkey");
    var $bird = $("#bird");
    var monkey = $monkey.find("img")[0];
    var bird = $bird.find("img")[0];
    var monkeyBox = $monkey.find(".monkey_box")[0];
    var birdBox = $bird.find(".bird_box")[0];

    //解决左右滑动页面的事件
    document.querySelector("body").addEventListener("touchmove",function (e) {
        e.preventDefault();
    });

    updatePic(bird,birds,200);
    updatePic(monkey,monkeys,500);
    updateBox(wid,dis);
    updateStick(monkeyBox,birdBox,50);
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

function movePic(obj,len) {
    clearInterval(obj.newTimer);
    var left = $(obj).offset().left;
    var width = $(obj).outerWidth();
    var i = 0;
    obj.newTimer = setInterval(function () {
        $(obj).css({"left":left + i + "px"});
        i += len/10;
        if(i >= len){
            clearInterval(obj.newTimer);
        }
    },200);
}

function updateBox(widArr,disArr) {
    var box = document.getElementById("box");
    var boxs = box.getElementsByTagName("div");
    var boxWidth = [];
    var boxDis = [];
    boxWidth.push(randomNum(widArr),randomNum(widArr));
    boxDis.push(0,randomNum(disArr));
    for(var i=0;i<2;i++){
        $(boxs[i]).css({"width":boxWidth[i]+"rem","left":boxDis[i]+"rem"});
    }
}

function updateStick(monkeyBox,birdBox,len) {
    var i = 0;
    var $stick = $("#stick");
    var stick = $stick[0];

    var left = $("#box").find("div").eq(0).outerWidth();
    $stick.css({"width": 4 + "px", "left": left - 4 + "px"});

    $(document).bind("touchstart",function (e) {
        stick.timer = setInterval(function () {
            $stick.css({"height": i + "px"});
            i += len / 20;
        }, 100);
        //禁止长按页面的默认事件
        e.preventDefault();
    }).bind("mouseup",function () {
        clearInterval(stick.timer);
    }).bind("touchend",function () {
        clearInterval(stick.timer);
        $(document).unbind("touchstart");
        $(document).unbind("mousedown");
        rotateStick(monkeyBox,birdBox,stick);
        $(document).unbind("mouseup");
        $(document).unbind("touchend");
    });

}

function rotateStick(monkeyBox,birdBox,obj) {
    var $obj = $(obj);
    var boxW = $(monkeyBox).outerWidth();
    var offset = boxW-$("#box>div").eq(0).outerWidth()/2;
    var h = $obj.outerHeight();
    var w = $obj.outerWidth();
    var l = h-w/2+boxW/2-offset/2;
    $obj.css({"-webkit-transform":"rotateZ(90deg)","transition":"0.1s","-webkit-transform-origin": "center bottom 0"});
    movePic(monkeyBox,l);
    var checkSafe = isSafe(h-w/2);
    if(checkSafe.flag){
        movePic(birdBox,l);
        setTimeout(function () {
            window.location.href = "success.html";
        },2000);
    }else {
        moveBird(birdBox,checkSafe.w1+h-w/2,checkSafe.t1);
        setTimeout(function () {
            window.location.href = "fail.html";
        },2500);
    }
}

function isSafe(len) {
    var $box = $("#box");
    var $box1 = $box.find("div").eq(0);
    var $box2 = $box.find("div").eq(1);
    var box1_w = $box1.outerWidth();
    var box1_t = $box1.offset().top;
    var box2_l = $box2.offset().left;
    var box2_w = $box2.outerWidth();
    return {"flag":(len>box2_l-box1_w)&&(len<box2_l-box1_w+box2_w)?true:false,"w1":box1_w,"t1":box1_t};
}

function moveBird(obj,offsetL,t) {
    var startT = 0;
    var startL = 0;

    var $birdBox = $(obj);
    var $parent = $("#bird");
    //鸟盒子到页面顶端的距离
    var bird_t = $parent.offset().top;

    //鸟盒子需要下移的距离
    var len_t = t - bird_t - $parent.outerHeight()/2;

    console.log(bird_t);
    console.log(t);
    console.log("!!!!!!!!!!!!!!!");
    console.log(len_t);
    console.log(offsetL);

    togetherMove(departMove);

    //同时向右向下移动
    function togetherMove(departMove) {
        setTimeout(function () {
            startL += 5;
            startT += 5;
            $parent.css({"top":startT});
            $birdBox.css({"left":startL});

            if(startT<len_t&&startL<offsetL){
                setTimeout(arguments.callee,50);
            }else {
                //用回调函数形式来调用后续的移动
                departMove(startL,startT);
            }

        },30);
    }

    //当同时移动的位置没到达目标位置时向下或者向右移动
    function departMove(startL,startT) {
        var bird = $("#bird").find("img")[0];
        if(startL<offsetL){
            setTimeout(function () {
                startL += 1;
                $birdBox.css({"left":startL});
                if(startL<offsetL){
                    setTimeout(arguments.callee,10);
                }
            },20);
        }else{
            setTimeout(function () {
                startT += 1;
                $parent.css({"top":startT});
                if(startT<len_t){
                    setTimeout(arguments.callee,10);
                }
            },20);
        }
        clearInterval(bird.timer);
        updatePic(bird,birds,350);
    }

}



/*function updateStick(len) {
    var i = 0;
    var $stick = $("#stick");
    var stick = $stick[0];

    var left = $("#box").find("div").eq(0).outerWidth();
    $stick.css({"width":2+"px","left":left-2+"px"});

    //可以实现点击加长，再次点击停止加长
    $(document).on("mousedown", function () {
        var flag = true;
        setTimeout(function () {
            $stick.css({"height":i+"px"});
            i += len/5;
            if(flag){
                setTimeout(arguments.callee,100);
            }
        },100);

        $(document).on("mouseup" , function () {

            if(document.releaseCapture){
                document.releaseCapture();
            }
            flag = false;
            $(document).off("mousedown");
            $(document).off("mouseup");
        });
    });
}*/

function randomNum(arr) {
    return Math.random()*(arr[1]-arr[0]) + arr[0];
}

