var combatMgr = require('CombatMgr')
var dataMgr = require('DataMgr')
var sceneMgr = require('SceneMgr')

var GameLogic = {
    get player(){
        return combatMgr.getSelf();
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
        
    },
    DrawPile : function(CombatUnit,Card){
        CombatUnit.onDrawPile(Card);
    },
    UsePile : function(CombatUnit,Card,target){
        CombatUnit.onUsePile(Card,target);
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
    },
    ShowDmg : function(dmg,from){
        
    }
}

module.exports = GameLogic;


