(function($,root){
    var $scope = $(document.body);
    var controlmanager;
    var $playList = $("<div class='play-list'>"+
        "<div class='play-header'>播放列表</div>" +
        "<ul class='list-wrapper'></ul>" +
        "<div class='close-btn'>关闭</div>" +
        "</div>")
    function renderPlayList(data){
        var len = data.length;
        var html = "";
        for(var i = 0 ;i < len;i++){
            html +=  '<li><h3>'+data[i].song+'-<span>'+data[i].singer+'</span></h3></li>'
        }
        $playList.find("ul").html(html);
        $scope.append($playList);
        bindEvent();
    }
    function show(control){
        controlmanager = control;
        $playList.addClass("show");
        var index = controlmanager.index;
        signIndex(index)
    }
    function signIndex(index){
        $playList.find(".playing").removeClass("playing")
        $playList.find("li").eq(index).addClass("playing");
    }
    function bindEvent(){
        $playList.find(".close-btn").on("click",function(){
            $playList.removeClass("show")
        })
        $playList.find("li").on("click",function(){
            var index = $(this).index();
            signIndex(index);
            controlmanager.index = index;
            $scope.trigger("play:change",[index,true]);
            $scope.find(".play-btn").addClass("playing");
            setTimeout(function(){
                $playList.removeClass("show");
            },1000)
        })
    }


    root.playList = {
        show:show,
        renderPlayList : renderPlayList,
    }

}(window.Zepto,window.player || (window.player = {})))