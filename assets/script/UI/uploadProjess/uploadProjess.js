var uiBase = require('UIBase')
var dataCenter = require('DataCenter')
var constant = require('constants')
var dataMgr = require('DataMgr')
var playerData = require('playerData')
cc.Class({
    extends: uiBase,

    properties: {
      label:cc.Node,  
      heroIcons: cc.SpriteAtlas,

      man: cc.Node,
      woman: cc.Node,

      showNode0: cc.Node,
      showNode1: cc.Node,
      showNode2: cc.Node,
      showNode3: cc.Node,
    },

    onLoad () {
        this.loadStard();
    },

    loadStard () {

        if (!this._background) {
            var bg = cc.find('Canvas/background');
            this._background = cc.instantiate(bg);
            this._background.parent = this.node;
            this._background.zIndex = -2;
            var fg = cc.find('Canvas/frontground');
            this._foreground = cc.instantiate(fg);
            this._foreground.parent = this.node;
            this._foreground.zIndex = -1;
        }
       
        this._mgr = cc.find('Canvas').getComponent('UIMgr');
        let teamA = dataCenter.teamInfo.teamA;
        //cc.log("加载 teamA",teamA);
        let teamB = dataCenter.teamInfo.teamB;
        //cc.log("加载 teamB",teamB);
        this._uid2ShowNode = {};
        for (var i in teamA) {
            var uid = teamA[i].uid;
            this["showNode" + i].active = true;
            this._uid2ShowNode[uid] = this["showNode" + i];
            this._uid2ShowNode[uid].getChildByName("user_name").getComponent(cc.Label).string = teamA[i].name;
            var heroData = dataMgr.hero[teamA[i].heroid];
            var icon = this._uid2ShowNode[uid].getChildByName("icon");
            icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame(heroData.HeroIcon);
            if (playerData.id == teamA[i].uid) {
                if (teamA[i].heroid == 1000) {
                    this.man.active = true;
                }
                else {
                    this.woman.active = true;
                }
            }  



            // if (teamA[i].heroid!=null) {
            //     var heroData = dataMgr.hero[teamA[i].heroid];

            //     var showNode = this._uid2ShowNode[uid];
            //     var icon = showNode.getChildByName("icon");
            //     icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame(heroData.HeroIcon);
            //     icon.active = true;

            //     if (teamA[i].heroid == 1000 && dataCenter.uuid == teamA[i].uid) {
            //         this.woman.active = false;
            //     }
            //     else {
            //         this.man.active = false;
            //     }
            // }//重连
        }
        for (var i in teamB) {
         //   cc.log(teamB[i]);
            var uid = teamB[i].uid;

            // this["showNode" + i].active = true;
            // this._uid2ShowNode[uid] = this["showNode" + i];
            // this._uid2ShowNode[uid].getChildByName("user_name").getComponent(cc.Label).string = teamA[i].name;
            // var heroData = dataMgr.hero[teamA[i].heroid];
            // var icon = this._uid2ShowNode[uid].getChildByName("icon");
            // icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame(heroData.HeroIcon);
            // if (dataCenter.uuid == teamA[i].uid) {
            //     if (teamA[i].heroid == 1000) {
            //         this.man.active = true;
            //     }
            //     else {
            //         this.woman.active = true;
            //     }
            // }  



            // if (teamA[i].heroid!=null) {
            //     var heroData = dataMgr.hero[teamA[i].heroid];

            //     var showNode = this._uid2ShowNode[uid];
            //     var icon = showNode.getChildByName("icon");
            //     icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame(heroData.HeroIcon);
            //     icon.active = true;

            //     if (teamA[i].heroid == 1000 && dataCenter.uuid == teamA[i].uid) {
            //         this.woman.active = false;
            //     }
            //     else {
            //         this.man.active = false;
            //     }
            // }//重连
        }

        // for (var j in dataCenter.loadProjess) {
        //     var showNode = this._uid2ShowNode[j];
        //     var icon = showNode.getChildByName("icon");
        //     if (dataCenter.loadProjess[j] == 1000) {
        //         icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame('chenjingchou');
        //         icon.active = true;
                
        //         if (dataCenter.uuid == j) {
        //             this.woman.active = false;
        //             this.man.active = true;
        //         }
        //         else {
        //             this.woman.active = true;
        //             this.man.active = false;
        //         }
        //     }
        //     else {
        //         icon.getComponent(cc.Sprite).spriteFrame = this.heroIcons.getSpriteFrame('yuxiaoxue');
        //         icon.active = true;
        //         if (dataCenter.uuid == j) {
        //             this.woman.active = true;
        //             this.man.active = false;
        //         }
        //         else {
        //             this.woman.active = false;
        //             this.man.active = true;
        //         }
        //     }
        // }//显示所选角色
    },

     loadProjess() {
        // cc.log(dataCenter.otherLoadRes,"dataCenter.otherLoadRes");
        for (var uid in dataCenter.otherLoadRes) {
            var showNode = this._uid2ShowNode[uid];
            if (!showNode)
                continue;
            var label = showNode.getChildByName("label");
            label.active = true;
            label.getComponent(cc.Label).string = dataCenter.otherLoadRes[uid] + "%";
            // if (dataCenter.otherLoadRes[uid] ==100) {
            //     dataCenter.loadBegin = false;
            // }
        }
    },
   

    start () {

    },

     update (dt) {
        if (dataCenter.loadBegin) {
            this.loadProjess();
        }
     },
});
