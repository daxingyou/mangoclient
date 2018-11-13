var uiBase = require('UIBase')
var shop = require('Shop')
var shopItemShow = require('ShopItemShow')
var shopSearch = require('ShopSearch')
var constant = require('constants')

cc.Class({
    extends: uiBase,

    properties: {
        _buttonPostion : 480,
        _buttonOffsetY : 80,
        _buttonOffsetX : -583,
        _curButtonNum : 0,
        _curShopData : null,

        _items : null,
        itemSearch : shopSearch,

        showType1 : cc.Node,
        showType2 : cc.Node,
        shopItemshow : shopItemShow,
        itemRoot : cc.Node,
        buttonPrefab : cc.Prefab,
        shopItemPrefab : cc.Prefab
    },

    onLoad () {
        this._curShopData = new Array();
        this._items = new Array();

        this.next = shop;
        this._curShopData['shop'] = this.next;

        this.curName = 'shop';
        this.loadShopScript();
        this.curName = 'shop';

        for(var i in shop)
        {
            var button = cc.instantiate(this.shopItemPrefab);
            button.parent = this.itemRoot;
            this._items.push(button.getComponent('ShopItem'));
        }

        this.freshGoods(1);
    },

    start () {

    },

    // update (dt) {},
    loadShopScript(){
        if(this.next != null)
        {
            this.initButton(this.next[1].Tittle,this.curName);
            this.curName = this.next[1].next;
            this.next = require(cc.js.formatStr(this.next[1].next));
            this._curShopData[this.curName] = this.next;
            if(this.next != null)
            {
                this.loadShopScript();
            }
        }
    },
    initButton(name,curName){
        var button = cc.instantiate(this.buttonPrefab);
        button.parent = this.node;
        button.position = cc.v2(this._buttonOffsetX,this._buttonPostion - this._curButtonNum * this._buttonOffsetY);
        button.getComponent('ShopButton').init(name);
        var buttonScr = button.getComponent(cc.Button);

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "ShopUI";
        clickEventHandler.handler = "leftButtonClick";
        clickEventHandler.customEventData = curName;

        buttonScr.clickEvents.push(clickEventHandler);

        this._curButtonNum++;
    },
    leftButtonClick(event,customEventData)
    {
        this.curName = customEventData;

        if(this._curShopData[this.curName][1].showType == 1)
        {
            this.showType1.active = true;
            this.showType2.active = false;
        }
        else if(this._curShopData[this.curName][1].showType == 2)
        {
            this.showType1.active = false;
            this.showType2.active = true;
        }

        this.freshGoods(this._curShopData[this.curName][1].showType);
    },
    freshGoods(type){
        var i =0;
        if(type == 1)
        {
            for(var item in this._curShopData[this.curName])
            {
                this._items[i].initItem(this._curShopData[this.curName][item],this);
                i++;
            }
        }
        else if(type == 2)
        {
            this.itemSearch.init(this._curShopData[this.curName]);
        }
    },
    showItem(item){
        this.shopItemshow.init(item);
        this.shopItemshow.show();
    },
    backsButton(){
        this._mgr.loadUI(constant.UI.Main,function(data){
        });
    }
});
