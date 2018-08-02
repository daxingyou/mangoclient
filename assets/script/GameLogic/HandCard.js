/**
 *      手牌类 驱动技能
 *      by pwh
 */

var dataMgr = require('DataMgr')
var Ability = require('Ability')

var HandCard = function(id,owner){
    var card = dataMgr.card[id];
    var skill = dataMgr.skill[card.SkillID];
    this.data = card;
    this.skillName = card.CardName;
    this.spriteName = card.CardImage;
    this.id = id;
    this.owner = owner;
    this.ability = new Ability(skill[1],owner);
}

HandCard.prototype.data = null;
HandCard.prototype.ability = null;

///检测是否能够释放技能
HandCard.prototype.Enable = function(){

    if(this.data.CastMP > 0)
    {
        if(this.owner.Mp >= this.data.CastMP)
        {
            return true;
        }
        else
        {
            this.owner.curCombat.UIMgr.showTips('灵力不足');
        }
    }

    if(this.data.CastThew > 0)
    {
        if(this.owner.Thew >= this.data.CastThew)
        {
            return true;
        }
        else{
            this.owner.curCombat.UIMgr.showTips('体力不足');
        }
    }

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