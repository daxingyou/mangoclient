/**
 *    战斗管理器
 *    管理所有战斗相关
 *    by pwh  
 */

var consts = require('consts') 
var PVECombat = require('PVECombat')

var CombatMgr = {
    curCombat : null,
    curIndex : 0,

    initCombat : function(data){
        
        if(data.matchType == consts.MatchType.PVE_1)
        {
            //this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVE_2)
        {
            this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVE_3)
        {
            //this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVP)
        {
            //this.curCombat = new PVECombat();
        }

        this.curCombat.init(data);
    },
    setMatrix : function (group){
        this.curCombat.init(group);
    },
    getEnemys : function(){
        return this.curCombat.enemy;
    },
    getOwn : function(){
        return this.curCombat.own;
    },
    getSelf : function(){
        return this.curCombat.own[this.curCombat.curPlayerIndex];
    },
    getAbilityTarget : function(Objective){

    },
    Tick : function(dt){
        if(this.curCombat != null)
        {
            this.curCombat.Tick();

            for(var i in this.curCombat.enemy)
            {
                this.curCombat.enemy[i].tick(dt);
            }

            for(var i in this.curCombat.own)
            {
                this.curCombat.own[i].tick(dt);
            }
        }
    }
}

module.exports = CombatMgr;
