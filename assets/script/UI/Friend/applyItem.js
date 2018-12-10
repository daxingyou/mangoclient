var uibase = require('UIBase')
var net = require("NetPomelo")
var ignoreInviterProto = require('ignoreInviterProto')
var refuseInviterProto = require('refuseInviterProto')
var acceptFriendProto = require('acceptFriendProto')
var playerData = require('playerData');

cc.Class({
    extends: uibase,

    properties: {
        applyName: cc.Label,
        _eid: null,
        _opendid: null,
        _parents: null,
        _curIndex: null,
    },

    start() {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },
    initData(index, eid, openid, parent) {
        this._curIndex = index;
        this.applyName.string = openid;
        this._opendid = openid;
        this._eid = eid;
        this._parents = parent;
    },
    _showErrorTIps(code) {
        if (code == 1) {
            this._uiMgr.showTips("发送消息成功");
        }
        else if (code == 2) {
            this._uiMgr.showTips("ID错误");
        }
        else if (code == 3) {
            this._uiMgr.showTips("已经是好友了/已经发送消息了");
        }
        else if (code == 4) {
            this._uiMgr.showTips("已经发送消息了");
        }
        else if (code == 5) {
            this._uiMgr.showTips("申请者不存在");
        }
        else if (code == 6) {
            this._uiMgr.showTips("不是好友");
        }
    },
    disposeApply(event, cust) {
        var self = this;
        if (cust == 1) {
            cc.log("接受好友请求");
            net.requestWithCallback('acceptFriendProto', self._eid, function (data) {
                self._showErrorTIps(data.code);
            });
        }
        else if (cust == 2) {
            net.requestWithCallback('refuseInviterProto', self._eid, function (data) {
                cc.log("拒绝好友请求", data);
                self._showErrorTIps(data.code);
            });
        }
        else if (cust == 3) {
            cc.log("忽略好友请求");
            net.requestWithCallback('ignoreInviterProto', this._eid, function (data) {
                self._showErrorTIps(data.code);
            });
        }
        playerData.friendData.removeInvitedItem(this._eid);
        self.node.parent = null;
        // self._parents._updateApplyList(self._curIndex);
    },
});
