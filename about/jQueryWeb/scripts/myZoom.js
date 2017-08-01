/**
 * Created by ZWX on 2017/8/1.
 * @author: 钟稳霞
 * @version:  1.1
 * @param:
 *      xZoom:遮盖区的宽度
 *      yZoom:遮盖区的高度
 *      zoomWidth:放大显示区域的宽度
 *      zoomHeight:放大显示区域的高度
 *      position:显示区域偏移方向
 *      xOffset:显示区域水平方向偏移
 *      yOffset:显示区域垂直方向偏移
 *      lens:标志是否显示遮盖区域
 *      preload:标志是否预加载要显示的图片
 * @description: 这个插件实现了放大镜效果，并且可以设置遮盖区域宽高及显示区域宽高，用户只需要设置这两者，该插件就可以根据两者比值关系来设置显示图片的宽高，无需考虑两张图片的大小关系，
 *                  甚至两处图片可以为同一张，但考虑到像素问题，通常显示区域图片像素要高于原始图片
 *
 * @module: 使用时html部分必备结构
 *              <a href="点击跳转的地址" class="myZoom" rel="gall" title="">
 *                  <img src="preImgSrc" zoomImg="bigImgSrc" alt="" />
 *              </a>
 */
(function($){
    $.fn.myZoom = function(options){
        var settings = {
            xZoom: 100,         //默认的鼠标移动遮盖区域宽度
            yZoom: 100,         //默认的鼠标移动遮盖区域高度
            zoomWidth:200,      //默认的放大镜显示区域宽度
            zoomHeight:200,     //默认的放大镜显示区域高度
            xOffset: 10,        //默认的显示区域水平方向偏移
            yOffset: 10,        //默认的显示区域垂直方向偏移
            position: "right" ,//默认的偏移方向
            lens:1,             //zooming lens over the image,by default is 1;
            preload: 1          //flag
        };
        if(options) {
            $.extend(settings, options);    //如果用户设置了参数则重写默认参数
        }
        var noAlt='';                                                               //用于存放被放大元素的alt值
        $(this).hover(function(){
            var $imageOffset = $(this).offset();                                  //获取被放大的图片在当前窗口的相对偏移
            var $img = $(this).children('img');                                 //获取被放大的图片元素的jQuery对象
            var bigImage = $img.attr("zoomImg");                                 //获取放大显示的图像地址
            noAlt= $img.attr("alt");                                              //存放被放大元素的alt值
            $img.attr("alt","");                                                 //将被放大元素的alt值设为空

            var imageLeft = $imageOffset.left;
            var imageTop = $imageOffset.top;
            var imageWidth = $img.get(0).offsetWidth;                          //获取被放大元素盒模型宽度（包含border、padding、content）
            var imageHeight = $img.get(0).offsetHeight;

            var scaleX = settings.zoomWidth/settings.xZoom;                   //计算放大倍数
            var scaleY = settings.zoomHeight/settings.yZoom;
            var bigImgWidth = scaleX*imageWidth;                                //计算大图的宽度
            var bigImgHeight = scaleY*imageHeight;                              //计算大图的高度

            if(settings.position == "right"){
                if(imageLeft + imageWidth + settings.xOffset + settings.zoomWidth > screen.width){           //如果计算后的放大区域元素挤出屏幕区域
                    var leftPos = -settings.zoomWidth;                                                          //重新设置当大区域元素的位置
                }else{
                    leftPos = imageWidth + settings.xOffset;                                                     //设置当前区域元素的相对父元素的偏移位置
                }
            }else{
                if(imageLeft - settings.xOffset - settings.zoomWidth < 0){                                      //如果计算后的放大区域元素挤出屏幕区域
                    leftPos = imageWidth;                                                                         //重新设置当大区域元素的位置
                }else{
                    leftPos = -settings.zoomWidth - settings.xOffset;                                          //设置当前区域元素的相对父元素的偏移位置
                }
            }

            if($("div.zoomDiv").length == 0){
                $(this).after("<div class='zoomDiv'><img class='bigImg' src='"+bigImage+"'/></div>");   //在当前元素后添加放大区域元素
                $(this).append("<div class='zoomPup'> </div>");                                             //在当前元素中添加遮盖区元素
            }
            var $zoomDiv = $("div.zoomDiv");                                                                  //获取放大显示元素
            var $zoomImg = $zoomDiv.find(".bigImg");                                                         //获取放大显示区域图片元素
            var $zoomPup = $(this).find(".zoomPup");                                                        //获取遮盖层元素

            $zoomDiv.css({                                                                                     //设置放大区域元素的属性
                top: settings.yOffset,
                left: leftPos,
                width:settings.zoomWidth,
                height:settings.zoomHeight
            });
            $zoomDiv.show();
            $zoomImg.css({                                                                                    //设置放大区域图片的属性，主要是宽高和位置
                width:bigImgWidth,
                height:bigImgHeight
            });
            $zoomPup.css({                                                                                   //设置遮盖层元素属性
                width:settings.xZoom,
                height:settings.yZoom
            });

            if(!settings.lens){
                $(this).css('cursor','crosshair');
            }
            $(document.body).mousemove(function(e){
                mouse = new MouseEvent(e);                                                                 //获取鼠标信息对象

                if(settings.lens){
                    $zoomPup.css('visibility','visible');
                }

                var xPos = mouse.x - imageLeft - settings.xZoom/2;                                       //设置遮盖区位置
                var yPos = mouse.y - imageTop - settings.yZoom/2 ;
                if(settings.lens){
                    xPos = (mouse.x - imageLeft - settings.xZoom/2 < 0 ) ? 0 : (mouse.x - imageLeft + settings.xZoom/2 > imageWidth) ? (imageWidth - settings.xZoom - 2) : xPos;
                    yPos = (mouse.y - imageTop - settings.yZoom/2 < 0) ? 0 : (mouse.y - imageTop + settings.yZoom/2 > imageHeight) ? (imageHeight - settings.yZoom - 2) : yPos;

                    $zoomPup.css({
                        left:xPos,
                        top:yPos
                    })
                }

                var scrollX = xPos*scaleX;                                                                //计算放大区域图像位置
                var scrollY = yPos*scaleY;
                $zoomDiv.get(0).scrollLeft = scrollX;
                $zoomDiv.get(0).scrollTop = scrollY;
            });
        },function(){                                                                                    //重置
            $(this).children("img").attr("alt",noAlt);
            $(document.body).unbind("mousemove");
            if(settings.lens){
                $("div.zoomPup").remove();
            }
            $("div.zoomDiv").remove();
        });

        if(settings.preload){                                                                            //预加载放大图片
            var imgSrc = $(this).children("img").attr("zoomImg");
            var image = new Image();
            $(image).on("load error",function () {

            });
            image.src = imgSrc;
        }
    }
})(jQuery);

function MouseEvent(e) {                                                                                //获取鼠标信息对象
    this.x = e.pageX;
    this.y = e.pageY;
}