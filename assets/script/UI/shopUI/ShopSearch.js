var uibase = require('UIBase')
var shopItem = require('ShopItem2')

cc.Class({
    extends: uibase,

    properties: {
       leftRoot : cc.Node,
       rightRoot : cc.Node,
       leftItem : shopItem,
       rightItem : shopItem,
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    init(item){
        this.leftItem.init(item[1],item[2]);
        this.rightItem.init(item[3],item[4]);
    }
});
