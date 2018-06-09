var combatMgr = require('CombatMgr')
/*
function GameLogic(){

}

GameLogic.prototype.combatMgr = combatMgr;
*/

var GameLogic = {
    Tick : function(){
        combatMgr.Tick();
    }
}

module.exports = GameLogic;


