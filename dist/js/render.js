(function($,root){
    var $scope = $(document.body);

    function renderInfo(data){
        var html = "<h1 class='song-name'>"+data.song+"</h1>"+
                    "<h3 class='singer-name'>"+data.singer+"</h3>"+ 
                    "<h3 class='album-name'>"+data.album+"</h3>" ;
        $scope.find(".song-info").html(html);
    }

    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            $scope.find(".song-img img").attr("src",src);
            root.blurImg(img,$scope)
        }
        img.src = src;
    }

    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("liked")
        }else{
            $scope.find(".like-btn").removeClass("liked")
        }
    }


    root.render = function(data){
        console.log(data)
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
        // renderLyric(data.lyric)
    }
}(window.Zepto,window.player || (window.player={})))