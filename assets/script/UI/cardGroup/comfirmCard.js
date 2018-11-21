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
    },
    initData(index,cardName,cardNum,mp) {
        this._cruIndex = index;
        this.mp.spriteFrame =  this.cardAtlas.getSpriteFrame("mp2");
        this.cardName.string = cardName;
        this.cardNum.string = cardNum;
        this.mpLabel.string = mp;
        
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
