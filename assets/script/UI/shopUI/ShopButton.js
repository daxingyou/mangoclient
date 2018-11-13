var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
      label : cc.Label
    },

    onLoad () {
        
    },

    start () {

    },
    init(name){
        this.label.string = name;
    },
    // update (dt) {},

    
});
