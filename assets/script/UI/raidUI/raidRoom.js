var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var raidSelectAndEnterRoomProto = require('raidSelectAndEnterRoomProto')
var dataCenter = require('DataCenter')
var teamRaidData = require('teamRaidData')
var teamRaidSelectRoomProto = require('teamRaidSelectRoomProto')
var consts = require('consts')
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
        this.icon.spriteFrame = this.raidIcon.getSpriteFrame(img);
        this.raidDes.string = des;
        this._parents = parent;
      //  cc.log(parent,"-------------parent");
    },
    
    //显示卡牌插图、关卡名称、说明文字。	

    // onLoad () {},

    start () {

    },

    enterRaid () {

        if (this._roomId == null) {
            net.Request(new teamRaidSelectRoomProto(this._idx), function (data) {
                if (data.code == consts.Raid.STATE_TEAM_SELECT_HERO) {
                    cc.log("组队副本-----选英雄状态",data);
                }
                else if (data.code == consts.Raid.STATE_TEAM_SELECT_ROOM) {
                    cc.log("组队副本-----组队副本选择关卡",data);
                }
                else if (data.code == consts.Raid.STATE_TEAM_IN_ROOM) {
                    cc.log("组队副本-----STATE_TEAM_IN_ROOM",data);
                }
                else if (data.code == consts.Raid.STATE_TEAM_GET_CARD) {
                    cc.log("组队副本-----获取卡牌",data);
                }
            }); 
        }
        else {
            net.Request(new raidSelectAndEnterRoomProto(this._raidId,this._roomId,this._idx), function (data) {
                cc.log("单人选择关卡进入房间",data);
                if (data.code == consts.Raid.STATE_SELECT) {
                    cc.log("单人副本-----开始状态",data);
                }
                else if (data.code == consts.Raid.STATE_START) {
                    cc.log("单人副本-----组队副本选择关卡",data);
                }
                else if (data.code == consts.Raid.STATE_GET_CARD) {
                    cc.log("单人副本-----获取卡牌状态",data);
                }
                else if (data.code == consts.Raid.STATE_FINISH) {
                    cc.log("单人副本-----结束状态",data);
                }
            });
        }
        
    },
    //raidID, roomIdx, idx

    // update (dt) {},
});
