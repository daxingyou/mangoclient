var combatMgr = require('CombatMgr')//战斗相关
var gameLogic = require('GameLogic')//怪物相关
var consts = require('consts')
var gameData = require('DataCenter')
var spawnSummoned = require('SpawnSummoned')
var constant = require('constants')
var hero = require('Hero_')
var monster = require('Monster_')
var dataMgr = require('DataMgr')
var selectHero = require('selectHero');


var fight = {
    _uimgr : null,

    init : function(){
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
       
        pomelo.on('onBeginSelect', function (data){//pomelo  全局发送和监听消息
            var ui = that._uimgr.getCurMainUI();
            that._uimgr.showTips('匹配成功, 开始选英雄');
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            var teamInfo = data.teamInfo;
            var teamA = teamInfo.teamA;
            gameData.user_first = teamA[0].name;
            gameData.user_second = teamA[1].name;
            gameData._first_uid = teamA[0].uid;
            gameData._second_uid = teamA[1].uid;
          
            ui.showSelect();//match.js
        });
    
        pomelo.on('onSelectHeroNotify', function (data){
         
           
            cc.log(data.uid,'选择英雄:%s', data.heroid);
    
            // selectHero.showTeamSelect(data.heroid);
            that._uimgr.showTips('确认英雄:'+""+data.heroid);
            var ui = that._uimgr.getCurMainUI();
           ui.selectScr.showTeamSelect(data.heroid);
        //    that._uimgr.showTeamSelect();
        });
    
        pomelo.on('onConfirmHeroNotify', function (data){
            cc.log(data.uid, '%s确认英雄:%s', data.heroid);

           // that._uimgr.showTips(data.uid,'%s确认英雄:%s',  data.heroid);
            that._uimgr.showTips('确认英雄:'+""+data.heroid);
            var ui = that._uimgr.getCurMainUI();
             ui.selectScr.showTeamPrepare(data.heroid);
        });
    
        pomelo.on('onEnterLoadCD', function (data){
            cc.log('加载前倒计时:',data);
            that._uimgr.showTips('加载前倒计时:');
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.beginLoadCD();
        });
    
        pomelo.on('onStartLoad', function(data){
            cc.log(data);
            var myInfo = data.myInfo;
            cc.log(myInfo + "myInfo");
            cc.log(myInfo.mp,myInfo.discardsNum,myInfo.exhaustsNum,myInfo.thew);
            gameData.mp = myInfo.mp;
            gameData.discardsNum = myInfo.discardsNum;
            gameData.exhaustsNum = myInfo.exhaustsNum;
            gameData.thew = myInfo.thew;
            cc.log('开始加载战斗：', data.teamInfo, data.myInfo);
            that._uimgr.showTips('开始加载战斗：');
            combatMgr.initCombat(data);
            that._uimgr.release();
            that._uimgr.loadUI(constant.UI.Fight,function(data){
                combatMgr.curCombat.UILoadOk = true;
            })

            combatMgr.curCombat.getSelf().Mp = myInfo.mp;
            combatMgr.curCombat.getSelf().Thew = myInfo.thew;
        });
    
        pomelo.on('onFightBegin', function(data){
            cc.log('战斗开始 ',data);
            that._uimgr.showTips('战斗开始 ',data);
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
            ui.ShowHandCards();
            ui.onFreshMp(gameData.mp, true);
            gameLogic.init();
        });
    
        pomelo.on('onUseCard', function(data){
            data.inHands = data.inHands || [];
            gameData.mp = data.mp;
            gameData.thew = data.thew;
            if ("exhaustsNum" in data)
                gameData.exhaustsNum = data.exhaustsNum;
            if ("discardsNum" in data)
                gameData.discardsNum = data.discardsNum;
            cc.log('使用卡牌：', data);
            that._uimgr.showTips('使用卡牌：', data);
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
            //data.mp
            //data.inHands
            //data.discardsNum
            combatMgr.curCombat.getSelf().Mp = data.mp;
            combatMgr.curCombat.getSelf().Thew = data.thew;

            combatMgr.getSelf().onUsePile(data.inHands);
            ui.ShowHandCards();
            //ui.UseCard(Card);
        });

        pomelo.on('onUseCardNotify', function(data){
            cc.log('别人使用卡牌：', data);
            var player = gameLogic.getCombatUnitForUid(data.uid);
            player.useCard(data);
        });
    
        pomelo.on('onFightAttriUpdate', function(data){
            for(var uid in data)
            {
                var player = gameLogic.getCombatUnitForUid(uid);
                var curdata = data[uid];
                cc.log('属性更新：',curdata.reason,'  data =',curdata);
                switch(curdata.reason)
                {
                    case consts.FightUpdateReason.onDamage :
                    player.onDamage(curdata.oriDamage,gameLogic.getCombatUnitForUid(curdata.attackID),curdata);
                    
                    var ui = that._uimgr.getCurMainUI();
                    ui.FreshHp();
                    break;
                    case consts.FightUpdateReason.skillEffective:
                    player.skillEffective(curdata);
                    break;
                }
            }
        });

        pomelo.on('onDrawCard', function(data){
            cc.log('抽牌', data);
            data.inHands = data.inHands || [];
          
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshCardsNum(data.cardsNum);
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        pomelo.on('onDrawCardNotify', function(data){
            cc.log('别人抽牌', data);
        });
    
        pomelo.on('onMpRecover', function(data){
            cc.log('灵力恢复', data);

            gameData.mp = data.mp;
            combatMgr.getSelf().Mp = data.mp;
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshMp(data.mp, true);
        });

        pomelo.on('onAddSpawnSummon', function(data){
            cc.log('增加召唤物', data);

            spawnSummoned.create(data);

        })

        pomelo.on('onUseSkill', function(data){
            cc.log('使用技能', data);

            var player = gameLogic.getCombatUnitForUid(data.caster);
            var target = new Array();

            for(var i in data.targets)
            {
                target.push(gameLogic.getCombatUnitForUid(data.targets[i]));
            }

            player.useSkill(data,target);
        });

        pomelo.on('onSpecificDrawCard', function(data){
            cc.log('指定抽卡', data);

            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        ///他人接收指定抽卡 更新手牌数
        pomelo.on('onSpecificDrawCardNotify', function(data){
            cc.log('别人指定抽卡', data);

            //var ui = that._uimgr.getCurMainUI();
            //combatMgr.getSelf().onDrawPile(data.inHands);
            //ui.ShowHandCards();
        });

        pomelo.on('onCreateCard', function(data){
            cc.log('生成卡牌', data);

            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        pomelo.on('onCreateCardNotify', function(data){
            cc.log('别人生成卡牌', data);
        });

        pomelo.on('onReverse', function(data){
            cc.log('回收召唤物伤害', data);

            var damage = new Array();

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
                    //    this.uimgr.loadDmg(this, deltaHp, true);
                    //}
                }
                damage[uid] = damageInfo;

                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid]);
            }

            spawnSummoned.collect(damage);
        });

        pomelo.on('onSwordWheel', function(data){
            cc.log('swordWheel伤害', data);

            //var player = gameLogic.getCombatUnitForUid(data.caster);
            // player.useSkill(data);

            for (var uid in data.damageInfo) {
                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid]);
            }

            spawnSummoned.Reset(data.summons);
            // summons重新布局 看data.summons
        });

        pomelo.on('onHeal', function(data){
            cc.log('治疗', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP,data.toHP - data.fromHp);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onRelive', function(data){
            cc.log('复活', data);
            /// 技能id data.sid  .casterHp 释放者的血量 .casterID 释放者 .hp 目标回复血量 .targetID 目标Id
            
            //var player = gameLogic.getCombatUnitForUid(data.casterID);
            //player.onHeal(data.toHP,data.toHP - data.fromHp);

            var target = gameLogic.getCombatUnitForUid(data.targetID);
            target.Relive(data.hp,data.hp);
        });

        pomelo.on('onBuffUpdate', function (data) {
            cc.log("Buff更新", data);
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if (player)
                player.buffUpdate(data.realID, data.info);
        });

        pomelo.on('onBuffModHp', function(data){
            cc.log('onBuffModHp', data);
            
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP,data.val);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onPropUpdate', function(data){
            cc.log('onPropUpdate', data);
            
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if(player != null)
                player.porpUpdate(data);
        });

        pomelo.on('onDropCard', function(data){
            cc.log('弃牌', data);
            data.inHands = data.inHands || [];
            combatMgr.getSelf().onUsePile(data.inHands);
            for (var info of data.dropInfo) {
                if (info.toPile === consts.PileType.CARDS) {
                    gameData.cardsNum ++;
                }
                else if (info.toPile === consts.PileType.DISCARDS) {
                    gameData.discardsNum ++;
                }
                else if (info.toPile === consts.PileType.EXHAUSTS) {
                    gameData.exhaustsNum ++;
                }
            }
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
        });

        pomelo.on('onDropCardNotify', function(data){
            cc.log('弃牌广播', data);

        });

        pomelo.on('onFightEnd', function(data){
            cc.log('战斗结束', data);

            //that._uimgr.loadUI(constans.UI.FightOver,function(){});
        });

        pomelo.on('onDie', function(data){
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onDie();
        });

        pomelo.on('onDungeonReconnect', function(data){
            cc.log('副本顶号重连', data);


        });

        pomelo.on('onAddMonsterSummon', function(data){
            cc.log('增加分身', data); 
            
            ///重置位置
            var player = gameLogic.getCombatUnitForUid(data.casterID);

            if (player.Pos !== data.casterPos) {
                if(player.teamid == combatMgr.curCombat.getSelf().teamid)
                {
                    combatMgr.curCombat.own[data.casterPos] = player;
                    delete combatMgr.curCombat.own[player.Pos];
                }
                else
                {
                    combatMgr.curCombat.enemy[data.casterPos] = player;
                    delete combatMgr.curCombat.enemy[player.Pos];
                }
            }

            player.onAddSummon(data.casterPos);

            ///初始化分身
            for(var i in data.newEnts){
                var uid = data.newEnts[i].uid;
                if(data.newEnts[i].hasOwnProperty('monsterid'))
                {
                    combatMgr.curCombat.units[uid] = new monster(data.newEnts[i],dataMgr.monster[data.newEnts[i].monsterid],combatMgr.curCombat.monsterMatrix.MatrixPos[data.newEnts[i].pos],player.teamid,combatMgr.curCombat,uid);
                    if(player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
                else
                {
                    combatMgr.curCombat.units[uid] = new hero(data.newEnts[i],dataMgr.heroAttributes[data.newEnts[i].heroid],combatMgr.curCombat.matrix.MatrixPos[data.newEnts[i].pos],player.teamid,combatMgr.curCombat,uid);
                    if(player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
            }
        });

        pomelo.on('onRemoveMonsterSummon', function(data){
            cc.log('移除分身', data);

            combatMgr.curCombat.units[data.entID].release();
            combatMgr.curCombat.units[data.entID] = null;
            delete(combatMgr.curCombat.units[data.entID]);

            var index = 0;
            for(var i in combatMgr.curCombat.own)
            {
                if(combatMgr.curCombat.own[i].uid == data.entID)
                {
                    index = i;
                }
            }

            if(index != 0)
            {
                delete combatMgr.curCombat.own[index];
                return;
            }

            for(var i in combatMgr.curCombat.enemy)
            {
                if(combatMgr.curCombat.enemy[i].uid == data.entID)
                {
                    index = i;
                }
            }

            if(index != 0)
            {
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