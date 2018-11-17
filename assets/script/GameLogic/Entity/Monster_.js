var CombatUnit = require('Combatunit')
var Agent = require('Agent')
var DataMgr = require('DataMgr')
var gameCenter = require('DataCenter')

function Monster_(data, position, combat) {
    CombatUnit.call(this, data, combat);

    this.monsterid = data.monsterid;
    var that = this;

    this.table = DataMgr.monster[data.monsterid];
    ///蛟精分身
    this.summoned = DataMgr.monster[10002];

    this.teamid = this.groupId;
    let bInLeft = combat.curPlayerGroupId === this.groupId ? true : false;
    this.agent = new Agent(this.table.Model, position, bInLeft, this, function () {
        that.loadok = true;
        gameCenter.curLoadRes++;
    });
}

(function () {
    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Monster_.prototype = new Super();
})();

Monster_.prototype.constructor = Monster_;

module.exports = Monster_;