var uiBase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr');


cc.Class({
    extends: uiBase,

    properties: {
     win:cc.Node,
     lose:cc.Node,
     _CDState : true,
     cdTime : 1,
     tips:cc.Node,
     speed:50,
     _aphla:0,
     tipCont:true,
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
     
       // this._uimgr.showTips('点击任意位置返回');
    },

    start () {
       
    },
    reslut(res){
        if(res == 1){
            cc.log("win");
            this.win.active = true;
            this.lose.active = false;
        }
        else if(res == 3){
            cc.log("打平了----");
            this.win.active = false;
            this.lose.active = false;
        }
        else{
            cc.log('lose');
            this.lose.active = true;
            this.win.active = false;
        }
    },

    onEnable(){
        this.tipCont = true;
    },//被激活时

    again(){
       
         if(this._CDState == false){
            this._uimgr.loadUI(constant.UI.Match,function(data){
                combatMgr.Release();
                combatMgr.curCombat.UILoadOk = true; 
            });
         }
       
    },

     update (dt) {

       
        if(this.tipCont){
            if(this._aphla < 255)
            {
                this._aphla += dt * this.speed;
                this.tips.opacity  = this._aphla;
            }
            else{
                this.tipCont = false;
            }
        }
        

        if(this._CDState)
        {
            this.cdTime -= dt;
            if(this.cdTime <= 0){
                this._CDState = false; 
            }
        }
     },
});
