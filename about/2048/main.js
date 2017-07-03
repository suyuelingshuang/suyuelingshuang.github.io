/**
 * Created by ZWX on 2017/6/12.
 */
//存储数字信息
var board = new Array();
//存储累加得到的分数值
var score = 0;
var hasConflicted = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function () {
    
    prepareForMobile();
    
   newGame();
});

function prepareForMobile() {

    if(documentWidth>500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*cellSideLength);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);


}


function newGame() {
    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));

        }
    }

    for(var i=0;i<4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
    updateScore(score);

}

function updateBoardView() {
    $(".number-cell").remove();
    var scale = 1.0;

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumBackColor(board[i][j]));
                theNumberCell.css('color',getNumColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                scale = getNumFontSize(board[i][j]);
            }

            theNumberCell.css('line-height',cellSideLength+'px');
            theNumberCell.css('font-size',0.6*scale*cellSideLength+'px');

            hasConflicted[i][j] = false;

        }
    }

    /*$('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');*/
}

function generateOneNumber() {
    if(noSpace(board)){
        return false;
    }

    //随机一个位置
    var randX = parseInt(Math.floor(Math.random()*4));
    var randY = parseInt(Math.floor(Math.random()*4));

    var times = 0;
    while (times < 50){
        if(board[randX][randY] == 0){
            break;
        }else {
            randX = parseInt(Math.floor(Math.random()*4));
            randY = parseInt(Math.floor(Math.random()*4));
        }
        times++;
    }

    if(times == 50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j] == 0){
                    randX = i;
                    randY = j;
                }
            }
        }
    }

    //随机一个数字
    var randNum = Math.random()<0.5?2:4;

    //在随机位置显示随机数字
    board[randX][randY] = randNum;

    //前端显示数字
    showNumWithAnimation(randX,randY,randNum);

    return true;
}

$(document).keydown(function(event){

    switch (event.keyCode){
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
            break;
        default://default
            break;
    }
});

document.addEventListener('touchstart',function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove',function (event) {
    event.preventDefault();
},{passive:false});

document.addEventListener('touchend',function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX-startX;
    var deltaY = endY-startY;

    if(Math.abs(deltaX)<0.3*documentWidth && Math.abs(deltaY)<0.3*documentWidth){
        return;
    }

    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        if(deltaX>0){
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
        }else {
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
        }
    }else {
        if(deltaY>0){
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
        }else {
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout('isGameOver()',300);
            }
        }
    }

});



function isGameOver() {
    if(noSpace(board) && noMove(board)){
        gameOver();
    }
}

function gameOver() {
    alert("game over");
}
function win() {
    alert('Congratulations!You are win!');
}

function moveLeft() {
    if(!canMoveLeft(board)){
        return false;
    }

    //moveLeft
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j] != 0){
                for(var k=0;k<j;k++){
                    if(board[i][k] == 0&&noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        if(board[i][k] >= 2048){
                            setTimeout("generateOneNumber()",210);
                            setTimeout('win()',300);
                            break;
                        }

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新前端显示
    setTimeout('updateBoardView()',200);

    return true;
}

function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }

    //moveRight
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j] != 0){
                for(var k=3;k>j;k--){
                    if(board[i][k] == 0&&noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        if(board[i][k] >= 2048){
                            setTimeout("generateOneNumber()",210);
                            setTimeout('win()',300);
                            break;
                        }
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新前端显示
    setTimeout('updateBoardView()',200);

    return true;
}

function moveUp() {
    if(!canMoveUp(board)){
        return false;
    }

    //moveUp
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j] != 0){
                for(var k=0;k<i;k++){
                    if(board[k][j] == 0&&noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        if(board[k][j] >= 2048){
                            setTimeout("generateOneNumber()",210);
                            setTimeout('win()',300);
                            break;
                        }

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新前端显示
    setTimeout('updateBoardView()',200);

    return true;
}

function moveDown() {
    if(!canMoveDown(board)){
        return false;
    }

    //moveUp
    for(var j=0;j<4;j++){
        for(var i=3;i>=0;i--){
            if(board[i][j] != 0){
                for(var k=3;k>i;k--){
                    if(board[k][j] == 0&&noBlockVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        if(board[k][j] >= 2048){
                            setTimeout("generateOneNumber()",210);
                            setTimeout('win()',300);
                            break;
                        }

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //刷新前端显示
    setTimeout('updateBoardView()',200);

    return true;
}
