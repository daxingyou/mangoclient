let UIBase = require('UIBase');
let dataCenter = require('DataCenter')
let combatmgr = require('CombatMgr')
let constant = require('constants');
let dataMgr = require('DataMgr');
let fightData = require('fightData')
let eventMgr = require('eventMgr');
let cardHelper = require('cardHelper');
let UIConsts = require('UIConsts')
let UIHelper = require('UIHelper');

cc.Class({
    extends: UIBase,

    properties: {
        _index : 0,
        cardAtlas : cc.SpriteAtlas,
        left:cc.Sprite,
        mplabel:cc.Label,
        cardImage : cc.Sprite, 
        cardName:cc.Node,
        cardDes:cc.Node,
        CardAttributes:cc.Node,
        cardType:cc.Node,
        typeAttack:cc.Sprite,
        canUseCard:cc.Node,
        mp:null,

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
        _cnt: 0,
        _curQuality: 0,
        levelLabel: cc.Label,
        _fixDes: null,
    },

   
    // onLoad () {},
    //type ==1 卡牌界面 == 2 组卡界面 == 3
    initData(index,data,parents,type,pos,cardNum) {

        cc.log("data卡牌",data)
        this._index = index;
        this.mp = data.CastMP;
        this._cid = data.ID;
        this.cardName.getComponent(cc.Label).string = data.CardName;
        UIHelper.getCardIcon(this._cid, (spriteFrame) => {
            this.cardImage.spriteFrame = spriteFrame;
        });

        if (data.CardQuality == 1) {
            this.cardName.color = UIConsts.Color.wihte;
        }
        if (data.CardQuality == 2) {
            this.cardName.color =  UIConsts.Color.bule;
        }
        if (data.CardQuality == 3) {
            this.cardName.color =  UIConsts.Color.purple;
        }
        if (data.CardQuality == 4) {
            this.cardName.color = UIConsts.Color.orange;
        }

        if (data.CastThew != 0) {
            this.mplabel.string = data.CastThew ;
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('thew2');  
        }
        else {
            this.mplabel.string = data.CastMP;
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('mp2');
        }

        this._parents = parents;
        this._type = type;
        this._pos = pos;
        this._maxLevel = data.CardMaxLevel;

        this._curLevel = data.level;
        this.levelLabel.string = data.level + "级";
        this._cnt = data.cnt;
        this._curQuality = data.CardQuality;

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
                     des = '<color=#EFC851>'+ cardDes2 + cardDes3 + cardDes4 + "。"+'</color>';
                }
                this._fixDes = des;
                this._desc = cardHelper.getCardDescription(this._cid, this._curLevel - 1) + des;
                this.cardDes.getComponent(cc.RichText).string = this._desc;
            //    / cc.log(data.level,"data.level",this._cid,"data._cid");
        }
       
        if (data.CardType == 1)  {
            this.cardType.getComponent(cc.Label).string = "攻击";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_attack");
            this.cardType.color = UIConsts.Color.wihte;
        }

        if (data.CardType == 2) {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = UIConsts.Color.qishu;
        }

        if (data.CardType == 3) {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = UIConsts.Color.tianfu;
        }

        if (data.CardType == 4) {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = UIConsts.Color.baowu;
        }  
    
        this.attNode = this.node.getChildByName('att');
        this.cardNumNode =  this.node.getChildByName('cardNum');
        this.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "*" + this._cnt;
        if (type == 1) {
            this.attNode.active = false;
            this.cardNumNode.active = true;
        }//卡牌升级先显示张数，后期修改
        else if (type == 2) {
            this.cardNumNode.active = true;
            this.attNode.active = false;
        }
        else if (type == 3) {
            this.cardNumNode.active = false;
            cc.log("隐藏张数");
        }
    },

    // lookCardDes () {
    //     if (this._type == 1) {
    //         this._parents.lookCardDes(this._cid);
    //     }
    // },

    closeCardDes () {
        cc.log("显示卡牌樟树");
        this._type = 2;
        this.attNode.active = false;
        this.cardNumNode.active = true;
    },



    updateCardDes (cId,level) {
        this.cardDes.getComponent(cc.RichText).string = cardHelper.getCardDescription(cId, level) + this._fixDes;
        if (level != null)
        this.levelLabel.string = level+1 + "级";
    },

    //type == 1 add type == 2 返回
    _moveCard (type) {
        if (type == 1) {
            this._cnt -= 1;
        }
        else if (type == 2) {
            this._cnt += 1;
        }
        this.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "*" + this._cnt;
    },

    upGradeCardEnd (cnt,curLevel) {
        this._curLevel = curLevel;
        this._cnt = cnt;
        if (this._curLevel < this._maxLevel) {
            cc.log("继续更新卡牌");
            //index,cid,level,needCard,needSilver
            let data = dataMgr.cardUpgrade[this._curQuality][this._curLevel];
            cc.log(data,"data");
            let needCard = data.CardNumber;
            let needSilver = data.Silver;
            this._parents.lookCardDes(this._index,this._cid,this._curLevel,needCard,needSilver);   
        }
        else {
            this._parents._cardLevelMax();
        }
        this.levelLabel.string = curLevel + "级";
        this.cardNumNode.getChildByName('label').getComponent(cc.Label).string = "*" + this._cnt;
        this.updateCardDes(this._cid,this._curLevel-1);
    },

    start () {
        cc.view.enableAntiAlias;
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {//点击查看，后期可能加显示效果
            if (self._type == 1) {
                if (self._maxLevel > self._curLevel) {
                    let data = dataMgr.cardUpgrade[self._curQuality][self._curLevel];
                    let needCard = data.CardNumber;
                    let needSilver = data.Silver;
                    self._parents.lookCardDes(self._index,self._cid,self._curLevel,needCard,needSilver);
                }
                else {
                    self._parents.lookCardDes(self._index,self._cid,self._curLevel);
                }
            }
           }, this);    
    },

    _listenMove () {
        let self = this;
        let startX = self._pos.x;
        let startY = self._pos.y;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {//点击查看，后期可能加显示效果
           self._parents._switchMoveCard(true,self._parents._curPageNum);
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
                self._parents.addCard(cardName,self.mp,self._cid);
                this.active = false;
            }
            this.x = startX -557;
            this.y = startY - 45;
            this.active = true;
        }, this.node);
    
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            let x = this.x;
            if (x > 400) {
                let cardName =  self.cardName.getComponent(cc.Label).string;
                self._parents.addCard(cardName,self.mp);
                this.active = false;
            }
            this.x = startX - 557;
            this.y = startY - 45;
            this.active = true;
        }, this.node);     
    },  
    // update (dt) {},
});
