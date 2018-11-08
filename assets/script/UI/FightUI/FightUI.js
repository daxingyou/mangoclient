var UIBase = require('UIBase')
var combatmgr = require('CombatMgr')
var dataCenter = require('DataCenter')
var datamgr = require('DataMgr')
var consts = require('consts')
var constants = require('constants')
//var GameLogic = require('GameLogic')

cc.Class({
    extends: UIBase,
    properties: {
        cards: cc.Label,
        DiscardPile: cc.Label,
        ExhaustedPile: cc.Label,
        mp: cc.Label,
        mpSpire: cc.Sprite,
        rotaMp: cc.Node,
        mp_fill: cc.Node,
        thew: cc.Label,
        thewSpire: cc.Sprite,
        thew_fill: cc.Node,
        HandsCardRoot: cc.Node,
        //CardsLayout : cc.Layout,
        _HandsCards: [],
        input: cc.Component,
        time: cc.Label,
        min_time: 2,
        sec_time: 60,
        lineDot: cc.Node,
        lineDotSrc: cc.Component,
        userName: cc.Label,
        playerHpBar: cc.ProgressBar,
        barLabel: cc.Label,
        headImg: cc.Node,
        heroIcon: cc.SpriteAtlas,
        count: 0,
        _bMpFull: false,
        _x: [],
        _y: [],
        _rot: [],
        now_index: -1,
        centerCard: cc.Node,
        CardChildrenCount: [],
        _curSelectedIdx: -1,
        gameOver:false,
        mpRecoverPauseEnd:true,
        is_chongLian:false,
    },

    onLoad() {
    },
    onEnable(){
    },

    initData(callback) {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        this.userName.string = dataCenter.userName;
        this.mp_fill.active = false;
        this.thew_fill.active = false;
        var resIndex = 0;
        this.gameOver = false;
        this.is_chongLian = false;
        if (dataCenter.userName == "于小雪") 
        {
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('yuxiaoxue');
        }
        else 
        {
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('chenjingchou');
        }

        var self = this;
        cc.loader.loadRes('UI/fightUI/Card', function (errorMessage, loadedResource) {
            for (var i = 0; i < 8; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }

                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.HandsCardRoot.addChild(item);

                self._HandsCards.push(item.getComponent('CardItem'));
                if (resIndex == 8) {
                    cc.loader.release('UI/fightUI/Card');
                    callback();
                    if (self.is_chongLian) {
                        self.ShowHandCards();
                        self.schedule(self.callback,1);
                    }
                   
                }
            }
        });
    },

    initBarHp(){
        cc.log('initData en hong ~~~~~~~~~~~~~~~~~~~~~~~');
        this.barLabel.string = combatmgr.getSelf().Hp + '/' + combatmgr.getSelf().MaxHp;
        this.target = combatmgr.getSelf();
    },

    updateBarLabel(HP, MaxHp) {
        this.barLabel.string = HP.toString() + '/' + MaxHp.toString();
        dataCenter.hp = HP;
    },

    layout() {
        this._x = [];
        this._y = [];
        this._rot = [];

        var num = combatmgr.getSelf().handsPile.length;
        var count = num / 2;

        var a = 1;//x方向偏心率
        var b = 1.01;//y方向偏心率
        var R = 1245;//半径  425/sin20 

        var angle = 2 * (5 * count) * Math.PI / 180;
        var delta_x = 0;
        var delta_y = 40 - count * 8;

        var x, y, rotation, delta_angle, rad;

        for (let i = 0; i < num; i++) {

            delta_angle = (i - count + 0.5) * 5.8;
            let itemCom = this._HandsCards[i];
            rotation = 360 + delta_angle;
            rad = (rotation - 360) * Math.PI / 180;

            x = a * R * Math.sin(rad) + delta_x;
            y = b * R * Math.cos(rad) - R * Math.cos(angle / 2) + delta_y;
            itemCom.change(x, y, rotation);

            this._x.push(x);
            this._y.push(y);
            this._rot.push(rotation);
        }
    },

    cardReturnAni(noAni, resetOrigPos=true) {
        var self = this;
        //var num = combatmgr.getSelf().handsPile.length;
        if (self.now_index != -1) {
            let cardItem = self.CardChildrenCount[self.now_index];
            cardItem.stopAllActions();
            self.centerCard.active = false;
            cardItem.opacity = 255;
            if (noAni) {
                cardItem.position = cc.v2(self._x[self.now_index], self._y[self.now_index]);
                cardItem.rotation = self._rot[self.now_index];
            }
            else {
                if (resetOrigPos) {
                    cardItem.rotation = 0;
                    cardItem.x = 0;
                    cardItem.y = 400;
                }

                var mov_act = cc.moveTo(0.2, self._x[self.now_index], self._y[self.now_index]);
                var rot_act = cc.rotateTo(0.2, self._rot[self.now_index]);
                var sca_act = cc.scaleTo(0.2, 0.88);
                var spa = cc.spawn(mov_act, rot_act, sca_act);

                cardItem.runAction(spa);
            }
        }
        self.now_index = -1;
    },

    _getNodeRectPoints (node) {
        var centPos = node.position;
        var rotation = node.rotation;
        var contentSize = node.getContentSize();
        var w = contentSize.width / 2 * node.scale, h = contentSize.height / 2 * node.scale;
        var radian = rotation * Math.PI / 180;
        var sint = Math.sin(radian);
        var cost = Math.cos(radian);
        var newPosFunc = function (x, y) {
            var px = x * cost + y * sint + centPos.x;
            var py = -x * sint + y * cost + centPos.y;
            return cc.v2(px, py)
        };
        var rectPoints = [
            newPosFunc(-w, -h),
            newPosFunc(w, -h),
            newPosFunc(w, h),
            newPosFunc(-w, h)
        ];
        return rectPoints;
    },

    start() {
        var self = this;
        var inputMgr = cc.find('Canvas/visibleArea/ui/FightUI/targetTips').getComponent('InputMgr');
        var ctx = cc.find('Canvas/visibleArea/tips').getComponent(cc.Graphics);  //获取组件
        self.CardChildrenCount = self.HandsCardRoot.children;
      
        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_START, function (e) {
            var j;
            var touch_point = self.HandsCardRoot.convertToNodeSpaceAR(e.getLocation());
            var is_contained = false;
            var player = combatmgr.getSelf();

            for (j = player.handsPile.length - 1; j >= 0; j--)
            {
                is_contained = cc.Intersection.pointInPolygon(touch_point, this._getNodeRectPoints(self.CardChildrenCount[j]));
                if (is_contained) {
                    break;
                }
            }

            if (!is_contained || j == self.now_index) {
                return;
            }

            if (self.now_index != -1) {
                self.cardReturnAni();
            }//上一张牌

            self.now_index = j;
            self.centerCard.active = true;
            cc.log(self.now_index);
            var pile = player.handsPile[self.now_index].id;
            var data = datamgr.card[pile];
            var isCanUse = 0;
           // cc.log( self.now_index, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse, pile);

            self.centerCard.getComponent('CardItem').initData(
                self.now_index, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse, pile);
            var item = self.CardChildrenCount[self.now_index];
            item.opacity = 0;
            self._curSelectedIdx = item.getComponent('CardItem')._index;
           if (!this.gameOver) {
            inputMgr.curSelectCard(self._curSelectedIdx, item.convertToWorldSpaceAR(cc.v2(0,0)));
           }
          
        }, self);

        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var j;
            var pos = e.getLocation();
            var touch_point = self.HandsCardRoot.convertToNodeSpaceAR(pos);
            var player = combatmgr.getSelf();

            if (pos.y < 150) {  // 只能选中不能使用
                dataCenter.returnAniEnd = false;
                var is_contained = false;
                for (j = player.handsPile.length - 1; j >= 0; j--) {
                    // var node_box = self.CardChildrenCount[j].getBoundingBox();
                    // is_contained = cc.rectContainsPoint(node_box, touch_point);
                    is_contained = cc.Intersection.pointInPolygon(touch_point, this._getNodeRectPoints(self.CardChildrenCount[j]));
                    if (is_contained) {
                        break;
                    }
                }
                if (is_contained) {
                    if (j == self.now_index)
                        return;

                    if (self.now_index != -1) {
                        self.cardReturnAni(true);
                    }

                    self.now_index = j;
                    self.centerCard.active = true;
                    var pile = player.handsPile[self.now_index].id;
                    var data = datamgr.card[pile];
                    var isCanUse = 0;
                    self.centerCard.getComponent('CardItem').initData(
                        self.now_index, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse, pile);
                    var item = self.CardChildrenCount[self.now_index];
                    item.opacity = 0;
                    if (!this.gameOver) {
                        inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);//获取可释放目标
                        var idx = item.getComponent('CardItem')._index;
                        self.setCurSelectedIdx(idx);//绿色
                        inputMgr.curSelectCard(idx, item.convertToWorldSpaceAR(cc.v2(0,0)));//显示可攻击目标
                    }
                   
                }
                else {
                    self.setCurSelectedIdx(-1);
                    if (self.now_index != -1) {
                        self.cardReturnAni();
                        if (!this.gameOver) {
                            inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);
                        }
                       
                    }
                }
            }
            else {
                if (self.now_index >= 0) {
                    self.CardChildrenCount[self.now_index].getComponent('CardItem').setWillingUse(true);
                }
                // 拖拽卡牌或者箭头
                self.cardReturnAni();
                dataCenter.returnAniEnd = true;
                if (!this.gameOver) {
                    inputMgr.touchMove(e.touch._point);
                }
                
            }
        }, self);

        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_END, function (e) {
            self.setCurSelectedIdx(-1);
            self.cardReturnAni();
            ctx.clear();
            inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);
        }, self);

        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            self.setCurSelectedIdx(-1);
            self.cardReturnAni();
            ctx.clear();
            inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);
        }, self);

    },

    setCurSelectedIdx (idx) {
        if (this._curSelectedIdx >= 0 ) {
            this.CardChildrenCount[this._curSelectedIdx].getComponent('CardItem').setWillingUse(false);
        }
        this._curSelectedIdx = idx;
    },

    update(dt) {
        if (this._bMpFull) {
            return;
        }

        if(this.target == null)
        {
            this.target = combatmgr.getSelf();

            if(this.target == null)
                return;
        }
            
        if (this.target && !this.target.mpRecoverPause && (dataCenter.hp!= 0) ) {
            this.now_time += dt / this.target.mpRecoverRate;
            var per = Math.min(1, this.now_time * 1000 / this.target.mpRecoverTime);  //百分比
            this.mpSpire.fillRange = per;
            this.mpRecoverPauseEnd = true;
        }

        if(this.mpRecoverPauseEnd && !this.target.mpRecoverPause == false && (dataCenter.hp!= 0)) {
            this._uimgr.showTips('灵力暂停');
            this.mpRecoverPauseEnd = false;
        }
    },

    callback() {
        if(dataCenter.curFightTime > 0)
        {
            var curTime = dataCenter.curFightTime - new Date().getTime();
            this.min_time = parseInt(curTime/60000);
            this.sec_time = parseInt(curTime /1000)%60;
        }
        else
        {
            this.sec_time--;
        }

        if (this.sec_time == 0) {
            this.min_time -= 1;
            this.sec_time = 59;
        }
        if (this.min_time >= 0) {
            if (this.sec_time < 10 && this.sec_time != 0) {
                this.time.string = "" + this.min_time + ":0" + "" + this.sec_time;
            }
            else {
                this.time.string = "" + this.min_time + ":" + "" + this.sec_time;
            }

            if (dataCenter.hp == 0) {
                this.gameOver = true;
            }
            else {
                this.gameOver = false; 
            }

            if (this.min_time == 0) {
                if (this.sec_time == 59) {
                    this._uimgr.showTips('60秒后战斗结束');
                }

                if (this.sec_time == 30) {
                    this._uimgr.showTips('30秒后战斗结束');
                }

                if (this.sec_time == 10) {
                    this._uimgr.showTips('10秒后战斗结束');
                }

                if (this.sec_time == 5) {
                    this._uimgr.showTips('5秒后战斗结束');
                }
            }
        }
        if (this.min_time < 0) {
            cc.log("定时器结束");
            this.unschedule(this.callback);
            this.min_time = 0;
            this.sec_time = 0;
            if (this.min_time == 0) {
               if (this.sec_time < 0) {
                this.sec_time = 0;
                }
            }
            this.time.string = "" + this.min_time + ":0" + "" + this.sec_time;
        }
       
    },      //定时器
    OnFresh: function (data) {
        this.ShowHandCards();
        this.DiscardPile.string = data.discardsNum.toString();
    },
    onFreshCardsNum(num) {
        this.cards.string = num.toString();
    },
    onFreshMp(mp, bFresh) {
        if (bFresh) {
            this.now_time = 0;
        }
        if (mp < consts.Fight.MP_MAX) 
        {
            if (this._bMpFull) {
                this.now_time = 0;
            }
            this._bMpFull = false;
            this.mp.string = " " + mp + "/10";
            this.mp_fill.active = false;
        }
        else {
            this._bMpFull = true;
            this.mp.string = mp + "/10";
            this.mpSpire.fillRange = 1;
            this.mp_fill.active = true;
            this._uimgr.showTips('灵力已满');
        }
    },
    onFreshThew(thew) {
        this.thew.string = thew + "/10";
        this.thewSpire.fillRange = thew / 10;

        if (thew / 10 == 1) {
            this.thew_fill.active = true;
        }
        else {
            this.thew_fill.active = false;
        }
    },
    showNum(data) {
        this.onFreshMp(data.mp);
        this.DiscardPile.string = data.discardsNum;
        this.onFreshThew(data.thew);
        this.ExhaustedPile.string = data.exhaustsNum;
        this.cards.string = data.cardsNum;
    },
    ShowHandCards: function () {
        var player = combatmgr.getSelf();
        if (player.handsPile.length == 8) {
            this._uimgr.showTips('手牌已满');
        }
        
        for (var i = 0; i < 8; i++) {
            if (i < player.handsPile.length) {
                var pile = player.handsPile[i].id;
                var data = datamgr.card[pile];
                var isCanUse = 0;

                if (data.CastMP <= player.Mp) {
                    isCanUse = 1;
                }
                this._HandsCards[i].initData(i, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse, pile);
                this._HandsCards[i].show();
                if (i == player.handsPile.length - 1) {
                    this.layout();
                }
            }
            else {
                this._HandsCards[i].hide();
            }
        }
    },
    UseCard: function (index) {
        this._HandsCards[index].hide();
    },
    FreshHp: function () {
        var player = combatmgr.getSelf();
        this.playerHpBar.progress = player.Hp / player.MaxHp;
        this.updateBarLabel(player.Hp, player.MaxHp);
    },
    loadFightOver: function (res) {
        var resss = res;
        this.scheduleOnce(function () {
            combatmgr.Release();
            this._uimgr.loadUI(constants.UI.FightOver,function(data) {
                data.reslut(resss); 
            })
        },2);
    },
    
});
