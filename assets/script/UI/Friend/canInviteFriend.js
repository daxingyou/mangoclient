var uibase = require('UIBase')
var net = require("NetPomelo")
var inviteProto = require("inviteProto")
cc.Class({
    extends: uibase,
    properties: {
       userName:cc.Label,
       _eid:null,
       _curIndex:null,
       invited:cc.Label,
       _state:null,
       is_online:false,
       invitedBtn:cc.Node,
       _level:null,
    },

   

    onLoad () {
      //  this.invitedBtn.getComponent(cc.Button).interactable = false;//默认不在线
    },

    start () {

    },
    initData(index,eid,state,parent){
        this._curIndex = index;
        this._eid = eid;
        this._state = state;
        this.userName.string = state;
        this._parents = parent;
        if (this._state != null)
        this.is_online = true;
    },

    invitedFriend () {
        //玩家等级达到RequireLelve 才能邀请	----4v4
        //等级，段位，拥有英雄 ---- 组队天梯			
        var self = this;
        net.Request(new inviteProto(self._eid), (data) => {
            cc.log("发送组队邀请 ",data,"邀请的id",self._eid);
        });
        this.invited.string = "已邀请";
    },

     update (dt) {
        // if (this.is_online) {
        //     this.invitedBtn.getComponent(cc.Button).interactable = true;
        //     this.is_online = false;
        // }
     },
});
