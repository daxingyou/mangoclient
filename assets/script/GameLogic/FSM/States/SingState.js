/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 17:29:19 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-14 10:16:27
 */
var FSMEvent = require('FSMEvent');
var FSMState = require('FSMState');
var FSMStateID = require('FSMStateID');
var util = require('util');

var SingState = function (fsm) {
    FSMState.call(this, fsm);
    this.stateID = FSMStateID.SING;

    this.event2stateID = {
        [FSMEvent.DIE]: FSMStateID.DIE,
        [FSMEvent.STANDBY]: FSMStateID.STANDBY,
        [FSMEvent.SWOON]: FSMStateID.SWOON,
    }
    this.ani = null;
};

util.inherits(SingState, FSMState);
module.exports = SingState;

var pro = SingState.prototype;

pro.handleEvent = function (event) {
    if (this.event2stateID.hasOwnProperty(event))
        return this.event2stateID[event];
    return FSMStateID.NULL;
};

pro.onEnter = function (unit, ani) {
    var self = this;
    if (unit.agent) {
        this.ani = ani;
        unit.agent.PlayAnimation(ani, false);
        unit.agent.setCompleteCallback(ani, function () {
            self.fsm.handleEvent(FSMEvent.STANDBY);
        })
    }
};

pro.onExit = function (unit) {
    if (unit.agent && this.ani) {
        unit.agent.setCompleteCallback(this.ani, null);
    }
};
