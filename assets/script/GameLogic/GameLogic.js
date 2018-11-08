var combatMgr = require('CombatMgr')
var dataMgr = require('DataMgr')
var sceneMgr = require('SceneMgr')
var constant = require('constants')
var playCardMessage = require('playCardProto')
var net = require('NetPomelo')

var GameLogic = {
    get player(){
        return combatMgr.getSelf();
    },
    init(){
        this.fightUI = cc.find('Canvas/visibleArea/ui/FightUI').getComponent('FightUI');
    },
    startFight : function(type,dungeonid){
        var dungeon = dataMgr.dungeon[dungeonid];

        if(dungeon == null){
            cc.error('faild dungeonid = ',dungeonid);
            return;
        }

        combatMgr.initCombat(type);
        
        ////SceneID , MonsterGroup
        ////场景加载完成实例化怪物
        sceneMgr.loadScene(dungeon.SceneID,function(){
            var group = dataMgr.group[dungeon.MonsterGroupID];

            ///怪物阵型
            combatMgr.setMatrix(group);
        });
    },
    Tick : function(dt){
        combatMgr.Tick(dt);
    },
    getCombatUnitForUid : function(uid){
        if(combatMgr.curCombat.units.hasOwnProperty(uid))
            return combatMgr.curCombat.units[uid];
        /*
        for(var i in combatMgr.getEnemys())
        {
            if(combatMgr.getEnemys()[i].uid == uid)
                return combatMgr.getEnemys()[i];
        }

        for(var i in combatMgr.getOwn())
        {
            if(combatMgr.getOwn()[i].uid == uid)
                return combatMgr.getOwn()[i];
        }
        */
        return null;
    },
    DrawPile : function(CombatUnit,Card){
        CombatUnit.onDrawPile(Card);
    }, 
    UsePile : function(CombatUnit,Card,target,targets,curCardid,curObjective){

        if(CombatUnit.handsPile[Card].Enable())
        {
            if(curObjective == constant.SkillTargetType.SINGEL)
            {
                net.Request(new playCardMessage(Card,curCardid,target.uid));
            }
            else{
                net.Request(new playCardMessage(Card,curCardid,''));
            }
            
            //CombatUnit.onUsePile(Card,target,targets);
            //this.fightUI.UseCard(Card);
            cc.log('GameLogic里面的Card');
        }
    },
    getEnemys : function(CombatUnit){
        if(CombatUnit.teamid == this.player.teamid)
        {
            return combatMgr.getEnemys();
        }
        else
        {
            return combatMgr.getOwn();
        }
    },  ///通过站位获取目标
    getEnemys : function(CombatUnit,pos){
        if(CombatUnit.teamid == this.player.teamid)
        {
            var result = null;
            var length = combatMgr.getEnemys().length;

            if(pos > length)
            {
                result = combatMgr.getEnemys();
            }
            else 
            {
                result = combatMgr.getEnemys()[pos -1];
            }
            return result;
        }
        else
        {
            return combatMgr.getOwn();
        }
    }
}

module.exports = GameLogic;


