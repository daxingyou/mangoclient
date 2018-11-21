var uibase = require('UIBase')
var constant = require('constants')
var dataMgr = require('DataMgr')
var hero = require('Hero')
var fightData = require('fightData')
let eventMgr = require('eventMgr');

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
         this._mp = [this._mp0,this._mp1,this._mp2,this._mp3,this._mp4,this._mp5,this._mp6,this._mp7,this._mp8]
    //   /  eventMgr.on("closeCardDes",this.closeCardDes,this);
        this.node.getChildByName('prev').active = false;
        this.loadHero();
        for (let i =0;i < this.pageContent.childrenCount;i++) {
             let item = this.pageContent.children[i];
             this._page.push(item);
         }
        this.initCard();
        this.close = this.node.getChildByName('close');
       

     },

     //初始加载卡牌
     initCard () {
        var self = this;
        var resIndex = 0;
        self._cardSrc = [];
        cc.loader.loadRes('UI/cardGroup/cardItem', function (errorMessage, loadedResource) {
            for (var i = 0; i < 10; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
            
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
             // initData(index,cardName,CardQuality,cardImage,CardDescription,cardType,thew,mp,cardAttr,canUse, cid)
                self._cardSrc[i].initData(i,itemData.CardName,itemData.CardQuality,itemData.CardImage,
                    itemData.CardDescription,itemData.CardType,itemData.CastThew,itemData.CastMP,itemData.CardAttributes,0,itemData.ID,self,true);
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
        let i;
        for (i = 0; i< 6;i ++) {
            let item = cc.instantiate(this.heroNameItem);
            item.parent = this.heroContent;
            this._heroName(item,i);
        }
        if (i == 6) {
            this._heroNameSrc[0].click();
        }
    },

    _heroName (item,params) {
        this._heroNameSrc.push(item.getComponent('heroName'));
        this._heroNameSrc[params].initData(params,this);
    },

    showHeroSelectCard (index) {
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
    },

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
            // initData(index,cardName,CardQuality,cardImage,CardDescription,cardType,thew,mp,cardAttr,canUse, cid)
            item.getComponent('moveCard').initData(i,itemData.CardName,itemData.CardQuality,itemData.CardImage,
                itemData.CardDescription,itemData.CardType,itemData.CastThew,itemData.CastMP,itemData.CardAttributes,0,itemData.ID,self,true);
            if (resIndex == arr.length) {
                cc.loader.release('UI/cardGroup/cardItem');
            }
        }
        });
    },

    lookCardDes (cid) {
        this.desCard.active = true;
        let close = this.node.getChildByName('close');
        close.active = true;
        let itemData = dataMgr.card[cid];
        this.desCard.getComponent('moveCard').initData(i,itemData.CardName,itemData.CardQuality,itemData.CardImage,
            itemData.CardDescription,itemData.CardType,itemData.CastThew,itemData.CastMP,itemData.CardAttributes,0,itemData.ID,self);
    },

    

    closeCardDes () {
        if (this.desCard.active) {
            this.desCard.active = false;
            this.node.getChildByName('close').active = false;
        }
        else if (!this.desCard.active) {
            return;
        }
        else if (!this.close.active){
            return false;
        }
    },



    clickCardGroup () {
       this.selectCard.active = true;
       this._loadOwnHero();
       this.selectHero(1000);
       this._moveCard = true;
    },

    _loadOwnHero () {
        var self = this;
        var resIndex = 0;
        cc.loader.loadRes('UI/buildTeam/ownHero', function (errorMessage, loadedResource) {
            for (let i in hero) {
                var itemData = hero[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.showOwnHero.addChild(item);
                self._ownHeroBar.push(item.getComponent('ownHero'));
                self._ownHeroBar[resIndex-1].initData(itemData.ID,itemData.HeroName,itemData.HeroIcon,self);
                //heroid,heroName,heroIcon,parents
            }
        });
    },
    
    selectHero (heroid) {
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        fightData.userName = heroData.HeroName;
        this._heroid = heroid;
    },

    selectCardGroup (event,cust) {
        this.selectCard.active = false;
        this.node.getChildByName('toggle').active = true;
        this.node.getChildByName('limit').active = false;
        this.node.getChildByName('comfirmSelect').active = true;
        this.node.getChildByName('organizationCard').active = false;
        this.node.getChildByName('comfirmSelect').getChildByName('selectHeroName').getComponent(cc.Label).string = fightData.userName;
        this.heroContent.removeAllChildren();
        this._closeCardStartEvent();
        this.target.scrollToPage(0);
        this._updatePageIndex();
        this.copyCard();
    },

    closeSelectCardGroup () {
        this.selectCard.active = false;
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
            this._copyCardSrc[i].initData(i,itemData.CardName,itemData.CardQuality,itemData.CardImage,
                     itemData.CardDescription,itemData.CardType,itemData.CastThew,itemData.CastMP,itemData.CardAttributes,0,itemData.ID,this,false,pos);
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
            this._copyCardSrc[i].initData(i,itemData.CardName,itemData.CardQuality,itemData.CardImage,
                itemData.CardDescription,itemData.CardType,itemData.CastThew,itemData.CastMP,itemData.CardAttributes,0,itemData.ID,this,false);
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
