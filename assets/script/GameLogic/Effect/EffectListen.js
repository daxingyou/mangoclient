cc.Class({
    extends: cc.Component,

    properties: {
        effect : sp.Skeleton,
        _path : '',
        _active : false,
        _curAni : '',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var spine = this.effect = this.getComponent('sp.Skeleton');
        cc.log('wtf ??????? this = ',this.uuid, ' spine == ',spine.uuid);
        var that = this;

        spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log('effect show over = ',animationName);
            if(animationName == this._curAni)
            {
                that._active = false;
                cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
            }   
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
            if(animationName == this._curAni)
            {
                that._active = false;
                cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
            }   
            
        });
    },

    start () {

    },

    init(path){
        this._path = path;
    },
    show(name){
        this._curAni = name;
        this.effect.setAnimation(0,name, false);
        this._active = true;
        cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
    }
});
