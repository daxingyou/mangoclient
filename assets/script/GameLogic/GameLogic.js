var combatMgr = require('CombatMgr')

var GameLogic = {
    startFight : function(type){
        combatMgr.initCombat(type);
    },
    Tick : function(){
        combatMgr.Tick();
    },

    getCombatUnitForUid : function(){
        
    }
}

module.exports = GameLogic;


