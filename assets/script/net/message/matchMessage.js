var combatMgr = require('CombatMgr')//战斗相关
var gameLogic = require('GameLogic')//怪物相关
var consts = require('consts')
var gameData = require('DataCenter')
var spawnSummoned = require('SpawnSummoned')
var constant = require('constants')
var hero = require('Hero_')
var monster = require('Monster_')
var dataMgr = require('DataMgr')
var FSMEvent = require('FSMEvent');
var efferMgr = require('EffectMgr')

var fight = {
    _uimgr: null,
  

    init: function () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;

        pomelo.on('onBeginSelect', function (data) {//pomelo  全局发送和监听消息
            var ui = that._uimgr.getCurMainUI();
            that._uimgr.showTips('匹配成功');
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            var teamInfo = data.teamInfo;
            var teamA = teamInfo.teamA;
            ui.selectScr.initData(teamA);
            ui.showSelect();//match.js
        });

        pomelo.on('onSelectHeroNotify', function (data) {
            cc.log(data.uid, '选择英雄:%s', data.heroid);
           // that._uimgr.showTips('确认英雄:' + "" + data.heroid);
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.showTeamSelect(data);
           
        });

        pomelo.on('onConfirmHeroNotify', function (data) {
            cc.log(data.uid, '%s确认英雄:%s', data.heroid);
           // that._uimgr.showTips('确认英雄:' + "" + data.heroid);
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.showTeamPrepare(data);
        });

        pomelo.on('onEnterLoadCD', function (data) {
            cc.log('加载前倒计时:', data);
           // that._uimgr.showTips('加载前倒计时:');
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.beginLoadCD(data);
        });
        //var i =0;
        pomelo.on('onStartLoad', function (data) {
            cc.log(data);
            var myInfo = data.myInfo;

            gameData.mp = myInfo.mp;
            gameData.discardsNum = myInfo.discardsNum;
            gameData.exhaustsNum = myInfo.exhaustsNum;
            gameData.cardsNum = myInfo.cardsNum;
            gameData.thew = myInfo.thew;
            gameData.fightEnd = false;
            //i++;

            cc.log('开始加载战斗：', data.teamInfo, data.myInfo);

            combatMgr.initCombat(data);
          //  that._uimgr.release();
            that._uimgr.loadUI(constant.UI.Fight, function (data) {
                data.initData(()=>{combatMgr.curCombat.UILoadOk = true;});
            })

            combatMgr.curCombat.getSelf().Mp = myInfo.mp;
            combatMgr.curCombat.getSelf().Thew = myInfo.thew;

            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.startLoad(data);
        });

        pomelo.on('onFightBegin', function (data) {
            cc.log('战斗开始 ', data);
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.fightBegin();
         
            gameData.IsLayoutAction = true;
            that._uimgr.releaseLoading();
            var ui = that._uimgr.getUI(constant.UI.Fight);
            //ui.initData();
            ui.showNum(gameData);
            ui.ShowHandCards();//第一次加载
            ui.onFreshMp(gameData.mp, true);
            gameLogic.init();
        });

        pomelo.on('onUseCard', function (data) {
            data.inHands = data.inHands || [];
            gameData.mp = data.mp;
            gameData.thew = data.thew;

            if ("exhaustsNum" in data)
                gameData.exhaustsNum = data.exhaustsNum;
            if ("discardsNum" in data)
                gameData.discardsNum = data.discardsNum;

            cc.log('使用卡牌：', data);
            
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);

            combatMgr.curCombat.getSelf().Mp = data.mp;
            combatMgr.curCombat.getSelf().Thew = data.thew;
            combatMgr.getSelf().onUsePile(data.inHands);
            var num =  combatMgr.getSelf().handsPile.length;
            gameData.IsLayoutAction = true;
            ui.ShowHandCards();
        });

        pomelo.on('onUseCardNotify', function (data) {
            cc.log('别人使用卡牌：', data);

            //暂时没有表现
            //var player = gameLogic.getCombatUnitForUid(data.uid);
            //player.useCard(data);
        });

        pomelo.on('onDamage', function (data) {
            cc.log("伤害", data);
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            var curdata = data;
            player.onDamage(curdata.oriDamage, gameLogic.getCombatUnitForUid(curdata.attackerID), curdata);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();

            var curskill = dataMgr.skill[curdata.sid][1];
            if(curskill.HitTime.length > 0 && curskill.DmgFlag == 1)
            {
                //存储技能伤害
                if(gameData.fightDamage.hasOwnProperty(curdata.attackerID))
                {
                    if(gameData.fightDamage[curdata.attackerID].hasOwnProperty(curdata.sid))
                    {
                        gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                    }
                    else
                    {
                        gameData.fightDamage[curdata.attackerID][curdata.sid] = new Array();
                        gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                    }
                }
                else{
                    gameData.fightDamage[curdata.attackerID] = new Array();
                    gameData.fightDamage[curdata.attackerID][curdata.sid] = new Array();
                    gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                }
            }
            else {
                if (curskill.HitEffect != '') {
                    efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                }
            }
        })

        pomelo.on('onSkillEffective', function (data) {
            cc.log("技能生效", data);
            var player = gameLogic.getCombatUnitForUid(data.casterID);
            player.skillEffective(data);
        });

        pomelo.on('onDrawCard', function (data) {
            var num =   combatMgr.getSelf().handsPile.length;
            data.inHands = data.inHands || [];
            gameData.cardsNum = data.cardsNum;
            if ("discardsNum" in data)
                gameData.discardsNum = data.discardsNum;

            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
            gameData.IsLayoutAction = false;
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        pomelo.on('onDrawCardNotify', function (data) {
            cc.log('别人抽牌', data);
        });

        pomelo.on('onMpRecover', function (data) {
            cc.log('灵力恢复', data);
            gameData.mp = data.mp;
            combatMgr.getSelf().Mp = data.mp;
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshMp(data.mp, true);
        });

        pomelo.on('onAddSpawnSummon', function (data) {
            cc.log('增加召唤物', data);
            spawnSummoned.create(data);

        })

        pomelo.on('onUseSkill', function (data) {
           cc.log('使用技能', data);

            var player = gameLogic.getCombatUnitForUid(data.caster);
            var target = new Array();

            for (var i in data.targets) {
                target[i] = new Array();
                for(var z in data.targets[i])
                {
                    target[i].push(gameLogic.getCombatUnitForUid(data.targets[i][z]));
                }
            }

            player.useSkill(data, target);
        });

        pomelo.on('onSpecificDrawCard', function (data) {
            var num =   combatMgr.getSelf().handsPile.length;
            cc.log('指定抽卡','指订抽卡后的牌的张数', data,num);
            gameData.IsLayoutAction = false;
            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        ///他人接收指定抽卡 更新手牌数
        pomelo.on('onSpecificDrawCardNotify', function (data) {
        //    cc.log('别人指定抽卡', data);
        //     var ui = that._uimgr.getCurMainUI();
        //     combatMgr.getSelf().onDrawPile(data.inHands);
        //     ui.ShowHandCards();
        });

        pomelo.on('onCreateCard', function (data) {
            cc.log('生成卡牌', data);
            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            var num =   combatMgr.getSelf().handsPile.length;
            cc.log("生成卡牌时当前卡牌的张数",num);
            gameData.IsLayoutAction = false;
            ui.ShowHandCards();
        });

        pomelo.on('onCreateCardNotify', function (data) {
           cc.log('别人生成卡牌', data);
        });

        pomelo.on('onReverse', function (data) {
            cc.log('回收召唤物伤害', data);

            var damage = new Array();

            damage['caster'] = data.caster;
            
            for (var uid in data.damageInfo) {
                damage[uid] = new Array();

                var index = 0;
                var damageInfo = new Array();

                for (var damageItem of data.damageInfo[uid].damageList) {
                    var deltaHp = damageItem[0] - damageItem[1];
                    var deltaArmor = damageItem[2] - damageItem[3];

                    damageInfo[index] = deltaHp + deltaArmor;
                    index++;
                    //if (deltaHp > 0) {
                    //    this.uimgr.loadDmg(this, deltaHp, true, data.caster);
                    //}
                }
                damage[uid] = damageInfo;

                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid], data.caster);
            }

            spawnSummoned.collect(damage);
        });

        pomelo.on('onSwordWheel', function (data) {
            cc.log('swordWheel伤害', data);

            //var player = gameLogic.getCombatUnitForUid(data.caster);
            // player.useSkill(data);

            for (var uid in data.damageInfo) {
                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid], data.caster);
            }

            spawnSummoned.Reset(data.summons);
            // summons重新布局 看data.summons
        });

        pomelo.on('onHeal', function (data) {
            cc.log('治疗', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP, data.toHP - data.fromHp, data.casterID);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onRelive', function (data) {
            cc.log('复活', data);
            /// 技能id data.sid  .casterHp 释放者的血量 .casterID 释放者 .hp 目标回复血量 .targetID 目标Id

            var player = gameLogic.getCombatUnitForUid(data.casterID);
            player.freshAttri({Hp: data.casterHp});

            var target = gameLogic.getCombatUnitForUid(data.targetID);
            target.fsm.handleEvent(FSMEvent.RELIVE, data);
        });

        pomelo.on('onBuffUpdate', function (data) {
          //  cc.log("Buff更新", data);
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if (player)
                player.buffUpdate(data.realID, data.info);
        });

        pomelo.on('onBuffModHp', function (data) {
           // cc.log('onBuffModHp', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP, data.val, data.casterID);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onPropUpdate', function (data) {
            cc.log('onPropUpdate', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if (player != null)
                player.porpUpdate(data);
        });

        pomelo.on('onDropCard', function (data) {
            cc.log('弃牌', data);
            data.inHands = data.inHands || [];
            combatMgr.getSelf().onUsePile(data.inHands);
            for (var info of data.dropInfo) {
                if (info.toPile === consts.PileType.CARDS) {
                    gameData.cardsNum++;
                }
                else if (info.toPile === consts.PileType.DISCARDS) {
                    gameData.discardsNum++;
                }
                else if (info.toPile === consts.PileType.EXHAUSTS) {
                    gameData.exhaustsNum++;
                }
            }
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
        });

        pomelo.on('onDropCardNotify', function (data) {
            cc.log('弃牌广播', data);

        });

        pomelo.on('onFightEnd', function (data) {
            cc.log('战斗结束', data);
            gameData.fightEnd = true;
            var res = data.result;
            var ui = that._uimgr.getCurMainUI();
            ui.loadFightOver(res);
        });

        pomelo.on('onDie', function (data) {
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            // player.onDie();
            player.fsm.handleEvent(FSMEvent.DIE);
        });

        pomelo.on('onDungeonReconnect', function (data) {
            cc.log('副本顶号重连', data);
            // net.Request(new unmatchProto(consts.MatchType.PVE_2,1),(data)=>{
            //     cc.log("match "+data + "取消匹配");
            // });
           var  uimgr = cc.find('Canvas').getComponent('UIMgr');
            uimgr.loadUI(constant.UI.Login);

        });

        pomelo.on('onAddMonsterSummon', function (data) {
            cc.log('增加分身', data);

            ///重置位置
            var player = gameLogic.getCombatUnitForUid(data.casterID);

            if (player.Pos !== data.casterPos) {
                if (player.teamid == combatMgr.curCombat.getSelf().teamid) {
                    combatMgr.curCombat.own[data.casterPos] = player;
                    delete combatMgr.curCombat.own[player.Pos];
                }
                else {
                    combatMgr.curCombat.enemy[data.casterPos] = player;
                    delete combatMgr.curCombat.enemy[player.Pos];
                }
            }

            player.onAddSummon(data.casterPos);

            ///初始化分身
            for (var i in data.newEnts) {
                var uid = data.newEnts[i].uid;
                if (data.newEnts[i].hasOwnProperty('monsterid')) {
                    combatMgr.curCombat.units[uid] = new monster(data.newEnts[i], dataMgr.monster[data.newEnts[i].monsterid], combatMgr.curCombat.monsterMatrix.MatrixPos[data.newEnts[i].pos], player.teamid, combatMgr.curCombat, uid);
                    if (player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
                else {
                    combatMgr.curCombat.units[uid] = new hero(data.newEnts[i], dataMgr.heroAttributes[data.newEnts[i].heroid], combatMgr.curCombat.matrix.MatrixPos[data.newEnts[i].pos], player.teamid, combatMgr.curCombat, uid);
                    if (player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
            }
        });

        pomelo.on('onRemoveMonsterSummon', function (data) {
            cc.log('移除分身', data);

            combatMgr.curCombat.units[data.entID].release();
            combatMgr.curCombat.units[data.entID] = null;
            delete (combatMgr.curCombat.units[data.entID]);

            var index = 0;
            for (var i in combatMgr.curCombat.own) {
                if (combatMgr.curCombat.own[i].uid == data.entID) {
                    index = i;
                }
            }

            if (index != 0) {
                delete combatMgr.curCombat.own[index];
                return;
            }

            for (var i in combatMgr.curCombat.enemy) {
                if (combatMgr.curCombat.enemy[i].uid == data.entID) {
                    index = i;
                }
            }

            if (index != 0) {
                delete combatMgr.curCombat.enemy[index];
                return;
            }
        });

        pomelo.on('onGetMp', function (data) {
            cc.log("获取mp", data);
            gameData.mp = data.mp;
            combatMgr.getSelf().Mp = data.mp;
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshMp(data.mp);
        });

        pomelo.on('onMpRecoverRateUpdate', function (data) {
            cc.log("mp恢复速率更新", data);
            combatMgr.curCombat.getSelf().SetMpRecoverRate(data.mpRecoverRate, data.stopMpRecoverBuffCnt);
        });

    }
}

module.exports = fight;