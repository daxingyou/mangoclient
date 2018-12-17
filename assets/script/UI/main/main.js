var uibase = require('UIBase')
var constant = require('constants')

cc.Class({
    extends: uibase,

    properties: {
      
    },

    start () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },

    Match () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.Match);
    },

    Friend () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.Friend);
    },

    Fuben () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.RaidUI);
    },

    bag () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.BagUI);
    },

    Email () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.EmailUI);
    },

    cardGroup () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.CardGroup);
    },



    enterFightPav () {
        var self = this;
        self._uiMgr.loadUI(constant.UI.ShowList,data => {
            data.init();
        });
    },
    shop () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.DropCard);
    },
    Hero(){
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.Hero);
    },
    // update (dt) {},
});
