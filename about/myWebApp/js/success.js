/**
 * Created by Administrator on 2017/7/12.
 */
var birds = [{"top":-3,"left":0},{"top":-1,"left":-2.5},{"top":-2,"left":-7.2},{"top":0,"left":-12}];
var monkeys = [{"top":0,"left":0},{"top":0,"left":-1.25},{"top":0,"left":-2.5},{"top":0,"left":-3.75},
    {"top":0,"left":-5},{"top":0,"left":-6.25},{"top":0,"left":-7.5},{"top":0,"left":-8.75},{"top":0,"left":-10}];
var isMouseDown = false;
var lastLoc = {x:0,y:0};
var lastTimestamp = 0;
var speed = [];

$(function () {
    var $monkey = $("#monkey");
    var $bird = $("#bird");
    var monkey = $monkey.find("img")[0];
    var bird = $bird.find("img")[0];

    console.log($("#select_box").find(".active"));
    chooseNum();

    updatePic(bird,birds,200);
    updatePic(monkey,monkeys,500);
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

function chooseNum() {
    //解决下拉页面显示内核信息的事件
    document.querySelector("body").addEventListener("touchmove",function (e) {
        e.preventDefault();
    });

    document.addEventListener('touchstart',function (e) {
        touch = e.touches[0];
        beginTouch({x:touch.pageX,y:touch.pageY});
    });

    document.addEventListener('touchmove',function (e) {
        if(isMouseDown){
            touch = e.touches[0];
            moveTouch({x:touch.pageX,y:touch.pageY});
        }
    });

    document.addEventListener('touchend',function (e) {
        endTouch();
    });

    document.onmousedown = function (e) {
        e.preventDefault();
        beginTouch({x:e.clientX,y:e.clientY});
    };

    document.onmouseup = function (e) {
        endTouch();
    };

    document.onmousemove = function (e) {
        if(isMouseDown){
            moveTouch({x:e.clientX,y:e.clientY});
        }
    }
}

function beginTouch(point) {
    isMouseDown = true;
    speed = [];
    lastLoc = point;
    lastTimestamp = new Date().getTime();
}

function endTouch() {
    isMouseDown = false;
    //可以避免误判
    if(speed.length>4){
        moveNum();
    }
}

function moveTouch(point) {
    var curLoc = point;
    var curTimestamp = new Date().getTime();
    var s = dis(curLoc,lastLoc);
    var t = curTimestamp - lastTimestamp;

    speed.push(calSpeed(t,s));

    lastLoc = curLoc;
    lastTimestamp = curTimestamp;
}

function moveNum() {
    var meanSpeed = Math.floor((speed.reduce(function (p1, p2, p3, p4) {
            return p1+p2;
        }))/speed.length);
    if(meanSpeed>0){
        console.log("meanSpeed: "+meanSpeed);
        if(meanSpeed>=36){
            meanSpeed -= 24;
        }else if(meanSpeed>=24){
            meanSpeed -= 12;
        }
        var $parent = $("#select_box");
        var $lis = $parent.find("li");
        var i = 0;
        setTimeout(function () {
            var index = i%12;
            $lis.eq(index).addClass("active").siblings().removeClass("active");
            i++;
            if(i<meanSpeed){
                setTimeout(arguments.callee,100);
            }
        },50);
    }

}

function calSpeed(t,s) {
    var maxSpeed = 100;
    var minSpeed = 1;
    var maxV = 10;
    var minV = 0.1;
    var v = s/t;
    var resultSpeed = 0;
    if(v<=minV){
        resultSpeed = minSpeed;
    }else if(v>=maxV){
        resultSpeed = maxSpeed;
    }else{
        resultSpeed = Math.floor( (v-minV)/(maxV-minV)*(maxSpeed-minSpeed) );
    }

    return resultSpeed;

}

function dis(loc1,loc2) {
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}