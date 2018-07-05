/**
 *      手牌类 驱动技能
 *      by pwh
 */

var dataMgr = require('DataMgr')
var Ability = require('Ability')

var HandCard = function(id,owner){
    var skill = dataMgr.skill[id];
    this.skillName = skill['0'].SkillName;
    this.id = id;
    
    this.ability = new Ability(skill,owner);
}

HandCard.prototype.ability = null;

///检测是否能够释放技能
HandCard.prototype.Enable = function(Target){


    return false;
}

HandCard.prototype.Active = function(Target,targets){

    this.ability.Active(Target,targets);
    return this.ability;
}

module.exports = HandCard;