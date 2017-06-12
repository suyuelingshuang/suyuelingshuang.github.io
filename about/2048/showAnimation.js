/**
 * Created by ZWX on 2017/6/12.
 */
function showNumWithAnimation(i,j,num) {
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-color',getNumBackColor(num));
    numberCell.css('color',getNumColor(num));
    numberCell.text(num);

    //动画
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);

}

function showMoveAnimation(fromX,fromY,toX,toY) {
    var numberCell = $('#number-cell-'+fromX+'-'+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}

function updateScore(score) {
    $('#score').text(score);
}

