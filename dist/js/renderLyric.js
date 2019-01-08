(function($,root){
    var $scope = $(document.body);
    function renderLyric(data){
        var html = "<span class='lyric'>"+ data.lyric +"</span>";

        $scope.find(".lyric-area").html(html)
    }
    

}(window.Zepto,window.player || (window.player={})))