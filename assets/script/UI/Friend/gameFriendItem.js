var uibase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var deleteFriendProto = require("deleteFriendProto")
cc.Class({
    extends: uibase,
    properties: {
       userName:cc.Label,
       level:cc.Label,
       state:cc.Label,
       deleteFriend:cc.Node,
       _curIndex:null,
       _relation:null
    },


     onLoad () {

     },

    start () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },
    initData(index,eid,openid,relation,parent){
        this._curIndex = index;
        this._eid = eid;
        this.userName.string = openid;
        this._relation = relation;
        if (relation == 1) {
            this.state.string = "在线";
        }
        else if(relation == 2) {
            this.state.string = "离线";
        }
        else if(relation == 3) {
            this.state.string = "组队";
        }
        else if(relation == 4) {
            this.state.string = "游戏中";
        }
       // this.level.string = level;
        this._parents = parent;
    },
    popupTips () {
        this._uiMgr.popupTips(this,"确定要删除好友吗");
    },
    comfirmDeletFriend() {
        var self = this;
        net.Request(new deleteFriendProto(self._eid), function (data) {
            cc.log(data,"删除好友");
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
                self._uiMgr.showTips("已经邀请了");
            }
            else if (data.code == 5) {
                self._uiMgr.showTips("申请者不存在");
            }
            else if (data.code == 6) {
                self._uiMgr.showTips("不是好友");
            }
        });
    },

    // update (dt) {},
});
