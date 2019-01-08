var $ = window.Zepto;
var root = window.player;
var $scope =$(document.body);
var songList;
var controlManager = root.controlManager;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.processor;
var playList = root.playList;

function getData(url,callback){
    $.ajax({
        url:url,
        type : "GET",
        success:callback,
        error:function(err){
            console.log(err)
        }
    })
}

function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(){
        processor.stop();
    }).on("touchmove",function(event){
        var x = event.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent < 0 || percent > 1){
            percent = 0;
        }
        processor.update(percent);
    }).on("touchend",function(event){
        var x = event.changedTouches[0].clientX;
        var percent = (x - left) / width;
        var duration = percent * songList[controlmanager.index].duration;
        audiomanager.jumptoPlay(duration);
        processor.startProcessor(percent);
        $scope.find(".play-btn").addClass("playing");
    })
}

function bindClick(){
    $scope.on("play:change",function(event,index,flag){
        root.render(songList[index]);
        audiomanager.setAudioSource(songList[index].audio);
        if(audiomanager.status == "play" || flag){
            audiomanager.play();
            processor.startProcessor();
        };
        processor.renderAllTime(songList[index].duration);
        processor.update(0);
    })
    // 上一首
    $scope.find(".prev-btn").on("click",function(){
        var index = controlmanager.prev();
        $scope.find(".play-btn").addClass("playing");
        audiomanager.play();
        $scope.trigger("play:change",[index]);
    })
    // 下一首
    $scope.find(".next-btn").on("click",function(){
        var index = controlmanager.next();   
        $scope.find(".play-btn").addClass("playing");
        audiomanager.play();
        $scope.trigger("play:change",[index]);
    })
    // 喜欢/不喜欢
    $scope.find(".like-btn").on("click",function(){
        if(songList.isLike){
            $(this).removeClass("liked");
            songList.isLike = false;
        }else{
            $(this).addClass("liked");
            songList.isLike = true;
        }
    })
    // 播放/暂停
    $scope.find(".play-btn").on("click",function(){
        if(audiomanager.status == "pause"){
            audiomanager.play();
            processor.startProcessor();
            $(this).addClass("playing");
        }else{
            $(this).removeClass("playing");
            audiomanager.pause();
            processor.stop();
        }
    })
    // 播放列表
    $scope.find(".list-btn").on("click",function(){
        playList.show(controlmanager);
    })
    // $scope.find(".close-btn").on("click",function(){
    //     $scope.find(".play-list").removeClass("show")
    // })
}

function successCall(data){
    bindClick();
    bindTouch();
    songList = data;
    root.render(data[0]);
    $scope.trigger("play:change",[0]);
    controlmanager = new controlManager(data.length);
    playList.renderPlayList(data);
}
getData("./mock/data.json",successCall);