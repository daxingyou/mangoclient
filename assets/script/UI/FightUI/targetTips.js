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
    show(target){
        if(target != null)


        if(target.table.ID == 10001 && target.agent.go.scale > -1 && target.agent.go.scale < 1)
        {
            this.bottomLeft.position = cc.v2(target.agent.go.position.x + target.summoned.TargetFrame.x1,target.agent.go.position.y + target.summoned.TargetFrame.y1);
            this.bottomRight.position = cc.v2(target.agent.go.position.x + target.summoned.TargetFrame.x2,target.agent.go.position.y + target.summoned.TargetFrame.y2);
            this.topLeft.position = cc.v2(target.agent.go.position.x + target.summoned.TargetFrame.x3,target.agent.go.position.y + target.summoned.TargetFrame.y3);
            this.topRight.position = cc.v2(target.agent.go.position.x + target.summoned.TargetFrame.x4,target.agent.go.position.y + target.summoned.TargetFrame.y4);
        }
        else
        {
            this.bottomLeft.position = cc.v2(target.agent.go.position.x + target.table.TargetFrame.x1,target.agent.go.position.y + target.table.TargetFrame.y1);
            this.bottomRight.position = cc.v2(target.agent.go.position.x + target.table.TargetFrame.x2,target.agent.go.position.y + target.table.TargetFrame.y2);
            this.topLeft.position = cc.v2(target.agent.go.position.x + target.table.TargetFrame.x3,target.agent.go.position.y + target.table.TargetFrame.y3);
            this.topRight.position = cc.v2(target.agent.go.position.x + target.table.TargetFrame.x4,target.agent.go.position.y + target.table.TargetFrame.y4);
        }
    },
    showRect(rect){
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
