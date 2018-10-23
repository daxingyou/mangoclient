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
        this._mgr.release();
        this._mgr.loadUI(constant.UI.Match);
    },

    Friend() {
        this._mgr.release();
        this._mgr.loadUI(constant.UI.Friend);
    },

    Fuben () {
        this._mgr.release();
        this._mgr.loadUI(constant.UI.RaidUI);
    },

    enterFightPav () {
        var self = this;
        let backMainUI = function () {
            self._mgr.loadUI(constant.UI.Main,function(data){
                 self._mgr.getUI(constant.UI.FightPavTop).hide();
            });
        };
        self._mgr.loadUI(constant.UI.FightPavTop,(data) =>{
            data.initBackBtn(backMainUI,self);
        });
        self._mgr.loadUI(constant.UI.ShowList,data => {
            data.init();
        });
    },

    // update (dt) {},
});
