/*
	修复 IE8 不兼容 configs.class 的问题
    修复 IE8 不兼容 $("abc").val().html()的问题
    修复 IE8 生成的按钮大小不一问题
*/
(function($){
    $.fn.countdown = function(configs){
        configs = configs || {};
        var cls = configs.clazz || "";
        var stl = configs.style || "";
        var start = configs.start || 60;
        var prefix = configs.suffix || "";
        var suffix = configs.suffix || "";
        //开始倒计时
        //隐藏原元素 显示副本
        //倒计时开始的到时间  删除副本 显示原元素
        var copyList =[];
        $(this).each(function(){
            var $copy = $(this.outerHTML);
            $copy.removeAttr("onclick");
            var $this = $(this);
            var oriClass = $this.attr("class") || "";
            var oriStyle = $this.attr("style") || "";
            $copy.attr("class",oriClass+" "+cls);
            $copy.attr("style",oriStyle+stl);
            if($this.css("display")=="inline"){
                $copy.css("display","inline-block");
            }
            var oriHt = $this.height();
            var oriWd = $this.width();
            $this.hide();
            $this.after($copy);
            $copy.width(oriWd);
            $copy.height(oriHt);
            $copy.data("origin",$this);
            copyList.push($copy);
        });
        var countNum = 0;
        var timerFn = function(){
            for(var i = 0;i<copyList.length ; i++){
                var $copy = copyList[i];
                var valHtml = prefix + (start-countNum) + suffix;
                if($copy[0].tagName=="INPUT"){
                    $copy.val(valHtml)
                }else{
                    $copy.html(valHtml)
                }
                if(countNum==start){
                    var $origin = $copy.data("origin");
                    $copy.remove();
                    $origin.show();
                    clearInterval(timerId);
                }
            }
            countNum++;
        }
        timerFn();
        var timerId = setInterval(timerFn,1000);
    }
})(jQuery);