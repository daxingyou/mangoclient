var UIBase = require('UIBase');
var dataCenter = require('DataCenter')
var combatmgr = require('CombatMgr')
const constant = require('constants');
var datamgr = require('DataMgr');
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
        cardAttr:cc.Node,
        cardType:cc.Node,
        typeAttack:cc.Sprite,
        canUseCard:cc.Node,

        _IsSelect : false,  ///当前卡牌是否被选中放大
        x : 0,
        y : 0,
        rotation : 0,
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
    },

   

    // onLoad () {},
    initData(index,cardName,CardQuality,cardImage,CardDescription,cardType,thew,mp,cardAttr,canUse, cid,parents,isCardGroup,pos) {
        // if (this._listeners) {
        //     for (var eventName in this._listeners) {
        //         this._removeEventListener(eventName);
        //     }
        //     this._listeners = null;
        // }
        // var event = datamgr.card[cid].Event;
        // if (event) {
        //     this._listeners = {};
        //     this._addEventListener(event);
        // }

        var wihte =new cc.Color(255,255,255);//1
        var bule =new cc.Color(47,203,242);//2
        var zise =new cc.Color(242,66,253);//紫色3
        var cese =new cc.Color(210,97,49);//橙色4

        var goji =new cc.Color(221,81,81);//攻击1
        var qishu =new  cc.Color(31,231,255);//奇术2
        var tianfu =new cc.Color(90,161,68);//天赋3
        var baowu =new cc.Color(255,244,44);//宝物4

        this._index = index;
        this.mp = mp;
        this._cid = cid;
        this._canUse = canUse;
        this.cardName.getComponent(cc.Label).string = cardName;
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(cardImage);

        if (CardQuality == 1) {
            this.cardName.color = wihte;
        }
        if (CardQuality == 2) {
            this.cardName.color = bule;
        }
        if (CardQuality == 3) {
            this.cardName.color = zise;
        }
        if (CardQuality == 4) {
            this.cardName.color = cese;
        }
        if (thew > 0) {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('thew2');  
        }
        else {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('mp2');
        }
        if (thew!=0) {
            this.mplabel.string = thew;
        }
        else {
            this.mplabel.string = mp;
        }

        var cardDes1 = '';
        var cardDes2 = '';
        var cardDes3 = '';
        var cardDes4 = '';
        var des = '';

        for(let i = 0;i < cardAttr.length; i++) {
          
                if (cardAttr[i] == 1) {
                     cardDes1 = '';//非消耗
                }
                if (cardAttr[i] == 2) {
                     cardDes2 = "消耗";
                }
                if (cardAttr[i] == 3) {
                    if (cardDes2!='') {
                        cardDes3 ="，永久消耗"; 
                    }
                    else {
                        cardDes3 ="永久消耗";
                    }
                }
                if (cardAttr[i] == 4)  {
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
                this._desc = CardDescription + des;
                this.cardDes.getComponent(cc.RichText).string = this._desc;
                    //.format({
                   // SwordNum: combatmgr.getSummonMgr().getSummonNum(constant.SummonedType.wSword)});
        }
       
        if (cardType == 1)  {
            this.cardType.getComponent(cc.Label).string= "攻击";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_attack");
            this.cardType.color = goji;
        }

        if (cardType == 2) {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = qishu;
        }

        if (cardType == 3) {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = tianfu;
        }

        if (cardType == 4) {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = baowu;
        }  
       this._parents = parents;
       this._isCardGroup = isCardGroup;
       this._pos = pos;
    },

    lookCardDes () {
        if (this._isCardGroup) {
            this._parents.lookCardDes(this._cid);
        }
    },

    closeCardDes () {
        this._isCardGroup = false;
    },

    start () {
        cc.view.enableAntiAlias;
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {//节点区域时  
            if (self._isCardGroup) {
                self._parents.lookCardDes(self._cid);
            }
           }, this);  

        if (!self._isCardGroup) {
            let self = this;
            this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) { 
                var delta = event.touch.getDelta();
                this.x += delta.x;
                this.y += delta.y;
            }, this.node);
        
            this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
                let x = this.x;
                if (x >420) {
                    let cardName =  self.cardName.getComponent(cc.Label).string;
                    self._parents.addCard(cardName);
                    this.active = false;
                }
                else {
                    this.x = self._pos.x -75;
                    this.y = self._pos.y- 20;
                }
            }, this.node);
        
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                let x = this.x;
                if (x >420) {
                    let cardName =  self.cardName.getComponent(cc.Label).string;
                    self._parents.addCard(cardName);
                    this.active = false;
                }
                else {
                    this.x = self._pos.x -75;
                    this.y = self._pos.y -20;
                }
            }, this.node);       
        }
    },


  
    // update (dt) {},
});
