var UIBase = require('UIBase')

cc.Class({
    extends: UIBase,

    properties: {
        GoodsContent : cc.Node,
        GoodsItem : cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for(var i =0;i<30;i++)
        {
            var item = cc.instantiate(this.GoodsItem);
            item.parent = this.GoodsContent;
        }
    },

    // update (dt) {},
});
