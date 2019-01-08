(function($,root){
    var $scope = $(document.body)
    var curDuration;
    var frameId;
    var startTime;
    var lastPercent = 0;
    //  处理总时长
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - 60 * minute;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    // 渲染总时长
    function renderAllTime(duration){
        curDuration = duration;
        lastPercent = 0;
        var allTime = formatTime(duration);
        $scope.find(".all-time").text(allTime);
    }
    // 结束动画
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    function process(percent){
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX(" + percentage + ")"
        })
    }
    // 渲染当前时间和进度条
    function update(percent){
        var curTime = percent * curDuration;
        var time = formatTime(curTime);
        $scope.find(".current-time").text(time);
        process(percent);
    }
    // 更新播放进度
    function startProcessor(percentage){
        lastPercent = percentage == undefined ? lastPercent : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (curDuration * 1000);
            if(percent < 1){
                // 每次页面刷新执行下面函数
                frameId =  requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
            }
            console.log(percent)
        }
        frame();
    }

    root.processor = {
        update:update,
        stop:stop,
        startProcessor : startProcessor,
        renderAllTime : renderAllTime
    }
}(window.Zepto,window.player || (window.player = {})))