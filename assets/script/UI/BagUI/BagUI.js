var UIBase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
cc.Class({
    extends: UIBase,

    properties: {
        GoodsContent : cc.Node,
        GoodsItem : cc.Prefab,

    },

     onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
     },

     backMainUI () {
        this._uiMgr.loadUI(constant.UI.Main,function(data){
        });
    },

    start () {
        for(var i =0;i<30;i++)
        {
            var item = cc.instantiate(this.GoodsItem);
            item.parent = this.GoodsContent;
        }
    },

    clickGoods () {
        this.GoodsContent.removeAllChildren();
        for(var i =0;i<5;i++)
        {
            var item = cc.instantiate(this.GoodsItem);
            item.parent = this.GoodsContent;
        }
    },

    clickDaoju () {
        cc.log(dataCenter.allInfo.bagInfo);
        this.GoodsContent.removeAllChildren();
        for(var i =0;i<10;i++)
        {
            var item = cc.instantiate(this.GoodsItem);
            item.parent = this.GoodsContent;
        }
    },

     update (dt) {},
});
