var utility = require('utility')

cc.Class({
    extends: cc.Component,

    properties: {
        effect : sp.Skeleton,
        _path : '',
        _active : false,
        _curAni : '',
        _MoveAni : false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var spine = this.effect = this.getComponent('sp.Skeleton');


        if(spine == null)
            return;

        var track = spine.getCurrent(1);
        var that = this;

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
            //cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
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
            //if(animationName == this._curAni)
            //{
            //    that._active = false;
            //    cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
            //}   
            
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
        this.effect.clearTrack();
        this.effect.setAnimation(0,name, false);
        this.callBack = callBack;

        cc.log('wtf ??????? this = ',this.uuid, ' spine == ',this.effect,' name ==',name ,' active = ',this._active);
    },
    showMove(name,end,frame){
        this._MoveAni = true;
        this._active = true;
        this.points = undefined;

        this.effect.clearTrack();
        this.effect.setAnimation(0,name, false);
        //var track = this.effect.getCurrent(0);
        //cc.log('track = ',track);

        var dir = end.sub(this.node.position);
        this.step = dir.div(frame);
        this.frame = frame;
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
                //cc.log('why...');

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
    },
    onFinish(){

    }
});
