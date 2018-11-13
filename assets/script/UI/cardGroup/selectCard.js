var uibase = require('UIBase')
var constant = require('constants')
var hero = require('Hero')
var dataMgr = require('DataMgr')
var fightData = require('fightData')
cc.Class({
    extends: uibase,

    properties: {
       showOwnHero: cc.Node,
       heroIconAtlas: cc.SpriteAtlas,
       showSelectHero: cc.Sprite,
       heroName: cc.Label,
       _CDState:true,
       _ownHeroBar:[],
       selectHeroandCard: cc.Node,
    },

    onLoad () {
        this.loadOwnHero();
        this.selectHero(1000);
    },

  

    loadOwnHero () {
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
    
    //自己选择得英雄
    selectHero (heroid) {
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        fightData.userName = heroData.HeroName;
        this._heroid = heroid;
    },

    selectCardGroup (event,cust) {
        this.selectHeroandCard.active = false;
    },

    closeSelect () {
       this.node.active = false;
    },

    

    start () {

    },

    // update (dt) {},
});
