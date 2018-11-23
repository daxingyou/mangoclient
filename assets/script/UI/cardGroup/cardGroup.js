var uibase = require('UIBase')
var constant = require('constants')
var dataMgr = require('DataMgr')
var hero = require('Hero')
var fightData = require('fightData')
let eventMgr = require('eventMgr');
var net = require('NetPomelo')
let cardUpgradeProto = require('cardUpgradeProto');
let playerData = require('playerData')
let bagData = require('playerData')
var consts = require('consts')

cc.Class({
    extends: uibase,

    properties: {
        target: cc.PageView,
        pageIndex:cc.Label,
        pageContent:cc.Node,
        _page:[],
        
        showSelectCard:cc.Node,
        heroContent: cc.Node,
        heroNameItem : cc.Prefab,
        _heroNameSrc : [],
        _selectedIdx: -1,
        Hero: 0,
        _firstInitCard: true,
        desCard: cc.Node,
        selectCard: cc.Node,
        _cardSrc: [],

        //选择英雄
        showOwnHero: cc.Node,
        heroIconAtlas: cc.SpriteAtlas,
        showSelectHero: cc.Sprite,
        heroName: cc.Label,
        _CDState:true,
        _ownHeroBar:[],
        _comfrimCardNum: 0,
        comfrimCard: cc.Label,
        _cid: [],
        _curPage: 0,
        _copyCardSrc : [],
        _moveCard: false,
        cardId: null,
        _selectHero: null,
        _needSilver: 0,
        _needCard: 0,
        _curCard:0,
    },


     onLoad () {
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
        this.node.getChildByName('prev').active = false;
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.loadHero();
        for (let i =0;i < this.pageContent.childrenCount;i++) {
             let item = this.pageContent.children[i];
             this._page.push(item);
         }
        this.initCard();
        this.cardUp = this.node.getChildByName('cardUpgrade');
        this.cardUpBtn = this.node.getChildByName('upgrade');
        this.close = this.node.getChildByName('close');
       

     },

     //初始加载卡牌
     initCard () {
        var self = this;
        var resIndex = 0;
        self._cardSrc = [];
        cc.loader.loadRes('UI/cardGroup/cardItem', function (errorMessage, loadedResource) {
            for (var i = 0; i < 10; i++) {
                let item = cc.instantiate(loadedResource);
                resIndex++;
                if (resIndex <= 8) {
                    self._page[0].addChild(item);
                }
                else if (resIndex > 8 && resIndex <=16) {
                    self._page[1].addChild(item);
                }
                else {
                    self._page[2].addChild(item);
                }
                let index = 1001 + i;
            
                let itemData = dataMgr.card[index];
                if (self._firstInitCard) {
                    if (itemData.CastMP < 7) {
                        self._mp[itemData.CastMP].push(index);
                    }
                    else {
                        self._mp8.push(index);
                    }
                }
                self._cardSrc.push(item.getComponent('moveCard'));
                self._cid.push(itemData.ID);
                //index,data,parents,isCardGroup,pos
                self._cardSrc[i].initData(i,itemData,self,1);
                if (resIndex == 10) {
                    cc.loader.release('UI/cardGroup/cardItem');
                    self._firstInitCard = false;
                }
            }
        });
     },

    //
    backPickHeroUI () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PickHero,function(data){
    });
    },

    //翻页
    onPageEvent (sender, eventType) {
    if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
        return;
    }
    console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    },

    onClickNextPage () {
        let lastPage = this.target.getCurrentPageIndex();
        if (lastPage == 2) {
            this._heroNameSrc[this.Hero + 1].click();
            return;
        }
        else {
            let curPage = lastPage + 1;
            this.target.scrollToPage(curPage);
            if (this._moveCard) {
                this._updateMoveCardData(curPage);
            }
        }
        this._updatePageIndex();
    },

    onClickPrevPage () {
        let lastPage = this.target.getCurrentPageIndex();
        if (lastPage == 0) {
            return;
        }
        else {
            let curPage = lastPage - 1;
            this.target.scrollToPage(curPage);
            if (this._moveCard) {
                this._updateMoveCardData(curPage);
            }
        }
        this._updatePageIndex();
    },

    _updatePageIndex() {
        let index = this.target.getCurrentPageIndex();
        if (index == 0) {
            this.node.getChildByName('prev').active = false;
        }
        else {
            this.node.getChildByName('prev').active = true; 
        }
        this.pageIndex.string = "第" + (index + 1) + "页";
        this._curPage = index;
    },


    loadHero () {
        let resIndex = 0;
        for (let i in hero) {
            var itemData = hero[i].HeroName;
            resIndex++;
            let item = cc.instantiate(this.heroNameItem);
            item.parent = this.heroContent;
            this._heroName(item,resIndex-1,itemData);
        }
        if (resIndex == Object.keys(hero).length) {
            this._heroNameSrc[0].click();
        }
    },

    _heroName (item,index,name) {
        this._heroNameSrc.push(item.getComponent('heroName'));
        this._heroNameSrc[index].initData(index,name,this);
    },

    //点击筛选
    limit () {
        this.node.getChildByName('limit').active = false;
        this.node.getChildByName('limitMp').active = true;
    },

    clickMpNum (event,cust) {
        let len = Math.ceil(Object.keys(this._mp).length / 8);
        this.node.getChildByName('limitMp').active = false;
        this.node.getChildByName('showSelectMp').active = true;
        this.node.getChildByName('prev').active = false;
        this.node.getChildByName('showSelectMp').getChildByName('showLimitMp').getComponent(cc.Label).string = cust;
        let index = parseInt(cust);
        let resIndex = 0;
        for (let i =0;i<len;i++) {
            this._page[i].removeAllChildren();
        }
        
        if (len - 1 <=1) {
            this.node.getChildByName('next').active = false;
        }
        this._loadLimitCard(index);
        this.target.scrollToPage(0);
        this._updatePageIndex();
    },

    closesSelectLimtMp () {
        this.node.getChildByName('showSelectMp').active = false;
        this.node.getChildByName('limit').active = true;
        this.node.getChildByName('limitMp').active = false;
        this.initCard();
    },

    _loadLimitCard (index) {
        let arr;
        if (index <= 7) {
            arr = this._mp[index];
        } 
        else {
            arr = this._mp8;
        }
        let resIndex = 0;
        var self = this;
        cc.loader.loadRes('UI/cardGroup/cardItem', function (errorMessage, loadedResource) {
        for (var i = 0; i < arr.length; i++) {
            let item = cc.instantiate(loadedResource);
            if (resIndex <= 8) {
                self._page[0].addChild(item);
            }
            else if (resIndex > 8 && resIndex <=16) {
                self._page[1].addChild(item);
            }
            else {
                self._page[2].addChild(item);
            }
            let index = arr[i];
        
            let itemData = dataMgr.card[index];
            self._mp[itemData.CastMP] = index;
            item.getComponent('moveCard').initData(i,itemData,self,1);
            if (resIndex == arr.length) {
                cc.loader.release('UI/cardGroup/cardItem');
            }
        }
        });
    },

    lookCardDes (index,cid,needCard,needSilver) {
       // cc.log(cid,needCard,needSilver,"cid,needCard,needSilver");
       this. _curCard = index;
       this.desCard.active = true;
       let itemData = dataMgr.card[cid];
       this.cardId = cid;
       this.cardUpBtn.active = true; 
       this._needCard = needCard;
       this._needSilver = needSilver;
       this.cardUpBtn.getChildByName('Label').getComponent(cc.Label).string = needSilver;
       this.close.active = true;
       this.desCard.getComponent('moveCard').initData(i,itemData,self);
       if (needCard != undefined) {
           this.cardUp.active = true;
           this.cardUp.getComponent('moveCard').initData(i,itemData,self);//描述会更改
       }
    },

   
    upGradeCard () {
        let self = this;
        if (this._needCard > bagData.silver) {
            this._uiMgr.showTips("银两不够");
            return;
        }//卡牌数量不够
        else {
            net.Request(new  cardUpgradeProto(this.cardId), (data) => {
                cc.log("升级卡牌",data);
                if (data.code == consts.CardUpgradeCode.OK) {
                    self._cardSrc[self._curCard].updateCard();
                }
               
                else if (data.code ==  consts.CardUpgradeCode.CARD_AMOUNT_LESS) {
                    self._uiMgr.showTips("卡牌不够");
                }
               
                else if (data.code ==  consts.CardUpgradeCode.CARD_IS_MAX_LEVEL) {
                    this._uiMgr.showTips("该卡已经是最高等级了");
                }
            });
        }
    },

    _updateUpCard () {
        this.desCard.active = false;
        this.cardUp.active = false;
        this.cardUpBtn.active = false;
    },

    closeCardDes () {
        if (this.desCard.active) {
            this.desCard.active = false;
            this.node.getChildByName('close').active = false;
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

    selectedHero (index,selectHero) {
        if (index == 0) {
            this.node.getChildByName('organizationCard').getComponent(cc.Button).interactable = false;
        }
        else {
            this.node.getChildByName('organizationCard').getComponent(cc.Button).interactable = true;
        }
        if (this._selectedIdx >= 0) {
            this._heroNameSrc[this._selectedIdx].unSelect();
        }
        this._curHeroIndex = index;
        this._selectedIdx = index;
        this._selectHero = selectHero;
    },

    clickCardGroup () {
       this._moveCard = true;
       this.node.getChildByName('toggle').active = true;
       this.node.getChildByName('limit').active = false;
       this.node.getChildByName('comfirmSelect').active = true;
       this.node.getChildByName('organizationCard').active = false;
       this.node.getChildByName('comfirmSelect').getChildByName('selectHeroName').getComponent(cc.Label).string = this._selectHero;
       this.heroContent.removeAllChildren();
       this._closeCardStartEvent();
       this.target.scrollToPage(0);
       this._updatePageIndex();
       this.copyCard();
    },

    _closeCardStartEvent () {
        for (let i =0 ;i< this._cardSrc.length;i++) {
            this._cardSrc[i].closeCardDes();
        }
    },

    copyCard (index,cid) {
        let arr = [];
        let child = this._page[0].children;
        let pos;
        for (let i = 0;i< 8;i++) {
            let pos = child[i].getPosition();
            let name = 'card' + i;
            let item = this.node.getChildByName(name);
            item.active = true;
            item.x = child[i].x - 140;
            item.y = child[i].y - 45;
            let itemData = dataMgr.card[this._cid[i]];
            this._copyCardSrc.push(item.getComponent('moveCard')); 
            this._copyCardSrc[i].initData(i,itemData,this,2,pos);
        }
    },

    _updateMoveCardData (curPage) {
        let child = this._page[0].children;
        for (let i = 0;i< 8;i++) {
            let pos = child[i].getPosition();
            let name = 'card' + i;
            let item = this.node.getChildByName(name);
            item.active = false;
            item.x = child[i].x - 140;
            item.y = child[i].y - 45;
        }
        let len = this._page[curPage].childrenCount;
        let index = 8 * curPage;
        for(let i = 0;i < len;i++) {
            let name = 'card' + i;
            let item = this.node.getChildByName(name);
            item.active = true;
            let itemData = dataMgr.card[this._cid[(i+index)]];
            this._copyCardSrc[i].initData(i,itemData,this,2);
        }
    },


    addCard (name,mp) {
        let self = this;
        cc.loader.loadRes('UI/cardGroup/comfirmCard', function (errorMessage, loadedResource) {       
            if (errorMessage) {
                cc.log('载入预制资源失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('你载入的不是预制资源!');
                return;
            }
            let showItem = cc.instantiate(loadedResource);
            //index,cardName,cardNum,mpNum
            showItem.getComponent('comfirmCard').initData(self._comfrimCardNum,name,1,mp);
            self.heroContent.addChild(showItem);
            self._comfrimCardNum +=1;
            self.comfrimCard.string = self._comfrimCardNum + "/100 卡牌";
        });  
        let len = self.heroContent.childrenCount;
        if (len >= 5) {
            self.heroContent.height = len * 85; 
        }        
    },



    

    update () {
     
      
    },
});
