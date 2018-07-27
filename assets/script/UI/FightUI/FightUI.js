var UIBase = require('UIBase')
var combatmgr = require('CombatMgr')
var dataCenter = require('DataCenter')


cc.Class({
    extends : UIBase,
    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        mp:cc.Label, 
        mpSpire : cc.Sprite,
        thew:cc.Label,
        HandsCardRoot : cc.Node,
        //CardsLayout : cc.Layout,
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
        delta_angle: 3,
        userName:cc.Label,
        playerHpBar:cc.ProgressBar,
       
    },
    onLoad () {
     
        var self = this;
        self.userName.string = dataCenter.userName;
        var resIndex = 0;
        for(var i=0;i<10;i++)
        {
            cc.loader.loadRes('UI/fightUI/Card', function(errorMessage, loadedResource){
                if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                let item = cc.instantiate(loadedResource);
                resIndex ++ ;
                self.HandsCardRoot.addChild(item);
                self._HandsCards.push(item.getComponent('CardItem'));
                if(resIndex == 10)
                {
                    cc.loader.release('UI/fightUI/Card'); 
                 
                }
            });   
        } 
 
     },

    layout() {
        
        cc.log(combatmgr.getSelf().handsPile.length,"length");
        var num =  combatmgr.getSelf().handsPile.length;;
        this.angle_set = [];
        var count = num / 2;
        var angle = 90 + count * this.delta_angle;
        if (num % 2 == 0) {
            angle -= (this.delta_angle * 0.5);
        }
        for(var i = 0; i < num; i ++) {
            this.angle_set.push(angle);
           cc.log(angle);
            angle -= this.delta_angle;
        }

        for(var i = 0; i < num; i ++) {
            var item = this.HandsCardRoot.children[i];
            var r = (this.angle_set[i] / 180) * Math.PI;
           item.x = -(count - 0.5) * 80 + i * 80;
            
           if(i < count){
            if(i<=0){
                item.y = -(num-1)*count -15;
            }
            else{
                item.y = this.HandsCardRoot.children[i-1].y + 5*((count+1)-i);
            } 
        }
           if(i >= count){
               if( i == count ){
                   item.y=count*(count) - 15;
               }
               else{
                   item.y=this.HandsCardRoot.children[i-1].y -5*(i + 1 - count);
               }
           }
            item.rotation = 360 - this.angle_set[i] + 90;
            cc.log(360 - this.angle_set[i]);
            cc.log(item.x + '#' + item.y);
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
        var self = this;
        self.userName.string = dataCenter.userName;
        self.schedule(self.callback, 1);
        self.loadCircle();
        var length = self.HandsCardRoot.childrenCount;

        for(var i=0;i<length;i++){
            var item =self.HandsCardRoot.children[i];
            var start_rotation = item.rotation;
            cc.log("item.rotation",start_rotation);
            var item_y = item.y;
            var item_x = item.x;
            item.on(cc.Node.EventType.TOUCH_START, function (event) {//节点区域时   
                cc.log("start----------------");
                item.rotation = 0;
                item.y +=  400;
                item.x = 0;
                var s = cc.scaleTo(0.001, 1.3).easing(cc.easeBackOut());
                item.runAction(s);
                cc.log("start------------end");
            }, item);

            item.on(cc.Node.EventType.TOUCH_END, function (event) {//节点区域时   
                cc.log("touch----------------");
                item.rotation = start_rotation;
                item.y = item_y;
                item.x = item_x;
                var s = cc.scaleTo(0.001, 1).easing(cc.easeBackOut());
                item.runAction(s);
                cc.log("touch------------end");
            }, item);

            item.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {//节点区域时   
                cc.log("touch----------------cancel");
                item.rotation = start_rotation;
                item.y = item_y;
                item.x = item_x;
                var s = cc.scaleTo(0.001, 1).easing(cc.easeBackOut());
                item.runAction(s);
                cc.log("touch------------cancel");
            }, item);
        }   
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
        if(this.sec_time == 0){
            this.min_time -= 1;
            this.sec_time = 59;
        }
        
        if(this.min_time >=0){
            if(this.sec_time < 10 && this.sec_time !=0){
                this.time.string ="" + this.min_time + ":0"  + "" + this.sec_time;
            }
            else{
                this.time.string ="" + this.min_time + ":"  + "" + this.sec_time; 
            }
           
        }
        if(this.min_time < 0){
            this.unschedule(this.callback);
            this.min_time = 0;
            this.sec_time = 0;
            this.time.string ="" + this.min_time + ":0"  + "" + this.sec_time; 
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
    onFreshMp(mp){
        this.mp.string = mp;
        this.mpSpire.fillRange = mp / 10;
    },
    showNum(mp,disCard,exHaust){
        this.onFreshMp(mp);
        this.thew.string = '10';
        this.DiscardPile.string = disCard;
        this.ExhaustedPile.string = exHaust;
    },
    
    ShowHandCards : function(){
        var player = combatmgr.getSelf();
        this.layout();

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
    },
    FreshHp : function(){
        var player = combatmgr.getSelf();
        this.playerHpBar.progress = player.Hp / player.MaxHp;
    }
});
