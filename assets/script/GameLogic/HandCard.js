/**
 *      手牌类 驱动技能
 *      by pwh
 */

var dataMgr = require('DataMgr')
var Ability = require('Ability')

var HandCard = function(id,owner){
    var card = dataMgr.card[id];
    var skill = dataMgr.skill[card.SkillID];
    this.skillName = card.CardName;
    this.spriteName = card.CardImage;
    this.id = id;
    
    this.ability = new Ability(skill,owner);
}

HandCard.prototype.ability = null;

///检测是否能够释放技能
HandCard.prototype.Enable = function(Target){


    return false;
}

HandCard.prototype.Active = function(Target,targets=null){

    this.ability.Active(Target,targets);
    return this.ability;
}

HandCard.prototype.release = function(){
    this.skillName = null;
    this.spriteName = null;
    
    //this.ability = ;
}

module.exports = HandCard;