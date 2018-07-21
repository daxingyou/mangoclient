var utility = require('utility')

cc.Class({
    extends: cc.Component,

    properties: {
        spine : sp.Skeleton,
        _time : 5,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            
            if(animationName == 'idle2')
            {
                this.spine.setAnimation(0,'idle',true);
            }
        });
    },

    start () {

    },

    onEnable(){
        this._time = utility.RandomInt(2,10);
    },

    update (dt) {
        this._time -= dt;

        if(this._time <= 0)
        {
            this._time = utility.RandomInt(2,10);
            this.playAni();
        }
    },
    playAni(){
        this.spine.setAnimation(0,'idle2',false);
    }
});
