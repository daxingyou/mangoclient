let eventMgr = require('eventMgr');
let utility = require('utility');
let net = require("NetPomelo");

let friend = {
    bInited: false,
    init: function (info) {
        this.initFriends(info.friends);
        this.invitedList = info.invitedList;
        if (this.bInited)
            return this;
        this.bInited = true;

        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        let self = this;
        pomelo.on('onAllFriendsInfo', function (data) {
            cc.log("好友全量信息", data);
            self.initFriends(data.friends || []);
            self.invitedList = data.invitedList || [];
        });

        pomelo.on('onAddInviter', function (data) {
            cc.log("收到好友请求", data);
            self._uiMgr.showTips("收到好友请求");
            self.invitedList.push(data);
            eventMgr.emit(eventMgr.events.EventNewInviter, data);
        });

        pomelo.on('onAddFriendBeRefused', function (data) {
            cc.log("好友请求被拒绝", data);
            self._uiMgr.showTips(utility.T(1409, {PlayerName: data.name}));
        });

        pomelo.on('onNewFriend', function (data) {
            cc.log("新增好友", data);
            self.addFriend(data);
        });

        pomelo.on('onAcceptFriendNotify', function (data) {
            cc.log("请求同意后的通知", data);
            self._uiMgr.showTips(utility.T(1410, {PlayerName: data.name}));
        });

        pomelo.on('onDeleteFriend', function (data) {
            cc.log("删除好友", data);
            self.delFriend(data.eid);
        });
        return this;
    },

    initFriends: function (friends) {
        this.friends = {};
        this.friendsManageInfo = {};
        for (let friend of friends) {
            this.friends[friend.eid] = friend;
        }
    },

    addFriend: function (data) {
        this.friends[data.eid] = data;
        eventMgr.emit(eventMgr.events.EventNewFriend, data);
    },

    delFriend: function (eid) {
        delete this.friends[eid];
        eventMgr.emit(eventMgr.events.EventDelFriend, eid);
    },

    // 更新托管数据
    updateFriendsManageInfo: function () {
        let self = this;
        net.requestWithCallback('getFriendsManageInfoProto', function (data) {
            let infos = data.infos;
            self.friendsManageInfo = {};
            for (let info of infos) {
                self.friendsManageInfo[info.eid] = info;
            }
            eventMgr.emit(eventMgr.events.EventFriMgrInfoUpdate);
        })
    },

    getFriendManageInfo: function (eid) {
        return this.friendsManageInfo[eid];
    },

    getFriendData: function (eid) {
        return this.friends[eid];
    },

    removeInvitedItem: function(eid) {
        for (let i = 0; i < this.invitedList.length; i++) {
            if (this.invitedList[i].eid === eid) {
                this.invitedList.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = friend;