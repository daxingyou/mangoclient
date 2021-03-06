var constant = require('constants');
let loadRes = require('LoadRes');

cc.Class({
    extends: cc.Component,

    properties: {
        _mgr: null,
    },

    onLoad() {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },

    init: function (mgr) {
        this._mgr = mgr;
    },
    show: function () {
        this.node.active = true;
    },
    hide: function () {
        this.node.active = false;
    },
    Release: function () {
        this.node.destroy();
    },
    backButton: function () {
        let uiMgr = cc.find('Canvas').getComponent('UIMgr');
        uiMgr.release();
        uiMgr.loadUI(constant.UI.Main, function (data) {
        });
    },
    // 添加返回按钮
    addCommonBackBtn: function (title, backHandler) {
        if (title) {
            this.__title = title;
        }
        if (this.__backBtn) {
            this._updateBackBtn(backHandler);
            return;
        }
        loadRes.load('UI/common/top', false, (res) => {
            let go = cc.instantiate(res);
            go.parent = this.node;
            this.__backBtn = go;
            this._updateBackBtn(backHandler);
        });
    },

    _updateBackBtn(backHandler) {
        let scr = this.__backBtn.getComponent('top');
        scr.changeTitle(this.__title);
        scr.setBackHandler(backHandler);
    },
});