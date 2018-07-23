// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var constant = require('constants');
var ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    editor:{
        requireComponent : sp.Skeleton
    },

    properties: {
        _index : 1,
        _stand : 'guard',
        _attack : 'attack',
        _die : 'die',
        _hit : 'hit',
        _skilla : 'skilla',
        _victory : 'victory'
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var spine = this.spine = this.getComponent('sp.Skeleton');

        //this._setMix(this._standS,this._attackS);

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
        spine.setDisposeListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            
            if(animationName != 'guard' && animationName != 'guard2' && animationName != 'die')
                this.spine.setAnimation(0,this._stand, true);
            //cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        spine.setEventListener((trackEntry, event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });
    },

    start () {
    },

    // update (dt) {},
    initIndex(index){
        this._index = index;
    },
    ///动画过渡
    _setMix(anim1,anim2){
        this.spine.setMix(anim1,anim2,constant.mixTime)
    },
    setShader(name){
        ShaderUtils.setShader(spine, name);
    },
    //动画融合
    stand(){
        //this.spine.
        this.spine.setAnimation(0,this.standS, true);
    },
    attack(){
        this.spine.setAnimation(1, this.attackS, false);
    },
    playAnimation(name,loop){
        this.spine.setAnimation(0,name,loop);
    }
});
