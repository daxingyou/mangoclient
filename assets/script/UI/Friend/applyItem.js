var uibase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var ignoreInviterProto = require('ignoreInviterProto')
var refuseInviterProto = require('refuseInviterProto')
var acceptFriendProto = require('acceptFriendProto')
var confirmHeroProto = require("confirmHeroProto")
var friendData = require('FriendData');

cc.Class({
    extends: uibase,

    properties: {
      applyName:cc.Label,
      _eid:null,
      _opendid:null,
      _parents:null,
      _curIndex:null,
    },
    // onLoad () {},

    start () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },
    initData(index,eid,openid,parent){
        this._curIndex = index;
        this.applyName.string = openid;
        this._opendid = openid;
        this._eid = eid;
        this._parents = parent;
    },
    disposeApply(event,cust) {
        var self = this;
        if (cust == 1) {
            cc.log("接受好友请求");
            net.Request(new acceptFriendProto(self._eid), function (data) {
                if (data.code == 1) {
                    self._uiMgr.showTips("发送消息成功");
                }
                else if (data.code == 2) {
                    self._uiMgr.showTips("ID错误");
                }
                else if (data.code == 3) {
                    self._uiMgr.showTips("已经是好友了/已经发送消息了");
                }
                else if (data.code == 4) {
                    self._uiMgr.showTips("已经发送消息了");
                }
                else if (data.code == 5) {
                    self._uiMgr.showTips("申请者不存在");
                }
               else if (data.code == 6) {
                    self._uiMgr.showTips("不是好友");
               } 
            });
        }
        else if (cust == 2) {
            net.Request(new refuseInviterProto(self._eid), function (data) {
                cc.log("拒绝好友请求",data);
                if (data.code == 1) {
                    self._uiMgr.showTips("发送消息成功");
                }
                else if (data.code == 2) {
                    self._uiMgr.showTips("ID错误");
                }
                else if (data.code == 3) {
                    self._uiMgr.showTips("已经发送消息了");
                }
                else if (data.code == 4) {
                    self._uiMgr.showTips("已经发送消息了");
                }
                else if (data.code == 5) {
                    self._uiMgr.showTips("申请者不存在");
                }
               else if (data.code == 6) {
                    self._uiMgr.showTips("不是好友");
               } 
            });
        }
        else if (cust == 3) {
            cc.log("忽略好友请求");
            net.Request(new ignoreInviterProto(this._eid), function (data) {
                if (data.code == 1) {
                    self._uiMgr.showTips("发送消息成功");
                }
                else if (data.code == 2) {
                    self._uiMgr.showTips("ID错误");
                }
                else if (data.code == 3) {
                    self._uiMgr.showTips("已经发送消息了");
                }
                else if (data.code == 4) {
                    self._uiMgr.showTips("已经发送消息了");
                }
                else if (data.code == 5) {
                    self._uiMgr.showTips("申请者不存在");
                }
               else if (data.code == 6) {
                    self._uiMgr.showTips("不是好友");
               } 
            });
        }
        friendData.addInviter = null;
        self._parents._updateApplyList(self._curIndex);
    },
    // update (dt) {},
});
