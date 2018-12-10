var utility = require('utility')

cc.Class({
    extends: cc.Component,

    properties: {
        effect : sp.Skeleton,
        _ani : null,
        iseffect : false,
        _path : '',
        _active : false,
        _curAni : '',
        _MoveAni : false,
        _BounceAni : false,
        _duration : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var spine = this.effect = this.getComponent('sp.Skeleton');
        
        this.ani = this.getComponent(cc.Animation);
        
        var that = this;

        if(this.ani != null)
        {
            this.ani.on('play',()=>{
                //cc.log("cur animation play cur Position",that.node.position);
            },this);
            this.ani.on('finished',()=>{
                that._active = false;
                if(that.node != null)
                    that.node.position = new cc.v2(0,-1000);
            },this);
        }

        if(spine == null)
            return;

        spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log('effect show over = ',animationName);
           
            if(this.callBack != undefined)
            {
                this.callBack();
            }
            
            if(!this._MoveAni)
            {
                that._active = false;
                that.node.position = new cc.v2(0,-1000);
            }
        });
        spine.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);

            if(this.iseffect)
            {
                this._duration = trackEntry.animation.duration;
            }
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
        this._path = path;
    },
    show(name,callBack){
        this._curAni = name;
        this._active = true;

        if(this.effect == null)
        {
            this._duration = this.ani._clips[0].duration;
            this.ani.play(name);
        }
        else
        {
            this.effect.clearTrack();
            this.effect.setAnimation(0,name, false);
        }

        this.callBack = callBack;
    },
    showMove(name,end,frame){
        this._MoveAni = true;
        this._active = true;
        this.points = undefined;

        this.effect.clearTrack();
        this.effect.setAnimation(0,name, true);

        var dir = end.sub(this.node.position);
        this.step = dir.div(frame);
        this.frame = frame;

        var temp = end.x - this.node.position.x;

        if(temp < 0)
        {
            this.node.scaleX = -1;
        }
        else{
            this.node.scaleX = 1;
        }
    },
    showBezier(name,start,end,callBack){
        this._MoveAni = true;
        this._active = true;

        this.effect.clearTrack();
        this.effect.setAnimation(0,name, false);

        this.callBack = callBack;

        ////确定起点和终点的中间点
        var center = start.add(end).div(2);
        /// 平移
        var zero = start.sub(center);
        var result = new cc.v2(-zero.y,zero.x);
        result = result.add(center);

        this.frame = 10;
        this.points = utility.ComputeCardsBezier(start,end,10,result);
    },
    showBounce(name,frame,ability,callback)
    {
        this.name = name;

        this._BounceAni = true;
        this.callBack = callback;
        this.bounceFrame = frame;
        this.ability = ability;
        this.curIndex = 0;

        this.againBounce();
    },
    againBounce(){
        this.effect.clearTrack();
        this.effect.setAnimation(0,this.name, false);

        this.frame = this.bounceFrame;

        this.ability.curTarget = this.ability.targets[this.curIndex];
        var end = this.ability.targets[this.curIndex].agent.go.position;
        var dir = end.sub(this.node.position);
        this.step = dir.div(this.frame);

        var temp = end.x - this.node.position.x;

        if(temp < 0)
        {
            this.node.scaleX = -1;
        }
        else{
            this.node.scaleX = 1;
        }
    },
    update(dt){
        if(this._MoveAni && this._active && this.points == undefined)
        {
            this.frame -- ;
            this.node.position = this.node.position.add(this.step);

            if(this.frame == 0)
            {
                this._MoveAni = false;
                this._active = false;
                this.node.position = new cc.v2(0,-1000);

            }
        }
        else if(this._MoveAni && this._active && this.points != null)
        {
            if(this.frame > 0)
            {
                var point = this.points[10 - this.frame];
                this.node.position = new cc.v2(point.x,point.y) ;
                this.frame -- ;
            }
            
            if(this.frame == 0)
            {
                this._MoveAni = false;
                this._active = false;

                if(this.callBack != null)
                {
                    this.callBack(this.node.position);
                    this.callBack = null;
                } 
                this.node.position = new cc.v2(0,-1000);
            }
        }
        else if(this._BounceAni)
        {
            this.frame -- ;
            this.node.position = this.node.position.add(this.step);

            if(this.frame == 0)
            {
                this.curIndex++;

                if(this.curIndex == this.ability.targets.length)
                {
                    this._BounceAni = false;
                    this._active = false;
                    this.node.position = new cc.v2(0,-1000);
                    this.callBack('OnFinish');
                }
                else
                {
                    this.againBounce();
                    this.callBack('OnBounce');
                }
            }
        }

        if(this.iseffect && this._active)
        {
            this._duration -= dt;

            if(this._duration <= 0)
            {
                this._active = false;
                this.node.position = cc.v2(0,-1000);
            }
        }
    },
    onFinish(){
        //this.effect.setAnimation(0,name, true);
    }
});
