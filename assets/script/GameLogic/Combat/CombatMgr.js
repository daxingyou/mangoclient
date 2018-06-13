/**
 *    战斗管理器
 *    管理所有战斗相关
 *    by pwh  
 */

var combat = require('Combat')
var constant = require('constant')
var PVECombat = require('PVECombat')

var CombatMgr = {
    curCombat : null,
    curIndex : 0,

    initCombat : function(combatType){
        if(combatType == constant.CombatType.PVECombat)
        {
            curCombat = new PVECombat();
        }
    },
    setMatrix : function (group){
        curCombat.init(group);
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
    Tick : function(){
        if(this.curCombat != null)
            curCombat.Tick();
    }
}

module.exports = CombatMgr;
