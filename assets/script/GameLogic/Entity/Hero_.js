var CombatUnit = require('Combatunit')
var Card = require('HandCard')
var Agent = require('Agent')
var DataMgr = require('DataMgr')

function Hero_(data,attributes,pos,teamid,combat,uid){

    this.Hp = data.hp;
    this.MaxHp = data.maxHp;
    this.Mp = data.mp;
    this.MaxMp = data.maxMp;
    this.basePhysical_arm = data.armor;

    var that = this;
    this.table = DataMgr.hero[data.heroid];

    CombatUnit.call(this,data,attributes,pos,teamid,combat,uid);

    var scale = 1;
    if(data.hasOwnProperty('scale'))
        scale = data.scale;

    this.agent = new Agent(this.table.HeroModel,pos,teamid,this.Hp,this.MaxHp,this.basePhysical_arm,uid,this.buffs,scale,function(){
        that.loadok = true;
    });
}

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Hero_.prototype = new Super();
})();

    Hero_.prototype.constructor = Hero_;

    Hero_.prototype.handsPile = [];

    Hero_.prototype.InitMyInfo = function (myInfo) {
        this.InitHands(myInfo.inHands);
        this.SetMpRecoverRate(myInfo.mpRecoverRate, myInfo.stopMpRecoverBuffCnt);
        this.mpRecoverTime = myInfo.mpRecoverTime;
    }

    ///初始化当前玩家初始手牌
    Hero_.prototype.InitHands = function(hands){
        hands = hands || [];
        for(var i = 0; i<hands.length;i++)
        {
            this.handsPile.push(new Card(hands[i],this));
        }
    }

    Hero_.prototype.SetMpRecoverRate = function (mpRecoverRate, stopMpRecoverBuffCnt) {
        this.mpRecoverRate = mpRecoverRate;
        if (stopMpRecoverBuffCnt > 0) {
            this.mpRecoverPause = true;
        }
        else {
            this.mpRecoverPause = false;
        }
    }

module.exports = Hero_;