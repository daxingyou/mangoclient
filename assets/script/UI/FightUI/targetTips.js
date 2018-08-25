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
        topLeft : cc.Node,
        topRight : cc.Node,
        bottomLeft : cc.Node,
        bottomRight : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    show(rect){
        this.topLeft.position = cc.v2(rect.x,rect.y + rect.height);
        this.topRight.position = cc.v2(rect.x + rect.width,rect.y + rect.height);
        this.bottomLeft.position = cc.v2(rect.x ,rect.y);
        this.bottomRight.position = cc.v2(rect.x + rect.width,rect.y);
    },
    hide(){
        this.topLeft.position = cc.v2(-2000,-2000);
        this.topRight.position = cc.v2(-2000,-2000);
        this.bottomLeft.position = cc.v2(-2000,-2000);
        this.bottomRight.position = cc.v2(-2000,-2000);
    }
});
