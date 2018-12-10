var uiBase = require('UIBase')
var dataCenter = require('DataCenter')
var constant = require('constants')
var dataMgr = require('DataMgr')
var playerData = require('playerData')
let combatMgr = require('CombatMgr')
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

        if(!combatMgr.teamInfo)
            return;
        let teamA = combatMgr.teamInfo.teamA;
        //cc.log("加载 teamA",teamA);
        let teamB = combatMgr.teamInfo.teamB;
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
        }
        // for (var i in teamB) {
       
        //     var uid = teamB[i].uid;
        // }

      
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
        if (combatMgr.loadBegin) {
            this.loadProjess();
        }
     },
});
