let consts = require('consts');

module.exports = {
    bagInfo: {}, //一登录就有的
    refreshBag : {},
    refreshMoney: {},
    silver: 0,
    gold: 0,
    power: 0,
    initInfo: function (data,silver,gold,power) {
        this.bagInfo = data;
        this.silver = silver;
        this.gold = gold;
        this.power = power;
    },
   // messages: [],
};