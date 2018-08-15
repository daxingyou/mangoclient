/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 14:45:19 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 17:47:16
 */
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');
var FSMEvent = require('FSMEvent');

var StandByState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.STANDBY;

    this.event2stateID = {
        [FSMEvent.DIE]: FSMStateID.DIE,
        [FSMEvent.HIT]: FSMStateID.HIT,
        [FSMEvent.SING]: FSMStateID.SING,
        [FSMEvent.SWOON]: FSMStateID.SWOON,
    }
};

util.inherits(StandByState, FSMState);
module.exports = StandByState;

var pro = StandByState.prototype;

pro.handleEvent = function (event) {
    if (this.event2stateID.hasOwnProperty(event))
        return this.event2stateID[event];
    return FSMStateID.NULL;
};

pro.onEnter = function (unit) {
    if (unit.agent) {
        unit.agent.PlayAnimation('guard', true);
    }
};
