/*
	获取验证码倒计时
*/
(function($){
    $.fn.countdown = function(configs){
        configs = configs || {};
        var cls = configs.class || "";
        var stl = configs.style || "";
        var start = configs.start || 60;
        //开始倒计时
        //隐藏原元素 显示副本
        //倒计时开始的到时间  删除副本 显示原元素
        var copyList =[];
        $(this).each(function(){
            var $copy = $(this.outerHTML);
            var $this = $(this);
            var oriClass = $this.attr("class") || "";
            var oriStyle = $this.attr("style") || "";
            $copy.attr("class",oriClass+" "+cls);
            $copy.attr("style",oriStyle+stl);
            $copy.width($this.width());
            $copy.height($this.height());
            if($this.css("display")=="inline"){
                $copy.css("display","inline-block");
            }
            $this.hide();
            $this.after($copy);
            $copy.data("origin",$this);
            copyList.push($copy);
        });
        var countNum = 0;
        var timerFn = function(){
            for(var i = 0;i<copyList.length ; i++){
                var $copy = copyList[i];
                $copy.html(start-countNum).val(start-countNum);
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
})(jQuery)