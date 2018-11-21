var uibase = require('UIBase')
var net = require("NetPomelo")
var inviteProto = require("inviteProto")
var applyForJoinProto = require('applyForJoinProto')
var consts = require('consts')
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
       state:cc.Label,
       _forId:null,
       stateBg: cc.Sprite,
       stateAltas: cc.SpriteAtlas,
       _click: false,
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
    },
    userState(state,id) {
        this.state.string = state;
        if (state == "在线") {
            this.stateBg.spriteFrame = this.stateAltas.getSpriteFrame('omline_bg');
        }
        else if (state == "离线") {
            this.stateBg.spriteFrame = this.stateAltas.getSpriteFrame('offline_bg');
        }
        else if (state == "游戏中") {
            this.stateBg.spriteFrame = this.stateAltas.getSpriteFrame('games_bg');
        }
        if (state == "组队中") {
            this.invited.string = "求邀请";
            this.stateBg.spriteFrame = this.stateAltas.getSpriteFrame('omline_bg');
            this._forId = id;
        }
    },
    

    invitedFriend () {
        //玩家等级达到RequireLelve 才能邀请	----4v4
        //等级，段位，拥有英雄 ---- 组队天梯	
        var self = this;
        if (self._click)
        return;
        if (self.invited.string == "求邀请") {
            net.Request(new applyForJoinProto(self._forId), (data) => {
                self._click = true;
                cc.log("发送申请入队邀请 ",data,"向申请入队",self._forId);
            });
        }		
        else {
            net.Request(new inviteProto(self._eid), (data) => {
                self._click = true;
                cc.log("发送组队邀请 ",data,"邀请的id",self._eid);
            });
        }
        self.invited.string == "已发送";
       // self.invited.string = "已发送";
    },
});
