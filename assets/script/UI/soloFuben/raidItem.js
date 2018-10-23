var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var raidSelectAndEnterRoomProto = require('raidSelectAndEnterRoomProto')
var dataCenter = require('DataCenter')

cc.Class({
    extends: cc.Component,

    properties: {
      _roomId:null,
      _raidId:null,
      _idx:null,
      raidName:cc.Label,
      _parents:null,

    },

    initData (roomId,raidId,idx,raidName,parent,img,des) {
        this._roomId = roomId;
        this._raidId = raidId;
        this._idx = idx;
        this.raidName.string = raidName;
        this._parents = parent;
    },
    //显示卡牌插图、关卡名称、说明文字。	

    // onLoad () {},

    start () {

    },

    enterRaid () {
        
        net.Request(new raidSelectAndEnterRoomProto(this._raidId,this._roomId,this._idx), function (data) {
            cc.log("选择关卡进入房间",data);
         });
    },
    //raidID, roomIdx, idx

    // update (dt) {},
});
