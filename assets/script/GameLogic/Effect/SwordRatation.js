var effectMgr = require('EffectMgr')

cc.Class({
    extends: cc.Component,

    properties: {
       frame : 0,
       height : 0,
       _active :false,
       _left : 0,
       _right : 0,
       _leftSpeed : 0,
       _rightSpeed : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    show(){
        this.frame = 3;

        this._active = true;

        this.src = this.node.getComponent('ShaderUtilsForWsword');
        this._left = this.src.left;
        this._right = this.src.right;

        var dir = new cc.v2(this._right - this._left,1).normalize();
        this._speed = new cc.v2(dir.x * this.height,dir.y * this.height);

        this._leftSpeed = this._left / this.frame;
        this._rightSpeed = this._right / this.frame;
    },
    update (dt) {
        if(this._active)
        {
            this.frame --;

            var temp = new cc.v2(this._speed.x * dt,this._speed.y * dt);
            this.node.position = this.node.position.add(temp);

            this._left += this._leftSpeed;
            this._right += this._rightSpeed;
            this.src.setValue(this._left,this._right);

            if(this.frame == 0)
            {
                this._active = false;
                this.src = this.node.getComponent('ShaderUtilsForWsword');
                var effect = this.node.getComponent('EffectListen');
                effect.onFinish();
                effect._active = false;
                effect._MoveAni = false;

                effectMgr.getPosEffect('chenjinchou',this.node.position,'reverse',0);

                this.node.position = new cc.v2(0,-1000);
            }
        }
    },
});
