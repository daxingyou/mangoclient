var constant = require('constants')
var teamRaidData = require('teamRaidData')
var combatMgr = require('CombatMgr')
var dataCenter = require('DataCenter')
var eventMgr = require('eventMgr')
var teamRaid = {
    init: function () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        pomelo.on('onTeamRaidBeginSelectHero', function (data) {
            cc.log("组队副本进入选英雄", data);
            let teamInfo = data.teamInfo;
            that._uiMgr.loadUI(constant.UI.PickHero,function(data){
                data.storeRaidTeamInfo(teamInfo);
            });
            /*
              "onTeamRaidBeginSelectHero": {
                "message TeamMember": {
                "required string uid": 1,
                "required string openid": 2,
                "required string name": 3
                },
                "repeated TeamMember teamInfo": 1
            },
            */
        });

        pomelo.on('onTeamRaidSelectHeroNotify', function (data) {
            cc.log("组队副本队友选择了英雄通知", data);
            var ui = that._uiMgr.getCurMainUI();
            ui.showTeamerSelect(data);
            /*
            "onTeamRaidSelectHeroNotify": {
                "required string uid": 1,
                "required uInt32 heroid": 2
            },
            */
        });

        pomelo.on('onTeamRaidConfirmHeroNotify', function (data) {
            cc.log("组队副本队友确认英雄通知", data);
            var ui = that._uiMgr.getCurMainUI();
            ui.showTeamerComfirm(data);
            /*
            "onTeamRaidConfirmHeroNotify": {
                "required string uid": 1,
                "required uInt32 heroid": 2
            },
            */
        });

        pomelo.on('onTeamRaidMembersUpdate', function (data) {
            cc.log("组队副本队员信息更新", data);
            if (dataCenter.fightEnd) {
                combatMgr.Release();
                that._uiMgr.release();
              //  combatMgr.curCombat.UILoadOk = true; 
            }
            let teamInfo = data.teamInfo;
            teamRaidData.teamInfo = teamInfo;
            that._uiMgr.loadUI(constant.UI.TeamSelectRaid,data =>{
                data.initData(teamInfo);
            });
            /*
                 "onTeamRaidMembersUpdate": {
                "message MemberInfo": {
                "required string uid": 1,
                "required string openid": 2,
                "required string name": 3,
                "required uInt32 heroid": 4,
                "repeated uInt32 cards": 5,
                "required uInt32 hp": 6,
                "required uInt32 maxHp": 7
                },
                "repeated MemberInfo teamInfo": 1
            },
            */
        });

        pomelo.on('onTeamRaidShowRoomList', function (data) {
            cc.log("组队副本点选关卡列表", data);
            teamRaidData.selectList = data.selectList;
            eventMgr.emit("selectList",teamRaidData.selectList);
            // var ui = that._uiMgr.getCurMainUI();
            // ui.loadRaid(data);
            /*  "onTeamRaidShowRoomList": {
                "message RoomInfo": {
                "required string type": 1,
                "required uInt32 id": 2
                },
                "repeated RoomInfo selectList": 1
            },*/
        });

        pomelo.on('onTeamRaidRoomSelected', function (data) {
            cc.log("组队副本队员点选关卡", data);
            that._uiMgr.showTips("副本队员选择关卡");
            /*
              "onTeamRaidRoomSelected": {
                "required string uid": 1,
                "required uInt32 idx": 2
            },*/
        });

        pomelo.on('onTeamRaidBeginGetCard', function (data) {
            cc.log("组队副本进入奖励卡牌选择", data);
            let cardsList = data.cardsList;
            teamRaidData.cardsList = cardsList;
            teamRaidData.selectList = null;
            eventMgr.emit("teamSelectAward",cardsList);
            // that._uiMgr.loadUI(constant.UI.TeamAwardCard,function(data){
            //    data.initData(cardsList);
            // });

            /*  "onTeamRaidBeginGetCard": {
                "repeated uInt32 cardsList": 1
            }*/
        });

        pomelo.on('onTeamRaidMemberGetCard', function (data) {
            cc.log("组队副本队员选择了组队卡牌", data);
            that._uiMgr.showTips("副本队员选择了组队卡牌");

        });

        pomelo.on('onTeamRaidPass', function (data) {
            cc.log("组队副本通关", data);
        });

        pomelo.on('onTeamRaidFail', function (data) {
            cc.log("组队副本失败", data);
        });
    }
}

module.exports = teamRaid;