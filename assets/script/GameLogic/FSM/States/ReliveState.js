/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 20:52:12 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-14 10:18:22
 */
var FSMEvent = require('FSMEvent');
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');

var ReliveState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.RELIVE;

    this.event2stateID = {
        [FSMEvent.DIE]: FSMStateID.DIE,
        [FSMEvent.STANDBY]: FSMStateID.STANDBY,
        [FSMEvent.SING]: FSMStateID.SING,
        [FSMEvent.SWOON]: FSMStateID.SWOON,
        [FSMEvent.HIT]: FSMStateID.HIT,
    }
};

util.inherits(ReliveState, FSMState);
module.exports = ReliveState;

var pro = ReliveState.prototype;

pro.onEnter = function (unit, data) {
    var self = this;
    unit.Relive(data.hp, data.hp);
    if (unit.agent) {
        var trackEntry = unit.agent.PlayAnimation('relive', false);
        // 没有动画, 回到待机状态
        if (!trackEntry) {
            self.fsm.handleEvent(FSMEvent.STANDBY);
            return;
        }
        // 播完后回到待机
        unit.agent.setCompleteCallback('relive', function () {
            self.fsm.handleEvent(FSMEvent.STANDBY);
        })
    }
};

pro.onExit = function (unit) {
    if (unit.agent) {
        unit.agent.setCompleteCallback('relive', null);
    }
};
