var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
        itemName : cc.Label,
        icon : cc.Sprite,
        cdTime : cc.Label,
        priceOne : cc.Label,
        priceTen : cc.Label
    },

    // onLoad () {},

    start () {

    },
    init(one,ten){
        this.itemName.string = one.Name;
        //this.icon.string = one.Name;
        this.cdTime.string = '0:00';
        this.priceOne.string = one.Price;
        this.priceTen.string = ten.Price;
    },
    buy1 (){

    },
    buy10(){

    }
    // update (dt) {},
});
