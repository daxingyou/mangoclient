// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIBase = require('UIBase')

cc.Class({
    extends: UIBase,

    properties: {
        time : 2,
        speed : 1000,
        _aphla : 0,
        text : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(this._alpha < 255)
            this._alpha += dt*this.speed;
        else if(this._alpha > 255)
            this._alpha = 255;
        else if(this._alpha == 255)
        {
            this.time -= dt*10;
        }
            
        if(this.time <= 0)
        {
            this._alpha += dt*this.speed;
            if(this._alpha <= 0)
                this.hide();
        }
            
        this.node.opacity  = this._alpha;
    },

    onEnable(){
        this.time = 2;
    },

    onDisable(){

    },
    showText(text){
        this.text.string = text;
    }
});
