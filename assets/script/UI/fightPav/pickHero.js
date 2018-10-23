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
       
    },


     onLoad () {
        // for (let j =0;j<4;i++) {
        //     this.teamerBar.push(this["teamer" + j]);
        // }
       // var heroData = dataMgr.hero[teamA[j].heroid];
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
        cc.log(this._uid4ShowNode,"--------------this.uid4ShowNode in start");
    },
    storeShowNode (uid4ShowNode) {
        this._uid4ShowNode = {};
        this._uid4ShowNode = uid4ShowNode;
        cc.log(this._uid4ShowNode,"-------------this._uid4ShowNode");
    },

    initData (teamA,teamB) {
        var self = this;
        self.showSelect.active = false;
        self.cdTime = 60;
        self._CDState = true;
        self._uid4ShowNode = {};
        self.teamA = teamA;
        self.teamB = teamB;
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
        if (this.isTeamA) {
            cc.log("属于队A",this._uid4ShowNode);
        }
        else {
            cc.log("属于队B",this._uid4ShowNode);
        }
        this.storeShowNode(showNode);
        
    },

    //自己选择得英雄
    selectHero (heroid) {//传英雄id
        this.showSelect.active = true;
        let heroData = dataMgr.hero[heroid];
        let heroIcon = heroData.HeroIcon;
        this.showSelectHero.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        this._heroid = heroid;
        
        // cc.log(this._uid4ShowNode,"--------------对应得id",this.teamA,this.teamB,"this.teamA,this.teamB",this,"-----------this");
        var showNode = this._uid4ShowNode[dataCenter.uuid];
        var icon = showNode.getChildByName("heroImg");
        icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
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
    showTeamerSelect () {

    },
   
    pickHeroAtt(event,cust) {
        cc.log("选择英雄属性");
        let index = parseInt(cust);
        this.heroAttribute = index;
        cc.log(this._uid4ShowNode,"--------------this.uid4ShowNode");
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
