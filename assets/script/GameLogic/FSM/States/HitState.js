/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 17:29:55 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 20:53:14
 */
var FSMEvent = require('FSMEvent');
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');

var HitState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.HIT;

    this.event2stateID = {
        [FSMEvent.DIE]: FSMStateID.DIE,
        [FSMEvent.STANDBY]: FSMStateID.STANDBY,
        [FSMEvent.SING]: FSMStateID.SING,
        [FSMEvent.SWOON]: FSMStateID.SWOON,
    }
};

util.inherits(HitState, FSMState);
module.exports = HitState;

var pro = HitState.prototype;

pro.onEnter = function (unit) {
    var self = this;
    if (unit.agent) {
        unit.agent.PlayAnimation('hit', false);
        // 播完后回到待机
        unit.agent.setCompleteCallback('hit', function () {
            self.fsm.handleEvent(FSMEvent.STANDBY);
        })
    }
};

pro.onExit = function (unit) {
    if (unit.agent) {
        unit.agent.setCompleteCallback('hit', null);
    }
};
