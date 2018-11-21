/*
 * @Author: liuguolai 
 * @Date: 2018-11-06 19:24:01 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-06 19:37:53
 */
var net = require("NetPomelo")
var acceptInviteProto = require("acceptInviteProto")
var refuseTeamInviteProto = require("refuseTeamInviteProto")
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var eventMgr = require('eventMgr')
var consts = require('consts')
var constant = require('constants')
let playerData = require('playerData');
let teamData = require('teamData')

module.exports = {
    _uimgr: null,
    init: function () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        pomelo.on('onRefreshTeam', function (data) {
            cc.log("队伍信息刷新", data);
            playerData.teamData.refreshTeam = data;
            eventMgr.emit("onRefreshTeam");
        });

        pomelo.on('onTeamInvited', function (data) {
            //加判断未解散，人数已满
            cc.log("收到组队邀请", data);
            playerData.teamData.onTeamInvited.push(data);
            let num = playerData.teamData.onTeamInvited.length;
            var callComfirm =  function () {
                playerData.teamData.onTeamInvited.splice(num-1,1);
                net.Request(new acceptInviteProto(data.id,data.teamId), (data) => {
                    
                    if (data.code == consts.TeamCode.OK) {
                        cc.log("同意组队邀请",data);
                        that._uimgr.loadUI(constant.UI.BuildTeam,(data) =>{
                            data.initFriendList();
                            data.laodFriendList();
                        });   
                    }
                    else if (data.code == consts.TeamCode.TYPE_ERR) {
                        cc.log("类型错误");
                    }
                    else if (data.code == consts.TeamCode.IN_TEAM) {
                        cc.log("队伍中");
                    }
                    else if (data.code == consts.TeamCode.NOT_IN_TEAM) {
                        cc.log("队伍已解散");
                        that._uimgr.showTips("队伍已解散");
                    }
                    else if (data.code == consts.TeamCode.TEAM_FULL) {
                        cc.log("人满了");
                        that._uimgr.showTips("人满了");
                    }
                });
            };

            var callRefuse = function () {
                playerData.teamData.onTeamInvited.splice(num-1,1);
                net.Request(new refuseTeamInviteProto(data.id), (data) => {
                    cc.log("拒绝组队邀请",data);
                });
            }
            var callIgnore = function () {
                playerData.teamData.onTeamInvited.splice(num-1,1);
                net.Request(new ignoreTeamInviteProto(data.id), (data) => {
                    cc.log("忽略组队邀请",data);
                });
            };
            
            that._uimgr.popupTips(2,data.openid+"邀请你一起玩游戏","邀请",callIgnore,callRefuse,callComfirm,that);
          
            /*  "onTeamInvited": {
                "required string id": 1,
                "required string openid": 2,
                "required string teamType": 3,
                "required uInt32 rank": 4
            },
            */
        });

        pomelo.on('onTeamApplyed', function (data) {
            cc.log("收到求邀申请", data,typeof(data));
            playerData.teamData.onForTeamInvited[data.id] = data;
            that._uimgr.popupTips(3,data.openid+"请求加入队伍","求邀请",null,null,null,null,playerData.teamData.onForTeamInvited);

            /*
              "onTeamApplyed": {
                "required string id": 1,
                "required string openid": 2,
                "required uInt32 rank": 3
            },
            */

        });

        pomelo.on('onTeamBeRefused', function (data) {
            cc.log("组队邀请被拒", data);
            that._uimgr.showTips(data.name+"拒绝了你的组队邀请");
            /* "onTeamBeRefused": {
                "required string name": 1
            },*/

        });

        pomelo.on('onTeamBeKicked', function (data) {
            cc.log("被提出队伍", data);
            that._uimgr.showTips("队长将你请离队伍");
            eventMgr.emit("onTeamBeKicked");
        });

        pomelo.on('onTeamReadyStateChange', function (data) {
            cc.log("队员准备状态变更", data);
            var ui = that._uimgr.getCurMainUI();
            playerData.teamData.TeamReadyState = data;
            eventMgr.emit("onTeamReadyStateChange");
            //ui.changePrepareState(data);
            /*"onTeamReadyStateChange": {
                "required string id": 1,
                "required uInt32 ready": 2
            },

            */
        });
    }
}