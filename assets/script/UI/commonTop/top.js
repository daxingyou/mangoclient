
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
        if(this._BackCallBack) {
            this._BackCallBack.call(this._BackTarget);
        }
        else {
            var uiMgr = cc.find('Canvas').getComponent('UIMgr');
            uiMgr.release();
            uiMgr.loadUI(constant.UI.Main);
        } 
    },

    onClickState () {
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
        this.title.getComponent(cc.Label).string = teamKind;
    },


    // update (dt) {},
});
