var uibase = require("UIBase");

cc.Class({
    extends: uibase,

    properties: {
        mp:cc.Sprite,
        cardAtlas:cc.SpriteAtlas,
        cardName:cc.Label,
        cardNum:cc.Label,
        _cruIndex:null,
    },
    initData(index,mp,cardName,cardNum) {
        this._cruIndex = index;
        this.mp.spriteFrame =  this.cardAtlas.getSpriteFrame("mp");
        this.cardName.string = cardName;
        this.cardNum.string = cardNum;
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
