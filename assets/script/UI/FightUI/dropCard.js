/*
 * @Author: liuguolai 
 * @Date: 2018-12-04 19:19:12 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-05 16:44:50
 * 弃牌界面
 */
let UIBase = require('UIBase');
let eventMgr = require('eventMgr');
let combatMgr = require('CombatMgr');
let utility = require('utility');
let playCardMessage = require('playCardProto')
let net = require('NetPomelo')

cc.Class({
    extends: UIBase,

    properties: {
        cardList: [cc.Node],
        cancelBtn: cc.Button,
        dropBtn: cc.Button,
        cntLabel: cc.Label
    },

    onLoad() {
        this._super();
        this.addCommonBackBtn('选择手牌', this.hide.bind(this));
        this.cancelBtn.node.on('click', this._onCancelBtnClicked, this);
        this.dropBtn.node.on('click', this._onDropBtnClicked, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            return true;
        });
        for (i = 0; i < this.cardList.length; i++) {
            let item = this.cardList[i];
            item.on(cc.Node.EventType.TOUCH_START, this._onCardClicked.bind(this, item));
        }
    },

    onEnable() {
        eventMgr.on(eventMgr.events.EventHandCardUpdate, this._onHandCardUpdate, this);
    },

    onDisable() {
        eventMgr.off(eventMgr.events.EventHandCardUpdate, this._onHandCardUpdate);
    },

    _onHandCardUpdate(handsPile) {
        this._refresh(handsPile);
    },

    initData(cardIdx, targetID, data) {
        this.cardIdx = cardIdx;
        this.targetID = targetID;
        this._curNum = 0;
        this.selectedCardIdx = [];
        this.num = data.num;  // 弃牌数
        this.cardType = data.cardType;
        this.cardQuality = data.cardQuality;
        this.cardAttributes = data.cardAttributes;
        this._refresh(combatMgr.getSelf().handsPile);
    },

    _isValid(idx, handCard) {
        if (idx == this.cardIdx)
            return false;
        let cardData = handCard.data;
        if (this.cardType && this.cardType !== cardData.CardType)
            return false;
        if (this.cardQuality && this.cardQuality !== cardData.CardQuality)
            return false;
        if (this.cardAttributes && cardData.CardAttributes.indexOf(this.cardAttributes) === -1)
            return false;
        return true;
    },

    _refresh(handsPile) {
        this.handsPile = handsPile;
        let i = 0, idx = 0;
        for (i = 0; i < handsPile.length; i++) {
            if (this._isValid(i, handsPile[i])) {
                let item = this.cardList[idx++];
                item.active = true;
                let bSelect = this.selectedCardIdx.indexOf(i) !== -1;
                item._selected = bSelect;
                item._cardIdx = i;
                item.getComponent('CardItem').initData(
                    i, handsPile[i], bSelect, this);
            }
        }
        for (; idx < this.cardList.length; idx++) {
            this.cardList[idx].active = false;
        }
        this._updateBtnInfo();
    },

    _updateBtnInfo() {
        this.cntLabel.string = this._curNum + '/' + this.num;
    },

    _onCardClicked(cardItem) {
        let cardIdx = cardItem._cardIdx, selected = cardItem._selected;
        if (!selected && this._curNum >= this.num) {
            this._uiMgr.showTips(utility.T(1207));
            return;
        }
        selected = !selected;
        if (selected) {
            this._curNum++;
            this.selectedCardIdx.push(cardIdx);
        }
        else {
            this._curNum--;
            this.selectedCardIdx.splice(this.selectedCardIdx.indexOf(cardIdx), 1);
        }
        cardItem._selected = selected;
        cardItem.getComponent('CardItem')._canUse = selected;
        this._updateBtnInfo();
    },

    _onCancelBtnClicked(btn) {
        this.hide();
    },

    _onDropBtnClicked(btn) {
        let cards = [];
        for (let cardIdx of this.selectedCardIdx) {
            cards.push({
                idx: cardIdx,
                cid: this.handsPile[i].id
            })
        }
        net.Request(new playCardMessage(this.cardIdx, this.handsPile[this.cardIdx].id, this.targetID, cards));
        this._onCancelBtnClicked();
    }
});
