var CombatUnit = require('Combatunit')
var HandCard = require('HandCard')
var Agent = require('Agent')
var DataMgr = require('DataMgr')
var gameCenter = require('DataCenter')
let constants = require('constants')
let consts = require('consts');

function Hero_(data, position, combat) {
    CombatUnit.call(this, data, combat);

    this.heroid = data.heroid;

    this.teamid = 0;
    var that = this;
    this.table = DataMgr.hero[data.heroid];

    let bInLeft = combat.curPlayerGroupId === this.groupId ? true : false;
    this.agent = new Agent(this.table.HeroModel, position, bInLeft, this, function () {
        that.loadok = true;
        gameCenter.curLoadRes++;
    });
}

(function () {
    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Hero_.prototype = new Super();
})();

Hero_.prototype.constructor = Hero_;

Hero_.prototype.handsPile = [];

module.exports = Hero_;
let pro = Hero_.prototype;

pro.InitMyInfo = function (myInfo) {
    this.cardsNum = myInfo.cardsNum;
    this.discardsNum = myInfo.discardsNum;
    this.exhaustsNum = myInfo.exhaustsNum;
    this.mpRecoverTime = myInfo.mpRecoverTime;
    this.cardsLv = myInfo.cardsLv;
    this.inHands = myInfo.inHands || [];
    this.RefreshHandCard();
    this.SetMpRecoverRate(myInfo.mpRecoverRate, myInfo.stopMpRecoverBuffCnt);
}

///初始化当前玩家初始手牌
pro.RefreshHandCard = function () {
    this.handsPile = [];
    for (var i = 0; i < this.inHands.length; i++) {
        this.handsPile.push(new HandCard(this.inHands[i], this));
    }
    if (this.fightUI)
        this.fightUI.ShowHandCards();
}

pro.SetMpRecoverRate = function (mpRecoverRate, stopMpRecoverBuffCnt) {
    this.mpRecoverRate = mpRecoverRate;
    if (stopMpRecoverBuffCnt > 0) {
        this.mpRecoverPause = true;
    }
    else {
        this.mpRecoverPause = false;
    }
};

pro.onUseCard = function (data) {
    for (let key in data) {
        this[key] = data[key];
    }
    this.inHands = data.inHands || [];
    this.RefreshHandCard();
    this.fightUI.showNum();
};

pro.onDrawCard = function (data) {
    for (let key in data) {
        this[key] = data[key];
    }
    this.fightUI.showNum();
    this.RefreshHandCard();
};

pro.onMpRecover = function (data) {
    this.mp = data.mp;
    if (this.fightUI)
        this.fightUI.onFreshMp(data.mp, true);
};

pro.onSpecificDrawCard = function (data) {
    this.inHands = data.inHands || [];
    let got = data.got;
    if (got) {
        for (let info of got) {
            let pileType = info.PileType;
            switch (pileType) {
                case consts.PileType.CARDS:
                    this.cardsNum--;
                    break;
                case consts.PileType.DISCARDS:
                    this.discardsNum--;
                    break;
                case consts.PileType.EXHAUSTS:
                    this.exhaustsNum--;
                    break;
            }
        }
    }
    this.RefreshHandCard();
};

pro.onCreateCard = function (data) {
    this.inHands = data.inHands || [];
    this.RefreshHandCard();
};

pro.onDropCard = function (data) {
    this.inHands = data.inHands || [];
    let dropInfo = data.dropInfo;
    if (dropInfo) {
        for (var info of dropInfo) {
            let pileType = info.toPile;
            switch (pileType) {
                case consts.PileType.CARDS:
                    this.cardsNum++;
                    break;
                case consts.PileType.DISCARDS:
                    this.discardsNum++;
                    break;
                case consts.PileType.EXHAUSTS:
                    this.exhaustsNum++;
                    break;
            }
        }
    }
    this.RefreshHandCard();
};
