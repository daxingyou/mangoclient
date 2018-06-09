var combat = require('Combat')

var CombatMgr = {
    
    curCombat : combat,

    Tick : function(){
        if(this.curCombat != null)
            curCombat.Tick();
    }
}

module.exports = CombatMgr;
