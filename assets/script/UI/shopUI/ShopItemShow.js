/**
 *      道具展示
 *      by pwh
 */
var itemGood= require('Item')
var uibase = require('UIBase')

cc.Class({
    extends: uibase,

    properties: {
       icon : cc.Sprite,
       itemName : cc.Label,
       num : cc.Label,
       price : cc.Label,
       decrise : cc.Label
    },

    start () {
        var that = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            that.hide();
        })
    },
    init(item)
    {
        var ig = itemGood[item.GoodId];
        this.itemName.string = item.Name;
        this.num.string = item.Num;
        this.price.string = item.Price;
        this.itemName.string = ig.Describe;
    },
    // update (dt) {},
    buyGoods(){
        this.hide();
    }
});
