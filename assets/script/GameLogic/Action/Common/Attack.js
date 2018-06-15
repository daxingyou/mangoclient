var ActionBase = require('ActionBase')
var util = require('util');
var constant = require('constant')
var gameLogic = require('GameLogic')

var Attack = function(attrs,ability,owner)
{
    ActionBase.call(this);
}

Attack.prototype.constructor = Attack; // 需要修复下构造函数

Attack.prototype.enter = function(){
    if(this.action.Objective == constant.SkillTargetType.ALL)
    {
        var enemys = gameLogic.getEnemys(owner);

        for(var i =0 ;i<enemys.length;i++)
        {
            util.computeDamage(owner,enemys[i],this.attrs['dmg']);
        }
    }
    else if(this.action.Objective == constant.SkillTargetType.SINGEL)
    {
        util.computeDamage(owner,ability.target,this.attrs['dmg']);
    }/*
    else if(this.action.Objective == constant.SkillTargetType.SINGEL)
    {
        var enemys = gameLogic.getEnemys(owner);

        for(var i =0 ;i<enemys.length;i++)
        {
            util.computeDamage(owner,enemys[i],this.attrs['dmg']);
        }
    }*/
    //util.computeDamage(owner,ability.target,this.attrs['dmg']);
    exit();
}

module.exports = Attack;