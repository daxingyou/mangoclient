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

cc.Class({
    extends: uibase,

    properties: {
        showSelect:cc.Node,
        comfirmCount:cc.Label,
        ownHeros:cc.Node,
        _ownHeros:[],
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
       
    },


     onLoad () {
        for (let i =0;i<4;i++) {
            this.teamerBar.push(this["teamer" + i]);
        }
        var wihte =new cc.Color(255,255,255);//1
        var bule =new cc.Color(47,203,242);//2
        var zise =new cc.Color(242,66,253);//紫色3
        var cese =new cc.Color(210,97,49);//橙色4

        var goji =new cc.Color(221,81,81);//攻击1
        var qishu =new  cc.Color(31,231,255);//奇术2
        var tianfu =new cc.Color(90,161,68);//天赋3
        var baowu =new cc.Color(255,244,44);//宝物4

        this.colorBar.push(wihte);
        this.colorBar.push(bule);
        this.colorBar.push(zise);
        this.colorBar.push(goji);
        this.colorBar.push(qishu);
        this.colorBar.push(tianfu);
        this.colorBar.push(baowu);
        this.colorBar.push(cese);
       // var heroData = dataMgr.hero[teamA[j].heroid];
        var self = this;
        var resIndex = 0;
        cc.loader.loadRes('UI/teamPattern/ownHero', function (errorMessage, loadedResource) {
        for (let i = 0; i < 8; i++) {
            if (errorMessage) {
                cc.log('载入预制资源失败, 原因:' + errorMessage);
                return;
            }
            let item = cc.instantiate(loadedResource);
            resIndex++;
            self.ownHeros.addChild(item);
            self._ownHeros.push(item.getComponent('ownHero'));
            if (resIndex == 8) {
                cc.loader.release('UI/teamPattern/ownHero');
                self.pickHero();
            }
        }
        });
     },
     pickHero () {
        for (let i=0;i<8;i++) {
            this._ownHeros[i].initOwnHero(i,"yuxiaoxue","于小雪",this);
        }
        this.showSelect.active = false;
        this.cdTime = 60;
        this._CDState = true;
        this. _uid4ShowNode = {};
        cc.log(this._uid4ShowNode,"-----------------pickHero");
    },

    start () {
        cc.log(this._uid4ShowNode,"--------------this.uid4ShowNode in start");
    },

    initData (teamA,teamB) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.isTeamA = false;//默认队B
        for (let i in teamA) {
            if (teamA[i].uuid == dataCenter.uuid) {
                this.isTeamA = true;
                this.comfirmTeam(teamA);
                cc.log("属于队A",this._uid4ShowNode);
            }  
        }
        this.comfirmTeam(teamB);
        cc.log("属于队B",this._uid4ShowNode);
    },
    comfirmTeam (team) {
        for (let j in team) {
            this._uid4ShowNode[team[j].uid] = this["teamer" + j];
        }
        cc.log("this._uid4ShowNode",this._uid4ShowNode);
    },
    //自己选择得英雄
    selectHero () {//传英雄id
        var self = this;
        cc.log(self._uid4ShowNode,"--------------对应得id");
        self.showSelect.active = true;
        self.showSelectHero.spriteFrame = self.heroIconAtlas.getSpriteFrame("yuxiaoxue"); 
        var showNode = self._uid4ShowNode[dataCenter.uuid];
        cc.log(showNode,"---------------SHOWnODEDKLSFJJJJJJJJJJ");
        var icon = showNode.getChildByName("heroImg");
        icon.getComponent(cc.Sprite).spriteFrame = self.heroIconAtlas.getSpriteFrame("yuxiaoxue");
    },

    defalutSelect (data) {
        for (let i in data) {
            if (i === dataCenter.uuid) {
                var showNode = this._uid4ShowNode[i];
                var icon = showNode.getChildByName("heroImg");
                icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame("yuxiaoxue");
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
