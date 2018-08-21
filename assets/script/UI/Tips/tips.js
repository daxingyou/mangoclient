// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIBase = require("UIBase")

cc.Class({
    extends: UIBase,

    properties: {
        time : 2,
        speed : 100,
        _aphla : 0,
        text : cc.Label,
        text_bg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.log("tip---x" +this.node.x + 'tip-----y'+ this.node.y);
     
    },

    start () {

       
    },

    update (dt) {
        if(this._aphla < 255)
            this._aphla += dt*this.speed;
        else if(this._aphla > 255)
            this._aphla = 255;
        else if(this._aphla == 255)
        {
            this.time -= dt*10;
        }
            
        if(this.time <= 0)
        {
            this._aphla += dt*this.speed;
            if(this._aphla <= 0)
                this.hide();
        }

        this.node.opacity  = this._aphla;    
    },

    onEnable(){
        this.time = 2;
    },//被激活时

    onDisable(){

    },
    showText(text,type,callback){
        this.init();
        this.text.string = text;
        /*
        if(type == text)
        {
            1.show();
        }
        else if(type == button)
        else if(type == button)
        */
    },
    init(){
        this._aphla = 0;
        this.time = 2;
    }
  
});
