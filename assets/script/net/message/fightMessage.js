/*
 * @Author: liuguolai 
 * @Date: 2018-11-07 10:10:50 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-11 17:13:11
 */
let combatMgr = require('CombatMgr');
let constants = require('constants');
let spawnSummoned = require('SpawnSummoned');

var gameData = require('DataCenter')
var dataMgr = require('DataMgr')
var efferMgr = require('EffectMgr');

module.exports = {
    init: function () {
        let uiMgr = cc.Canvas.instance.getComponent('UIMgr');

        pomelo.on('onStartLoad', function (data) {
            cc.log('开始加载战斗：', data);
            combatMgr.setTeamInfo(data.teamInfo);
            var datas = data;
            uiMgr.getCurMainUI().hide();
            uiMgr.loadUI(constants.UI.CombatLoading, function (data) {
                combatMgr.initCombat(datas);
                uiMgr.loadUI(constants.UI.Fight, function (data) {
                });
            });

        });

        pomelo.on('onFightBegin', function (data) {
            cc.log('战斗开始 ', data);

            combatMgr.loadBegin = false;

            gameData.IsLayoutAction = true;
            uiMgr.releaseLoading();
            uiMgr.getUI(constants.UI.Fight).FightStart();
        });

        pomelo.on('onUseCard', function (data) {
            cc.log('使用卡牌：', data);
            combatMgr.getSelf().onUseCard(data);
            gameData.IsLayoutAction = true;
        });

        pomelo.on('onUseCardNotify', function (data) {
            cc.log('别人使用卡牌：', data);
            
        });

        pomelo.on('onDamage', function (data) {
            cc.log("伤害", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            player.onDamage(data);

            var curskill = dataMgr.skill[data.sid][1];
            if (curskill.HitTime.length > 0 && curskill.DmgFlag == 1) {
                //存储技能伤害
                combatMgr.addFightDamage(data.attackerID, data.sid, data.oriDamage);
            }
            else {
                if (curskill.HitEffect != '') {
                    efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                }
            }
        });

        pomelo.on('onDamages', function (data) {
            data = data.damages;
            cc.log("伤害s", data);

            if (gameData.IsReconnect)
                return;

            for (var i in data) {
                var player = combatMgr.getEntity(data[i].targetID);
                player.onDamage(data[i]);

                var curskill = dataMgr.skill[data[i].sid][1];
                if (curskill.HitTime.length > 0 && curskill.DmgFlag == 1) {
                    //存储技能伤害
                    combatMgr.addFightDamage(data[i].attackerID, data[i].sid, data[i].oriDamage);
                }
                else {
                    if (curskill.HitEffect != '') {
                        efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                    }
                }
            }
        });

        pomelo.on('onDamageByThorns', function (data) {
            cc.log("反射伤害", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            player.onDamage(data);

            var curskill = dataMgr.skill[data.sid][1];
            if (curskill.HitTime.length > 0 && curskill.DmgFlag == 1) {
                //存储技能伤害
                combatMgr.addFightDamage(data.attackerID, data.sid, data.oriDamage);
            }
            else {
                if (curskill.HitEffect != '') {
                    efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                }
            }
        });

        pomelo.on('onDamagesByThorns', function (data) {
            data = data.damages;
            cc.log("反射伤害s", data);

            if (gameData.IsReconnect)
                return;

            for (var i in data) {
                var player = combatMgr.getEntity(data[i].targetID);
                player.onDamage(data[i]);

                var curskill = dataMgr.skill[data[i].sid][1];
                if (curskill.HitTime.length > 0 && curskill.DmgFlag == 1) {
                    //存储技能伤害
                    combatMgr.addFightDamage(data[i].attackerID, data[i].sid, data[i].oriDamage);
                }
                else {
                    if (curskill.HitEffect != '') {
                        efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                    }
                }
            }
        });

        pomelo.on('onDamageDelay', function (data) {
            cc.log("延时伤害", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            player.onDamage(data);

            var curskill = dataMgr.skill[data.sid][1];
            if (curskill.HitTime.length > 0 && curskill.DmgFlag == 1) {
                //存储技能伤害
                combatMgr.addFightDamage(data.attackerID, data.sid, data.oriDamage);
            }
            else {
                if (curskill.HitEffect != '') {
                    efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                }
            }
        });

        pomelo.on('onHeal', function (data) {
            cc.log('治疗', data);

            var player = combatMgr.getEntity(data.targetID);
            player.onHeal(data.toHp, data.toHp - data.fromHp, data.casterID, data.isCrit);
        });

        pomelo.on('onRelive', function (data) {
            cc.log('复活', data);
            /// 技能id data.sid  .casterHp 释放者的血量 .casterID 释放者 .hp 目标回复血量 .targetID 目标Id
            if (gameData.IsReconnect)
                return;

            var player = combatMgr.getEntity(data.casterID);
            player.freshAttri({ hp: data.casterHp });

            var target = combatMgr.getEntity(data.targetID);
            target.fsm.handleEvent(FSMEvent.RELIVE, data);
        });

        pomelo.on('onSkillEffective', function (data) {
            cc.log("技能生效", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.casterID);
            player.skillEffective(data);
        });

        pomelo.on('onBuffUpdate', function (data) {
            cc.log("Buff更新", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            if (player)
                player.buffUpdate(data.realID, data.info);
        });

        pomelo.on('onBuffModHp', function (data) {
            cc.log('onBuffModHp', data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            player.onBuffModHp(data);
        });

        pomelo.on('onPropUpdate', function (data) {
            cc.log('战斗属性刷新', data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getEntity(data.targetID);
            if (player != null)
                player.onPropUpdate(data);
        });

        pomelo.on('onDrawCard', function (data) {
            if (gameData.IsReconnect)
                return;
            combatMgr.getSelf().onDrawCard(data);
            gameData.IsLayoutAction = false;
        });

        pomelo.on('onDrawCardNotify', function (data) {
            cc.log('别人抽牌', data);

        });

        pomelo.on('onMpRecover', function (data) {
            cc.log('灵力恢复', data);
            combatMgr.getSelf().onMpRecover(data);
        });

        pomelo.on('onUseSkill', function (data) {
            cc.log('使用技能', data);

            if (gameData.IsReconnect)
                return;

            var player = combatMgr.getEntity(data.caster);
            var target = new Array();

            for (var i in data.targets) {
                target[i] = new Array();
                for (var z in data.targets[i]) {
                    target[i].push(combatMgr.getEntity(data.targets[i][z]));
                }
            }

            if (player != null)
                player.useSkill(data, target);
        });

        pomelo.on('onSpecificDrawCard', function (data) {
            cc.log('指定抽卡', data);
            gameData.IsLayoutAction = false;
            combatMgr.getSelf().onSpecificDrawCard(data);
        });

        ///他人接收指定抽卡 更新手牌数
        pomelo.on('onSpecificDrawCardNotify', function (data) {
            cc.log('别人指定抽卡', data);
            var player = combatMgr.getEntity(data.targetID);
            player.inHandsNum = data.inHandsNum;
        });

        pomelo.on('onCreateCard', function (data) {
            cc.log('生成卡牌', data);
            gameData.IsLayoutAction = false;
            combatMgr.getSelf().onCreateCard(data);
        });

        pomelo.on('onCreateCardNotify', function (data) {
            cc.log('别人生成卡牌', data);
            var player = combatMgr.getEntity(data.uid);
            player.inHandsNum = data.inHandsNum;
        });

        pomelo.on('onDropCard', function (data) {
            cc.log('弃牌', data);
            combatMgr.getSelf().onDropCard(data);
        });

        pomelo.on('onDropCardNotify', function (data) {
            cc.log('弃牌广播', data);
            var player = combatMgr.getEntity(data.targetID);
            player.inHandsNum = data.inHandsNum;
            player.updatePileNum(data.toPile, data.num);
        });

        pomelo.on('onDie', function (data) {
            var player = combatMgr.getEntity(data.targetID);
            player.onDie();
        });

        pomelo.on('onAddSpawnSummon', function (data) {
            cc.log('增加召唤物', data);
            combatMgr.getSummonMgr().onAddSpawnSummon(data);
        });

        pomelo.on('onRemoveSpawnSummon', function (data) {
            cc.log('移除召唤物', data);
            spawnSummoned.onRemoveSpawnSummon(data);
        });

        pomelo.on('onClearSpawnSummon', function (data) {
            cc.log('清除召唤物', data);
            spawnSummoned.onClearSpawnSummon(data);
        });

        pomelo.on('onReverse', function (data) {
            cc.log('回收召唤物伤害', data);
            combatMgr.getSummonMgr().onReverse(data);
        });

        pomelo.on('onSwordWheel', function (data) {
            cc.log('swordWheel伤害', data);
            combatMgr.getSummonMgr().onSwordWheel(data);
        });

        pomelo.on('onGetMp', function (data) {
            cc.log("获取mp", data);
            if (gameData.IsReconnect)
                return;
            let player = combatMgr.getEntity(data.uid);
            player.onGetMp(data);
        });

        pomelo.on('onMpRecoverRateUpdate', function (data) {
            cc.log("mp恢复速率更新", data);
            if (gameData.IsReconnect)
                return;
            var player = combatMgr.getSelf();
            if (player != null)
                player.SetMpRecoverRate(data.mpRecoverRate, data.stopMpRecoverBuffCnt);
        });

        pomelo.on('onAddMonster', function (data) {
            cc.log('新增怪物', data);
            var info = data.monsterInfo;
            combatMgr.curCombat.createEntity(info);
        });

        pomelo.on('onAddMonsterSummon', function (data) {
            cc.log('增加分身', data);

            ///重置位置
            combatMgr.curCombat.updatePos(data.casterID, data.casterPos);

            ///初始化分身
            for (var i in data.newEnts) {
                let info = data.newEnts[i];
                combatMgr.curCombat.createEntity(info);
            }
        });

        pomelo.on('onRemoveMonsterSummon', function (data) {
            cc.log('移除分身', data);
            combatMgr.curCombat.delEntity(data.entID);
        });

        pomelo.on('onBounce', function (data) {
            cc.log("onBounce", data)
            /*
            "onBounce": {
                "required uInt32 sid": 1,
                "required string casterID": 2,
                "message DamageInfo": {
                  "required string targetID": 1,
                  "required uInt32 fromHp": 2,
                  "required uInt32 fromArmor": 3,
                  "required uInt32 toHp": 4,
                  "required uInt32 toArmor": 5
                },
                "repeated DamageInfo damageLine": 3
              }
            */

            var player = combatMgr.getEntity(data.casterID);
            /*
         var target = new Array();
         for (var i in data.targets) {
             target[i] = new Array();
             for (var z in data.targets[i]) {
                 target[i].push(combatMgr.getEntity(data.targets[i][z]));
             }
         }
         */
            if (player != null)
                player.bounceEffect(data.sid, data.damageLine);
        });

        pomelo.on('onFightEnd', function (data) {
            cc.log('战斗结束', data);
            combatMgr.onFightEnd(data);
        });

        pomelo.on('onDungeonReconnect', function (data) {
            cc.log('副本顶号重连', data);
            combatMgr.onDungeonReconnect(data);
        });

        pomelo.on('onCardPowerUp', function (data) {
            cc.log('卡牌威力增加', data);
            /*
            "onCardPowerUp": {
                "required uInt32 pileType": 1,
                "optional uInt32 idx": 2,
                "optional CardInfo card": 3
            }
            pileType 为手牌时有idx和card
            */
        });

        pomelo.on('onCopyCard', function (data) {
            cc.log('复制对手卡牌', data);
            /*
            "onCopyCard": {
                "required string from": 1,
                "repeated CardInfo inHands": 2
            }
            */
        });

        pomelo.on('onCopyCardNotify', function (data) {
            cc.log('复制卡牌通知', data);
            /*
            "onCopyCardNotify": {
                "required string from": 1,
                "required string to": 2,
                "required uInt32 pileType": 3,
                "required uInt32 inHandsNum": 4
            }
            */
        });

        // 见consts.FeatureOpt
        pomelo.on('onFeatureUpdate', function (data) {
            cc.log('功能点更新', data);
        });

        pomelo.on('onUseCardWhenGet', function (data) {
            cc.log('获得卡牌马上使用', data);
            /*
            "onUseCardWhenGet": {
                "required CardInfo card": 1,
                "required uInt32 cardsNum": 2,
                "required uInt32 exhaustsNum": 3,
                "required uInt32 discardsNum": 4
            }
            */
        });

        pomelo.on('onTauntUpdate', function (data) {
            cc.log('嘲讽对象更新', data);
            let player = combatMgr.getSelf();
            player.onTauntUpdate(data.targetID);
        });

        pomelo.on('onComboUpdate', function (data) {
            cc.log('连击数更新', data);
            let player = combatMgr.getSelf();
            player.onComboUpdate(data.num);
        });
    }
};
