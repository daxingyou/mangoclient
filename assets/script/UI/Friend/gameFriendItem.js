var uibase = require('UIBase')
var consts = require('consts')
var net = require("NetPomelo")
let UIHelper = require('UIHelper');
let eventMgr = require('eventMgr');
let playerData = require('playerData');
let rankTpl = require('Rank');

let TYPE_FRIEND = 1,
    TYPE_RECOMMEND = 2;

cc.Class({
    extends: uibase,
    properties: {
        userName: cc.Label,
        level: cc.Label,
        state: cc.Label,
        deleteFriend: cc.Node,
        _type: null,
        genderImg: cc.Sprite,
        genderAltas: cc.SpriteAtlas,
        _click: false,
        btnLable: cc.Label,
        rankLabel: cc.Label,
        starLabel: cc.Label,
    },

    //type == 1 好友 / 2 推荐好友
    initData(type, data) {
        this._type = type;
        this._eid = data.eid;
        this.refresh(data);
    },

    refresh(data) {
        this.userName.string = data.name;
        if (data.gender == 2) {
            this.genderImg.spriteFrame = this.genderAltas.getSpriteFrame('female');
        }
        else {
            this.genderImg.spriteFrame = this.genderAltas.getSpriteFrame('male');
        }
        if (this._type == TYPE_FRIEND) {
            this.node.getChildByName('addFriend').active = false;
            this.node.getChildByName('btnGroup').active = true;
            data = playerData.friendData.getFriendManageInfo(this._eid);
        }
        else {
            this.node.getChildByName('btnGroup').active = false;
            this.node.getChildByName('addFriend').active = true;
        }
        // 托管数据
        this._updateMgrInfo(data, true);
    },

    _updateMgrInfo(data, bForce) {
        if (!data && !bForce)
            return;
        data = data || {};
        this.level.string = (data.level || 1) + '级';
        this.updateState(data.state || consts.UserState.OFFLINE);
        this.rankLabel.string = rankTpl[data.rank || 1].Name;
        let star = data.star == undefined ? 1 : data.star;
        this.starLabel.string = '* ' + star;
    },

    onEnable() {
        eventMgr.on(eventMgr.events.EventFriMgrInfoUpdate, this.onMgrInfoUpdate, this);
    },

    onDisable() {
        eventMgr.off(eventMgr.events.EventFriMgrInfoUpdate, this.onMgrInfoUpdate);
    },

    onMgrInfoUpdate() {
        if (this._type == TYPE_FRIEND) {
            this._updateMgrInfo(playerData.friendData.getFriendManageInfo(this._eid));
        }
    },

    updateState(state) {
        this.state.string = UIHelper.getUserStateStr(state);
    },

    addUser() {
        let self = this;
        if (self._click)
            return;
        self._click = true;
        let comfirm = function () {
            net.requestWithCallback('addFriendProto', self._eid, (data) => {
                self.btnLable.string = "已发送";
            });
        }
        let cancel = function () {
            self._click = false;
        }
        self._uiMgr.popupTips(1, "少侠，江湖险恶，你我结伴而行，可好？", "添加好友", cancel, cancel, comfirm, self);
    },

    popupTips() {
        this._uiMgr.popupTips(1, "确定要删除好友吗", "提示", null, null, this.comfirm, this);
    },

    comfirm() {
        net.requestWithCallback('deleteFriendProto', this._eid, function (data) {
            cc.log(data, "删除好友");
        });
    },
});
