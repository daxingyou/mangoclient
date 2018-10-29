var uibase = require('UIBase');
var constant = require('constants')
var net = require('NetPomelo')
var teamRaidGetCardProto = require('teamRaidGetCardProto')
var dataMgr = require('DataMgr')
cc.Class({
    extends: cc.Component,

    properties: {
       _curIndex:null,
       _parents:null,
   
        cardAtlas : cc.SpriteAtlas,
        left:cc.Sprite,
        mplabel:cc.Label,
        cardImage : cc.Sprite, 
        cardName:cc.Node,
        cardDes:cc.Node,
        cardAttr:cc.Node,
        cardType:cc.Node,
        typeAttack:cc.Sprite,
    },
    



    // onLoad () {},

    start () {

    },
    initData (index,parent) {
        this._curIndex = index;
        this._parents = parent;
        let itemData = dataMgr.card[index];
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(itemData.CardImage);
        var wihte =new cc.Color(255,255,255);//1
        var bule =new cc.Color(47,203,242);//2
        var zise =new cc.Color(242,66,253);//紫色3
        var cese =new cc.Color(210,97,49);//橙色4

        var goji =new cc.Color(221,81,81);//攻击1
        var qishu =new  cc.Color(31,231,255);//奇术2
        var tianfu =new cc.Color(90,161,68);//天赋3
        var baowu =new cc.Color(255,244,44);//宝物4

    
        this.cardName.getComponent(cc.Label).string = itemData.CardName;
    
       
        
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(itemData.CardImage);

        if (itemData.CardQuality == 1)
        {
            this.cardName.color = wihte;
        }
        if (itemData.CardQuality == 2)
        {
            this.cardName.color = bule;
        }
        if (itemData.CardQuality == 3)
        {
            this.cardName.color = zise;
        }
        if (itemData.CardQuality == 4)
        {
            this.cardName.color = cese;
        }
        if (itemData.CastThew > 0)
        {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('thew2');  
        }
        else
        {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('mp2');
        }
        if (itemData.CastThew!=0)
        {
            this.mplabel.string = itemData.CastThew;
        }
        else
        {
            this.mplabel.string = itemData.CastMP;
        }

        var cardDes1 = '';
        var cardDes2 = '';
        var cardDes3 = '';
        var cardDes4 = '';
        var des = '';
        let cardAttr = itemData.CardAttributes;
        for(let i = 0;i < cardAttr.length; i++) {
          
                if (cardAttr[i] == 1)
                {
                     cardDes1 = '';//非消耗
                }
                if (cardAttr[i] == 2)
                {
                     cardDes2 = "消耗";
                }
                if (cardAttr[i] == 3)
                {
                    if (cardDes2!='') 
                    {
                        cardDes3 ="，永久消耗"; 
                    }
                    else 
                    {
                        cardDes3 ="永久消耗";
                    }
                    
                   
                }
                if (cardAttr[i] == 4)
                {
                    if (cardDes2!='' || cardDes3!='') 
                    {
                        cardDes4 = "，固有";
                    }
                    else
                    {
                        cardDes4 = "固有";
                    }
                }

                if (cardDes2!='' || cardDes3!='' || cardDes4) 
                {
                     des = '<color=#EFC851>'+cardDes2+cardDes3+cardDes4+"。"+'</color>';
                }
                this._desc = itemData.CardDescription + des;
                this.cardDes.getComponent(cc.RichText).string = this._desc;

        }
       
        if (itemData.CardType == 1)
        {
           this.cardType.getComponent(cc.Label).string= "攻击";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_attack");
            this.cardType.color = goji;
        }

        if (itemData.CardType == 2)
        {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = qishu;
        }

        if (itemData.CardType == 3)
        {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = tianfu;
        }

        if (itemData.CardType == 4)
        {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = baowu;
        }  
    },

    selectCard () {
        net.Request(new teamRaidGetCardProto(this._curIndex), (data) => {
            cc.log("选择奖励卡牌加入牌库",data);
        });
        this._parents.selectCardEnd();
    },

    // update (dt) {},
});
