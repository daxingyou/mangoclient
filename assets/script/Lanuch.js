// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var matchMessage = require("matchMessage")
var constant = require('constants')
var actionfactory = require('./GameLogic/Action/ActionFactory')
var uimgr = require('UIMgr')

/*
// utils.js
export function myFunctionA(value) {
    console.log('Inside myFunctionA');
    return(value + 1);
}
export function myFunctionB() {
    console.log('Inside myFunctionB');
}
And when I need to call those functions, even from inside a component, I don’t have to type the module name, i.e. utils.myfunctionA(), I just call myFunctionA():

// mycomponent.js

cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad: function () {
        var variable = 3;
        var result = myFunctionA(variable);
        console.log('result=' + result);
    }
});
*/
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        actionfactory.init();
        ////数据加载
        dataMgr.init(()=>{
            
        });
        uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Login);

        matchMessage.init();
    },

    start () {

    },

    update (dt) {
        gameLogic.Tick(dt);
    },
});
