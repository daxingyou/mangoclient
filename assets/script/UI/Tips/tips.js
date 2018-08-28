

var UIBase = require("UIBase")

cc.Class({
    extends: UIBase,

    properties: {
        time : 2,
        speed : 100,
        _aphla : 0,
        text : cc.Label,
        text_bg:cc.Node,
        tipCount:false,
    },
    onLoad () {
     
     
    },

    start () {

       
    },

    update (dt) {
        if (this.tipCount) {
            if (this._aphla < 255) {
                this._aphla += Math.floor(dt * this.speed * 2);
            }
        else if (this._aphla > 255) {
            this._aphla = 255;
        }
        else if (this._aphla == 255) {
            this.time -= dt * 10;
        }

        this.node.opacity  = this._aphla;  
      // cc.log("+到255------------------",this._aphla);  
        }
        
            
        if (this.time <= 0)
        {
            this.tipCount = false;
            this._aphla -= dt * this.speed * 10;
            if (this._aphla <= 0)
                this.hide();
            else {
                this.node.opacity  = this._aphla;    
            }
           // cc.log("-到255------------------",this._aphla);  
        }

        
    },

    onEnable(){
        this.time = 2;
        this.tipCount = true;
    },//被激活时

    onDisable(){

    },
    showText(text,pos){
        this.init();
        this.text.string = text;
        if(pos == undefined)
            pos = cc.v2(0,0);
        this.node.position = pos;
    },
    init(){
        
        this._aphla = 0;
        this.time = 2;
        this.tipCount = true;
    }
  
});
