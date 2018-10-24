var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var raidSelectAndEnterRoomProto = require('raidSelectAndEnterRoomProto')
var dataCenter = require('DataCenter')
var teamRaidSelectRoomProto = require('teamRaidSelectRoomProto')
cc.Class({
    extends: cc.Component,

    properties: {
        _roomId:null,
        _raidId:null,
        _idx:null,
        raidName:cc.Label,
        _parents:null,
        raidDes:cc.Label,
        icon:cc.Sprite,
        raidIcon:cc.SpriteAtlas,

    },

    initData (roomId,raidId,idx,raidName,img,des,parent) {
        this._roomId = roomId;
        this._raidId = raidId;
        this._idx = idx;
        this.raidName.string = raidName;
        this._parents = parent;
        this.raidDes.string = des;
        this.icon.spriteFrame = this.raidIcon.getSpriteFrame(img);

    },
    
    //显示卡牌插图、关卡名称、说明文字。	

    // onLoad () {},

    start () {

    },

    enterRaid () {
        
        if (this._roomId == null) {
            net.Request(new teamRaidSelectRoomProto(this._idx), function (data) {
                cc.log("组队选择关卡进入房间",data);
            }); 
        }
        else {
            net.Request(new raidSelectAndEnterRoomProto(this._raidId,this._roomId,this._idx), function (data) {
                cc.log("单人选择关卡进入房间",data);
            });
        }
        
    },
    //raidID, roomIdx, idx

    // update (dt) {},
});
