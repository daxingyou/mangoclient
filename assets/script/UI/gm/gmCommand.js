/*
 * @Author: liuguolai 
 * @Date: 2018-08-31 15:41:47 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-31 17:20:23
 */
var consts = require('consts');

cc.Class({
    extends: cc.Component,
    properties: {
        panel: cc.Node,
        btnSure: cc.Button,
        btnClose: cc.Button,
        editBox: cc.EditBox,
        _clickCnt: 0,
        _lastClickTime: 0,
    },

    onLoad: function () {
        if (!consts.ENABLE_GM)
            return;
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var timeNow = new Date().getTime();
            if (timeNow - self._lastClickTime > 500)
                self._clickCnt = 0;
            self._clickCnt++;
            self._lastClickTime = timeNow;
            if (self._clickCnt >= 3)
                self.panel.active = true;
        });
        self.btnSure.node.on('click', function (button) {
            self._handle();
        });
        self.btnClose.node.on('click', function (button) {
            self.panel.active = false;
        });
        self.editBox.node.on('editing-return', function (event) {
            self._handle();
        })
    },

    _handle: function () {
        var text = this.editBox.string;
        this._handleGmCommand(text);
        this.editBox.string = "";
    },

    _handleGmCommand: function (text) {
        if (text.length === 0)
            return;
        var list = text.split(" ");
        var cmd = list[0];
        list.splice(0, 1);
        cc.log("gm", cmd, list);
        var msg = {
            cmd: cmd,
            params: list
        };
        pomelo.notify('connector.entryHandler.command', msg);
    }
});
