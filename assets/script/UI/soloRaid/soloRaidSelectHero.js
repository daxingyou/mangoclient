var uibase = require('UIBase')
var constant = require('constants')
var consts = require('consts')
var net = require('NetPomelo')
var hero = require('Hero')
var raidEnterRoomProto = require('raidEnterRoomProto')
var raidSelectAndEnterRoomProto = require('raidSelectAndEnterRoomProto')
var dataMgr = require('DataMgr')
var dataCenter = require('DataCenter')
var raidSelectHeroProto = require('raidSelectHeroProto')
var soloRaidData = require('soloRaidData')
var fightData = require('fightData')
cc.Class({
    extends: uibase,
    properties: {
            showOwnHero:cc.Node,
            heroIconAtlas : cc.SpriteAtlas,
            _ownHeroBar:[],
            showSelectHero:cc.Sprite,
            heroName:cc.Label,
            _heroid:null,
            _CDState:true,
    },

    //加载自己拥有的英雄
    initData () {
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

    //默认选择第一个英雄
    onLoad () {
        this.selectHero(1000);
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },

    selectHero (heroid) {
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        this._heroid = heroid;
    },

    comfirmHero (heroid) {
         //cc.log(soloRaidData.raidId,"soloRaidData.raidId");
         let rooms = null;
         var self = this;
         let heroData = dataMgr.hero[self._heroid];
         fightData.userName = heroData.HeroName;
         self._CDState = false;
         net.Request(new raidSelectHeroProto(soloRaidData.raidId,self._heroid), function (data) {
            {    
                if (data.code == consts.SelectHeroCode.OK) {
                let raidInfo = data.raidInfo;
                soloRaidData.raidInfo = raidInfo;
                self._uiMgr.release();
                self._uiMgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                    data.initData(raidInfo);
                });
                cc.log("单人副本确认英雄");
                }

                else if (data.code == consts.SelectHeroCode.BE_SELECEED) {
                    cc.log("已经被选了")
                }

                else if (data.code == consts.SelectHeroCode.NOT_EXIST) {
                    cc.log("已经确认过英雄",soloRaidData.raidInfo);
                    self._uiMgr.release();
                    self._uiMgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                        data.initData(soloRaidData.raidInfo);
                    });
                }

                else if (data.code == consts.SelectHeroCode. ALREADY_CONFIRMED) {
                    cc.log("已经确认了");
                }
            }
        
                //else{
                //    cc.log("单人副本确认异常");
                //}
         });
    },

    backRainUI () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.RaidUI,function(data) {
        });
    },

    start () {

    },

    // update (dt) {},
});
