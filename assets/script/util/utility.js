var combatmgr = require('../Combat/CombatMgr')

var utility ={
    uiMgr : null,

    computeDamage : function(owner,target,dmg){
        if(this.uiMgr == null)
            this.uiMgr = cc.find('Canvas').getComponent('UIMgr');

        target.onDamage(dmg,owner);
        this.uiMgr.loadDmg(target,dmg);
    },
    getAbilityTarget : function(object,owner){
        combatmgr.getAbilityTarget(object,owner);
    }
}

module.exports = utility;