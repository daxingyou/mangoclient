// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dmg : cc.Label,
        speed : 1000,
        _alpha : 255,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this._alpha -= dt*this.speed;
        this.node.opacity  = this._alpha;

        if(this._alpha <= 0)
            this.node.active = false;
    },

    init(combatUnit,dmg){
        this.dmg.string = dmg.toString();
        this.node.position = combatUnit.agent.go.position + new cc.v2((10 - Math.random()*10)*3,20);
    }
});
