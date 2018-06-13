var combatMgr = require('CombatMgr')
var dataMgr = require('DataMgr')
var sceneMgr = require('SceneMgr')

var GameLogic = {
    get Player(){
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
    Tick : function(){
        combatMgr.Tick();
    },
    getCombatUnitForUid : function(uid){
        
    },
    UsePile(CombatUnit,Card,target){
        
    }
}

module.exports = GameLogic;


