cc.Class({
    extends: cc.Component,

    properties: {
        direction: cc.Node,
        directionsprite : cc.Sprite,
        blackdot : cc.SpriteFrame,
        yellowdot : cc.SpriteFrame,
        blackArrow : cc.SpriteFrame,
        yellowArrow : cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onEnable(){
        this.directionsprite.spriteFrame = this.blackArrow;
    },

    // update (dt) {},
    setTarget(targets){
        if (!(targets instanceof Array)) {
            targets = [targets];
        }
        for(var i in targets)
        {
            //cc.log('cur targets ',targets[i]);
            var v = this.direction.position.sub(targets[i].agent.go.position.add(cc.v2(0,targets[i].agent.height / 2)));
            var angle = cc.pToAngle(v) / Math.PI * 180;
            //cc.log(angle.toString());
            this.direction.rotation = -angle;
        }
    },
    setDire(lastPoint, bPoint) {
        var v = bPoint.sub(lastPoint);
        var angle = cc.pToAngle(v) / Math.PI * 180;
        //cc.log(angle.toString());
        this.direction.rotation = -angle;
    },
    Reset(){
        this.direction.rotation = 90;
    }
});