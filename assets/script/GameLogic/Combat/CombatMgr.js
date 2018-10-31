/**
 *    战斗管理器
 *    管理所有战斗相关
 *    by pwh  
 */

var consts = require('consts') 
var constant = require('constants')
var PVECombat = require('PVECombat')
var PVPCombat = require('PVPCombat')

var CombatMgr = {
    curCombat : null,
    curIndex : 0,
    initCombat : function(data){
        if(data.matchType == consts.MatchType.PVE && data.matchNum === 1)
        {
            this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVE && data.matchNum === 2)
        {
            this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVE && data.matchNum === 3)
        {
            this.curCombat = new PVECombat();
        }
        else if(data.matchType == consts.MatchType.PVP)
        {
            this.curCombat = new PVPCombat();
        }
      //  cc.log(data,"---------------data in CombatMgr");
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
        //cc.log('own num  == ' ,this.curCombat.own ,'  cur PlayerIndex = ',this.curCombat.curPlayerIndex);
        return this.curCombat.own[this.curCombat.curPlayerIndex];
    },
    getAbilityTarget : function(Objective){
        if(Objective.type == constant.SkillTargetType.SELF)
            return this.getSelf();
        else if(Objective.type == constant.SkillTargetType.ALL)
        {
            var result = Objective.team == constant.own ? this.curCombat.own : this.curCombat.enemy;
            return result;
        }
        else if(Objective.type == constant.SkillTargetType.LowHP)
        {
            var temp = 99999999;
            var result = null;
            if(Objective.team == constant.own)
            {
                for (const key in this.curCombat.own) {
                    if (this.curCombat.own.hasOwnProperty(key)) {
                        const element = this.curCombat.own[key];
                        if(element.Hp < temp)
                        {
                            temp = element.Hp;
                            result = element;
                        }
                    }
                }
            }
            else if(Objective.team == constant.enemy)
            {
                for (const key in this.curCombat.enemy) {
                    if (this.curCombat.enemy.hasOwnProperty(key)) {
                        const element = this.curCombat.enemy[key];
                        if(element.Hp < temp)
                        {
                            temp = element.Hp;
                            result = element;
                        }
                    }
                }
            }

            return result;
        }
        else if(Objective.type == constant.SkillTargetType.SINGEL)
        {
            var result = Objective.team == constant.own ? this.curCombat.own : this.curCombat.enemy;
            return result;
        }
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
    },
    Release : function(){
        this.curCombat.Release();
    }
}

module.exports = CombatMgr;
