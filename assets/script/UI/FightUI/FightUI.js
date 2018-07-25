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
        R: 50,
        delta_angle: 15,
      
       
    },
    onLoad () {
     
        var self = this;
        var resIndex = 0;
        var res = 0;
        var act = 0;
        var resRight = 0;
        var resLeft = 5;
       
        let angleDif = 4;
        for(var i=0;i<10;i++)
        {
            cc.loader.loadRes('UI/fightUI/Card', function(errorMessage, loadedResource){
                if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                let item = cc.instantiate(loadedResource);
                resIndex ++ ;
                resLeft--;
                res +=5;
                if(resIndex <= 5){
                 item.x =  resLeft * -70;
                 item.y =-30 +res;
                 item.rotation = -resLeft * angleDif;
                   //cc.log(item.x,item.y);
                  }
                if(resIndex > 5){
                 resRight++;
                 act+=5;
                 item.x = resRight * 70;
                 item.y = -act;
                 item.rotation = resIndex * angleDif-15;
                 cc.log(item.x,item.y);
                }
               
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


    itemPosition () {
        this.center_x = -1000;
        this.center_y = -this.R;

        var num = 10;
        this.angle_set = [];
        var count = Math.floor(num / 2);
        var angle =75 + count * this.delta_angle;
        
       
        for(var i = 0; i < num; i ++) {
            this.angle_set.push(angle);
            console.log(angle,"angle");
            angle -= this.delta_angle;
        }

        for(var i = 0; i < this.HandsCardRoot.childrenCount; i ++) {

            var item = this.HandsCardRoot.children[i];
            var r = (this.angle_set[i] / 180) * Math.PI;
            cc.log(r,"r");
            item.x = this.center_x + this.R * Math.cos(r);
            item.y = this.center_y + this.R * Math.sin(r);
            item.rotation = 360 - this.angle_set[i];
            console.log(360 - this.angle_set[i],"jiaodu");//195,210,225,240,
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
      
    },
  
   
    callback () {
        this.sec_time--;
        if(this.sec_time ===0){
            this.min_time -= 1;
            this.sec_time = 59;
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
        this.mp.string =mp;
        //sprite.fillRange = 1;
        this.thew.string = '10';
        this.DiscardPile.string =disCard;
        this.ExhaustedPile.string =exHaust;
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
        this._HandsCards[index].hide();
    }
});
