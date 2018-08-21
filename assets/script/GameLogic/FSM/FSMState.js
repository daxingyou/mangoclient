/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 11:17:04 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-16 11:21:49
 */
var FSMStateID = require('FSMStateID');

var FSMState = function (fsm) {
    this.fsm = fsm;
    this.stateID = FSMStateID.NULL;

    this.event2stateID = {};
};

module.exports = FSMState;

var pro = FSMState.prototype;

pro.getStateID = function () {
    return this.stateID;
};

pro.handleEvent = function (event) {
    if (this.event2stateID.hasOwnProperty(event))
        return this.event2stateID[event];
    return FSMStateID.NULL;
};

pro.onEnter = function () {
    cc.log("onEnter no implement", this.stateID);
};

pro.onExit = function () {
    cc.log("onExit no implement", this.stateID);
};
