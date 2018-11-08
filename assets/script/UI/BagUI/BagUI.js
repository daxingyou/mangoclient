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
        
    },

    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.goodsInfo = {};
        this.initData();
        eventMgr.on("refreshBag",this.refreshBag,this);
        eventMgr.on("refreshSilver",this.refreshSilver,this);
        eventMgr.on("stopUpTouch",this.stopUpTouch,this);
     },

     initData () {
        let data = bagData.bagInfo['items'];
        this.goodsInfo = data;
        this.silverNum.string = bagData.silver;
        this.goldNum.string = bagData.gold;
        this.powerNum.string = bagData.power;
        this._ownSilver = bagData.silver;
        this._ownGold = bagData.gold;
        this._ownPower = bagData.power

        if (Object.keys(bagData.refreshBag).length != 0) {
            this.refreshBag();
        }

        if (Object.keys(bagData.refreshMoney).length != 0) {
            this.refreshSilver(bagData.refreshMoney);
        }
        this.clickPro();
     },

     refreshBag() {
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
        cc.log(this.goodsInfo,"this.goodsInfo");
     },

     refreshSilver (data) {
         for (let i in data) {
             if (i == "silver") {
                this.silverNum.string = data[i];
                this._ownSilver = data[i];
             }
             else if (i == "freeGold") {
                 this.goldNum.string = data[i];
                 this._ownGold = data[i];
             }
             else if (i == "power") {
                 this.powerNum.string = data[i];
                 this._ownPower =data[i];
                 
             }
         }
     },

     backMainUI () {
        back.backMainUI();
     },

    clickPro () {
        this._curButton = 1;
        this.goods = [];
        this._goodsScr = [];
        let resIndex = 0;
        this.goodsContent.removeAllChildren();
        this._selectedIdx = -1;
        let list = [];
        if (Object.keys(this.goodsInfo).length == 0) {
            this._emptyGood();
        }
        for (let i in this.goodsInfo) {
            if (this.goodsInfo[i].cnt !=0 ) {
            let goods = dataMgr.item[i];
            if (goods.Type == 1) {
                var item = cc.instantiate(this.goodsItem);
                item.parent = this.goodsContent;
                let itemCom = item.getComponent('goodsItem');
                this._goodsScr.push(itemCom);
                resIndex++;
                list.push(goods);
                this._goodsScr[resIndex - 1].initData(i,this.goodsInfo[i].cnt,this,resIndex-1);
            }   
            }
        }
        list.sort(function (a, b) {
            return b.Priority - a.Priority;
        });
        if (resIndex > 0) {
            this._hadGoods();
            this.burn.active = false;
        }
        else {
            this._emptyGood();
        }
    },

    clickTreasure () {
        this._curButton = 2;
        this.goods = [];
        this._goodsScr = [];
        let resIndex = 0;
        this._selectedIdx = -1;
        this.goodsContent.removeAllChildren();
        if (Object.keys(this.goodsInfo).length == 0) {
            this._emptyGood();
        }
        for (let i in this.goodsInfo) {
            if (this.goodsInfo[i].cnt != 0) {
                let goods = dataMgr.item[i];
                if (goods.Type == 2) {
                    var item = cc.instantiate(this.goodsItem);
                    item.parent = this.goodsContent;
                    let itemCom = item.getComponent('goodsItem');
                    this._goodsScr.push(itemCom);
                    resIndex++;
                    this._goodsScr[resIndex - 1].initData(i,this.goodsInfo[i].cnt,this,resIndex-1);
                }
            }
        }
        if (resIndex > 0) {
            this._hadGoods();
            this.burn.active = true;
        }
        else {
           this._emptyGood();
        }
    },

    _emptyGood () {
        this._ownCnt = 0;
        this._sellCnt = 0;
        this.emptyTips.active = true;
        this.infoMation.active = false;
        return;
    },

    _hadGoods () {
        this._goodsScr[0].select();
        this.showSelectGood(0);
        this.infoMation.active = true;
        this.emptyTips.active = false;
    },

    _updateGoodTips (type) {
        this["tips" + type].active = true;
    },

    start () {
      
    },


    showSelectGood (index) {
        if (this._selectedIdx >= 0) {
            this._goodsScr[this._selectedIdx].unSelect();
        }
        let curGood = this._goodsScr[index];
        this._selectedIdx = index;
        if (curGood._cnt !=null) {
            this._selectGoodId = curGood._goodId;
            this._ownCnt = curGood._cnt;
            this.goodName.string = dataMgr.item[this._selectGoodId].Name;
            this.goodNum.string = curGood._cnt;
            this.goodDes.string = dataMgr.item[this._selectGoodId].Describe;
            let buttonArr = dataMgr.item[this._selectGoodId].Button;
            
            for (let i = 0;i<buttonArr.length;i++) {
                let j = buttonArr[i];
                if (buttonArr.length == 1) {
                    this.node.getChildByName('information').getChildByName('use').active = false;
                }
                else {
                    this.node.getChildByName('information').getChildByName('use').active = true;
                }
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
                    this.priceTips.active = false;
                    this["button" + k].getComponent(cc.Label).string = "查看";
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
        this.checkButtonType(buttonType,data);
    },

    clickButton2 () {
        this.selectNum.active = true;
        this.singlePrice.active = false;
        this.sellPrice.active = false;
        let data = dataMgr.item[this._selectGoodId];
        this.slider_sell.progress = 1/this._ownCnt; 
        this.sellNum.getComponent(cc.Label).string = "数量:" + 1 + "/" +this._ownCnt; 
        let buttonType = data.Button[1];
        this.checkButtonType(buttonType,data);
        
    },

    checkButtonType (buttonType,data) {
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
      // cc.log(this._type,this._selectGoodId,this._sellCnt,"type,goodid,sellCnt");
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
        
        this.sellNum.getComponent(cc.Label).string = "数量:" + parseInt(progress * this._ownCnt) + "/" +this._ownCnt;
        this.sellPrice.getComponent(cc.Label).string = "获得银两:" + parseInt(progress * this._ownCnt) * this._singlePrice;
        this._sellCnt =  Math.floor(progress * this._ownCnt);
    },

    addSellNum () {
      
        // this._curCnt++;
        // this._curCnt / this._ownCnt;
        let per = 1/this._ownCnt;
        this.slider_sell.progress += per;
        let pro = this.slider_sell.progress;
        if (pro >1) {
            this.slider_sell.progress = 1;
        }
        this._updateSellNum(pro);
        
    },

    subSellNum () {
    
        let per = 1/this._ownCnt;
        this.slider_sell.progress -= per;
        let pro = this.slider_sell.progress;
        if (pro < 0) {
            this.slider_sell.progress = 0;
        }
        this._updateSellNum(pro);
       
    },

    onSliderHEvent (sender, eventType) {
        this._updateSellNum(sender.progress);
    },


    clickExchange (event,cust) {
        this.showExchange.active = true;
        let index = cust;
        this._exType = index;
        let itemData = dataMgr.item[index];
        let obtArr = itemData.Obtain;
        this.exchangeTit.string = "获得" + itemData.Name;
        this.get.getChildByName('title').getComponent(cc.Label).string = "获得" + itemData.Name;
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

    inputNum () {
        this.keyCode.active = true;
        eventMgr.emit("stopUpTouch");
    },

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

    clickOk () {
        eventMgr.off("stopUpTouch",this.stopTouch);
        this.keyCode.active = false;
    },

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

    enterStore () {
        this._uiMgr.release();
        let self = this;
        this._uiMgr.loadUI(constant.UI.GoldStore,function(data){
            data.init (self._ownGold,self._ownSilver); 
        });
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
