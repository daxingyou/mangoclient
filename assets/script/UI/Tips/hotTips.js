var uiBase = require('UIBase')
var constant = require('constants')

cc.Class({
    extends: uiBase,

    properties: {
        
    },


    
    start () {

    },

    init(x,y,parent) {
        this.node.parent = parent;
        this.node.x = x;
        this.node.y = y;
       // parent.node.hotTips = this;
    },

    hideTips () {
        this.hide();
    },

    // update (dt) {},
});
