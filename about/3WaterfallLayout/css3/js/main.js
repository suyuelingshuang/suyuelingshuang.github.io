/**
 * Created by ZWX on 2017/6/20.
 */
var dataInt = {
    "data":[{"src":"images/24.jpg"},{"src":"images/25.jpg"},{"src":"images/26.jpg"},{"src":"images/27.jpg"}, {"src":"images/24.jpg"},{"src":"images/28.jpg"},{"src":"images/29.jpg"},{"src":"images/30.jpg"},
        {"src":"images/31.jpg"},{"src":"images/32.jpg"},{"src":"images/33.jpg"},{"src":"images/34.jpg"}, {"src":"images/35.jpg"},{"src":"images/36.jpg"}]
};
/*
{"src":"images/37.jpg"},{"src":"images/38.jpg"},{"src":"images/39.jpg"},{"src":"images/40.jpg"},
 {"src":"images/41.jpg"},{"src":"images/42.jpg"},{"src":"images/43.jpg"},{"src":"images/44.jpg"}, {"src":"images/45.jpg"},{"src":"images/46.jpg"},{"src":"images/47.jpg"},{"src":"images/48.jpg"},{"src":"images/49.jpg"},{"src":"images/50.jpg"},
 {"src":"images/51.jpg"},{"src":"images/52.jpg"},{"src":"images/53.jpg"},{"src":"images/54.jpg"}, {"src":"images/65.jpg"},{"src":"images/56.jpg"},{"src":"images/57.jpg"},{"src":"images/58.jpg"},{"src":"images/59.jpg"},{"src":"images/60.jpg"},
 {"src":"images/61.jpg"},{"src":"images/62.jpg"},{"src":"images/63.jpg"},{"src":"images/64.jpg"}, {"src":"images/65.jpg"},{"src":"images/66.jpg"},{"src":"images/67.jpg"},{"src":"images/68.jpg"},{"src":"images/69.jpg"},{"src":"images/70.jpg"},
 {"src":"images/71.jpg"},{"src":"images/72.jpg"},{"src":"images/73.jpg"},{"src":"images/74.jpg"}, {"src":"images/75.jpg"},{"src":"images/76.jpg"},{"src":"images/77.jpg"},{"src":"images/78.jpg"},{"src":"images/79.jpg"},{"src":"images/80.jpg"},
 {"src":"images/81.jpg"},{"src":"images/82.jpg"},{"src":"images/83.jpg"},{"src":"images/84.jpg"}, {"src":"images/85.jpg"},{"src":"images/86.jpg"},{"src":"images/87.jpg"},{"src":"images/88.jpg"},{"src":"images/89.jpg"},{"src":"images/90.jpg"}
 */


window.onload = function () {
    waterfall('main','box');

    //添加触发滚动事件后懒加载图片的事件处理函数
    window.onscroll = function () {
        if(checkScrollSlide('main','box')){
            var oParent = document.getElementById('main');
            //将数据块渲染到当前页面的尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);

                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);

                var oImg = document.createElement('img');
                oImg.src = dataInt.data[i].src;
                oPic.appendChild(oImg);
            }

            waterfall('main','box');
        }
    }
};

function waterfall(parent,box) {
    //将main下所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getMyElementsByClassName(oParent,box);

    //计算整个页面显示的列数（页面的宽/box的宽度）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);

    //设置main的宽度
    oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';

    //存放各列的高度
    var hArray = [];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArray.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,hArray);

            //求出最小高度列的索引
            var index = getMinIndex(hArray,minH);
            //设置元素的绝对定位
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH+'px';
            //oBoxs[i].style.left = index*oBoxW+'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
            hArray[index] += oBoxs[i].offsetHeight;
        }
    }

    console.log(oBoxs.length);
}

//获取最小高度列的索引
function getMinIndex(arr,val) {
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}

//getElementsByClassName(node,className)的实现
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

//检测是否满足滚动加载数据块的条件
function checkScrollSlide(parent,className) {
    var oParent = document.getElementById(parent);
    var oBoxs = getMyElementsByClassName(oParent,className);

    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight);
    //兼容标准模式和混杂模式的滚动距离，前面的为标准模式，后面的为混杂模式
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //获取浏览器窗口可视区域的高度
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;

}

