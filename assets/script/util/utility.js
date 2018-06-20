var utility ={
    uiMgr : null,

    computeDamage : function(owner,target,dmg){
        if(this.uiMgr == null)
            this.uiMgr = cc.find('Canvas').getComponent('UIMgr');

        target.onDamage(dmg,owner);
        this.uiMgr.loadDmg(target,dmg);
    }
}

module.exports = utility;