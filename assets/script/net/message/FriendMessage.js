var dataCenter = require('DataCenter');
var constant = require('constants')
var combatMgr = require('CombatMgr');

var friend = {
    init: function () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        pomelo.on('onAllFriendsInfo', function (data) {
            cc.log("好友全量信息", data);
            dataCenter.massageList = data;
            /*
            "onAllFriendsInfo": {
                "message FriendData": {
                  "required string eid": 1,
                  "required string openid": 2,
                  "required uInt32 relation": 3
                },
                "repeated FriendData friends": 1,
                "message InviterInfo": {
                  "required string eid": 1,
                  "required string openid": 2
                },
                "repeated InviterInfo invitedList": 2
              },*/
            
        });

        pomelo.on('onAddInviter', function (data) {
            cc.log("收到好友请求", data);
            that._uiMgr.showTips("收到好友请求");
            dataCenter.onlineCtr = true;
            dataCenter.onlineMsg = data;
            /*
            "onAddInviter": {
                "required string eid": 1,
                "required string openid": 2
              },*/
        });

        pomelo.on('onAddFriendBeRefused', function (data) {
            cc.log("好友请求被拒绝", data);
            that._uiMgr.showTips(data.name+"拒绝了你的请求");
            /*
            "onAddFriendBeRefused": {
                "required string name": 1
              },
            */
        });

        pomelo.on('onNewFriend', function (data) {
            cc.log("新增好友", data);
            dataCenter.receivedReply = true;
            dataCenter.friendDispose = data;
            /*
            "onNewFriend": {
                "required string eid": 1,
                "required string openid": 2,
                "required uInt32 relation": 3
              },
              */
        });

        pomelo.on('onAcceptFriendNotify', function (data) {
            cc.log("请求同意后的通知", data);
            that._uiMgr.showTips(data.name+"同意了你的请求");
            /*  "onAcceptFriendNotify": {
                "required string name": 1
            },
            */
        });

        pomelo.on('onDeleteFriend', function (data) {
            cc.log("删除好友", data);
            that._uiMgr.showTips(data.eid+"删除了你");
            dataCenter.friendDelete = true;
            dataCenter.deleteEid = data.eid;
            // if (data.eid == dataCenter.uuid) {
            //     that._uiMgr.showTips("你被删除好友");
            // }
           
            /*  "onDeleteFriend": {
                "required string eid": 1
            }
            */
        });
    }
}

module.exports = friend;