/**
 *      手牌类 驱动技能
 *      by pwh
 */

var dataMgr = require('DataMgr')
var Ability = require('Ability')

var HandCard = function (cardInfo, owner) {
    this.id = cardInfo.cid;
    this.lv = cardInfo.lv;
    this.mp = cardInfo.mp

    var card = dataMgr.card[this.id];
    var skill = dataMgr.skill[card.SkillID];
    this.data = card;
    this.skillName = card.CardName;
    this.spriteName = card.CardImage;
    this.owner = owner;
    this.ability = new Ability(skill[1], owner);
}

HandCard.prototype.data = null;
HandCard.prototype.ability = null;

///检测是否能够释放技能
HandCard.prototype.Enable = function () {

    if (this.mp > this.owner.mp) {
        this.owner.curCombat.uiMgr.showTips('灵力不足', cc.v2(0, 65));
        return false;
    }

    if (this.data.CastThew > this.owner.thew) {
        this.owner.curCombat.uiMgr.showTips('体力不足', cc.v2(0, 65));
        return false;
    }

    return true;
}

HandCard.prototype.Active = function (Target, targets = null) {

    this.ability.Active(Target, targets);
    return this.ability;
}

HandCard.prototype.release = function () {
    this.skillName = null;
    this.spriteName = null;
}

module.exports = HandCard;