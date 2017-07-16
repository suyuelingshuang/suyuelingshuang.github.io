/**
 * Created by ZWX on 2017/6/20.
 */
var dataInt = {
    "data":[{"src":"images/24.jpg"},{"src":"images/25.jpg"},{"src":"images/26.jpg"},{"src":"images/27.jpg"}, {"src":"images/28.jpg"},
        {"src":"images/29.jpg"},{"src":"images/30.jpg"}, {"src":"images/31.jpg"},{"src":"images/32.jpg"},{"src":"images/33.jpg"},
        {"src":"images/34.jpg"}, {"src":"images/35.jpg"},{"src":"images/36.jpg"},{"src":"images/37.jpg"},{"src":"images/38.jpg"},
        {"src":"images/39.jpg"},{"src":"images/40.jpg"}]
};

var canvasWidth = $(window).width();
var canvasHeight = $(window).height();

$(window).on('load',function () {
    var wf = document.getElementById("wf");
    var beauty = document.getElementById("beauty");
    var index = document.getElementById("index");

    loadIndex();
    checkClass();



});
/* 运用事件委托检测导航栏点击事件，更新active元素，并根据className匹配来添加区分页面主体是加载哪部分（男神or女神）*/
function checkClass() {
    var nav = document.getElementById("nav");
    nav.onclick = function (ev) {

        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        $(target).parent().addClass("active").siblings().removeClass("active");
        var cName = $(target).parent()[0].className;
        if(/\bhero\b/g.test(cName)){
            beauty.style.display = "none";
            index.style.display = "none";
            wf.style.display = "block";
        }else if(/\bheroine\b/g.test(cName)){
            index.style.display = "none";
            wf.style.display = "none";
            beauty.style.display = "block";
        }else if(/\bindex\b/g.test(cName)){
            index.style.display = "block";
            wf.style.display = "none";
            beauty.style.display = "none";
        }
        if(getCurrentStyle(wf,"display") != "none"){
            NanShen();
        }
        if(getCurrentStyle(beauty,"display") != "none"){
            NvShen();
        }
    }
}

/* 主页加载部分 */
function loadIndex() {
    // 处理点击导航栏菜单下拉列表收缩问题
    var $myMenu = $("#nav>li");
    $myMenu.on("click",function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(!(/dropdown-toggle/.test(target.className)) && $("#to_btn").css("display") != "none"){
            $("#to_btn").trigger("click");
        }
    });


    loadSlide();
    loadClock();
    loadFold();
    loadMenu();
    loadPhotos();
}

/* 幻灯片部分 */
function loadSlide() {
    var  oPicList = document.getElementById('picList');
    var  oCss = document.getElementById('css');
    var aBtns = document.getElementById('btns').getElementsByTagName("li");
    var aLi = null;
    var sLi = "";
    var sCss = "";

    var iLiW = 25;
    var iZIndex = 0;
    var iNow = 0;
    var iLen = oPicList.clientWidth/iLiW;

    for(var i=0;i<iLen;i++){
        i>iLen/2?iZIndex--:iZIndex++;
        sLi+='<li><a href="#"></a> <a href="#"></a> <a href="#"></a> <a href="#"></a> <span></span> <span></span> </li>';
        sCss+="#picList li:nth-of-type("+(i+1)+") a{background-position:-"+i*iLiW+"px 0;}";
        sCss+="#picList li:nth-of-type("+(i+1)+"){z-index:"+iZIndex+"}";
    }
    oPicList.innerHTML = sLi;
    oCss.innerHTML += sCss;
    aLi = oPicList.children;
    for(var j=0;j<aBtns.length;j++){
        (function (a) {
            aBtns[a].onclick = function () {
                if(a != iNow){
                    this.className = "active";
                    aBtns[iNow].className = "";
                    iNow = a;
                    for(var k=0;k<aLi.length;k++){
                        aLi[k].style.transition = '0.5s '+k*20+'ms';
                        aLi[k].style.WebkitTransform = "rotateX(-"+a*90+"deg)";
                    }
                }
            };
        })(j);
    }
}

/* 时钟部分 */
function loadClock() {
    var oList = document.getElementById('list');
    var oCss = document.getElementById('css');

    var oHour = document.getElementById('hour');
    var oMin = document.getElementById('min');
    var oSec = document.getElementById('sec');

    var aLi = '';
    var sCss = '';
    for(var i=0;i<60;i++){
        sCss+="#clock_wrap ul li:nth-of-type("+(i+1)+"){-webkit-transform:rotate("+6*i+"deg); }";
        aLi+="<li></li>";
    }
    oCss.innerHTML+=sCss;
    oList.innerHTML = aLi;

    setInterval(toTime,1000);

    function toTime() {
        var oDate = new Date();
        var iSec = oDate.getSeconds();
        var iMin = oDate.getMinutes()+iSec/60;
        var iHour = oDate.getHours()+iMin/60;
        oSec.style.WebkitTransform = "rotate("+iSec*6+"deg)";
        oMin.style.WebkitTransform = "rotate("+iMin*6+"deg)";
        oHour.style.WebkitTransform = "rotate("+iHour*30+"deg)";
    }
}

/* 3D折纸部分 */
function loadFold() {
    var oBtn = document.getElementById('btn');
    var oWrap = document.getElementById('fold_wrap');
    var aDiv = oWrap.getElementsByTagName('div');

    var iDelay = 150;
    var oTimer = null;
    var i=0;
    var bOff = true;

    oBtn.onclick = function () {
        if(oTimer){
            return;
        }
        if(bOff){
            i=0;
            oTimer = setInterval(function () {
                aDiv[i].className = "open";
                i++;
                if(i == aDiv.length){
                    clearInterval(oTimer);
                    oTimer = null;
                    bOff = false;
                }
            },iDelay)
        }else{
            i=aDiv.length-1;
            oTimer = setInterval(function () {
                aDiv[i].className = "close";
                i--;
                if(i < 0){
                    clearInterval(oTimer);
                    oTimer = null;
                    bOff = true;
                }
            },iDelay)
        }
    }
}

/* 菜单部分 */
function loadMenu() {
    var oHome = document.getElementById('home');
    var aImg = document.getElementById("menu_list").getElementsByTagName("img");
    var bOff =true;
    var iR = -150;

    oHome.onclick = function () {
        this.style.transition = "2s";
        if(bOff){
            this.style.WebkitTransform = "rotate(-360deg)";
            for(var i=0;i<aImg.length;i++){
                var oLt = toLT(iR,90/4*i);

                aImg[i].style.transition = "0.5s "+i*100+"ms";
                aImg[i].style.left = oLt.l+"px";
                aImg[i].style.top = oLt.t+"px";
                aImg[i].style.WebkitTransform = "scale(1) rotate(-720deg)";
            }
        }else {
            this.style.WebkitTransform = "rotate(0deg)";
            for(var i=0;i<aImg.length;i++){
                aImg[i].style.transition = "0.5s "+(aImg.length-i)*100+"ms";
                aImg[i].style.left = 0;
                aImg[i].style.top = 0;
                aImg[i].style.WebkitTransform = "scale(1) rotate(0deg)";
            }
        }
        bOff = !bOff;
    };
}

/* 照片墙部分 */
function loadPhotos() {
    /* 计算并记录图片当前坐标 */
    var izIndex = 2;

    var photo = document.getElementById("photo");
    var oUl = document.getElementById('ul1');
    var aLi = oUl.getElementsByTagName('li');

    var aList = document.getElementById("menu_list");
    var aSide = document.getElementById("side");

    var arr = [];

    for(var i=0;i<aLi.length;i++){
        arr.push([aLi[i].offsetLeft,aLi[i].offsetTop]);
    }

    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position = 'absolute';
        aLi[i].style.left = arr[i][0] + 'px';
        aLi[i].style.top = arr[i][1] + 'px';
        aLi[i].style.margin = 0;
    }

    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        drag(aLi[i]);
    }

    /*// 单个添加事件处理函数
     for(var i=0;i<aImg.length;i++){
     aImg[i].onclick = function () {
     this.style.transition = "0.3s";
     this.style.WebkitTransform = "scale(2) rotate(-720deg)";
     this.style.opacity = 0.1;
     addEnd(this,end);
     }
     }*/

    //用事件委托添加事件处理函数，添加点击不同菜单按钮的事件处理函数！！！！！！！！！！！！！！！！！
    //添加flag，标志photo部分是否已经被删
    var photo_flag = false;
    aList.onclick = function (ev) {
        console.log(aSide.style.display);
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if((photo_flag && /open/.test(target.src)) || (!photo_flag && /clos/.test(target.src))
            ||(/refresh/.test(target.src) && photo.style.display != "none")
            || (/full/.test(target.src) && aSide.style.display != "none" && (/side_left/.test(aSide.className) && photo.style.display != "none"))
            || (/prev/.test(target.src) && (/bigger/.test(photo.className)||photo.style.display == "none"))){
            target.style.transition = "0.3s";
            target.style.WebkitTransform = "scale(2) rotate(-720deg)";
            target.style.opacity = 0.1;
        }
        addEnd(target,end);
        if(/refresh/.test(target.src) && photo.style.display != "none"){
            var randomArr = [0,1,2,3,4,5,6,7,8];

            randomArr.sort(function (n1,n2) {
                return Math.random()-0.5;
            });

            for(var i=0;i<aLi.length;i++){
                startMove(aLi[i],{left:arr[randomArr[i]][0],top:arr[randomArr[i]][1]});
                aLi[i].index = randomArr[i];
            }
        }
        if(/full/.test(target.src) && (/left/.test(aSide.className) && photo.style.display != "none") && aSide.style.display != "none"){
            $(photo).toggleClass("col-lg-offset-2");
            $(photo).toggleClass("col-lg-offset-1");
        }
        if(aSide.style.display == "none"){
            $(photo).removeClass("col-lg-offset-2");
            $(photo).removeClass("col-lg-10");
            $(photo).addClass("col-lg-12");
        }
        if((/clos/.test(target.src) && !photo_flag) || /open/.test(target.src) && photo_flag && (/left/.test(aSide.className) || /bigger/.test(photo.className))){
            $(photo).toggle();
            photo_flag = !photo_flag;
        }
        if(/prev/.test(target.src) && (/col-lg-offset-1/.test(photo.className) && aSide.style.display != "none"||photo.style.display == "none")){
            $(aSide).toggleClass("side_right");
            $(aSide).toggleClass("side_left");
        }

        /*if(canvasWidth<=768){
            console.log("arive");
            $(photo).find("#ul1").css({width:'330px', position:'relative', margin:'10px auto'});
        }*/

    };

    function end() {
        this.style.transition = "0.1s";
        this.style.WebkitTransform = "scale(1) rotate(-720deg)";
        this.style.opacity = 1;
        removeEnd(this,end);
    }

    function drag(obj) {
        var disX = 0;
        var disY = 0;
        $(obj).mouseenter(function () {
            this.style.border = "2px solid #ccc";
        }).mouseleave(function () {
            this.style.border = "";
        });

        obj.onmousedown = function (ev) {

            if(obj.style.zIndex != izIndex-1){
                obj.style.zIndex = izIndex++;
            }

            disX = ev.clientX - obj.offsetLeft;
            disY = ev.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var ev = ev||window.event;
                obj.style.left = ev.clientX -disX + 'px';
                obj.style.top = ev.clientY -disY + 'px';

                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.border = '';
                }

                var nL = nearLi(obj);
                if(nL){
                    nL.style.border = '2px solid red';
                }
                ev.preventDefault();
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                console.log(izIndex);

                var nL = nearLi(obj);
                var temp = 0;

                if(nL){
                    startMove(nL,{left:arr[obj.index][0],top:arr[obj.index][1]});
                    startMove(obj,{left:arr[nL.index][0],top:arr[nL.index][1]});
                    nL.style.border = '';

                    temp = nL.index;
                    nL.index = obj.index;
                    obj.index = temp;
                }else{
                    startMove(obj,{left:arr[obj.index][0],top:arr[obj.index][1]});
                }
            };

            return false;
        };

        /*//移动端事件
        $(obj).on("touchstart", function (ev) {

            if(obj.style.zIndex != izIndex-1){
                obj.style.zIndex = izIndex++;
            }

            disX = ev.clientX - obj.offsetLeft;
            disY = ev.clientY - obj.offsetTop;

            $(document).on("touchmove",function (ev) {
                var ev = ev||window.event;
                obj.style.left = ev.clientX -disX + 'px';
                obj.style.top = ev.clientY -disY + 'px';

                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.border = '';
                }

                var nL = nearLi(obj);
                if(nL){
                    nL.style.border = '2px solid red';
                }
            });

            $(document).on("touchend", function () {
                $(document).off("touchmove");
                $(document).off("touchend");
                console.log(izIndex);

                var nL = nearLi(obj);
                var temp = 0;

                if(nL){
                    startMove(nL,{left:arr[obj.index][0],top:arr[obj.index][1]});
                    startMove(obj,{left:arr[nL.index][0],top:arr[nL.index][1]});
                    nL.style.border = '';

                    temp = nL.index;
                    nL.index = obj.index;
                    obj.index = temp;
                }else{
                    startMove(obj,{left:arr[obj.index][0],top:arr[obj.index][1]});
                }
            });

            return false;
        });*/
    }

    /* 求最近图片 */
    function nearLi(obj) {
        var value = 9999;
        var index = -1;
        for(var i=0;i<aLi.length;i++){
            if(pzjc(obj,aLi[i])&&obj!=aLi[i]){
                var oDis = dis(obj,aLi[i]);
                if(oDis<value){
                    value = oDis;
                    index = i;
                }
            }
        }

        if(index != -1){
            return aLi[index];
        }else{
            return false;
        }
    }
}

/* 松开鼠标移动元素位置 */
function startMove(obj,json,endFn){

    clearInterval(obj.timer);

    obj.timer = setInterval(function(){

        var bBtn = true;

        for(var attr in json){

            var iCur = 0;

            if(attr == 'opacity'){
                if(Math.round(parseFloat(getCurrentStyle(obj,attr))*100)==0){
                    iCur = Math.round(parseFloat(getCurrentStyle(obj,attr))*100);

                }
                else{
                    iCur = Math.round(parseFloat(getCurrentStyle(obj,attr))*100) || 100;
                }
            }
            else{
                iCur = parseInt(getCurrentStyle(obj,attr)) || 0;
            }

            var iSpeed = (json[attr] - iCur)/8;
            iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(iCur!=json[attr]){
                bBtn = false;
            }

            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
                obj.style.opacity = (iCur + iSpeed)/100;

            }
            else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }


        }

        if(bBtn){
            clearInterval(obj.timer);

            if(endFn){
                endFn.call(obj);
            }
        }

    },30);

}

/* 碰撞检测函数 */
function pzjc(obj1,obj2) {
    var L1 = obj1.offsetLeft;
    var R1 = obj1.offsetLeft + obj1.offsetWidth;
    var T1 = obj1.offsetTop;
    var B1 = obj1.offsetTop + obj1.offsetHeight;

    var L2 = obj2.offsetLeft;
    var R2 = obj2.offsetLeft + obj2.offsetWidth;
    var T2 = obj2.offsetTop;
    var B2 = obj2.offsetTop + obj2.offsetHeight;

    if(R1<L2||L1>R2||B1<T2||T1>B2){
        return false;
    }else{
        return true;
    }
}

/* 求两者距离 */
function dis(obj1,obj2) {
    return Math.sqrt(Math.pow(obj1.offsetLeft-obj2.offsetLeft,2)+Math.pow(obj1.offsetTop-obj2.offsetTop,2));
}

/*
 已知直角三角形的斜边长度和夹角，求对边和临边
 */
function toLT(iR,iDeg) {
    return {l:Math.round(Math.sin((iDeg+90)/180*Math.PI)*iR),t:Math.round(Math.cos((iDeg+90)/180*Math.PI)*iR)}
}

function addEnd(obj,fn) {
    obj.addEventListener('WebkitTransitionEnd',fn,false);
    obj.addEventListener('transitionend',fn,false);
}

function removeEnd(obj,fn) {
    obj.removeEventListener('WebkitTransitionEnd',fn,false);
    obj.removeEventListener('transitionend',fn,false);
}

/* 男神部分，该部分运用jQuery实现了图片的瀑布流布局，并添加onscroll监听函数，实现了图片的懒加载功能 */
function NanShen() {
    waterfall('wf');

    /* 图片预加载，解决第一加载时出现的“阻塞”状态 */
    preload(dataInt.data);
    $(window).on('scroll',function () {
        if(getCurrentStyle(wf,"display") != "none"){
            if(checkScrollSlide('wf')){
                $.each(dataInt.data,function (key,value) {
                    var oBox = $('<div>').addClass('box').appendTo($('#wf'));
                    var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                    $('<img>').attr('src',$(value).attr('src')).appendTo($(oPic));
                });
                waterfall('wf');
            }
        }
    });
}

/* 女神部分，该部分实现了擦开图像和图像旋转播放的效果，并是判断图片完全擦开后加载旋转图片部分 */
function NvShen() {
    var pic = $("#beauty").find(".pic")[0];
    var str = "";
    var l = 0;
    var t = 0;
    for(var i=0;i<35;i++){
        l = (i%5)*100;
        t = Math.floor(i/5)*100;
        str += "<div style='left:"+l+"px;top:"+t+"px;'></div>";
    }
    pic.innerHTML = str;
    var divs = pic.getElementsByTagName("div");
    for(var i=0;i<35;i++){
        divs[i].onmouseover = function () {
            this.style.display = "none";
        }
    }

    pic.onmouseover = function () {
        var flag = true;
        for(var i=0;i<35;i++){
            if(getCurrentStyle(divs[i],'display') != 'none'){
                flag = false;
            }
        }
        if(flag){
            var imgBox = $("#beauty").find(".img-box")[0];
            var surprise = document.getElementById("surprise");
            imgBox.style.display = 'none';
            $(".tishi")[0].style.display = 'none';
            surprise.style.display = 'block';

            //不知为啥会影响导航栏按钮~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            /*var canvasStr = "<canvas id='canvas' style='position: absolute;z-index: -1;top:0;left: 0;'>您的浏览器不支持Canvas，请更换浏览器后重试</canvas>";
            var body = document.body;
            body.innerHTML += canvasStr;
            body.style.backgroundColor = "#0000c6";

            var canvas = document.getElementById("canvas");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            var context = canvas.getContext('2d');

            setInterval(function () {
                drawBg(context);
            },1000);*/
            rotateMode();

        }
    }
}

/* 旋转图像部分按钮点击事件处理函数部分 */
function rotateMode() {
    var oWrap = document.getElementById('rotate');
    var aBtn = oWrap.getElementsByTagName('input');
    var aImg = oWrap.getElementsByTagName('img');
    var iNow = 0;

    aBtn[0].onclick = function () {

        aImg[iNow].className = "hide";

        if(iNow==0){
            iNow = aImg.length-1;
        }else{
            iNow--;
        }

        aImg[iNow].className = "show";
    };

    aBtn[1].onclick = function () {
        aImg[iNow].className = "hide";

        if(iNow >= aImg.length-1){
            iNow = 0;
        }else {
            iNow++;
        }
        aImg[iNow].className = "show";
    }
}

/* Canvas绘制背景 */
function drawBg(context) {
    var canvas = context.canvas;

    context.clearRect(0,0,canvas.width,canvas.height);

    context.save();

    for(var i=0;i<200;i++){
        var r = Math.random()*5+5;
        var x = Math.random()*canvas.width;
        var y = Math.random()*canvas.height;
        var rot = Math.random()*360;
        drawStar(context,x,y,r,rot);

    }
    context.restore();
}

/* Canvas绘制五角星 */
function drawStar(cxt,x,y,R,rot) {
    cxt.save();

    cxt.translate(x,y);
    cxt.rotate(rot/180*Math.PI);

    starPath(cxt,R);

    cxt.globalAlpha = 0.8;

    cxt.fillStyle = "#fb3";
    //cxt.strokeStyle = "#fb3";
    //cxt.lineWidth = 3;
    //cxt.lineJoin = "round";

    cxt.fill();
    cxt.stroke();


    cxt.restore();

}

/* 绘制标准五角星路径 */
function starPath(cxt,r) {        //标准五角星
    cxt.beginPath();
    for(var i=0;i<5;i++){
        cxt.lineTo(Math.cos((18+i*72)/180*Math.PI)*r,-Math.sin((18+i*72)/180*Math.PI)*r);
        cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*0.5*r,-Math.sin((54+i*72)/180*Math.PI)*0.5*r);
    }
    cxt.closePath();
}

/* 兼容各种浏览器的获取元素对象的属性值的函数 */
function getCurrentStyle(obj,prop) {
    if(obj.currentStyle){
        return obj.currentStyle[prop];
    }else if(window.getComputedStyle){
        var newProp = prop.replace(/([A-Z])/g,"-$1");
        newProp = newProp.toLowerCase();
        return document.defaultView.getComputedStyle(obj,null)[newProp];
    }
    return null;
}

/* 兼容各种浏览器的getElementsByClassName函数 */
function getElementsByClassName(node,className) {
    var reg = new RegExp("\\b"+className+"\\b");
    if(node.getElementsByClassName){
        return node.getElementsByClassName(className);
    }else {
        var arr = [];
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elems.length;i++){
            if(reg.test(elems[i].className)){
                arr.push(elems[i]);
            }
        }
        return arr;
    }
}

/* 瀑布流函数，此处父级没有被撑开，但并不要紧，因为此处只是将父级设置相对定位并居中，以便子元素利用父元素的宽来计算自己的位置 */
function waterfall(parent) {
    var oParent = document.getElementById(parent);
    var $boxs = $(oParent).children();
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    $(oParent).width(w*cols).css('margin','0 auto');

    var hArr = [];
    $boxs.each(function (index,value) {
        var h = $boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px'
            });
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    });

    console.log($boxs.length);
}

/* 判断是否满足滚动加载内容的条件 */
function checkScrollSlide(parent) {
    var oParent = document.getElementById(parent);
    var $lastBox = $(oParent).children().last();
    var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}

/* 实现图片懒加载的函数 */
function preload(arr) {
    var img = new Array();
    for (var i = 0; i < arr.length; i++) {
        img[i] = new Image();
        img[i].src = arr[i].src;
    }
}