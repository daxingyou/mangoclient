cc.Class({
    extends: cc.Component,

    properties: {
        _mgr : null,
    },

    init : function(mgr){
        this._mgr = mgr;
    },
    show : function(){
        this.node.active = true;
    },
    hide : function(){
        this.node.active = false;
    },
    Release : function(){
        this.node.destory();
    },
    backButton : function(){
        
    }
});