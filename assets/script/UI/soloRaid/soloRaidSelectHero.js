var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var hero = require('Hero')
var net = require('NetPomelo')
var raidEnterRoomProto = require('raidEnterRoomProto')
var raidSelectAndEnterRoomProto = require('raidSelectAndEnterRoomProto')
var dataMgr = require('DataMgr')
var dataCenter = require('DataCenter')
var raidSelectHeroProto = require('raidSelectHeroProto')
var soloRaidData = require('soloRaidData')
cc.Class({
    extends: uibase,
    properties: {
            showOwnHero:cc.Node,
            heroIconAtlas : cc.SpriteAtlas,
            _ownHeroBar:[],
            showSelectHero:cc.Sprite,
            heroName:cc.Label,
            raidId:null,
            _heroid:null,
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
        })
    },

    //默认选择第一个英雄
    onLoad () {
        this.selectHero(1000);
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },

    //确认进来的房间ID
    comfirmRaidID (raidId) {
        this.raidId = raidId;
        cc.log(this.raidId,"this.raidID");
    },


    selectHero (heroid) {
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        this._heroid = heroid;
    },

    comfirmHero (heroid) {
         cc.log(this.raidId,'this.raidId');
         let rooms = null;
         var self = this;
         let heroData = dataMgr.hero[self._heroid];
         dataCenter.userName = heroData.HeroName;
         net.Request(new raidSelectHeroProto(self.raidId,self._heroid), function (data) {
            {    cc.log("单人副本确认选择英雄",data);
                if (data.code == 1) {
                    let raidInfo = data.raidInfo;
                    soloRaidData.raidInfo = raidInfo;
                    self._uimgr.release();
                    self._uimgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                        data.initData(raidInfo);
                    });
                }
                else if (data.code == 2) {

                }
                else if (data.code == 3) {
                    cc.log("已经确认过英雄",soloRaidData.raidInfo);
                    self._uimgr.release();
                    self._uimgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                        data.initData(soloRaidData.raidInfo);
                    });

                }
            }
            //else{
            //    cc.log("单人副本确认异常");
            //}
         });
    },

    backMainUI () {
        cc.log("返回主界面");
        this._uimgr.loadUI(constant.UI.Main,function(data){
        });
    },

    start () {

    },

    // update (dt) {},
});