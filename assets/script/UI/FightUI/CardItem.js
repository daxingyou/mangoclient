var UIBase = require('UIBase');
var dataCenter = require('DataCenter')
var combatmgr = require('CombatMgr')
var spawnSummoned = require('SpawnSummoned');
const constant = require('constants');
var datamgr = require('DataMgr');

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
        cardMask:cc.Node,

        buleFrame:cc.Node,

    },
    onLoad () {
        this.cardDes.getComponent(cc.RichText).string = "";
        this.cardMask.active = false;
        this.sprite = this.canUseCard.getComponent(cc.Sprite);
    }, 
    onSpawnSummonChange () {
        this.cardDes.getComponent(cc.RichText).string = this._desc.format({
            SwordNum: spawnSummoned.getSummonNum(constant.SummonedType.wSword)});
    },
    _addEventListener (eventName) {
        if (eventName === "spawnSummonChange") {
            var func = this.onSpawnSummonChange.bind(this);
            spawnSummoned.event.on(eventName, func);
            this._listeners[eventName] = func;
        }
    },
    _removeEventListener (eventName) {
        if (eventName === "spawnSummonChange") {
            spawnSummoned.event.removeListener(eventName, this._listeners[eventName]);
        }
    },
    initData(index,cardName,CardQuality,cardImage,CardDescription,cardType,thew,mp,cardAttr,canUse, cid) {
        if (this._listeners) {
            for (var eventName in this._listeners) {
                this._removeEventListener(eventName);
            }
            this._listeners = null;
        }
        var event = datamgr.card[cid].Event;
        if (event) {
            this._listeners = {};
            this._addEventListener(event);
        }

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
        this._canUse = canUse;
        this.cardName.getComponent(cc.Label).string = cardName;
    
       
        
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(cardImage);

        if (CardQuality == 1)
        {
            this.cardName.color = wihte;
        }
        if (CardQuality == 2)
        {
            this.cardName.color = bule;
        }
        if (CardQuality == 3)
        {
            this.cardName.color = zise;
        }
        if (CardQuality == 4)
        {
            this.cardName.color = cese;
        }
        if (thew > 0)
        {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('thew2');  
        }
        else
        {
            this.left.spriteFrame = this.cardAtlas.getSpriteFrame('mp2');
        }
        if (thew!=0)
        {
            this.mplabel.string = thew;
        }
        else
        {
            this.mplabel.string = mp;
        }

        var cardDes1 = '';
        var cardDes2 = '';
        var cardDes3 = '';
        var cardDes4 = '';
        var des = '';

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
                this._desc = CardDescription + des;

                this.cardDes.getComponent(cc.RichText).string = this._desc.format({
                    SwordNum: spawnSummoned.getSummonNum(constant.SummonedType.wSword)});

        }
       
        if (cardType == 1)
        {
           this.cardType.getComponent(cc.Label).string= "攻击";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_attack");
            this.cardType.color = goji;
        }

        if (cardType == 2)
        {
            this.cardType.getComponent(cc.Label).string = "奇术";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_skill");
            this.cardType.color = qishu;
        }

        if (cardType == 3)
        {
            this.cardType.getComponent(cc.Label).string = "天赋";
            this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_talent");
            this.cardType.color = tianfu;
        }

        if (cardType == 4)
        {
           this.cardType.getComponent(cc.Label).string = "宝物";
           this.typeAttack.spriteFrame = this.cardAtlas.getSpriteFrame("type_artifact");
           this.cardType.color = baowu;
        }  
       
    },
    change(x,y,rotation) {
        this.rotation = rotation;
        this.y =  y;
        this.x = x;
        this.resetPos();
    },
   
    start () {
        //cc.view.enableAntiAlias
        //cc.log('is Anti Alias Enabled =',cc.view.isAntiAliasEnabled());

            // this.node.on(cc.Node.EventType.TOUCH_START, function (event) {//节点区域时   
            //   //  event.stopPropagationImmeditate();
            //     this.node.rotation = 0;
            //     this.canUseCard.active = true;
            //     this.node.y +=  400;
            //     this.node.x = 0;
            //     var s = cc.scaleTo(0.001,1.25).easing(cc.easeBackOut());
            //     this.node.runAction(s);
            //     this._IsSelect = true;
            // }, this);
            
    
            // this.node.on(cc.Node.EventType.TOUCH_END, function (event) {//节点区域时   
            //     this.cardReturnAni();
            // }, this);
            // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {//节点区域时   
            //     this.cardReturnAni();
            // }, this);
    },
    temp : 0,
    update (dt) {
        if(this.temp != this.node.scale)
        {
            this.temp = this.node.scale;
            //cc.log(this.node.scale);
        }

       

        if (this._canUse) {
         //   this.canUseCard.active = true;
            var sprite = this.canUseCard.getComponent(cc.Sprite);
            if (this._willingUse) {
                // 蓝色
              //  sprite.spriteFrame = this.cardAtlas.getSpriteFrame("card_select_effect");
                this.buleFrame.active = true;
                this.canUseCard.active = false;
            }
            else {
                // 绿色
               // sprite.spriteFrame = this.cardAtlas.getSpriteFrame("card_select_effect2");

               this.buleFrame.active = false;
               this.canUseCard.active = true;
            }
        }
        else {
         
           // this.sprite.spriteFrame = this.cardAtlas.getSpriteFrame("card_select_effect2");
            this.canUseCard.active = false;
            this.buleFrame.active = false;
        }


        if (this.mp!=null) {
            var player = combatmgr.getSelf();
           
            if (player == undefined) {
                return;
            }
            if ((this.mp < player.Mp+1)) {
                this.canUseCard.active = true;
            }
        }

       

        if (dataCenter.hp == 0) {
            this.canUseCard.active = false;
            this.cardMask.active = true;
        }
        else {
            this.cardMask.active = false;
        }
        
    },

    setWillingUse (bWilllingUse) {
        this._willingUse = bWilllingUse;
    },

    resetPos(){
        if(!this._IsSelect)//ture
        {
            this.node.stopAllActions();
            if(dataCenter.IsLayoutAction){
                this.node.stopAllActions();
                var rot_action = cc.rotateTo(0.5,this.rotation).easing(cc.easeQuadraticActionOut());//缓动
                var mov_action = cc.moveTo(0.5,this.x,this.y).easing(cc.easeQuadraticActionOut());//缓动
                var  spa = cc.spawn(rot_action,mov_action);
                this.node.runAction(spa);
            }
            else{
                this.node.stopAllActions();
                var rot_action = cc.rotateTo(0.2,this.rotation).easing(cc.easeQuadraticActionOut());//缓动
                var mov_action = cc.moveTo(0.2,this.x,this.y).easing(cc.easeQuadraticActionOut());//缓动
                var  spa = cc.spawn(rot_action,mov_action);
                this.node.runAction(spa);
                // this.node.x = this.x;
                // this.node.y = this.y;
                // this.node.rotation = this.rotation;
            }
        }
    },
    cardReturnAni(){
        if(this._IsSelect)
        {
            this.node.stopAllActions();
            this._IsSelect = false;
            this.node.x = this.x;
            this.node.y = this.y;
            this.node.rotation = this.rotation;
            this.canUseCard.active = false;
            var s = cc.scaleTo(0.001,0.88).easing(cc.easeBackOut());
            this.node.runAction(s);
        }
    }
});
