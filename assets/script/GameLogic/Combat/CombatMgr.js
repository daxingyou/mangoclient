var combat = require('Combat')
var constant = require('constant')
var PVECombat = require('PVECombat')

var CombatMgr = {
    curCombat : null,
    initCombat : function(combatType){
        if(combatType == constant.CombatType.PVECombat)
        {
            curCombat = new PVECombat();
        }
    },
    Tick : function(){
        if(this.curCombat != null)
            curCombat.Tick();
    }
}

module.exports = CombatMgr;
