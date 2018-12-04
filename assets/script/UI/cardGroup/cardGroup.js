let uibase = require('UIBase')
let constant = require('constants')
let dataMgr = require('DataMgr')
let hero = require('Hero')
let fightData = require('fightData')
let eventMgr = require('eventMgr');
let net = require('NetPomelo')
let cardUpgradeProto = require('cardUpgradeProto');
let playerData = require('playerData')
let cardGroupData = require('cardGroupData')
let bagData = require('bagData')
let consts = require('consts')
let UIConsts = require('UIConsts')

cc.Class({
    extends: uibase,

    properties: {
        //翻页
        target: cc.PageView,
        pageTeample: cc.Prefab,
        _curPageNum: 0,
        _curPageTotal: 10,
        pageIndex:cc.Label,
        pageContent:cc.Node,
        _page:[],
        
        // 右边英雄名
        heroContent: cc.Node,
        heroNameItem : cc.Prefab,
        _heroNameSrc : [],
        _selectedIdx: -1,
        _curHeroIndex: -1,

        // 卡牌查看
        _firstInitCard: true,
        desCard: cc.Node,
        _cardSrc: [],
    
        // 确认,移动,升级
        _comfrimCardNum: 0,
        comfrimCard: cc.Label,
        _cid: [], // 当前英雄的所有cardID
        _copyCardSrc : [],
        _moveCard: false,
        lookDesCardId: null, // 当前查看状态的卡牌id
        _selectHeroName: null,
        _needSilver: 0,
        _needCard: 0,
      
        _curCardLevel: 0,
        _comfrimCard: [],
        _comfrimCardId: [], // 已经添加了的卡牌ID

        //排序
        _sortStatus:0,
        sortedObj:[],
    },


     onLoad () {
       
        this._sortStatus = 0;
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.cardUp = this.node.getChildByName('cardUpgrade');
        this.cardUpBtn = this.node.getChildByName('upgrade');
        this.close = this.node.getChildByName('close');
        this.nextBtn = this.node.getChildByName('next');
        this.prevBtn = this.node.getChildByName('prev');
        this.sortBtn = this.node.getChildByName('sort')

        this.prevBtn.active = false;
        this.loadHero();
        eventMgr.on("upGradeCardEnd",this.upGradeCardEnd,this);
     },



     //初始加载所有卡牌
     loadCard (heroId) {
        var self = this;
        let allCardInfo = playerData.cardGroupData.cardInfo;
        let selectedCardInfo = {};
        if (heroId != undefined) {//筛选
            for (let id in allCardInfo) { 
                let idx = dataMgr.card[id].HeroID;
                if (heroId == idx) {
                    selectedCardInfo[id] = allCardInfo[id];
                }
            }
        }
        else {
            selectedCardInfo = allCardInfo;
        }
        self._commonLoadCard(selectedCardInfo);
     },

     _commonLoadCard (cardInfo) {
        // cc.log(cardInfo,"cardIngfo");
        let self = this;
        let resIndex = 0;
        self._cardSrc = [];
        self._cid = [];
        self._curCardInfo = {};
        self.resetPage();
        self.resetSort();
        let len = Object.keys(cardInfo).length;
        let allPage = Math.ceil(len / 8);
        self._curPageTotal = allPage;
        self.resetPage();
        self.onAddPage();
        let pageNum = self.pageContent.children;
        let itemData;
        cc.loader.loadRes('UI/cardGroup/cardItem', function (errorMessage, loadedResource) {
            for (let cardId in cardInfo) {
                let item = cc.instantiate(loadedResource);
                resIndex++;

                if (resIndex <= 8) {
                    pageNum[0].addChild(item);
                }
                else if (resIndex > 8 && resIndex <= 16) {
                    pageNum[1].addChild(item);
                }
                else {
                    pageNum[2].addChild(item);
                }
                if (self.sortedObj.length != 0) {
                    itemData = dataMgr.card[self.sortedObj[resIndex-1]];
                }
                else {
                    itemData = dataMgr.card[cardId];
                }
               
                let checkHasCnt;
                checkHasCnt = Object.keys(itemData).length;
             
                if (checkHasCnt == 20) {
                    itemData.cnt = cardInfo[cardId].cnt;
                    itemData.level = cardInfo[cardId].level;
                }
                
                self._curCardInfo[cardId] = itemData;//用于切换排序
              
              //  if (self._firstInitCard) {
                    if (itemData.CastMP < 7) {
                        self._mp[itemData.CastMP].push(itemData);
                    }
                    else {
                        self._mp8.push(itemData);
                    }
              //  }
                self._cardSrc.push(item.getComponent('moveCard'));
                self._cid.push(cardId);
                //index,data,parents,type,pos,cardNum
                self._cardSrc[resIndex-1].initData(resIndex-1,itemData,self,1);
                if (resIndex == len) {
                    cc.loader.release('UI/cardGroup/cardItem');
                    self._firstInitCard = false;
                }
            }
        });
     },



    //返回选角
    backPickHeroUI () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PickHero,function(data){
    });
    },

    // 翻页
    onPageEvent (sender, eventType) {
    if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
        return;
    }

    this._curPageNum = sender.getCurrentPageIndex();
    this._switchMoveCard(false,this._curPageNum);
    this._updatePageIndex();
    },


    _createPage () {
        var page = cc.instantiate(this.pageTeample);
        page.position = new cc.p(0, 0);
        return page;
    },

     // 添加页面
     plusPage (callback) {
            if (this._curPageNum > this._curPageTotal) {
                return;
            }
            if (callback) {
                callback();
            }
    },

    // 添加页面
    onAddPage () {
       for (let i = 0;i < this._curPageTotal;i++) {
            this.plusPage(() => {
                this.target.addPage(this._createPage());
            });
        }
    },

    // 移除所有页面
    resetPage () {
        this._curPageNum = 0;
        this.target.removeAllPages();
        this.prevBtn.active = false;
        
    },

    // 下一页
    onClickNextPage () {
        this._curPageNum++;
        let heroLen = this._heroNameSrc.length - 1;
        if (this._curPageNum > this._curPageTotal - 1 && !this._moveCard) {
            if (this._curHeroIndex >= heroLen) {
                cc.log("已经是最后一个英雄了呢亲");
                return;
            }
            else {
                this._heroNameSrc[this._curHeroIndex + 1].click();
            }
        }
        else {
            this.target.scrollToPage(this._curPageNum);

            if (this._moveCard) {
                this._updateMoveCardData(this._curPageNum);
            }
        }
        this._updatePageIndex();
    },

    // 上一页
    onClickPrevPage () {
        this._curPageNum--;
        if (this._curPageNum < 0) {
            this._curPageNum = 0;
            return;
        }
        this.target.scrollToPage(this._curPageNum);
        this._updatePageIndex();
    },

    //  更新页签
    _updatePageIndex() {
        if (this._curPageNum == 0) {
            this.prevBtn.active = false;
        }
        else {
            this.prevBtn.active = true; 
        }
        this.pageIndex.string = "第" + (this._curPageNum + 1) + "页";
        this._switchMoveCard(true,this._curPageNum);
    },

    // 加载右边英雄名称
    loadHero () {
        let resIndex = 0;
        let common = cc.instantiate(this.heroNameItem);
        common.parent = this.heroContent;
        this._heroName(common,resIndex,"中立",0);
        for (let i in hero) {
            var itemData = hero[i].HeroName;
            var heroId = i;
            resIndex++;
            let item = cc.instantiate(this.heroNameItem);
            item.parent = this.heroContent;
            this._heroName(item,resIndex,itemData,heroId);
        }
        if (resIndex == Object.keys(hero).length) {
            this._heroNameSrc[0].click();
        }
    },

    _heroName (item,index,name,heroId) {
        this._heroNameSrc.push(item.getComponent('heroName'));
        this._heroNameSrc[index].initData(index,name,heroId,this);
    },

    // 点击筛选
    limit () {
        this.node.getChildByName('limit').active = false;
        this.node.getChildByName('limitMp').active = true;
        this.sortBtn.active = false;
    },

    // 点击具体灵力数字
    clickMpNum (event,cust) {
        this.node.getChildByName('limitMp').active = false;
        this.node.getChildByName('showSelectMp').active = true;
        this.prevBtn.active = false;
        this.node.getChildByName('showSelectMp').getChildByName('showLimitMp').getComponent(cc.Label).string = cust;
        let index = parseInt(cust);
        this.resetPage();
        this._loadLimitCard(index);
        this._updatePageIndex();
    },

    // 关闭筛选灵力，回到中立
    closesSelectLimtMp () {
        this.resetPage();
        this.node.getChildByName('showSelectMp').active = false;
        this.node.getChildByName('limit').active = true;
        this.node.getChildByName('limitMp').active = false;
        this.sortBtn.active = true;
        this.loadCard();
    },

    // 加载筛选出来的灵力卡牌 -- 可以和loadCard 函数合并
    _loadLimitCard (index) {
        let arr;
        if (index <= 7) {
            arr = this._mp[index];

        } 
        else {
            arr = this._mp8;
        }

        let len = Object.keys(arr).length;
        if (len == 0)
        return;

        let resIndex = 0;
        var self = this;
        let allPage = Math.ceil(len / 8);
        
        self._curPageTotal = allPage;
        self.onAddPage();
        let pageNum = self.pageContent.children;
        cc.loader.loadRes('UI/cardGroup/cardItem', function (errorMessage, loadedResource) {
        for (let i in arr) {
            let item = cc.instantiate(loadedResource);
            if (resIndex <= 8) {
                    pageNum[0].addChild(item);
                }
                else if (resIndex > 8 && resIndex <= 16) {
                    pageNum[1].addChild(item);
                }
                else {
                    pageNum[2].addChild(item);
                }
            let card = arr[i];
            resIndex++;
            let itemData = dataMgr.card[card.ID];
            item.getComponent('moveCard').initData(resIndex-1,itemData,self,1);
            if (resIndex == arr.length) {
                cc.loader.release('UI/cardGroup/cardItem');
            }
        }
        });
    },

    // 重置排序的数组
    resetSort () {
        this._mp0 = [];
        this._mp1 = [];
        this._mp2 = [];
        this._mp3 = [];
        this._mp4 = [];
        this._mp5 = [];
        this._mp6 = [];
        this._mp7 = [];
        this._mp8 = [];
        this._mp = [this._mp0,this._mp1,this._mp2,this._mp3,this._mp4,this._mp5,this._mp6,this._mp7,this._mp8];
    },


    // mp 1 quality  2 level 3 
    selectSort (event,cust) {
        this._sortStatus++;
        this.sortedObj = [];
        let self = this;
        if (this._sortStatus == 1) {
            this._sortStatus = 0;
            this.sortedObj = Object.keys(this._curCardInfo).sort(function(a, b) {
                return self._curCardInfo[a].CastMP - self._curCardInfo[b].CastMP;
            });
            this.sortBtn.getChildByName('Label').getComponent(cc.Label).string = "灵力排序";
        }
        else if (this._sortStatus == 2) {
            this.sortBtn.getChildByName('Label').getComponent(cc.Label).string = "品质排序";
            this.sortedObj = Object.keys(this._curCardInfo).sort(function(a, b) {
                return self._curCardInfo[a].CardQuality - self._curCardInfo[b].CardQuality;
            });
        }
        else if (this._sortStatus == 3) {
            this.sortBtn.getChildByName('Label').getComponent(cc.Label).string = "等级排序";
            this.sortedObj = Object.keys(this._curCardInfo).sort(function(a, b) {
                return self._curCardInfo[b].level - self._curCardInfo[a].level;
            });
        }
        
        this._commonLoadCard(this._curCardInfo);
    },

    // 查看卡牌描述
    lookCardDes (index,cid,level,needCard,needSilver) {
    //   / cc.log(cid,needCard,needSilver,level,"level","cid,needCard,needSilver");

       this._curCardLevel = level;
       this.lookDesCardId = cid;

       this.desCard.active = true;
       this.cardUpBtn.active = true; 
       this.close.active = true;

       let itemData = dataMgr.card[cid];

       this._needCard = needCard;
       this._needSilver = needSilver;
       this.cardUpBtn.getChildByName('Label').getComponent(cc.Label).string = needSilver;
       let desCardSrc = this.desCard.getComponent('moveCard');
       desCardSrc.initData(index,itemData,self);
       desCardSrc.updateCardDes(cid,level-1);
       if (needCard != undefined) {
           this.cardUp.active = true;
           this.desCard.x = - 276;
           let cardUpSrc = this.cardUp.getComponent('moveCard');
           cardUpSrc.initData(i,itemData,self);//描述会更改
           cardUpSrc.updateCardDes(cid,level);

       }//可以升级
       else {
        this.cardUpBtn.active = false;
        this.desCard.x = - 120;
       }
    },

    // 关闭卡牌描述
    closeCardDes () {
        if (this.desCard.active) {
            this.desCard.active = false;
            this.close.active = false;
            this.cardUpBtn.active = false;
            this.cardUp.active = false;
        }
        else if (!this.desCard.active) {
            return;
        }
        else if (!this.close.active){
            return false;
        }
    },

   // 升级卡牌按钮
    upGradeCard () {
        let self = this;
        cc.log(bagData.silver);
        if (this._needCard > bagData.silver) {
            this._uiMgr.showTips("银两不够");
            return;
        }//卡牌数量不够
        else {
            net.Request(new  cardUpgradeProto(this.lookCardDes), (data) => {
                cc.log("升级卡牌",data);
                if (data.code == consts.CardUpgradeCode.OK) {
                    self.upGradeCardEnd();
                }
               
                else if (data.code == consts.CardUpgradeCode.CARD_AMOUNT_LESS) {
                    self._uiMgr.showTips("卡牌不够");
                }
               
                else if (data.code ==  consts.CardUpgradeCode.CARD_IS_MAX_LEVEL) {
                    self._uiMgr.showTips("该卡已经是最高等级了");
                }
            });
        }
    },



    // 卡牌升级成功
    upGradeCardEnd () {
      //  cc.log(cardGroupData.refreshCard,"cardGroupData.refreshCard");
        let data = cardGroupData.refreshCard;
        let cardId;
        let cardData;
        for (let id in data) {
            cardId = id;
            cardData = data[id];
        }
        for (let i = 0;i< this._cardSrc.length;i++) {
            if (this._cardSrc[i]._cid == cardId) {
                this._cardSrc[i].upGradeCardEnd(cardData.cnt,cardData.level); 
            }
        }
    },

      //  moveCard 调用 升级后已经是最高级
      _cardLevelMax () {
        this.desCard.active = false;
        this.cardUp.active = false;
        this.cardUpBtn.active = false;
        this.close.active = false;
    },


   
    // 点击右边英雄名称
    selectedHero (index,selectHeroName,selectHeroId) {
      //  cc.log(index,selectHeroName,selectHeroId,"name,id");
        if (index == 0) {
            this.node.getChildByName('organizationCard').getComponent(cc.Button).interactable = false;
        }
        else {
            this.node.getChildByName('organizationCard').getComponent(cc.Button).interactable = true;
        }
        if (this._curHeroIndex >= 0) {
            this._heroNameSrc[this._curHeroIndex].unSelect();
        }
        this._curHeroIndex = index;
        this._selectHeroId = selectHeroId;
        this.node.getChildByName('selectHeroName').getComponent(cc.Label).string = selectHeroName;
        this.loadCard(selectHeroId);
    },

    // 点击组卡
    clickCardGroup () {
       this._moveCard = true;
       this.node.getChildByName('toggle').active = true;
       this.node.getChildByName('limit').active = false;
       this.node.getChildByName('comfirmSelect').active = true;
       this.node.getChildByName('organizationCard').active = false;
       this.heroContent.removeAllChildren();
       this._closeCardStartEvent();
       this.target.scrollToPage(0);
       this._updatePageIndex();
       this.copyCard();
    },

    // 关闭moveCard 点击查看状态
    _closeCardStartEvent () {
        for (let i = 0 ; i < this._cardSrc.length ; i++) {
            this._cardSrc[i].closeCardDes();
        }
    },

    // 复制8张卡牌，便于移动添加卡牌
    copyCard (index,cid) {
        let arr = [];
        let page = this.pageContent.children[0];
        if (page != undefined && page.length != 0 ) {
            let child = page.children;
            let pos;
            for (let i = 0;i < child.length;i++) {
                let pos = child[i].getPosition();
                let name = 'card' + i;
                let item = this.node.getChildByName(name);
                item.active = true;
                item.x = child[i].x - 557;
                item.y = child[i].y - 45;
                let itemData = dataMgr.card[this._cid[i]];
                itemData.cnt = this._cardSrc[i]._cnt;
                itemData.level = this._cardSrc[i]._curLevel;
                this._copyCardSrc.push(item.getComponent('moveCard')); 
                // /index,data,parents,type,pos,cardNum
                this._copyCardSrc[i].initData(i,itemData,this,3,pos);
                this._copyCardSrc[i]._listenMove();
            }
        }
    },

    // 翻页控制复制卡牌的显示
    _switchMoveCard (value,curPage) {
        for (let i = 0;i < 8; i++) {
            let name = 'card' + i;
            let item = this.node.getChildByName(name);
            item.active = false;
        }
        let page = this.pageContent.children[curPage];
        if (page != undefined && page.length != 0 ) {
            let child = page.children;
            let len = child.length;
            let index = 8 * curPage;
            for(let i = 0;i < len;i++) {
                let name = 'card' + i;
                let item = this.node.getChildByName(name);
                item.active = value;
                let itemData = dataMgr.card[this._cid[(i+index)]];
                if (this._copyCardSrc.length != 0)
                this._copyCardSrc[i].initData(i,itemData,this,2);
            }
        }
    },

    // 翻页更新复制卡牌的信息
    _updateMoveCardData (curPage) {
        cc.log(curPage,"当前页");
        let page = this.pageContent.children[curPage];
        let child = page.children;
        let len = child.length;
        this._switchMoveCard(true,curPage);
    },

    // 添加卡牌
    addCard (name,mp,cardId) {
        let self = this;
        for (let i = 0 ;i < self._cid.length ; i++) {
            if (self._cid[i] == cardId) {
                self._cardSrc[i]._moveCard(1);
                let index = i % 8;
                self._copyCardSrc[index]._moveCard(1);
            }
        }

        if (self._comfrimCard.length != 0) {
            for (let i = 0 ; i < self._comfrimCardId.length ; i++) {
                if (cardId == self._comfrimCardId[i]) {
                    self._comfrimCard[i].addNum();
                    self._comfrimCardNum += 1;
                    self.comfrimCard.string = self._comfrimCardNum + "/100 卡牌";
                    return;
                }
            }
        }
       
        cc.loader.loadRes('UI/cardGroup/comfirmCard', function (errorMessage, loadedResource) {       
            if (errorMessage) {
                cc.log(errorMessage);
            }
            let item = cc.instantiate(loadedResource);
            //index,cardName,cardNum,mpNum
            self.heroContent.addChild(item);
            let len = self.heroContent.childrenCount;
            self._comfrimCard.push(item.getComponent('comfirmCard'));
            //index,cardName,cardNum,mp,cardId
            cc.log(self._comfrimCardNum,"self._comfrimCard");
            self._comfrimCard[ len -1 ].initData(len -1,name,1,mp,cardId);
            self._comfrimCardNum += 1;
            self.comfrimCard.string = self._comfrimCardNum + "/100 卡牌";
            self._comfrimCardId.push(cardId);
        });  
        let len = self.heroContent.childrenCount;
        if (len >= 5) {
            self.heroContent.height = len * 85; 
        }        
    },

    clickFinish() {
        let comfirm = function () {
            cc.log("返回卡牌界面")
        };
        if (self._comfrimCardNum < 100) {
            this._uiMgr.popupTips(1,"还有卡牌可以添加","提示",null,null,comfirm,this);
        }

    },

    

    update () {
     
      
    },
});
