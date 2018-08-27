cc.Class({
    extends: cc.Component,

    properties: {
        direction: cc.Node,
        directionsprite : cc.Sprite,
        blackdot : cc.SpriteFrame,
        yellowdot : cc.SpriteFrame,
        blackArrow : cc.SpriteFrame,
        yellowArrow : cc.SpriteFrame,
        _curState : false,          //true 可以释放技能
        _dots : null,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this._dots = new Array();
        for(var i = 0; i < this.node.children.length -1;i++)
        {
            this._dots.push(this.node.children[i].getComponent(cc.Sprite));
        }
    },

    onEnable(){
        this._curState = false;
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
    },
    canUse(){
        if(!this._curState)
        {
            this._curState = true;
            this.directionsprite.spriteFrame = this.yellowArrow;

            for(var i in this._dots)
            {
                this._dots[i].spriteFrame = this.yellowdot;
            }
        }
    },
    noCan(){
        if(this._curState)
        {
            this._curState = false;
            this.directionsprite.spriteFrame = this.blackArrow;

            for(var i in this._dots)
            {
                this._dots[i].spriteFrame = this.blackdot;
            }
        }
    }
});