var uiBase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr');
var dataCenter = require('DataCenter')
var fightData = require('fightData')
var consts = require('consts')
var teamData = require('teamData')
cc.Class({
    extends: uiBase,

    properties: {
     win:cc.Node,
     lose:cc.Node,
     mask:cc.Node,
     _CDState : true,
     cdTime : 1,
     tips:cc.Node,
     speed:50,
     _aphla:0,
     tipCont:true,
     _fightType: null,
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },

    start () {
       
    },
    reslut(res,fightType) {
        this._fightType = fightType;
            this.mask.opacity = 0;
            var fin = cc.fadeTo(0.3,153);
            this.mask.runAction(fin);
            if (res == 1) {
                this.win.active = true;
                this.lose.active = false;
               
                this.win.scale = 0;
                var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
                this.win.runAction(s);
            }
            else if (res == 3) {
                cc.log("打平了----");
                this.win.active = false;
                this.lose.active = false;
            }
            else {
                this.lose.active = true;
                this.win.active = false;
                this.lose.scale = 0;
                var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
                this.lose.runAction(s);
            }
    },

    onEnable() {
        this.tipCont = true;
    },//被激活时

    again(){

         if (this._CDState == false) {

            // if ( this._fightType == consts.Team.TYPE_PRACTICE)
             if (this._fightType == consts.Team.TYPE_PRACTICE || this._fightType == consts.Team.TYPE_LADDER) {
                this._uimgr.loadUI(constant.UI.BuildTeam,function(data){
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true; 
                    data.laodFriendList();//加载可以邀请的好友信息
                });
                this._uimgr.loadUI(constant.UI.FightTop,function(data){
                   data.changeTitle('练习队伍');
                });
             }
             else if (this._fightType == consts.Team.TYPE_RAID) {

                //  if (teamData.refreshTeam == null) {//单人副本
                //     this._uimgr.loadUI(constant.UI.RaidUI,function(data){
                //         combatMgr.Release();
                //         combatMgr.curCombat.UILoadOk = true; 
                //     });
                //  }
                //  else { // 多人副本
                //     cc.log("多人副本,teamRaidMassage 处理");
                //  }
             }
         }

       
    },

     update (dt) {

        if (this.tipCont) {
            if (this._aphla < 255) {
                this._aphla += dt * this.speed;
                this.tips.opacity  = this._aphla;
            }
            else {
                this.tipCont = false;
            }
        }
    
        if (this._CDState) {
            this.cdTime -= dt;
            if (this.cdTime <= 0) {
                this._CDState = false; 
            }
        }
     },
});
