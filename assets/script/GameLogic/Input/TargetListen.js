// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        _index : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var mgr = cc.find('Canvas/ui/FightUI/targetTips').getComponent('InputMgr');
        var that = this;
        this.node.on('mouseup', function ( event ) {
            mgr.selelctTarget(that._index);
            cc.log('click ~~~~~~~~~~~~~~');
        });

        this.spine = this.getComponent(cc.Sprite);
        //ShaderUtils.setShader(this.spine, "stroke");
    },

    start () {

    },

    // update (dt) {},
    init(index){
        this._index = index;
    }
});
