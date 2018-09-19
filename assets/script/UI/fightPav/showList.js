var uibase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr')

cc.Class({
    extends: uibase,

    properties: {
        Level:cc.Node,
        soloBtn:cc.Node,
        teamBtn:cc.Node,
        practiceBtn:cc.Node,

        showWait:cc.Node,
        _CDState:false,
        cdTime:0,
        waitedTime:cc.Label,
        minTime:0,

        teamKind:1,
    },


    // onLoad () {},

    start () {
        this.scheduleOnce(this.matchSucceed,5);
    },
    
    showLevel (data) {
        cc.log("等级大于5 显示组队/单人 小于5 显示开启天梯");
         if (data > 5) {
            this.Level.getChildByName("moreFive").active = true;
            this.Level.getChildByName("lessFive").active = false;
         }
         else {
            this.Level.getChildByName("moreFive").active = false;
            this.Level.getChildByName("lessFive").active = true;
         }
    },

    solo () {
        cc.log("单人模式加载计时器，加载单人模式预制体");
        this._CDState = true;
        this.cdTime = 0;
        this.showWait.active = true;
        this.unEableClick();
    },
    
    team (event, customEventData,teamData) {
        cc.log("组队模式 or 练习模式 加载队友模式预制体");
        this.unEableClick();
        this._CDState = true;
        this.cdTime = 0;
        this.showWait.active = true;
        if (customEventData == 1) {
            this.teamKind = 1;
            // this.canInvite.active = true;//加判断，可以邀请的段位
        }
        else if (customEventData == 2) {
          this.teamKind = 2;
        } 
        //if () {cc.log("如果是队长显示开始匹配");}
        this._prepare = true;
      //  this.matchSucess();//直接匹配成功

    },

    unEableClick () {
        cc.log("选择模式后禁用按钮");
        this.soloBtn.getComponent(cc.Button).interactable = false;
        this.teamBtn.getComponent(cc.Button).interactable = false;
        this.practiceBtn.getComponent(cc.Button).interactable = false;
    },

    eableClick () {
        cc.log("关闭禁用按钮");
        this.soloBtn.getComponent(cc.Button).interactable = true;
        this.teamBtn.getComponent(cc.Button).interactable = true;
        this.practiceBtn.getComponent(cc.Button).interactable = true;
    },

    cancelMatch () {
        cc.log("取消匹配");
        this.eableClick();
        this._CDState = false;
        this.cdTime = 0;
        this.minTime = 0;
        this.showWait.active = false;
        cc.log("释放team 预知体");
    },
    matchSucceed() {
        cc.log("匹配成功");
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        var self = this;
         uimgr.loadUI(constant.UI.TeamPattern,function(data){
             if (self.teamKind == 1) {
                data.title.string = "天梯模式";
             }
             else {
                data.title.string = "4v4组队";
                data.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "取消准备";
             }
         });
         //隐藏顶部，返回按钮
         var ui = uimgr.getUI(constant.UI.FightPavTop);
         if(ui != null)
             ui.changeTitle(self.teamKind);

    },
    enterStore() {
        cc.log("进入商店");
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Store,function(data){});
        var ui = uimgr.getUI(constant.UI.FightPavTop);
        if(ui != null) {
            ui.changeTitle(3);
        }     
    },

    update (dt) {
        if (this._CDState) {
                this.cdTime += dt;
            var temp = Math.floor(this.cdTime);
            var moreSec = temp%59;
            if ( moreSec == 0 && temp!=0) {
               this.minTime = Math.floor(temp/59);
               this.cdTime = 0;
               temp = 0;
            }
            if (temp < 10) {
                this.waitedTime.string ="0"+ this.minTime + ":0" + temp.toString();
            }
            else {
                this.waitedTime.string ="0"+ this.minTime + ":" + temp.toString();
            } 
        }
     },
});
