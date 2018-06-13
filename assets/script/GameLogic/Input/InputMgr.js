// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/**
 *      操作管理类
 *      先设定当前使用的卡组再设定目标
 *      by pwh
 */

var constant = require('constant')

cc.Class({
    extends: cc.Component,

    properties: {
        _curCard : null,
        _target : null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchmove', function ( event ) {
            console.log('Hello! input listen');
          });
    },

    start () {

    },
    selelctCard(card){
        /// 显示角色勾边
        
    },
    selelctTarget(target){
        if(_curCard == null)
            return;

        if(_curCard.ability.Objective = "")
        {
            //target.teamid
        }
    }

    // update (dt) {},
});
