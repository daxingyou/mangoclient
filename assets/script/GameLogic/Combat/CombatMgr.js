/**
 *    战斗管理器
 *    管理所有战斗相关
 *    by pwh  
 */

var constant = require('constant')
var PVECombat = require('PVECombat')

var CombatMgr = {
    curCombat : null,
    curIndex : 0,

    initCombat : function(combatType){
        if(combatType == constant.CombatType.PVECombat)
        {
            this.curCombat = new PVECombat();
        }
    },
    setMatrix : function (group){
        this.curCombat.init(group);
    },
    getEnemys : function(){
        return this.curCombat.enemy;
    },
    getOwn : function(){
        return this.curCombat,own;
    },
    getSelf : function(){
        return this.curCombat,own[0];
    },
    Tick : function(dt){
        if(this.curCombat != null)
        {
            this.curCombat.Tick();

            for(var i = 0;i<this.curCombat.enemy.length;i++)
            {
                this.curCombat.enemy[i].tick(dt);
            }

            for(var i = 0;i<this.curCombat.own.length;i++)
            {
                this.curCombat.own[i].tick(dt);
            }
        }
    }
}

module.exports = CombatMgr;
