/*
 * @Author: liuguolai 
 * @Date: 2018-08-31 15:41:47 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-29 17:32:58
 */
var consts = require('consts');
var net = require("NetPomelo");
let constants = require('constants');
let combatMgr = require('CombatMgr');

cc.Class({
    extends: cc.Component,
    properties: {
        panel: cc.Node,
        btnSure: cc.Button,
        btnClose: cc.Button,
        btnGM: cc.Button,
        editBox: cc.EditBox,
    },

    onLoad: function () {
        if (!consts.ENABLE_GM)
            return;
        this._lastCommand = [];
        this._lastCommandIdx = 0;
        this._initGMBtn();
        var self = this;
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

    _initGMBtn() {
        let node = this.btnGM.node;
        node.active = true;
        this._touchBeginPos = null;
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this._touchBeginPos = event.getLocation();
        }, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let pos = node.parent.convertToNodeSpaceAR(event.getLocation());
            node.position = pos;
        }, this);
        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            let curPos = event.getLocation();
            if (Math.abs(curPos.x - this._touchBeginPos.x) < 10 &&
                Math.abs(curPos.y - this._touchBeginPos.y) < 10) {
                this.panel.active = !this.panel.active;
            }
        }, this);
    },

    onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.up:
                if (this._lastCommand.length === 0)
                    return;
                if (this._lastCommandIdx === 0)
                    this._lastCommandIdx = this._lastCommand.length;
                this._lastCommandIdx = (this._lastCommandIdx - 1) % this._lastCommand.length;
                this.editBox.string = this._lastCommand[this._lastCommandIdx];
                break;
            case cc.KEY.down:
                if (this._lastCommand.length === 0)
                    return;
                this._lastCommandIdx = (this._lastCommandIdx + 1) % this._lastCommand.length;
                this.editBox.string = this._lastCommand[this._lastCommandIdx];
                break;
            case cc.KEY.g:
                this.panel.active = true;
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
            case 'taunt':
                combatMgr.getSelf().onTauntUpdate(list[1]);
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
