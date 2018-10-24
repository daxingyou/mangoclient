
var uibase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr')
cc.Class({
    extends: uibase,

    properties: {
        title:cc.Node,
        state:cc.Node,
    },
    // onLoad () {},

    start () {

    },

    initBackBtn(callBack, target) {
        this._BackCallBack = callBack;
        this._BackTarget = target;
    },

    
    backMainUI () {
        if(this._BackCallBack)
        {
            cc.log("点击返回了");
            this._BackCallBack.call(this._BackTarget);
        }
        else {
            var uimgr = cc.find('Canvas').getComponent('UIMgr');
            uimgr.loadUI(constant.UI.Main,function(data){
            uimgr.getUI(constant.UI.FightPavTop).hide();
            });
        }
        
       // this.hide();
        // var uimgr = cc.find('Canvas').getComponent('UIMgr');
        // cc.log("返回主界面");
        // if (type == 1) {
        //     uimgr.loadUI(constant.UI.Main,function(data){
        //         uimgr.getUI(constant.UI.FightPavTop).hide();
        //     });
        // } 
        // else if (type == 2) {
        //     uimgr.loadUI(constant.UI.ShowList,function(data){
        //         //uimgr.getUI(constant.UI.FightPavTop).hide();
        //     });
        // }
    },



    onClickState () {
        cc.log("点击说明按钮");
        if (!this.state.active) {
            this.state.active = true;
            var scaleOut = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
            this.state.runAction(scaleOut);
        }
        else {
            var scaleBack = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
            var end_func = cc.callFunc(function() {
                this.state.active = false;
            }.bind(this));
            var seq = cc.sequence([scaleBack, end_func]);
            this.state.runAction(seq);
        }
    },
    changeTitle(teamKind) {
        if (teamKind == 1) {
            this.title.getComponent(cc.Label).string = "天梯模式";
        }
        else if (teamKind == 2) {
            this.title.getComponent(cc.Label).string = "4V4组队";
        }
        else if (teamKind == 3) {
            this.title.getComponent(cc.Label).string = "单人模式";
        }
        else if (teamKind == 0) {
            this.title.getComponent(cc.Label).string = "对弈亭";
        }
        else if (teamKind == 4) {
            this.title.getComponent(cc.Label).string = "商店";
        }
        else if (teamKind == 4) {
            this.title.getComponent(cc.Label).string = "组队准备";
        }
        
    },


    // update (dt) {},
});
