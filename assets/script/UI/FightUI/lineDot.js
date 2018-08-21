cc.Class({
    extends: cc.Component,

    properties: {
        direction: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},

    setDire(lastPoint, bPoint) {
        var v = bPoint.sub(lastPoint);
        var angle = cc.pToAngle(v) / Math.PI * 180;
        //cc.log(angle.toString());
        this.direction.rotation = -angle;
    }
});