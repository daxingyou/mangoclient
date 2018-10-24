var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')
var selectHeroProto = require('selectHeroProto')
var confirmHeroProto = require('confirmHeroProto')
var hero = require('confirmHeroProto')
var dataMgr = require('DataMgr')
var dataCenter = require('DataCenter')
var hero = require('Hero')
var teamRaidSelectHeroProto = require('teamRaidSelectHeroProto')
var teamRaidConfirmHeroProto = require('teamRaidConfirmHeroProto')

cc.Class({
    extends: uibase,

    properties: {
        showSelect:cc.Node,
        comfirmCount:cc.Label,
        showOwnHero:cc.Node,
        _ownHeroBar:[],
        showSelectHero:cc.Sprite,
        heroIconAtlas : cc.SpriteAtlas,
        _CDState:false,
        colorBar:[],
        teamer0:cc.Node,
        teamer1:cc.Node,
        teamer2:cc.Node,
        teamer3:cc.Node,
        teamerBar:[],
        teamA:null,
        teamB:null,
        isTeamA:false,

        heroName:cc.Label,
        raidTeamInfo:null,
        _isRaid:false,
        heroAtt: cc.SpriteAtlas,
       
    },


     onLoad () {
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
    

    start () {
       
    },
    storeShowNode (uid4ShowNode) {
        this._uid4ShowNode = {};
        this._uid4ShowNode = uid4ShowNode;
        cc.log(this._uid4ShowNode,"-------------this._uid4ShowNode");
        this.showSelect.active = false;
        this.cdTime = 60;
        this._CDState = true;
    },

    initData (teamA,teamB) {
        var self = this;
        self.isTeamA = false;//默认队B
        
        for (let i=0;i<teamA.length;i++) {
           
            if (teamA[i].uid == dataCenter.uuid) {
                self.isTeamA = true;
                self.comfirmTeam(teamA);
            }  
        }

        for (let j=0;j < teamB.length;j++) {
            if (teamB[j].uid == dataCenter.uuid) {
                self.isTeamA = false;
                self.comfirmTeam(teamB);
            }  
        }

        
    },
    comfirmTeam (team) {
        let showNode = {};
        for (let k=0 ; k<team.length;k++) {
            showNode[team[k].uid] = this["teamer" + k];
        }
        this.storeShowNode(showNode);
        if (team.length == 2) {
            this.teamer3.active = false;
            this.teamer2.active = false;
            this._isRaid = true;
        }
         // if (this.isTeamA) {
        //     cc.log("属于队A/或者副本",this._uid4ShowNode);
        // }
        // else {
        //     cc.log("属于队B",this._uid4ShowNode);
        // }
        
    },

    //自己选择得英雄
    selectHero (heroid) {//传英雄id
        this.showSelect.active = true;
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        this._heroid = heroid;
        var showNode = this._uid4ShowNode[dataCenter.uuid];
        let heroName =  showNode.getChildByName("heroName");
        var icon = showNode.getChildByName("heroImg");
        heroName.getComponent(cc.Label).string = heroData.HeroName;
        icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);

        if (this._isRaid) {//副本
            net.Request(new teamRaidSelectHeroProto(heroid), (data) => {
                cc.log("组队副本选择英雄",data);
            });
        }
        else {//普通组队
            // net.Request(new leaveTeamProto(heroid), (data) => {
            //     cc.log("4v4组队选择英雄",data);
            // })
        }
    },

    defalutSelect (data) {
        for (let i in data) {
            if (i === dataCenter.uuid) {
                var showNode = this._uid4ShowNode[i];
                var icon = showNode.getChildByName("heroImg");
                let heroData = dataMgr.hero[this._heroid];
                let heroIcon = heroData.HeroIcon;
                icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
            }
        }
        cc.log(this._uid4ShowNode,"--------------this.uid4ShowNode");
    },


    //展示队友选择得英雄
    showTeamerSelect (data) {
       // cc.log("队友选择的英雄",data,data.uid,data.heroid);
        let heroid = data.heroid;
        let heroData = dataMgr.hero[data.heroid];
        let heroIcon = heroData.HeroIcon;
        let showNode = this._uid4ShowNode[data.uid];
        let icon = showNode.getChildByName("heroImg");
        icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        let heroName =  showNode.getChildByName("heroName");
        heroName.getComponent(cc.Label).string = heroData.HeroName;
       
    },

    //确认英雄
    comfirmHero () {
        net.Request(new teamRaidConfirmHeroProto(this._heroid), (data) => {
            cc.log("组队副本确认英雄",data);
        });
        let showNode = this._uid4ShowNode[dataCenter.uuid];
        let comfirmTips = showNode.getChildByName("comfirm");
        comfirmTips.active = true;
        this._CDState = false;

    },

    //展示队友确认英雄
    showTeamerComfirm (data) {
        let showNode = this._uid4ShowNode[data.uid];
        let comfirmTips = showNode.getChildByName("comfirm");
        comfirmTips.active = true;
    },
   
    pickHeroAtt(event,cust) {
        cc.log("选择英雄属性");
        let index = parseInt(cust);
        this.heroAttribute = index;
        cc.log(this._uid4ShowNode,"-------------this.uid4ShowNode");
    },

    enterPileKu () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PileKu,function(data){
        });
    },

    enterTreasure() {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Treasure,function(data){
    });
    },

    //存副本队伍信息
    storeRaidTeamInfo (data) {
       // cc.log("组队副本队伍信息",data);
        this.comfirmTeam(data);
    },

    //组队副本选择英雄
    teamRaidSelectHero () {
       // this._uid4ShowNode

    },

    //组队副本显示队友选择英雄
    showTeamRaidSelect () {

    },

     

    update (dt) {
        if (this._CDState) {  
            this.cdTime -=dt;
            var  temp = Math.floor(this.cdTime);
            if (temp == 0 ) {
                this._CDState = false;
            //     var uimgr = cc.find('Canvas').getComponent('UIMgr');
            //     uimgr.loadUI(constant.UI.Load,function(data){
            // });
            }
            if (this.comfirmCount == undefined)
            return;
            this.comfirmCount.string = temp;
        }
     },
});
