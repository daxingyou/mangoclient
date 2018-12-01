var uibase = require("UIBase");

cc.Class({
    extends: uibase,

    properties: {
        mp:cc.Sprite,
        cardAtlas:cc.SpriteAtlas,
        cardName:cc.Label,
        cardNum:cc.Label,
        _cruIndex:null,
        mpLabel: cc.Label,
        _cardId:null,
        _cardNum: null,
    },
    initData(index,cardName,cardNum,mp,cardId) {
        this._cruIndex = index;
        this.mp.spriteFrame =  this.cardAtlas.getSpriteFrame("mp2");
        this.cardName.string = cardName;
        this._cardNum = cardNum;
        this.cardNum.string = cardNum;
        this.mpLabel.string = mp;
        this._cardId = cardId; 
    },

    addNum () {
        this._cardNum += 1;
        this.cardNum.string = this._cardNum;
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
