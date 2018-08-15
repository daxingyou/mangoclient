/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 11:03:57 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 19:48:14
 */
var FSMStateID = require('FSMStateID');

var FSM = function (owner) {
    this.owner = owner;
    this.curState = null;
    this.baseState = null;
    this.states = {};
};

module.exports = FSM;

var pro = FSM.prototype;

pro.addState = function (state) {
    this.states[state.getStateID()] = state;
};

pro.deleteState = function (stateID) {

};

pro.addInitState = function (state) {
    this.states[state.getStateID()] = state;
    this.baseState = this.curState = state;
    this.curState.onEnter(this.owner);
};

pro.getCurState = function () {
    return this.curState;
};

pro.handleEvent = function (event) {
    if (!this.curState)
        return;
    var args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var nextStateID = this.curState.handleEvent(event, ...args);
    if (nextStateID === FSMStateID.NULL || !this.states.hasOwnProperty(nextStateID))
        return;
    this.curState.onExit(this.owner, ...args);
    this.curState = this.states[nextStateID];
    this.curState.onEnter(this.owner, ...args);
};
