/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 17:30:25 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 20:10:40
 */
var FSMEvent = require('FSMEvent');
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');

var SwoonState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.SWOON;

    this.event2stateID = {
        [FSMEvent.DIE]: FSMStateID.DIE,
        [FSMEvent.STANDBY]: FSMStateID.STANDBY,
    }
};

util.inherits(SwoonState, FSMState);
module.exports = SwoonState;

var pro = SwoonState.prototype;

pro.handleEvent = function (event) {
    if (this.event2stateID.hasOwnProperty(event))
        return this.event2stateID[event];
    return FSMStateID.NULL;
};

pro.onEnter = function (unit) {
    if (unit.agent) {
        unit.agent.PlayAnimation('swoon', true);
    }
};

pro.onExit = function (unit) {

};
