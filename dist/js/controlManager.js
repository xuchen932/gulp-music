(function($,root){
    function controlManager(length){
        this.index = 0;
        this.length = length;
    }
    controlManager.prototype = {
        next : function(){
            return this.getIndex(1);
        },
        prev : function(){
            return this.getIndex(-1);
        },
        getIndex : function(value){
            var index = this.index;
            var len = this.length;
            var curIndex = (index + value +len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;

}(window.Zepto,window.player || (window.player={})))