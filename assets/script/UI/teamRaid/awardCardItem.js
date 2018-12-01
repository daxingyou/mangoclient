var uibase = require('UIBase');
var constant = require('constants')
var net = require('NetPomelo')
var teamRaidGetCardProto = require('teamRaidGetCardProto')
var dataMgr = require('DataMgr')
var raidGetCardProto = require('raidGetCardProto')
var UIConsts = require('UIConsts')
cc.Class({
    extends: cc.Component,

    properties: {
       _curCardId:null,
       _parents:null,
       _type: 0,
       _soloRaidId: 0,
   
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
    // type == 1 单人副本 type == 2 组队副本
    initData (cardId,parent,type,raidId) {
        this._curCardId = cardId;// cardId
        this._parents = parent;
        this._type = type;
        if (raidId != null) {
            this._soloRaidId = raidId;
        }
        let itemData = dataMgr.card[cardId];
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(itemData.CardImage);
      

    
        this.cardName.getComponent(cc.Label).string = itemData.CardName;
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(itemData.CardImage);

        if (itemData.CardQuality == 1)
        {
            this.cardName.color = UIConsts.Color.wihte;
        }
        if (itemData.CardQuality == 2)
        {
            this.cardName.color = UIConsts.Color.bule;
        }
        if (itemData.CardQuality == 3)
        {
            this.cardName.color = UIConsts.Color.purple;
        }
        if (itemData.CardQuality == 4)
        {
            this.cardName.color = UIConsts.Color.orange;
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
            this.cardType.color = UIConsts.Color.goji;
        }

        if (itemData.CardType == 2)
        {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = UIConsts.Color.qishu;
        }

        if (itemData.CardType == 3)
        {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = UIConsts.Color.tianfu;
        }

        if (itemData.CardType == 4)
        {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = UIConsts.Color.baowu;
        }  
    },

    selectCard () {
        let self = this;
        if (this._type == 1) {
            net.Request(new raidGetCardProto(this._soloRaidId,this._curCardId), (data) => {
                cc.log("单人选择奖励卡牌加入牌库",data);
                self._parents.selectCardEnd(data.raidInfo);
            }); 
        }
        else {
            net.Request(new teamRaidGetCardProto(this._curCardId), (data) => {
                cc.log("组队选择奖励卡牌加入牌库",data);
                self._parents.selectCardEnd();
            });
        }
        
       
    },

    // update (dt) {},
});
