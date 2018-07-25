var uibase = require('UIBase')

cc.Class({
    extends: uibase,

    properties: {
       text : cc.Label,
       armor : cc.Label,
       bar : cc.ProgressBar,
       bufflist : cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},

    freshen(cur,max,curArmo){
        this.text.string = cur.toString() + '/'+ max.toString();
        if(curArmo > 999)
            curArmo = 999;
        this.armor.string = curArmo.toString();
        this.bar.progress = cur / max;
    }
});
