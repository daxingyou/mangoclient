/*
 * @Author: liuguolai 
 * @Date: 2018-08-31 15:41:47 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-10-30 11:30:25
 */
var consts = require('consts');
var net = require("NetPomelo");
let constants = require('constants');

cc.Class({
    extends: cc.Component,
    properties: {
        panel: cc.Node,
        btnSure: cc.Button,
        btnClose: cc.Button,
        editBox: cc.EditBox,
        _clickCnt: 0,
        _lastClickTime: 0
    },

    onLoad: function () {
        if (!consts.ENABLE_GM)
            return;
        this._lastCommand = [];
        this._lastCommandIdx = 0;
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
        });
    },

    onEnable () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onDisable () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown (event) {
        if (this._lastCommand.length === 0)
            return;
        switch(event.keyCode) {
            case cc.KEY.up:
                if (this._lastCommandIdx === 0)
                    this._lastCommandIdx = this._lastCommand.length;
                this._lastCommandIdx = (this._lastCommandIdx - 1) % this._lastCommand.length;
                this.editBox.string = this._lastCommand[this._lastCommandIdx];
                break;
            case cc.KEY.down:
                this._lastCommandIdx = (this._lastCommandIdx + 1) % this._lastCommand.length;
                this.editBox.string = this._lastCommand[this._lastCommandIdx];
                break;
        }
    },

    _handle: function () {
        var text = this.editBox.string;
        if (text.length === 0)
            return;
        if (text[0] === '$') {
            this._handleLocalCommand(text.substring(1));
        }
        else {
            this._handleGmCommand(text);
        }
        cc.log(this._lastCommand)
        this._lastCommand.push(text);
        this._lastCommandIdx = this._lastCommand.length;
        this.editBox.string = "";
    },

    _handleLocalCommand: function (text) {
        var list = text.split(" ");
        var cmd = list[0];
        switch (cmd) {
            case 'request':
                var protoName = list[1];
                var proto = require(protoName + 'Proto');
                list.splice(0, 2);
                net.Request(new proto(...list), function (data) {
                    cc.log("%s gm request back ", protoName, data);
                });
                break;
            case 'dpsPlugin':
                let uiMgr = cc.find('Canvas').getComponent('UIMgr');
                uiMgr.loadUI(constants.UI.DpsPanel, function (data) {
                    data.onRefreshBtnClick();
                });
                break;
            case 'autoDpsExport':
                let bOpen = list[1]
                if (bOpen == '0')
                    constants.debug.autoDpsExport = false;
                else
                    constants.debug.autoDpsExport = true;
                cc.log(constants.debug.autoDpsExport)
                break;
        }
    },

    _handleGmCommand: function (text) {
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
