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
var constant = require('constants')
var combatmgr = require('CombatMgr')

cc.Class({
    extends : UIBase,

    properties: {
        cards : cc.Label,
        DiscardPile : cc.Label,
        ExhaustedPile :cc.Label,
        HandsCardRoot : cc.Node,
        CardsLayout : cc.Layout,
        _HandsCards : [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        /*
        this._mgr.loadUI(constant.UI.FightCard,(src)=>{

            src.node.name = "0";
            src.node.parent = this.HandsCardRoot;
            src.node.positon = cc.v2(0,0);
            //this.CardsLayout.node.addChild(src.node);
            src.hide();
            this._HandsCards.push(src);

            for(var i =0;i<9;i++)
            {
                var node = cc.instantiate(this._HandsCards[i].node);
                node.name = i.toString();
                node.parent = this.HandsCardRoot;
                node.positon = cc.v2(0,0);
                //this.CardsLayout.node.addChild(src.node);
                node.active = false;
                var sc = node.getComponent('CardItem');
                sc.hide();

                this._HandsCards.push(sc);
            }
            
            this.CardsLayout.updateLayout();
        });*/

        
        for (var i = 0; i < this.CardsLayout.node.children.length; ++i) {
            this._HandsCards.push(this.CardsLayout.node.children[i].getComponent('CardItem'));
        }
    },

    update (dt) {
        this.CardsLayout.updateLayout();
    },
    OnFresh : function(data){
        this.ShowHandCards(data.playerCards);
        this.cards.string = data.cards.toString();
        this.DiscardPile.string = data.discardCards.toString();
        this.DiscardPile.string = data.ExhaustedCards.toString();
    },
    ShowHandCards : function(){
        var player = combatmgr.getSelf();

        for(var i=0;i<player.handsPile.length;i++)
        {
            this._HandsCards[i].show();
            this._HandsCards[i].initData(player.handsPile[i].skillName);
        }
    }
});
