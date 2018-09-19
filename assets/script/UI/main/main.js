var uibase = require('UIBase')
var constant = require('constants')

cc.Class({
    extends: uibase,

    properties: {
      
    },

    start () {
        this._mgr = cc.find('Canvas').getComponent('UIMgr');
    },
    Match () {
        this._mgr.loadUI(constant.UI.Match);
    },
    Friend(){
        this._mgr.loadUI(constant.UI.Friend);
    },
    enterFightPav () {
        this._mgr.loadUI(constant.UI.FightPavTop);
        this._mgr.loadUI(constant.UI.ShowList);
    },

    // update (dt) {},
});
