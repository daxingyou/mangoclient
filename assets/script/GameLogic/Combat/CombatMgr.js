/**
 *    战斗管理器
 *    管理所有战斗相关
 *    by pwh  
 */

var consts = require('consts')
var constant = require('constants')
var PVECombat = require('PVECombat')
var PVPCombat = require('PVPCombat')
var TutorialCombat = require('TutorialCombat')
var playCardMessage = require('playCardProto')
let net = require('NetPomelo')
var gameData = require('DataCenter')
let eventMgr = require('eventMgr');

var CombatMgr = {
    curCombat: null,
    fightEnd: true,
    loadBegin: true,
    fightDamage: null,
    teamInfo: null,  // 数据
    loadProgress: {},

    initCombat: function (data) {
        let teamType = data.teamType;

        switch (teamType) {
            case consts.Team.TYPE_LADDER:
            case consts.Team.TYPE_PRACTICE:
                this.curCombat = new PVPCombat(data);
                break;
            case consts.Team.TYPE_RAID:
                this.curCombat = new PVECombat(data);
                break;
            case consts.Team.TYPE_TUTORIAL:
                this.curCombat = new TutorialCombat(data);
                break;
            default:
                this.curCombat = new PVECombat(data);
        }

        this.fightEnd = false;
        this.teamInfo = data.teamInfo;
        this.fightDamage = {};
        this.curCombat.init(data);
    },
    setTeamInfo: function (teamInfo) {
        this.teamInfo = teamInfo;
    },
    // 加载进度
    setLoadProgress: function (uid, progress) {
        this.loadProgress[uid] = progress;
        eventMgr.emit(eventMgr.events.EventCombatLoadProgress, uid, progress);
    },
    getLoadProgress: function (uid) {
        return this.loadProgress[uid] || 0;
    },
    //存储技能伤害
    addFightDamage: function (attackerID, sid, oriDamage) {
        if (this.fightDamage.hasOwnProperty(attackerID)) {
            if (this.fightDamage[attackerID].hasOwnProperty(sid)) {
                this.fightDamage[attackerID][sid].push(oriDamage);
            }
            else {
                this.fightDamage[attackerID][sid] = new Array();
                this.fightDamage[attackerID][sid].push(oriDamage);
            }
        }
        else {
            this.fightDamage[attackerID] = new Array();
            this.fightDamage[attackerID][sid] = new Array();
            this.fightDamage[attackerID][sid].push(oriDamage);
        }
    },
    onFightEnd: function (data) {
        cc.log(data);
        this.fightEnd = true;
        let result = data.result;
        gameData.fightEnd = true;
        this.curCombat.onFightEnd(result);
    },
    onDungeonReconnect: function (data) {
        gameData.IsReconnect = true;
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        let status = data.status;
        let self = this;
        switch (status) {
            case consts.DungeonStatus.IN_SELECT_HERO:   // 选角中
                // uimgr.release();
                uimgr.loadUI(constant.UI.PickHero, function (script) {
                    script.initDataByReconnect(
                        data.teamInfo.teamA, data.teamInfo.teamB,
                        data.teamType, data.unconfirm, data.leftTime);
                });
                break;
            case consts.DungeonStatus.IN_BEFORE_LOAD_CD:    // 加载前倒计时
                // uimgr.release();
                uimgr.loadUI(constant.UI.PickHero, function (script) {
                    script.initDataByReconnect(
                        data.teamInfo.teamA, data.teamInfo.teamB,
                        data.teamType, [], data.leftTime);
                });
                break;
            case consts.DungeonStatus.IN_LOAD:    // 加载前倒计时
                //新手战斗直接进战斗？不出加载？暂时先这样
                if (data.teamType === consts.Team.TYPE_TUTORIAL)
                    return;

                let projess = data.loadMemProgress;
                for (let uid in projess) {
                    this.setLoadProgress(uid, projess[uid]);
                }
                self.setTeamInfo(data.teamInfo);
                uimgr.loadUI(constant.UI.CombatLoading, function (res) {
                    self.initCombat(data);
                    uimgr.loadUI(constant.UI.Fight, function (res) {
                        res.initData(() => {
                            self.curCombat.UILoadOk = true;
                            gameData.IsReconnect = false;
                        });
                    });
                });
                break;
            case consts.DungeonStatus.IN_FIGHT:    // 战斗中
                self.setTeamInfo(data.teamInfo);
                uimgr.loadUI(constant.UI.CombatLoading, function (res) {
                    self.initCombat(data);
                    uimgr.loadUI(constant.UI.Fight, function (res) {
                        res.initData(() => {
                            uimgr.removeUI(constant.UI.CombatLoading);

                            res.is_chongLian = true;
                            res.min_time = parseInt(data.leftTime / 60000);
                            res.sec_time = parseInt(data.leftTime / 1000) % 60;
                            self.curCombat.UILoadOk = true;
                            gameData.IsReconnect = false;
                        });
                    });
                });
                break;
        }
    },
    setMatrix: function (group) {
        this.curCombat.init(group);
    },
    getEnemys: function () {
        return this.curCombat.enemy;
    },
    getOwn: function () {
        return this.curCombat.own;
    },
    getSelf: function () {
        if (this.curCombat == null)
            return null;

        return this.curCombat.curPlayer;
    },
    getEntity: function (uid) {
        return this.curCombat.getEntity(uid);
    },
    getSummonMgr: function () {
        return this.curCombat.summonedMgr;
    },
    getAbilityTarget: function (Objective) {
        if (Objective.type == constant.SkillTargetType.SELF)
            return this.getSelf();
        else if (Objective.type == constant.SkillTargetType.ALL) {
            var result = Objective.team == constant.own ? this.curCombat.own : this.curCombat.enemy;
            return result;
        }
        else if (Objective.type == constant.SkillTargetType.LowHP) {
            var temp = 99999999;
            var result = null;
            if (Objective.team == constant.own) {
                for (const key in this.curCombat.own) {
                    if (this.curCombat.own.hasOwnProperty(key)) {
                        const element = this.curCombat.own[key];
                        if (element.hp < temp) {
                            temp = element.hp;
                            result = element;
                        }
                    }
                }
            }
            else if (Objective.team == constant.enemy) {
                for (const key in this.curCombat.enemy) {
                    if (this.curCombat.enemy.hasOwnProperty(key)) {
                        const element = this.curCombat.enemy[key];
                        if (element.hp < temp) {
                            temp = element.hp;
                            result = element;
                        }
                    }
                }
            }

            return result;
        }
        else if (Objective.type == constant.SkillTargetType.SINGEL) {
            var result = Objective.team == constant.own ? this.curCombat.own : this.curCombat.enemy;
            return result;
        }
    },
    Tick: function (dt) {
        if (this.curCombat != null) {
            this.curCombat.Tick();

            for (var i in this.curCombat.enemy) {
                this.curCombat.enemy[i].tick(dt);
            }

            for (var i in this.curCombat.own) {
                this.curCombat.own[i].tick(dt);
            }
        }
    },
    UsePile: function (CombatUnit, idx, target, targets, curCardid, curObjective) {
        if(this.curCombat.teamType == consts.Team.TYPE_TUTORIAL)
        {
            var targetss = new Array();
            targetss[1] = target;
            
            CombatUnit.onUseCard(this.curCombat.useCard(CombatUnit,idx,curCardid));
            CombatUnit.useSkill(this.curCombat.useSkill(CombatUnit.uid,target.uid,curCardid), targetss);
        }
        else
        {
            let targetID = curObjective == constant.SkillTargetType.SINGEL ? target.uid : '';
            if (CombatUnit.handsPile[idx].Enable(idx, targetID)) {
                net.Request(new playCardMessage(idx, curCardid, targetID));
    
                cc.log('GameLogic里面的Card');
            }
        }
    },
    Release: function () {
        if (this.curCombat)
            this.curCombat.Release();
        this.loadProgress = {};
    }
}

module.exports = CombatMgr;
