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

var constant = require('constants')
var GameLogic = require('GameLogic')

cc.Class({
    extends: cc.Component,

    properties: {
        _curCard : null,
        _target : null,
        frame : []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.node.on('touchmove', function ( event ) {console.log('Hello! input listen');});
        //this.node.on('touchmove', function ( event ) {
        //    console.log('Hello! card listen touchmove');
        //});
        for(var i in this.node.children){
            this.frame[i] = this.node.children[i];
        }
    },

    start () {

    },
    selelctCard(card){
        /// 显示角色勾边
        
    },
    selelctTarget(target){
        if(this._curCard == null)
            return;

        GameLogic.UsePile(GameLogic.player,this._curCard,GameLogic.getEnemys(GameLogic.player)[target]);
    },
    curSelectCard(index){
        this._curCard = index;

        var targets =  GameLogic.player.handsPile[this._curCard].ability.getTarget();
    },
    CancleSelectCard(index){
        if(this._curCard == index)
        {
            this._curCard = 0;
        }
        else{
            console.error("wtf?!~~");
        }
        CancleShowTargets();
    },
    CancleShowTargets(){
        for(var i in this.node.children){
            this.frame[i].active = false;
        }
    }
    // update (dt) {},
});
