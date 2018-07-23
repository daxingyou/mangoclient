var effectMgr = require('EffectMgr')

cc.Class({
    extends: cc.Component,

    properties: {
        effect : sp.Skeleton,
        path : ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var spine = this.effect = this.getComponent('sp.Skeleton');

        spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log('effect show over = ',animationName);
            effectMgr.putEffect(this.path,this);
        });
        spine.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        spine.setInterruptListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        spine.setEndListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
    },

    start () {

    },

    init(path){
        this.path = path;
    },
    show(name){
        this.effect.setAnimation(0,name, false);
    }
});
