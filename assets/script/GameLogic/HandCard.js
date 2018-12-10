/**
 *      手牌类 驱动技能
 *      by pwh
 */

var dataMgr = require('DataMgr')
var Ability = require('Ability')
let skillHelper = require('skillHelper');
let constants = require('constants');

var HandCard = function (cardInfo, owner) {
    this.id = cardInfo.cid;
    this.lv = cardInfo.lv;
    this.mp = cardInfo.mp

    var card = dataMgr.card[this.id];
    this.skillData = dataMgr.skill[card.SkillID];
    this.data = card;
    this.skillName = card.CardName;
    this.owner = owner;
    this.ability = new Ability(this.skillData[1], owner);
}

HandCard.prototype.data = null;
HandCard.prototype.ability = null;

///检测是否能够释放技能
HandCard.prototype.Enable = function (cardIdx, targetID) {

    if (this.mp > this.owner.mp) {
        this.owner.curCombat.uiMgr.showTips('内力不足', cc.v2(0, 65));
        return false;
    }

    if (this.data.CastThew > this.owner.thew) {
        this.owner.curCombat.uiMgr.showTips('体力不足', cc.v2(0, 65));
        return false;
    }

    if (this.checkExtraOp(cardIdx, targetID)) {
        return false;
    }

    return true;
}

// 额外操作
HandCard.prototype.checkExtraOp = function (cardIdx, targetID) {
    let actions = skillHelper.getSkillAction(this.data.SkillID, 1, this.lv);
    if (actions.hasOwnProperty('dropCard')) {
        let uiMgr = cc.Canvas.instance.getComponent('UIMgr');
        uiMgr.loadUI(constants.UI.DropCard, function (ui) {
            ui.initData(cardIdx, targetID, actions['dropCard']);
        });
        return true;
    }
    return false;
};

HandCard.prototype.Active = function (Target, targets = null) {

    this.ability.Active(Target, targets);
    return this.ability;
}

HandCard.prototype.release = function () {
    this.skillName = null;
    this.skillData = null;
}

module.exports = HandCard;