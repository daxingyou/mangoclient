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

HandCard.prototype.Active = function(Target){

    this.ability.Active(Target);
    return this.ability;
}

module.exports = HandCard;