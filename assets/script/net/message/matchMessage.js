var combatMgr = require('CombatMgr')//战斗相关
var gameLogic = require('GameLogic')//怪物相关
var consts = require('consts')
var gameData = require('DataCenter')
var spawnSummoned = require('SpawnSummoned')
var constant = require('constants')

var fight = {
    _uimgr : null,

    init : function(){
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        pomelo.on('onBeginSelect', function (data){//pomelo  全局发送和监听消息
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            var ui = that._uimgr.getCurMainUI();
            that._uimgr.showTips('匹配成功, 开始选英雄');
            ui.showSelect();//match.js
        });
    
        pomelo.on('onSelectHeroNotify', function (data){
            cc.log('%s选择英雄:%s', data.uid, data.heroid);
            that._uimgr.showTips('%s选择英雄:%s', data.uid, data.heroid);
        });
    
        pomelo.on('onConfirmHeroNotify', function (data){
            cc.log('%s确认英雄:%s', data.uid, data.heroid);
            that._uimgr.showTips('%s确认英雄:%s', data.uid, data.heroid);
        });
    
        pomelo.on('onEnterLoadCD', function (data){
            cc.log('加载前倒计时:',data);
            that._uimgr.showTips('加载前倒计时:');
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.beginLoadCD();
        });
    
        pomelo.on('onStartLoad', function(data){
            cc.log(data);
            cc.log(data.myInfo);
            var myInfo = data.myInfo;
            cc.log(myInfo + "myInfo");
            cc.log(myInfo.mp,myInfo.discardsNum,myInfo.exhaustsNum);
            gameData.mp = myInfo.mp;
            gameData.discardsNum = myInfo.discardsNum;
            gameData.exhaustsNum = myInfo.exhaustsNum;
            cc.log('开始加载战斗：', data.teamInfo, data.myInfo);
            that._uimgr.showTips('开始加载战斗：');
            combatMgr.initCombat(data);
            
            that._uimgr.release();
            that._uimgr.loadUI(constant.UI.Fight,function(data){
                combatMgr.curCombat.UILoadOk = true;
            })
        });
    
        pomelo.on('onFightBegin', function(data){
            cc.log('战斗开始 ',data);
            that._uimgr.showTips('战斗开始 ',data);
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData.mp,gameData.discardsNum,gameData.exhaustsNum);
            ui.ShowHandCards();
            gameLogic.init();
        });
    
        pomelo.on('onUseCard', function(data){
            cc.log('使用卡牌：', data);
            that._uimgr.showTips('使用卡牌：', data);
            var ui = that._uimgr.getCurMainUI();
            //cc.log(data.mp,data.discardsNum,data.exhaustsNum);//undifined 1 undifinded
            //cc.log(gameData.mp,gameData.discardsNum,gameData.exhaustsNum);
            gameData.discardsNum = data.discardsNum;
            ui.showNum(gameData.mp,gameData.discardsNum,gameData.exhaustsNum);
            //data.mp
            //data.inHands
            //data.discardsNum
           
            combatMgr.getSelf().onUsePile(data.inHands);
            ui.ShowHandCards();
            //ui.UseCard(Card);
        });
    
        pomelo.on('onFightAttriUpdate', function(data){
            cc.log('属性更新：',data);
            for(var uid in data)
            {
                var player = gameLogic.getCombatUnitForUid(uid);
                var curdata = data[uid];
                cc.log('属性更新：',curdata.reason );
                switch(curdata.reason)
                {
                    case consts.FightUpdateReason.useCard :
                    ////如果是当前玩家，不继续执行
                    if(uid != gameData.uuid)
                    {
                        player.useCard(curdata);
                    }
                    break;
                    case consts.FightUpdateReason.onDamage :
                    player.onDamage(curdata.oriDamage,gameLogic.getCombatUnitForUid(curdata.attackID),curdata);
                    break;
                    case consts.FightUpdateReason.porpUpdate :
                    ///targetID armor
                    player.porpUpdate(curdata);
                    break;
                    case consts.FightUpdateReason.skillEffective:
                    player.skillEffective(curdata);
                    break;
                    case consts.FightUpdateReason.buffUpdate:
                    //.realID  .info 
                    player = gameLogic.getCombatUnitForUid(uid);
                    player.buffUpdate(curdata);
                    break;
                }
            }
        });

        pomelo.on('onDrawCard', function(data){
            cc.log('抽牌', data);
            //that._uimgr.showTips('抽牌');
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshCardsNum(data.cardsNum);
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });
    
        pomelo.on('onMpRecover', function(data){
            //cc.log('灵力恢复', data);

            //var ui = that._uimgr.getCurMainUI();
            //ui.onFreshCardsNum(data.cardsNum);
        });

        pomelo.on('onAddSpawnSummon', function(data){
            cc.log('增加召唤物', data);

            spawnSummoned.create(data);

        })

        pomelo.on('onUseSkill', function(data){
            cc.log('使用技能', data);

            var player = gameLogic.getCombatUnitForUid(data.caster);
            player.useSkill(data);
        });

        pomelo.on('onSpecificDrawCard', function(data){
            //cc.log('指定抽卡', data);

            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        ///他人接收指定抽卡
        pomelo.on('onSpecificDrawCardNotify', function(data){
            //cc.log('指定抽卡', data);

        });

        pomelo.on('onCreateCard', function(data){
            cc.log('生成卡牌', data);


        });

        pomelo.on('onReverse', function(data){
            cc.log('回收召唤物伤害', data);

        });

        pomelo.on('onSwordWheel', function(data){
            cc.log('swordWheel伤害', data);

            var player = gameLogic.getCombatUnitForUid(data.caster);
            player.useSkill(data);
        });

        pomelo.on('onHeal', function(data){
            cc.log('治疗', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP,data.toHP - data.fromHp);
        });

        pomelo.on('onRelive', function(data){
            cc.log('复活', data);


        });

        pomelo.on('onBuffModHp', function(data){
            cc.log('onBuffModHp', data);
            
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP,data.val);
        });

        pomelo.on('onDropCard', function(data){
            cc.log('弃牌', data);

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


    },
    OnFreshPile : function(data)
    {
       
    }

}

module.exports = fight;