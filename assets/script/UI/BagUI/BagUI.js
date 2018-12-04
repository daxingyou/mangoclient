var UIBase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
var dataMgr = require('DataMgr')
var back = require('backMainUI')
var eventMgr = require('eventMgr')
var bagData = require('bagData')
var bagSellProto = require('bagSellProto')
var bagUseProto = require('bagUseProto')
var net = require('NetPomelo')
var consts = require('consts')
var constant = require('constants')
var exchangeSilverProto = require('exchangeSilverProto')
var exchangePowerProto = require('exchangePowerProto')
cc.Class({
    extends: UIBase,

    properties: {

        goodsContent : cc.Node,
        goodsItem : cc.Prefab,
        num:200,
        _begin:true,
        resIndex:0,
        tips1:cc.Node,
        tips2:cc.Node, 
        _goodsScr:[],

        silverNum:cc.Label,
        goldNum:cc.Label,
        powerNum:cc.Label,

        priceTips:cc.Node,
        goodName:cc.Label,
        goodNum:cc.Label,
        goodDes:cc.Label,

        emptyTips: cc.Node,

        button1:cc.Node,
        button2:cc.Node,

        _selectGoodId:null,
        _ownCnt:null,
        _singlePrice:null,
        _sellCnt:null,
        _curCnt:null,
        _curIndex: 0,
        slider_sell: cc.Slider,
        selectNum:cc.Node,
        selectNumTit:cc.Label,
        ownNum:cc.Label,
        sellName:cc.Label,
        singlePrice:cc.Node,
        sellNum:cc.Node,
        sellPrice:cc.Node,
        
        
        _type:null,
        burn:cc.Node,
        infoMation:cc.Node,
        stopTouch: cc.Node,

        _curButton:1,
        _ownGold: 0,
        _ownSilver: 0,
        _ownPower: 0,

        showExchange: cc.Node,
        exchangeTit: cc.Label,
        bagIconAtlas : cc.SpriteAtlas,
        exIcon: cc.Sprite,
        exIconName: cc.Label,
        exDes: cc.Label,
        obtain0: cc.Node,
        obtain1: cc.Node,
        obtain2: cc.Node,
        obtain3: cc.Node,
        obtain4: cc.Node,
        obtain5: cc.Node,
        get: cc.Node,
        showGold: cc.Label,
        input: cc.EditBox,
        keyCode: cc.Node,
        _inputNum: 1,
        _exType:1,
        _selectedIdx: -1,
        _isNewGood: true,
        _curBtn: 0,
    },

    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.goodsInfo = {};
        eventMgr.on("refreshBag",this.refreshBag,this);
        eventMgr.on("refreshSilver",this.refreshSilver,this);
        eventMgr.on("stopUpTouch",this.stopUpTouch,this);
        this.prop = this.node.getChildByName('toggleGroup').getChildByName('prop');
        this.treasure = this.node.getChildByName('toggleGroup').getChildByName('treasure');
        this.initData();
        this._curBtn = 0;
     },

     initData () {
        let data = bagData.bagInfo['items'];
        this.goodsInfo = data;
        this.silverNum.string = bagData.silver;
        this.goldNum.string = bagData.gold;
        this.powerNum.string = bagData.power;
        this._ownSilver = bagData.silver;
        this._ownGold = bagData.gold;
        this._ownPower = bagData.power;
        if (Object.keys(bagData.refreshBag).length != 0) {
            this.refreshBag();
        }

        if (Object.keys(bagData.refreshMoney).length != 0) {
            this.refreshSilver(bagData.refreshMoney);
        }
        this.clickPro();
     },

     refreshBag() {
         let list = [];
        let data = bagData.refreshBag;
        for (let i in data) {
            this.goodsInfo[i] = data[i];
            let goods = dataMgr.item[i];
            this._updateGoodTips(goods.Type);
        }
        if (this._curButton == 1) {
            this.clickPro(); 
        }
        else if (this._curButton == 2) {
            this.clickTreasure();
        }
     },

     refreshSilver (data) {
         for (let i in data) {
             if (i == "silver") {
                this.silverNum.string = data[i];
                bagData.silver = data[i];
                this._ownSilver = data[i];
             }
             else if (i == "freeGold") {
                 this.goldNum.string = data[i];
                 this._ownGold = data[i];
                 bagData.gold = data[i];
             }
             else if (i == "power") {
                 this.powerNum.string = data[i];
                 this._ownPower = data[i];
                 bagData.power = data[i];
                 
             }
         }
     },

     backMainUI () {
        back.backMainUI();
     },

    clickPro () {
        this._curButton = 1;
        this._updateGoods(this._curButton);
    },


    clickTreasure () {
        this._curButton = 2;
        this._updateGoods(this._curButton);
    },

    clickToggle (event,cust) {
       
        let index = parseInt(cust);
        if (this._curBtn == index) {//在当前按钮
            cc.log("在当前anni,不需要刷新");
          //  return;
        }
    //   /  this._curButton = index;

    },

    _updateGoods (goodType) {
        this._goodsScr = [];
        let resIndex = 0;
        this._selectedIdx = -1;
        this.goodsContent.removeAllChildren();
        let len1 = this.prop.childrenCount;
        let len2 = this.treasure.childrenCount;
        if (len1 == 4 || len2 == 4) {//对应的按钮下添加红点提示
            this._isNewGood = true;
        }
        else {
            this._isNewGood = false;
        }

      
    //   /  cc.log(len1,len2);
        if (Object.keys(this.goodsInfo).length == 0) {
            this._emptyGood();
        }

        var sortedObj = Object.keys(this.goodsInfo).sort(function(a, b) {
            return dataMgr.item[b].Priority - dataMgr.item[a].Priority;
        });

        for (let j in sortedObj) {
            let i = sortedObj[j];
            if (this.goodsInfo[i].cnt !=0 ) {
            let goods = dataMgr.item[i];
            if (goods.Type == goodType) {
                var item = cc.instantiate(this.goodsItem);
                item.parent = this.goodsContent;
                let itemCom = item.getComponent('goodsItem');
                this._goodsScr.push(itemCom);
                resIndex++;
                this._goodsScr[resIndex - 1].initData(i,this.goodsInfo[i].cnt,this,resIndex-1);
            }   
            }
        }

    //    / cc.log(resIndex,"resIndex");
        if (resIndex > 0) {
            this._hadGoods();
            if (goodType == 1) {
                this.burn.active = false;
            }
            else {
                this.burn.active = true;
            }

            if (resIndex == 1) { // 只有一个 不用提示
                this._clearHotTips(true);
            }
            else {
                if (this._isNewGood) {
                    this._goodsScr[resIndex-1]._isNew = true;
                }   
            }
        }
        else {
            this._emptyGood();
        }

    },

    // 背包为空
    _emptyGood () {
        this._ownCnt = 0;
        this._sellCnt = 0;
        this.emptyTips.active = true;
        this.infoMation.active = false;
        return;
    },

    // 背包不为空
    _hadGoods () {
        this._goodsScr[0].select();
        this.showSelectGood(0);
        this.infoMation.active = true;
        this.emptyTips.active = false;
    },


    // 红点提示 type == 1 道具 == 2宝物
    _updateGoodTips (type) {
        let x,y;
        if (type == 1) {
            x = 24;
            y = 103;
            this._uiMgr.hotTips(x,y,this.prop);
            let len1 = this.prop.childrenCount;
            if (len1 == 4) {
                return;
            }
            else {
                this._uiMgr.hotTips(x,y,this.prop);
            }
        }
        else {
            x = 24;
            y = 103;
            let len2 = this.treasure.childrenCount;
            if (len2 == 4)
            return;
            else
            this._uiMgr.hotTips(x,y,this.treasure);
        }
    },

    // 检测是不是全部物品已经查看过
    _checkIsRead () {
        let isAllRead = true;
        let len = this._goodsScr.length;
        let i;
        if (len == 0) 
        return;
        else if (len == true) {
            
        }
        else {
            for (i = 0 ; i < len ; i++) {
                cc.log(this._goodsScr[i]._isNew)
                if (this._goodsScr[i]._isNew == true) {// 只要有一个为new
                    isAllRead = false;
                } 
            }
        }
        if (i == len) {
            this._clearHotTips(isAllRead);
        }
    },
    

    

    // 清除红点提示
    _clearHotTips(clear) {
        if (clear == true) {
            if (this._curButton == 1) {
                cc.log("清除");
                let len1 = this.prop.childrenCount;
                if (len1 == 3)
                return;
                else {
                    let hotTipsNode = this.prop.children[3];
                    hotTipsNode.parent = null;
                }
            }
            else {
                cc.log("清除掉2");
                let len2 = this.treasure.childrenCount;
                if (len2 == 3)
                return;
                else {
                    let hotTipsNode = this.treasure.children[3];
                    hotTipsNode.parent = null;
                }
            }
        }
    },

    start () {
      
    },

    // 显示详细的物品信息
    showSelectGood (index) {
        if (this._selectedIdx >= 0) {
            this._goodsScr[this._selectedIdx].unSelect();
        }
        let curGood = this._goodsScr[index];
        this._selectedIdx = index;
        this._checkIsRead();
        if (curGood._cnt != null) {
            this._selectGoodId = curGood._goodId;
            this._ownCnt = curGood._cnt;
            this.goodName.string = dataMgr.item[this._selectGoodId].Name;
            this.goodNum.string = curGood._cnt;
            this.goodDes.string = dataMgr.item[this._selectGoodId].Describe;
            let buttonArr = dataMgr.item[this._selectGoodId].Button;
            let use = this.node.getChildByName('information').getChildByName('use');
            let sell =  this.node.getChildByName('information').getChildByName('sell');
            if (buttonArr.length == 1) {
                sell.x = 413;
                sell.active = true;
                use.active = false;
            }
            else {
                sell.x = 274;
                sell.active = true;
                use.active = true;
            }

            for (let i = 0;i<buttonArr.length;i++) {
                let j = buttonArr[i];
                let k = i+1;
                if (j == consts.Bag.FUNC_SELL) {
                    this["button"+ k].getComponent(cc.Label).string = "出售";
                    this.priceTips.getComponent(cc.Label).string = "销售单价"+ dataMgr.item[this._selectGoodId].Price;
                }
                else if (j == consts.Bag.FUNC_USE) {
                    this.priceTips.active = false;
                    this["button"+ k].getComponent(cc.Label).string = "使用";
                }
                else if (j == consts.Bag.FUNC_SEE) {
                    sell.active = false;
                    this.priceTips.active = true;
                    this.priceTips.getComponent(cc.Label).string = "该道具不可售";
                }
                else if (j == consts.Bag.FUNC_EQUIPMENT) {
                    this.priceTips.active = false;
                    this["button" + k].getComponent(cc.Label).string = "装备";
                }
                else if (j == consts.Bag.FUNC_MELTING) {
                    this.burn.active = true;
                    this.priceTips.active = false;
                    this["button" + k].getComponent(cc.Label).string = "熔炼";
                }
            } 
        }
    },

    clickButton1 () {
        this.selectNum.active = true;
        this.sellPrice.active = true;
        this.ownNum.string ="数量" + this._ownCnt;
        this.slider_sell.progress = 1/this._ownCnt;
        this._sellCnt = 1;
        let data = dataMgr.item[this._selectGoodId];
        this.sellNum.getComponent(cc.Label).string = "数量:" + 1 + "/" +this._ownCnt;
        let buttonType = data.Button[0];
        this._checkButtonType(buttonType,data);
    },

    clickButton2 () {
        this.selectNum.active = true;
        this.singlePrice.active = false;
        this.sellPrice.active = false;
        let data = dataMgr.item[this._selectGoodId];
        this.slider_sell.progress = 1/this._ownCnt; 
        this.sellNum.getComponent(cc.Label).string = "数量:" + 1 + "/" +this._ownCnt; 
        let buttonType = data.Button[1];
        this._checkButtonType(buttonType,data);
        
    },

    _checkButtonType (buttonType,data) {
        if ( buttonType == consts.Bag.FUNC_SELL) {
            this.selectNumTit.string = "道具出售";
            this.singlePrice.active = true;
            this.singlePrice.getComponent(cc.Label).string ="出售单价"+ data.Price;
            this._singlePrice = data.Price;
            this.sellPrice.getComponent(cc.Label).string = "获得银两" + 1;
            this._type = 1;
        }
        else if (buttonType == consts.Bag.FUNC_USE) {
            this.singlePrice.active = false;
            this.sellPrice.active = false;
            this.selectNumTit.string = "道具使用";
            this._type = 2;
        }
        else if (buttonType == consts.Bag.FUNC_SEE) {
            this.singlePrice.active = false;
            this.sellPrice.active = false;
            this.selectNumTit.string = "查看";
            this._type = 3;
        }
        else if (buttonType == consts.Bag.FUNC_EQUIPMENT) {
            this.singlePrice.active = false;
            this.sellPrice.active = false;
            this.selectNumTit.string = "装备";
            this._type = 4;
        }
        else if (buttonType == consts.Bag.FUNC_MELTING) {
            this.singlePrice.active = false;
            this.sellPrice.active = false;
            this.selectNumTit.string = "熔炼";
            this._type = 5; 
        }
    },

    closeSelectNum () {
        this.selectNum.active = false;
    },

    stopUpTouch () {
        this.stopTouch.on(cc.Node.EventType.TOUCH_START, function () {
            return true;
        }, this);
    },

    comfrimSell () {
        let self = this;
        if (self._type == 1) {
            net.Request(new bagSellProto(self._selectGoodId,self._sellCnt), (data) => {
                cc.log("出售",data);
                if (data.code == 1) {
                    self._ownCnt -= self._sellCnt; 
                    self.clickPro();
                }
            });
        }
        else if (this._type == 2) {
            net.Request(new bagUseProto(this._selectGoodId,this._sellCnt), (data) => {
                cc.log("使用",data);
            });
        }
        this.selectNum.active = false;
        
    },


    _updateSellNum (progress) {
        if (progress < 0 || progress > 1) 
        return;
        this._sellCnt =  Math.floor(progress * this._ownCnt);
        this._curCnt = this._sellCnt;
        this.sellNum.getComponent(cc.Label).string = "数量:" + this._curCnt + "/" +this._ownCnt;
        this.sellPrice.getComponent(cc.Label).string = "获得银两:" + this._curCnt * this._singlePrice;
    },

    // 点击增加
    addSellNum () {
        let per = 1/this._ownCnt;
        this.slider_sell.progress += per;
        let pro = this.slider_sell.progress;
        if (pro >1) {
            this.slider_sell.progress = 1;
        }
        this._updateSellNum(pro);
        
    },
    // 点击减少
    subSellNum () {
        let per = 1/this._ownCnt;
        this.slider_sell.progress -= per;
        let pro = this.slider_sell.progress;
        if (pro < 0) {
            this.slider_sell.progress = 0;
        }
        this._updateSellNum(pro);
    },

    // 进度条
    onSliderHEvent (sender, eventType) {
        this._updateSellNum(sender.progress);
    },

    // 点击兑换
    clickExchange (event,cust) {
        this.showExchange.active = true;
        let index = cust;
        this._exType = index;
        let itemData = dataMgr.item[index];
        let obtArr = itemData.Obtain;
        this.exchangeTit.string = "获得" + itemData.Name;
        this.get.getChildByName('title').getComponent(cc.Label).string = "获得" + itemData.Name;
        if (this._ownGold == 0) {
            this.get.getChildByName('num').getComponent(cc.Label).string = 0;
            this.input.placeholder = 0;
        }
        else {
            if (index == 2) {
                this.get.getChildByName('num').getComponent(cc.Label).string = 100;
            }
            else if (index == 3) {
                this.get.getChildByName('num').getComponent(cc.Label).string = 10;
            }
        }
        
       // this.exIcon.spriteFrame = this.heroIconAtlas.getSpriteFrame(itemData.Icon);
       this.exIconName.string = itemData.Name;
       this.exDes.string = itemData.Describe;
       this.showGold.string = this._ownGold;

       for (let i = 0; i < obtArr.length; i++) {
           if (obtArr[i] == 1) {
               this["obtain" + i].active = true;
               this["obtain" + i].getComponent(cc.Label).string = "海中建木";
           }
           else if (obtArr[i] == 2) {
                this["obtain" + i].active = true;
                this["obtain" + i].getComponent(cc.Label).string = "成就人物";
           }
           else if (obtArr[i] == 3) {
                this["obtain" + i].active = true;
                this["obtain" + i].getComponent(cc.Label).string = "好友赠送";
           }
       } 
    },

    closeExchange () {
        this.showExchange.active = false;
    },

    // 点击输入
    inputNum () {
        this.keyCode.active = true;
        eventMgr.emit("stopUpTouch");
    },

    // 输入数字，显示小键盘
    editNum (event,cust) {
        let index = parseInt(cust);
        let num = this.input.string;
        this.input.string = num+index;

        let exchange = parseInt(this.input.string);
        if (this.input.string.length <=0) {
            exchange = 0;
            this.input.placeholder = '';
        }
        this._showEidt(exchange);
    },

    _showEidt (num) {
        if (this._exType == 3) {
            this._inputNum = num * 10;
        }
        else if (this._exType == 2) {
            this._inputNum = num * 100;
        }

        if (num > this._ownGold) {
            this.input.fontColor = cc.Color.RED;
        }
        else {
            this.input.fontColor = cc.Color.GREEN;
        }
        this.get.getChildByName('num').getComponent(cc.Label).string = this._inputNum;
    },

    // 点击完成
    clickOk () {
        eventMgr.off("stopUpTouch",this.stopTouch);
        this.keyCode.active = false;
    },

    // 删除输入
    clickClear () {
        let basic =  this.input.string.substring(0,this.input.string.length - 1);  
        this.input.string = basic;
        let exchange = parseInt(this.input.string);
        if (this.input.string.length <=0) {
            exchange = 0;
            this.input.placeholder = '';
        }
        this._showEidt(exchange);
    },

    //  确认兑换
    comfirmEx () {
        let self = this;
        if (self._inputNum == 0) {
            self._uiMgr.showTips("请输入数字");
            return;
        }
        if (self._exType == 2) {
            net.Request(new exchangeSilverProto (self._inputNum), (data) => {
                cc.log("兑换银两",data);
                if (data.code == 1) {
                    self.closeExchange();
                }
                else if(data.code == 0) {
                    self._uiMgr.showTips("元宝不足");
                } 
            });
        }
        else if (self._exType == 3) {
            net.Request(new exchangePowerProto (self._inputNum), (data) => {
                if (data.code == 1) {
                    self.closeExchange();
                }
                else if(data.code == 0) {
                    self._uiMgr.showTips("元宝不足");
                } 
            });
        } 
    },

    // 进入商店
    enterStore () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.Shop);
    },

    onDestroy() {
        eventMgr.off("refreshBag",this.refreshBag);
        eventMgr.off("refreshSilver",this.refreshSilver);
    },


   

   
     update (dt) { 
        // if (this._begin) {
        // if (this.resIndex >= 25) {
        //    var item = cc.instantiate(this.goodsItem);
        //    item.parent = this.goodsContent;
        //    this.resIndex++;
        //    let num = this.resIndex%5;
        //    if (num == 0) {
        //        this.goodsContent.height +=130;
        //    }
        //    if (this.goodsContent.childrenCount == 200) {
        //        this._begin = false;
        //        cc.log("加载完成");
              
        //        this.goodsContent.children[20].parent = null;
        //    }
        // }
        // }
   
},
});
