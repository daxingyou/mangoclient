var combatMgr = require('CombatMgr')
var dataMgr = require('DataMgr')

var GameLogic = {
    startFight : function(type,dungeonid){
        combatMgr.initCombat(type);

        var dungeon = dataMgr.dungeon[dungeonid];

        if(dungeon == null)
            cc.error('faild dungeonid = ',dungeonid);
        
    },
    Tick : function(){
        combatMgr.Tick();
    },

    getCombatUnitForUid : function(){

    }
}

module.exports = GameLogic;


