/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 15:53:38 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 20:57:41
 */
var FSMEvent = require('FSMEvent');
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');

var DieState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.DIE;

    this.event2stateID = {
        [FSMEvent.RELIVE]: FSMStateID.RELIVE,
    }
};

util.inherits(DieState, FSMState);
module.exports = DieState;

var pro = DieState.prototype;

pro.onEnter = function (unit) {
    unit.IsDie = true;
    unit.agent.PlayAnimation('die', false);
};

pro.onExit = function (unit) {
    unit.IsDie = false;
};
