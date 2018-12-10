/*
 * @Author: liuguolai 
 * @Date: 2018-12-07 11:54:32 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-07 16:06:57
 * 好友申请列表
 */
let UIBase = require('UIBase');
let playerData = require('playerData');
let loadRes = require('LoadRes');
let eventMgr = require('eventMgr');
let constants = require('constants');

cc.Class({
    extends: UIBase,

    properties: {
        content: cc.Layout
    },

    onLoad() {
        this._super();
        eventMgr.on(eventMgr.events.EventNewInviter, this.onAddInviter, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log('xxxxxxxxxxxxxxx')
            this._uiMgr.removeUI(constants.UI.ApplyListPanel);
            return true;
        }.bind(this));
    },

    init () {

    },

    _initUI() {
        let invitedList = playerData.friendData.invitedList;
        if (invitedList.length === 0)
            return;
        let self = this;
        loadRes.loadPrefab('UI/Friend/applyItem', true, function (loadedResource) {
            for (var i = 0; i < invitedList.length; i++) {
                var itemData = invitedList[i];
                let item = cc.instantiate(loadedResource);
                self.content.node.addChild(item);
                item.getComponent('applyItem').initData(i, itemData.eid, itemData.openid, self);
            }
            if (invitedList.length >= 5) {
                self.content.height = invitedList.length * 60;
            }
        })
    },

    //更新好友申请列表
    onAddInviter(data) {
        var self = this;
        var lastIndex = self.content.childrenCount;
        loadRes.loadPrefab('UI/Friend/applyItem', true, function (loadedResource) {
            let item = cc.instantiate(loadedResource);
            self.content.node.addChild(item);
            self.content.height += 60;
            var itemCom = item.getComponent('applyItem');
            itemCom.initData(lastIndex, data.eid, data.openid, self);
        });
    },

    start() {
        this._initUI();
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventNewInviter, this.onAddInviter);
    }
});
