var UIBase = require('UIBase')
var combatmgr = require('CombatMgr')

cc.Class({
    extends : UIBase,

    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        mp:cc.Label, 
        thew:cc.Label,
        HandsCardRoot : cc.Node,
        CardsLayout : cc.Layout,
        _HandsCards : [],
        input : cc.Component,
        time:cc.Label,
        min_time:2,
        sec_time:60,   
        lineDot:cc.Node,
        lineDotSrc : cc.Component,
        mpSprite:cc.Node,
        action_time: 15,
        clockwise: false, // 是否为顺时针
        reverse: false, 
        play_onload: true, // 是否在加载
        angle:30,
    },
    onLoad () {
     
       var self = this;
       var resIndex = 0;
       for(var i=0;i<10;i++)
       {
           cc.loader.loadRes('UI/fightUI/Card', function(errorMessage, loadedResource){
               if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
               if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
               let item = cc.instantiate(loadedResource);
               self.HandsCardRoot.addChild(item);
               self._HandsCards.push(item.getComponent('CardItem'));
              
             
            //    self.HandsCardRoot[i].hide();
            //    self._HandsCards[i].hide();
               if(resIndex == 10)
               {
                   cc.loader.release('UI/fightUI/Card'); 
               }
           });   
       } 

    },
    loadCircle() {
        this.now_time = 1;
        this.is_running = false;
        this.mpSprite.active = true; 
        this.sprite = this.mpSprite.getComponent(cc.Sprite);
        if (this.play_onload) {
            this.start_clock_action(this.action_time);
        } 
    },
start_clock_action: function(action_time) {
    if (action_time <= 0) {
        return;
    }
    this.action_time = action_time;
    this.now_time = 1;
    this.is_running = true;
},  
    start () {
        this.schedule(this.callback, 1);
        this.loadCircle();
    },
    update (dt) {

        if (!this.is_running) {
            return;
        }
        this.now_time += dt * 10;
        var per = this.now_time / this.action_time;//百分比
        this.sprite.fillRange = per;
        if(per >0.6){
            this.is_running = false;
        }    
      
        // if (this.reverse) {
        //     per = per;
        // }
        // if (this.clockwise) {
        //     per = -per;
        // }
       
    },
   
    callback () {
        this.sec_time--;
        if(this.sec_time ===0){
            this.min_time -= 1;
            this.sec_time = 60;
        }
        if(this.min_time < 0){
            this.unschedule(this.callback);
            this.min_time = 0;
            this.sec_time = 0;
        }
        if(this.sec_time < 10 && this.sec_time !=0){
            this.time.string ="" + this.min_time + ":0"  + "" + this.sec_time;
        }
        else{
            this.time.string ="" + this.min_time + ":"  + "" + this.sec_time; 
        }
           },//定时器
    OnFresh : function(data){
        //.mp data.inHands
        this.ShowHandCards();
        this.DiscardPile.string = data.discardsNum.toString();
    },
    onFreshCardsNum(num){
        this.cards.string = num.toString();
    },
    showNum(mp,disCard,exHaust){
        this.mp.string ="" + mp;
        this.thew.string = '10';
        this.ExhaustedPile.string ="" + disCard;
        this.ExhaustedPile.string ="" + exHaust;
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
                //cc.log('%s cur',i.toString(),' name :',player.handsPile[i].skillName);
            }
            else{
                this._HandsCards[i].hide();
            }
        }
    },



    UseCard : function(index){
        this._HandsCards[i].hide();

    }
});
