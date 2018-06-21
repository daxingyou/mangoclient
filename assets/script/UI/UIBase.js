cc.Class({
    extends: cc.Component,

    properties: {
        _mgr : null,
    },

    init : function(mgr){
        this._mgr = mgr;
    },
    show : function(){
        this.active = true;
    },
    hide : function(){
        this.active = false;
    },
    Release : function(){
        this.node.destory();
    }
});