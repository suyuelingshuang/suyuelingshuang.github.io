/**
 * Created by ZWX on 2017/6/7.
 */
/**
 * Created by ZWX on 2017/6/6.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33FF00","#66CCFF","#9933FF","#CC00FF"," #FFFF33","#FF0000","#54FF9F","#990000","#0033FF","#333366"]

window.onload = function () {

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);

    var canvas = document.getElementById('canvas');

    if(canvas.getContext('2d')){

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        var context = canvas.getContext('2d');  //context为上下文绘制环境

        curShowTimeSeconds = getCurrentShowTimeSeconds();

        //使用context绘制
        setInterval(function () {
            render(context);
            update();
        },50);


    }else {
        alert("当前浏览器不支持Canvas，请更换浏览器后再试");
    }

};

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds = curShowTimeSeconds%60;

    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }


        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
        }

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;

    }

    updateBalls();

    console.log(balls.length);

}

function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        //碰撞检测
        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -Math.abs(balls[i].vy)*0.75;
        }

    }

    //边缘检测，将还在画布范围内的小球添加到balls数组的前cnt位内
    var cnt = 0;
    for(var i=0;i<balls.length;i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    //删除不在画布范围内的小球
    while(balls.length>Math.min(cnt,300)){
        balls.pop();
    }

}

function addBalls(x,y,num) {
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    r:RADIUS,
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }

                balls.push(aBall);
            }
        }
    }
}

function getCurrentShowTimeSeconds() {  //获得此时今天时钟走过的总秒数
    var curTime = new Date();
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

    return ret;
}

function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x,y,num,cxt) {

    cxt.fillStyle = "rgb(0,102,153)";

    for(var i = 0;i<digit[num].length;i++){
        for(var j=0;j < digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
                cxt.strokeStyle = "yellow";
                cxt.lineWidth = 1;
                cxt.stroke();
            }
        }
    }


}