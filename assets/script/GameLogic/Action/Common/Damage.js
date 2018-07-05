var ActionBase = require('ActionBase')
var constant = require('constants')
var utility = require('utility')
var CombatUtility = require('CombatUtility')

var Attack = function(attrs,ability,owner,action)
{
    ActionBase.call(this,attrs,ability,owner,action);
}

Attack.prototype.constructor = Attack; // 需要修复下构造函数

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = ActionBase.prototype;
    //将实例作为子类的原型
    Attack.prototype = new Super();
  })();

Attack.prototype.enter = function(){
    if(this.action.Objective.type == constant.SkillTargetType.ALL)
    {
        var enemys = CombatUtility.getEnemys(this.owner);

        for(var i =0 ;i<enemys.length;i++)
        {
            utility.computeDamage(this.owner,enemys[i],this.attrs['dmg']);
        }
    }
    else if(this.action.Objective.type == constant.SkillTargetType.SINGEL)
    {
        //console.log(this.action.attrs + 'attrs      ..');
        //this.ability.curTarget.onDamage(this.attrs['dmg']);
        utility.computeDamage(this.owner,this.ability.curTarget,this.attrs['dmg']);
    }/*
    else if(this.action.Objective == constant.SkillTargetType.SINGEL)
    {
        var enemys = gameLogic.getEnemys(owner);

        for(var i =0 ;i<enemys.length;i++)
        {
            util.computeDamage(owner,enemys[i],this.attrs['dmg']);
        }
    }*/
    else{
        console.error('this Objective is not found = '+this.action.Objective) 
    }
    //util.computeDamage(owner,ability.target,this.attrs['dmg']);
    
    this.exit();
}

module.exports = Attack;