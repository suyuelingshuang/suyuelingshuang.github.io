/**
 * Created by ZWX on 2017/5/13.
 */

/******************************************** DOM操作方法 *****************************************/
//insertAfter(newElement,targetElement)的实现
function insertAfter(newElement,targetElement) {
    if(targetElement == null) return false;
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

//addClass(element,value)的实现
function addClass(element,value) {
    if(!element.className){
        element.className = value;
    }else {
        var newClassName = element.className;
        newClassName +=" ";
        newClassName += value;
        element.className = newClassName;
    }
}

//getElementsByClassName(node,className)的实现
function getElementsByClassName(node,className) {
    if(node.getElementsByClassName){
        return node.getElementsByClassName(className);
    }else {
        var results = [];
        var elems = node.getElementsByTagName("*");
        for(var i=0;i<elems.length;i++){
            if(elems[i].className.indexOf(className) != -1){
                results.push(elems[i]);
            }
        }
        return results;
    }
}

//模拟JQuery获取元素的方法,此方法只适用于一级元素
function $(v) {
    if(typeof v === 'function'){
        addLoadEvent(v);
    }else if(typeof v === 'string'){
        var reg1 = /^#/;
        var reg2 = /^\./;
        if(reg1.test(v)){
            var id = v.substring(1);
            return document.getElementById(id);
        }else if(reg2.test(v)){
            var cl = v.substring(1);
            return getElementsByClassName(document,cl);
        }else {
            return document.getElementsByTagName(v);
        }
    }else if(typeof v === 'object'){
        return v;
    }
}

//获取对象CSS属性
function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}



/****************************************** 常用的判断方法 *****************************************/
//最靠谱的数组类型判断方法
function isArray(obj) {
    return obj && typeof obj === 'object' &&
        typeof obj.length ==='number' &&
        typeof obj.splice == 'function' &&
        !(obj.propertyIsEnumerable('length'));  //判断length属性是否是可枚举的，对于数组将得到false
}

//检验NaN的准确方法
function isRealNaN(x) {
    return x !== x;
}

//判断属性是否存在于原型中
function hasPrototypeProperty(obj,attr) {
    return !obj.hasOwnProperty(attr) && (name in obj);
}










/********************************************** 事件处理函数***************************************/
//添加加载即调用的函数addLoadEvent(func)
function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    }
}

//跨浏览器的事件处理程序（前常见浏览器，后IE浏览器）
var EventUtil = {
    getEvent:function (event) {                              //获取事件
        return event?event:window.event;
    },
    getTarget:function (event) {                             //获取事件对象
        return event.target||event.srcElement;
    },
    preventDefault:function (event) {                        //取消事件的默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation:function (event) {                       //阻止事件冒泡
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelable = true;
        }
    },
    addHandler:function (element,type,handler) {            //添加事件处理函数
        if(element.addEventListener){                        //常见浏览器
            element.addEventListener(type,handler,false);   //此处false表示在冒泡阶段调用事件处理程序，为true表示在捕获阶段调用事件处理程序
        }else if(element.attachEvent) {                     //IE
            element.attachEvent("on" + type,handler);
        }else {                                             //DOM0级事件处理函数
            element["on" + type] == handler;
        }
    },
    removeHandler:function (element,type,handler) {         //移除事件处理函数
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type,handler);
        }else {
            element["on" + type] == null;
        }
    }

}


//ajax(method,url,data,successFn)
function ajax(method,url,data,successFn) {
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(method == 'get'&&data){
        url += '?'+data;
    }

    xhr.open(method,url,true);//此处的true表示是异步执行
    if(method == 'get'){
        xhr.send();
    }else {
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }
    }

}

//获取网页的cookie
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0]==key) {
            return arr2[1];
        }
    }
}

/********************************************* 工具函数封装 ****************************************/
//按固定方向移动指定元素
function doMove(obj,attr,dir,target,speed,endFn) {
    dir = parseInt(getStyle(obj,attr))<target?dir:-dir;
    clearInterval(obj.doMovetimer);
    obj.doMovetimer = setInterval(function () {
        var location = parseInt(getStyle(obj,attr)) + dir;
        if(location>target&&dir>0 || location<target&&dir<0){
            location = target;
        }

        obj.style[attr] = location + 'px';

        if(location == target){
            clearInterval(obj.doMovetimer);
            endFn && endFn();
        }
    },speed)
}

//让元素呈现抖动效果
function shake(obj,attr,am,speed,endFn) {

    if(obj.onOff) return;
    obj.onOff = true;

    var pos = parseInt(getStyle(obj,attr));

    var arr = [];
    var num = 0;

    for(var i = am;i>0;i -= 2){
        arr.push(i,-i);
    }
    arr.push(0);

    clearInterval(obj.shaketimer);
    obj.shaketimer = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if(num === arr.length){
            clearInterval(obj.shaketimer);
            endFn && endFn();
            obj.onOff = false;
        }
    },speed);

}

//获取实时时间
function getTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    //拼成时间字符串
    var time = toTwo(h)+toTwo(m)+toTwo(s);
    return time;                                  //返回6位表示时间的字符串
}
function toTwo(n) {                               // 时间补零函数
    return n<10?'0'+n:''+n;
}

var timer;
function newTimer(element) {
    stopit();
    var today;
    today=new Date();
    var str=today.toLocaleDateString();
    str+=today.toLocaleTimeString();
    element.innerHTML=str;
    timer=setTimeout(newTimer,1000);
}
function stopit() {
    clearTimeout(timer);
}
