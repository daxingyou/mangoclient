var UIBase = require('UIBase')
var combatmgr = require('CombatMgr')
var dataCenter = require('DataCenter')
var datamgr = require('DataMgr')
var consts = require('consts')



cc.Class({
    extends : UIBase,
    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        mp:cc.Label, 
        mpSpire : cc.Sprite,
        rotaMp:cc.Node,
        mp_fill:cc.Node,
        thew:cc.Label,
        thewSpire:cc.Sprite,
        thew_fill:cc.Node,
        HandsCardRoot : cc.Node,
        //CardsLayout : cc.Layout,
        _HandsCards : [],
        input : cc.Component,
        time:cc.Label,
        min_time:2,
        sec_time:60,   
        lineDot:cc.Node,
        lineDotSrc : cc.Component,
        userName:cc.Label,
        playerHpBar:cc.ProgressBar,
        barLabel:cc.Label,
        headImg:cc.Node,
        heroIcon:cc.SpriteAtlas,
        count:0,
        _bMpFull: false,
        _x:[],
        _y:[],
        _rot:[],
        now_index:-1,
        centerCard:cc.Node,
        CardChildrenCount:[],
    },

    onLoad () {
        this.initData();
     },

     initData(){
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
         this.userName.string = dataCenter.userName;
         this.schedule(this.callback, 1);
         this.mp_fill.active = false;
         this.thew_fill.active = false;   
         var resIndex = 0;
         this.barLabel.string = combatmgr.getSelf().Hp + '/'+  combatmgr.getSelf().MaxHp;

         if(dataCenter.userName==="于小雪"){
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('yuxiaoxue');
         }
         else{
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('chenjingchou');
         }

         if(dataCenter.userName==""){
             if(dataCenter.ComfirmFirst == true ||  dataCenter.ComfirmSecond == true){
                this.userName.string ="于小雪";
                this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('yuxiaoxue');
             }
             else{
                this.userName.string ="陈靖仇";
                 this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('chenjingchou');
             }  
         }

         var self = this;
         for(var i=0;i<8;i++)
        {
            cc.loader.loadRes('UI/fightUI/Card', function(errorMessage, loadedResource){
                if( errorMessage ) { 
                    cc.log( '载入预制资源失败, 原因:' + errorMessage ); 
                    return; 
                }
                if( !( loadedResource instanceof cc.Prefab ) ) { 
                    cc.log( '你载入的不是预制资源!' ); 
                    return; 
                }

                let item = cc.instantiate(loadedResource);
                resIndex ++ ;
                self.HandsCardRoot.addChild(item);
            
                self._HandsCards.push(item.getComponent('CardItem'));
                if(resIndex == 8)
                {
                    cc.loader.release('UI/fightUI/Card'); 
                }
            });   
        } 
     },

     updateBarLabel(HP,MaxHp){
        this.barLabel.string = HP.toString() +'/' + MaxHp.toString();
     },

    layout() {
        this._x = [];
        this._y = [];
        this._rot = [];

        var num =  combatmgr.getSelf().handsPile.length;
        var count = num / 2;

        var a = 1;//x方向偏心率
        var b = 1.01;//y方向偏心率
        var R = 1245;//半径  425/sin20 

        var angle = 2 * (5 * count) * Math.PI/180;//总夹角对应的弧度
        var delta_x = 0;
        var delta_y = 40 - count * 8;

        var x,y,rotation,delta_angle,rad;

        for (let i = 0; i < num; i ++) {

            delta_angle = (i - count + 0.5) * 5.8;
            let itemCom = this._HandsCards[i];
            rotation = 360 + delta_angle;
            rad = (rotation -360) * Math.PI/180;

            x = a * R * Math.sin(rad) + delta_x;
            y = b * R * Math.cos(rad) - R * Math.cos(angle/2) + delta_y;
            itemCom.change(x,y,rotation);  
                
            this._x.push(x);
            this._y.push(y);
            this._rot.push(rotation);
        }
    },

    cardReturnAni(){
        var self = this;
        var num =  combatmgr.getSelf().handsPile.length;
        if (self.now_index != -1) {
            
            self.CardChildrenCount[self.now_index].stopAllActions();
            self.centerCard.active = false;
            self.CardChildrenCount[self.now_index].rotation = 0;   
            self.CardChildrenCount[self.now_index].x = 0; 
            self.CardChildrenCount[self.now_index].y = 400;
            //self.CardChildrenCount[self.now_index].active = true;
            self.CardChildrenCount[self.now_index].opacity = 255;

            var mov_act = cc.moveTo(0.2,self._x[self.now_index],self._y[self.now_index]);
            var rot_act = cc.rotateTo(0.2,self._rot[self.now_index]);
            var sca_act = cc.scaleTo(0.2,0.88);
            var spa = cc.spawn(mov_act,rot_act,sca_act);

            self.CardChildrenCount[self.now_index].runAction(spa);
        }
        self.now_index = -1;
    },

    start () {
        var self = this;
        self.CardChildrenCount = self.HandsCardRoot.children; 
        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_START, function(e) {
            var j;
            var num =  combatmgr.getSelf().handsPile.length;
            var delta_touch_y =Math.abs(e.touch.getDelta().y) ;
           // cc.log(delta_touch_y,"delta_touch_y");
            var touch_point = self.HandsCardRoot.convertToNodeSpaceAR(e.getLocation());
            var touch_box = new cc.Rect(touch_point.x, touch_point.y, 0, 0);//从x，y坐标为原点向右对角创建矩形
    
            for(j = 0;j < self.CardChildrenCount.length;j++) {

            var node_box = self.CardChildrenCount[j].getBoundingBox();
            var is_contained = cc.Rect.contain(node_box,touch_box);
            if(is_contained != 0 ) {
                break;
            }
            }
            if (j == self.now_index) {
                return;
            }
                
            if(j == 8){
                return;
            }

            if (self.now_index != -1) {
                self.cardReturnAni();
            }//上一张牌

            self.now_index = j;
            self.centerCard.active = true;
            var player = combatmgr.getSelf();
            var pile = player.handsPile[self.now_index].id;
            var data = datamgr.card[pile];
            var isCanUse = 0;
            
            self.centerCard.getComponent('CardItem').initData(self.now_index,data.CardName,data.CardQuality,data.CardImage,data.CardDescription,data.CardType,data.CastThew,data.CastMP,data.CardAttributes,isCanUse);
            //self.CardChildrenCount[self.now_index].active = false;
            self.CardChildrenCount[self.now_index].opacity = 0;
           
        }, self);
        
        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var j;
            var num =  combatmgr.getSelf().handsPile.length;
            var touch_point = self.HandsCardRoot.convertToNodeSpaceAR(e.getLocation());
            var touch_box = new cc.Rect(touch_point.x, touch_point.y, 0, 0);//从x，y坐标为原点向右对角创建矩形
            var delta_touch_y =Math.abs(e.touch.getDelta().y);

            if(delta_touch_y < 1)
            {
                for(j=0;j < self.CardChildrenCount.length;j++) {
                    var node_box = self.CardChildrenCount[j].getBoundingBox();
                    var is_contained = cc.Rect.contain(node_box,touch_box);
                    if(is_contained != 0 ) 
                    {
                        break;
                    }
                  
                }
                if (j == self.now_index) 
                {
                    return;
                }
                if(j == 8)
                {
                    return;
                }

                if (self.now_index != -1) {
                    self.cardReturnAni();
                }//上一张牌回去的动作
                  
                self.now_index = j;
                self.centerCard.active = true;
                var player = combatmgr.getSelf();
                var pile = player.handsPile[self.now_index].id;
                var data = datamgr.card[pile];
                var isCanUse = 0;
                self.centerCard.getComponent('CardItem').initData(self.now_index,data.CardName,data.CardQuality,data.CardImage,data.CardDescription,data.CardType,data.CastThew,data.CastMP,data.CardAttributes,isCanUse);
                //self.CardChildrenCount[self.now_index].active = false;
                self.CardChildrenCount[self.now_index].opacity = 0;
                dataCenter.returnAniEnd = false;
            }
            else
            {
                self.cardReturnAni();
                dataCenter.returnAniEnd = true;
            }
        }, self);

        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_END, function(e) {
            self.cardReturnAni();
        }, self);

        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            self.cardReturnAni();
        }, self);

        },
    update (dt) {//dt==0.054
        if (this._bMpFull) 
        {
            return;
        }
        var target = combatmgr.getSelf();
        if(!target.mpRecoverPause)
        {
            this.now_time += dt / target.mpRecoverRate;
            var per = Math.min(1, this.now_time * 1000 / target.mpRecoverTime);  //百分比
            this.mpSpire.fillRange = per;
        }
       if(target.mpRecoverPause==false){
       // this._uimgr.showTips('灵力暂停恢复');
       }
    },

    callback () {
        this.sec_time--;
        if (this.sec_time == 0) 
        {
            this.min_time -= 1;
            this.sec_time = 59;
        }
        if (this.min_time >=0) 
        {
            if (this.sec_time < 10 && this.sec_time !=0) 
            {
                this.time.string ="" + this.min_time + ":0"  + "" + this.sec_time;
            }
            else
            {
                this.time.string ="" + this.min_time + ":"  + "" + this.sec_time; 
            }  
        }
        if (this.min_time < 0) 
        {
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
    onFreshMp(mp, bFresh){
        if (bFresh) 
        {
            this.now_time = 0;
        }
        if(mp < consts.Fight.MP_MAX)
        {
            if (this._bMpFull) 
            {
                this.now_time = 0;
            }
            this._bMpFull = false;
            this.mp.string = " " + mp + "/10";
            this.mp_fill.active = false;
        }
        else 
        {
            this._bMpFull = true;
            this.mp.string = mp + "/10";
            this.mpSpire.fillRange = 1;
            this.mp_fill.active = true;
            this._uimgr.showTips('灵力已满');
        }
    },
    onFreshThew(thew){
        
        this.thew.string = thew + "/10";
        this.thewSpire.fillRange = thew /10;

        if(thew/10==1){
            this.thew_fill.active = true;
        }
        else{
           this.thew_fill.active = false;
        }
    },
    
    showNum(data){
        this.onFreshMp(data.mp);
        this.DiscardPile.string = data.discardsNum;  
        this.onFreshThew(data.thew);
        this.ExhaustedPile.string = data.exhaustsNum;
        this.cards.string = data.cardsNum;
    },
    
    ShowHandCards : function(){
        var player = combatmgr.getSelf();
        for(var i=0;i<8;i++)
        {
           
            if(i < player.handsPile.length)
            {
                var pile = player.handsPile[i].id;
                var data = datamgr.card[pile];
                var isCanUse = 0;
              
                if(data.CastMP <= player.Mp )
                {
                    isCanUse = 1;
                }
                this._HandsCards[i].initData(i,data.CardName,data.CardQuality,data.CardImage,data.CardDescription,data.CardType,data.CastThew,data.CastMP,data.CardAttributes,isCanUse);
                this._HandsCards[i].show();
                if(i==player.handsPile.length-1)
                {
                    this.layout();
                }
            }
            else
            {
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
        this.updateBarLabel(player.Hp, player.MaxHp);
    }
});
