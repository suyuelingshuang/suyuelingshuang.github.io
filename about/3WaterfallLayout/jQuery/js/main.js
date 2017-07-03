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

$(window).on('load',function () {
   waterfall('main');
   $(window).on('scroll',function () {
      if(checkScrollSlide('main')){
          $.each(dataInt.data,function (key,value) {
              var oBox = $('<div>').addClass('box').appendTo($('#main'));
              var oPic = $('<div>').addClass('pic').appendTo($(oBox));
              $('<img>').attr('src',$(value).attr('src')).appendTo($(oPic));
          });
          waterfall('main');
      }
   });
});

/*function waterfall() {
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    $('#main').width(w*cols).css('margin','0 auto');

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
}*/

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


/*function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}*/

function checkScrollSlide(parent) {
    var oParent = document.getElementById(parent);
    var $lastBox = $(oParent).children().last();
    var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}
