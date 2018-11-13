var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
       itemName : cc.Label,
       num : cc.Label,
       price : cc.Label,
       icon : cc.Sprite
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    initItem(item,parent){
        this.id = item.GoodId;
        this.parent = parent;

        this.itemName.string = item.Name;
        this.num.string = item.Num;
        this.price.string = item.Price;
        
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "ShopItem";
        clickEventHandler.handler = "buttonClick";
        clickEventHandler.customEventData = item;

        var buttonScr = this.node.getComponent(cc.Button);
        buttonScr.clickEvents.push(clickEventHandler);
        //icon ... fuck
    },
    buttonClick(event,customEventData){
        this.parent.showItem(customEventData);
    }
});
