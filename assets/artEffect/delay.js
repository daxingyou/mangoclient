cc.Class({
    extends: cc.Component,

    properties: {
        delay : 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var animCtrl = this.node.getComponent(cc.Animation);

        if(animCtrl == null)
            cc.error("not found animaiton ~~~~~~~~~ node name = ",this.node.name);

        this.scheduleOnce(function () {
            animCtrl.play(animCtrl.getClips()[0].name);
        },this.delay);
    },
    
    // update (dt) {},
});
