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
        lineDotSrc : cc.Component
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
                resIndex ++ ;
                if(resIndex == 10)
                {
                    cc.loader.release('UI/fightUI/Card');
                }
            });   
        } 
},
    
    start () {
        this.schedule(this.callback, 1);
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
        this.time.string ="" + this.min_time + ":0"  +""+this.sec_time;
    }
    else{
        this.time.string ="" + this.min_time + ":"  +""+this.sec_time; 
    }
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
