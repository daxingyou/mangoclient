var UIBase = require('UIBase');
var dataCenter = require('DataCenter')
var combatmgr = require('CombatMgr')
const constant = require('constants');
var dataMgr = require('DataMgr');
var fightData = require('fightData')
let eventMgr = require('eventMgr');

cc.Class({
    extends: UIBase,

    properties: {
        _index : 0,
        cardAtlas : cc.SpriteAtlas,
        //leftAtlas:cc.SpriteAtlas,
        left:cc.Sprite,
        mplabel:cc.Label,
        cardImage : cc.Sprite, 
        cardName:cc.Node,
        cardDes:cc.Node,
        CardAttributes:cc.Node,
        cardType:cc.Node,
        typeAttack:cc.Sprite,
        canUseCard:cc.Node,

        CurCenterCard : false,
        mp:null,

        _canUse: false,
        _willingUse: false,
        _cid: null,
        cardMask:cc.Node,

        buleFrame:cc.Node,
        _parents:null,
        _isCardGroup: false,
        _pos: [],
        _type: -1,
        _cardNum: 1,
        _maxLevel: 0,
        _curLevel: 1,
        _curQuality: 0,
        levelLabel: cc.Label,
    },

    // ID: 3,
	// 	CardName: '攻击',
	// 	CardDescription: '对目标造成60点伤害。',
	// 	Event: '',
	// 	UseLimit: {},
	// 	HeroID: 2000,
	// 	SkillID: 3,
	// 	Treasure: 0,
	// 	CastMP: 1,
	// 	CastThew: 0,
	// 	CardType: 1,
	// 	CardQuality: 1,
	// 	CardAttributesibutes: [1],
	// 	CardMaxLevel: 1,
	// 	CardLimit: 2,
	// 	CardImage: 'attack',

   

    // onLoad () {},
    //type ==1 卡牌界面 == 2 组卡界面 == 3
    initData(index,data,parents,type,pos) {
        // cc.log("data卡牌",data);
        var wihte = new cc.Color(255,255,255);//1
        var bule = new cc.Color(47,203,242);//2
        var zise = new cc.Color(242,66,253);//紫色3
        var cese = new cc.Color(210,97,49);//橙色4

        var goji = new cc.Color(221,81,81);//攻击1
        var qishu = new  cc.Color(31,231,255);//奇术2
        var tianfu = new cc.Color(90,161,68);//天赋3
        var baowu = new cc.Color(255,244,44);//宝物4

        this._index = index;
        this.mp = data.CastMP;
        this._cid = data.ID;
       // this._canUse = canUse;
        this.cardName.getComponent(cc.Label).string = data.CardName;
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(data.CardImage);

        if (data.CardQuality == 1) {
            this.cardName.color = wihte;
        }
        if (data.CardQuality == 2) {
            this.cardName.color = bule;
        }
        if (data.CardQuality == 3) {
            this.cardName.color = zise;
        }
        if (data.CardQuality == 4) {
            this.cardName.color = cese;
        }

        if (data.CastThew != 0) {
            this.mplabel.string = data.CastThew ;
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('thew2');  
        }
        else {
            this.mplabel.string = data.CastMP;
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('mp2');
        }

        var cardDes1 = '';
        var cardDes2 = '';
        var cardDes3 = '';
        var cardDes4 = '';
        var des = '';

        for(let i = 0;i < data.CardAttributes.length; i++) {
          
                if (data.CardAttributes[i] == 1) {
                     cardDes1 = '';//非消耗
                }
                if (data.CardAttributes[i] == 2) {
                     cardDes2 = "消耗";
                }
                if (data.CardAttributes[i] == 3) {
                    if (cardDes2!='') {
                        cardDes3 ="，永久消耗"; 
                    }
                    else {
                        cardDes3 ="永久消耗";
                    }
                }
                if (data.CardAttributes[i] == 4)  {
                    if (cardDes2!='' || cardDes3!='') {
                        cardDes4 = "，固有";
                    }
                    else {
                        cardDes4 = "固有";
                    }
                }

                if (cardDes2!='' || cardDes3!='' || cardDes4) {
                     des = '<color=#EFC851>'+cardDes2+cardDes3+cardDes4+"。"+'</color>';
                }
                this._desc = data.CardDescription + des;
                this.cardDes.getComponent(cc.RichText).string = this._desc;
                    //.format({
                   // SwordNum: combatmgr.getSummonMgr().getSummonNum(constant.SummonedType.wSword)});
        }
       
        if (data.CardType == 1)  {
            this.cardType.getComponent(cc.Label).string= "攻击";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_attack");
            this.cardType.color = goji;
        }

        if (data.CardType == 2) {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = qishu;
        }

        if (data.CardType == 3) {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = tianfu;
        }

        if (data.CardType == 4) {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = baowu;
        }  
        this._parents = parents;
        this._type = type;
        this._pos = pos;
        this._maxLevel = 2;//data.CardMaxLevel
        this._curLevel = 1;
        this._curQuality = data.CardQuality;
        this.attNode = this.node.getChildByName('att');
        this.cardNumNode =  this.node.getChildByName('cardNum');
        if (type == 1) {
            this.attNode.active = true;
            this.cardNumNode.active = false;
        }
        else if (type == 2) {
            this.cardNumNode.active = true;
            this.attNode.active = false;
            this._cardNum = 1;
        }
    },

    lookCardDes () {
        if (this._type == 1) {
            this._parents.lookCardDes(this._cid);
        }
    },

    closeCardDes () {
        this._type = 2;
        this.attNode.active = false;
        this.cardNumNode.active = true;

      //  this.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "* 0";
    },

    updateCard (cardNum) {
        this._curLevel += 1;
        this._cardNum -= 1;
        if (this._curLevel < this._maxLevel) {
            cc.log("继续更新卡牌");
        }
        else {
            this._parents._updateUpCard();
        }
        this.levelLabel.string = this._curLevel + "级";
        this.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "*" + this._cardNum;
    },

    start () {
        cc.view.enableAntiAlias;
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {//节点区域时  
            if (self._type == 1) {
                if (self._maxLevel > self._curLevel) {
                    let data = dataMgr.cardUpgrade[self._curQuality][self._curLevel];
                    let needCard = data.CardNumber;
                    let needSilver = data.Silver;
                    cc.log(needSilver,needCard);
                    self._parents.lookCardDes(self._index,self._cid,needCard,needSilver);
                }
                else {
                    self._parents.lookCardDes(self._index,self._cid);
                }
            }
           }, this);  
           
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) { 
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }, this.node);
    
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            let x = this.x;
            if (x > 400) {
                let cardName =  self.cardName.getComponent(cc.Label).string;
                self._parents.addCard(cardName,self.mp);
                this.active = false;
                self.cardNumNode.active = true;
                self.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "* 00000";
            }
            else {
                if (self._pos != undefined) {

                    this.x = self._pos.x -140;
                    this.y = self._pos.y- 45;
                }    
            }
        }, this.node);
    
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            let x = this.x;
            if (x > 400) {
                let cardName =  self.cardName.getComponent(cc.Label).string;
                self._parents.addCard(cardName,self.mp);
                self.cardNumNode.active = true;
                self.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "* 0";
                this.active = false;
            }
            else {
                if (self._pos != undefined) {
                    this.x = self._pos.x -140;
                    this.y = self._pos.y- 45;
                }  
            }
        }, this.node);       
        
    },

   

  
    // update (dt) {},
});
