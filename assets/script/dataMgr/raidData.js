/*
 * @Author: liuguolai 
 * @Date: 2018-12-14 14:32:54 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 20:23:05
 * 副本数据管理
 */
let consts = require('consts');
let constants = require('constants');
let eventMgr = require('eventMgr');
let net = require('NetPomelo');

module.exports = {
    bInited: false,
    init: function (info) {
        this.raids = info.raids;
        this.teamRaid = info.teamRaid;
        if (this.bInited)
            return this;
        this.bInited = true;

        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this._initSingleRaidNetEvent();
        this._initTeamRaidNetEvent();
        return this;
    },

    _initSingleRaidNetEvent: function () {
        let self = this;
        pomelo.on('onRaidInfoUpdate', function (data) {
            cc.log("副本信息更新", data);
            let raidID = data.raidID, info = data.info;
            if (!info) {
                delete self.raids[raidID];
            }
            else {
                self.raids[raidID] = info;
            }

            let combatMgr = require('CombatMgr');
            if (info == undefined) {
                self._uiMgr.loadUI(constants.UI.RaidUI, data => {
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true;
                });
            }
            else {
                self._uiMgr.loadUI(constants.UI.EnterSelectRaid, data => {
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true;
                    data.initData(info);
                });
            }
        });
    },

    _initTeamRaidNetEvent: function () {
        let self = this;
        pomelo.on('onTeamRaidBeginSelectHero', function (data) {
            cc.log("组队副本进入选英雄", data);
            let teamInfo = data.teamInfo, raidID = data.raidID;
            // 组队副本初始化
            self.teamRaid = {
                raidID: raidID,
                teamInfo: teamInfo,
                rooms: [],
                state: consts.Raid.STATE_TEAM_SELECT_HERO
            };
            self._uiMgr.loadUI(constants.UI.PickHero, function (script) {
                script.initData(teamInfo, null, consts.Team.TYPE_RAID);
            });
        });

        pomelo.on('onTeamRaidSelectHeroNotify', function (data) {
            cc.log("组队副本队友选择了英雄通知", data);
            eventMgr.emit(eventMgr.events.EventTeamerSelectHero, data.uid, data.heroid);
        });

        pomelo.on('onTeamRaidConfirmHeroNotify', function (data) {
            cc.log("组队副本队友确认英雄通知", data);
            eventMgr.emit(eventMgr.events.EventTeamerConfirmHero, data.uid, data.heroid);
        });

        pomelo.on('onTeamRaidMembersUpdate', function (data) {
            cc.log("组队副本队员信息更新", data);
            self.teamRaid.teamInfo = data.teamInfo;
            // if (dataCenter.fightEnd) {
            //     combatMgr.Release();
            //     self._uiMgr.release();
            // }
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
            self.teamRaid.rooms.push({
                selectList: data.selectList,
                beginTime: new Date().getTime(),
                memberSelected: {},
            })
            self._uiMgr.loadUI(constants.UI.TeamSelectRaid, (script) => {
                script.loadRaid(data.selectList);
            });
        });

        pomelo.on('onTeamRaidRoomSelected', function (data) {
            cc.log("组队副本队员点选关卡", data);
            self._uiMgr.showTips("副本队员选择关卡");
            /*
              "onTeamRaidRoomSelected": {
                "required string uid": 1,
                "required uInt32 idx": 2
            },*/
        });

        pomelo.on('onTeamRaidBeginGetCard', function (data) {
            cc.log("组队副本进入奖励卡牌选择", data);
            let cardsList = data.cardsList;
            self.teamRaid.state = consts.Raid.STATE_TEAM_GET_CARD;
            self.teamRaid.cardsList = cardsList;
            self.teamRaid.cardsSelectedMems = [];
            self._uiMgr.loadUI(constants.UI.TeamAwardCard, function (data) {
                data.initData(cardsList);
            });
        });

        pomelo.on('onTeamRaidMemberGetCard', function (data) {
            cc.log("组队副本队员选择了组队卡牌", data);
            self._uiMgr.showTips("副本队员选择了组队卡牌");
        });

        pomelo.on('onTeamRaidPass', function (data) {
            cc.log("组队副本通关", data);
            self._uiMgr.release();
            self._uiMgr.loadUI(constants.UI.RaidUI);
        });

        pomelo.on('onTeamRaidFail', function (data) {
            cc.log("组队副本失败", data);
            self._uiMgr.release();
            self._uiMgr.loadUI(constants.UI.RaidUI);
        });
    },

    getSingleRaidInfo(raidID) {
        return this.raids[raidID];
    },

    singleRaidSelectHero(raidID, heroid) {
        let self = this;
        net.requestWithCallback('raidSelectHeroProto', raidID, heroid, function (data) {
            {
                if (data.code == consts.RaidCode.OK) {
                    let raidInfo = data.raidInfo;
                    self.raids[raidID] = raidInfo;
                    // 选择room
                    self._uiMgr.release();
                    self._uiMgr.loadUI(constants.UI.EnterSelectRaid, data => {
                        data.initData(raidInfo);
                    });
                }
            }
        });
    }
};
