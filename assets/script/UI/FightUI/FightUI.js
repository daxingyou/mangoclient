var UIBase = require('UIBase')
var combatmgr = require('CombatMgr')
var dataCenter = require('DataCenter')
var datamgr = require('DataMgr')
var consts = require('consts')



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
    },

    onLoad() {
        this.initData();
    },

    initData() {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        this.userName.string = dataCenter.userName;
        this.schedule(this.callback, 1);
        this.mp_fill.active = false;
        this.thew_fill.active = false;
        var resIndex = 0;
        this.barLabel.string = combatmgr.getSelf().Hp + '/' + combatmgr.getSelf().MaxHp;

        if (dataCenter.userName === "于小雪") {
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('yuxiaoxue');
        }
        else {
            this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('chenjingchou');
        }

        if (dataCenter.userName == "") {
            if (dataCenter.ComfirmFirst == true || dataCenter.ComfirmSecond == true) {
                this.userName.string = "于小雪";
                this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('yuxiaoxue');
            }
            else {
                this.userName.string = "陈靖仇";
                this.headImg.getComponent(cc.Sprite).spriteFrame = this.heroIcon.getSpriteFrame('chenjingchou');
            }
        }

        var self = this;
        for (var i = 0; i < 8; i++) {
            cc.loader.loadRes('UI/fightUI/Card', function (errorMessage, loadedResource) {
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
                }
            });
        }
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

        var angle = 2 * (5 * count) * Math.PI / 180;//总夹角对应的弧度
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

    cardReturnAni(noAni) {
        var self = this;
        var num = combatmgr.getSelf().handsPile.length;
        if (self.now_index != -1) {
            let cardItem = self.CardChildrenCount[self.now_index];
            cardItem.stopAllActions();
            self.centerCard.active = false;
            cardItem.opacity = 255;
            if (noAni) {
                cardItem.position = cc.v2(self._x[self.now_index], self._y[self.now_index]);
            }
            else {
                cardItem.rotation = 0;
                cardItem.x = 0;
                cardItem.y = 400;
                //cardItem.active = true;

                var mov_act = cc.moveTo(0.2, self._x[self.now_index], self._y[self.now_index]);
                var rot_act = cc.rotateTo(0.2, self._rot[self.now_index]);
                var sca_act = cc.scaleTo(0.2, 0.88);
                var spa = cc.spawn(mov_act, rot_act, sca_act);

                cardItem.runAction(spa);
            }
        }
        self.now_index = -1;
    },

    start() {
        var self = this;
        var inputMgr = cc.find('Canvas/ui/FightUI/targetTips').getComponent('InputMgr');
        var ctx = cc.find('Canvas/tips').getComponent(cc.Graphics);  //获取组件
        self.CardChildrenCount = self.HandsCardRoot.children;
        self.HandsCardRoot.on(cc.Node.EventType.TOUCH_START, function (e) {
            var j;
            var touch_point = self.HandsCardRoot.convertToNodeSpaceAR(e.getLocation());
            var is_contained = false;
            var player = combatmgr.getSelf();

            for (j = player.handsPile.length - 1; j >= 0; j--) {
                var node_box = self.CardChildrenCount[j].getBoundingBox();
                is_contained = cc.rectContainsPoint(node_box, touch_point);
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

            self.centerCard.getComponent('CardItem').initData(
                self.now_index, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse);
            var item = self.CardChildrenCount[self.now_index];
            item.opacity = 0;
            self._curSelectedIdx = item.getComponent('CardItem')._index;
            inputMgr.curSelectCard(self._curSelectedIdx, item.convertToWorldSpaceAR(cc.v2(0,0)));
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
                    var node_box = self.CardChildrenCount[j].getBoundingBox();
                    is_contained = cc.rectContainsPoint(node_box, touch_point);
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
                        self.now_index, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse);
                    var item = self.CardChildrenCount[self.now_index];
                    item.opacity = 0;
                    inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);//获取可释放目标
                    var idx = item.getComponent('CardItem')._index;
                    self.setCurSelectedIdx(idx);
                    inputMgr.curSelectCard(idx, item.convertToWorldSpaceAR(cc.v2(0,0)));
                }
                else {
                    self.setCurSelectedIdx(-1);
                    if (self.now_index != -1) {
                        self.cardReturnAni();
                        inputMgr.CancleSelectCard(e.touch._point, dataCenter.returnAniEnd);
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
                inputMgr.touchMove(e.touch._point);
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
        if (this._curSelectedIdx >= 0) {
            this.CardChildrenCount[this._curSelectedIdx].getComponent('CardItem').setWillingUse(false);
        }
        this._curSelectedIdx = idx;
    },

    update(dt) {
        if (this._bMpFull) {
            return;
        }
        var target = combatmgr.getSelf();
        if (!target.mpRecoverPause) {
            this.now_time += dt / target.mpRecoverRate;
            var per = Math.min(1, this.now_time * 1000 / target.mpRecoverTime);  //百分比
            this.mpSpire.fillRange = per;
           
        }
        if (target.mpRecoverPause == false) {
            // this._uimgr.showTips('灵力暂停恢复');
        }
    },

    callback() {
        this.sec_time--;
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
        }
        if (this.min_time < 0) {
            this.unschedule(this.callback);
            this.min_time = 0;
            this.sec_time = 0;
            this.time.string = "" + this.min_time + ":0" + "" + this.sec_time;
        }

    },//定时器
    OnFresh: function (data) {
        //.mp data.inHands
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
            this._uimgr.showTips('灵力已满',cc.v2(0,65));
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
            this._uimgr.showTips('手牌已满',cc.v2(0,65));
        }
        for (var i = 0; i < 8; i++) {

            if (i < player.handsPile.length) {
                var pile = player.handsPile[i].id;
                var data = datamgr.card[pile];
                var isCanUse = 0;

                if (data.CastMP <= player.Mp) {
                    isCanUse = 1;
                }
                this._HandsCards[i].initData(i, data.CardName, data.CardQuality, data.CardImage, data.CardDescription, data.CardType, data.CastThew, data.CastMP, data.CardAttributes, isCanUse);
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
    }
});
