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
var combatmgr = require('CombatMgr')

cc.Class({
    extends : UIBase,

    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        mpLabel:cc.Label, 
        HandsCardRoot : cc.Node,
        CardsLayout : cc.Layout,
        _HandsCards : [],
        input : cc.Component,
        time:cc.Label,
        min_time:2,
        sec_time:60,   
           
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.time.string = "3:0";
        this.schedule(this.callback, 1);
        for (var i = 0; i < this.CardsLayout.node.children.length; ++i) {
            this._HandsCards.push(this.CardsLayout.node.children[i].getComponent('CardItem'));
        }
    },

    
 callback () {
    this.sec_time--;
    if(this.sec_time ===0){
        this.min_time-=1;
        this.sec_time = 60;
    }
    if(this.min_time < 0){
        cc.log(this.min_time +"this.min");
        this.unschedule(this.callback);
        this.min_time = 0;
        this.sec_time = 0;
    }
    this.time.string ="" +this.min_time + ":"  +""+this.sec_time;
       },

 

    update (dt) {
    },
    OnFresh : function(data){
        //.mp data.inHands
        this.ShowHandCards();
        this.DiscardPile.string = data.discardsNum.toString();
    },
    onFreshCardsNum(num){
        this.cards.string = num.toString();
    },
    showNum(num2,num3){
        this.ExhaustedPile.string = num2.toString();
        this.mpLabel.string = num3.toString();
    },
    ShowHandCards : function(){
        var player = combatmgr.getSelf();

        //for(var i=0;i<player.handsPile.length;i++)
        for(var i=0;i<10;i++)
        {
            if(i < player.handsPile.length)
            {
                this._HandsCards[i].show();
                this._HandsCards[i].initData(player.handsPile[i].skillName,player.handsPile[i].spriteName,i);
                cc.log('%s cur',i.toString(),' name :',player.handsPile[i].skillName);
            }
            else{
                this._HandsCards[i].hide();
            }
        }
    },
    UseCard : function(index){
        this._HandsCards[index].hide();
    }
});
