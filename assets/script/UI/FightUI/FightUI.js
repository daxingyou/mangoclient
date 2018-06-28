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
var constant = require('constant')

cc.Class({
    extends : UIBase,

    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        HandsCardRoot : cc.Node,
        _HandsCards : [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        this._mgr.loadUI(constant.UI.FightCard,(prefab)=>{
            for(var i =0;i<10;i++)
            {
                var node = cc.instantiate(prefab);
                node.name = i.toString();
                node.active = false;
                node.parent = this.HandsCardRoot;
                node.position = new cc.Vec2(50 * i,0);
            
                this._HandsCards.push(node);
            }
        });
    },

    update (dt) {

    },
    OnFresh : function(data){
        this.ShowHandCards(data.playerCards);
        this.cards.string = data.cards.toString();
        this.DiscardPile.string = data.discardCards.toString();
        this.DiscardPile.string = data.ExhaustedCards.toString();
    },
    ShowHandCards : function(playerCards){
        for(var i=0;i<playerCards.length;i++)
        {
            this._HandsCards[i].init(playerCards[i]);
            this._HandsCards[i].show();
        }
    }
});
