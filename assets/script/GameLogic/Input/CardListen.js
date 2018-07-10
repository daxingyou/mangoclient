// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//var GameLogic = require('GameLogic')

cc.Class({
    extends: cc.Component,

    properties: {
        _startPoint : null,
        cardItem : cc.Component,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.cardItem == null || this.cardItem == undefined)
        {
            this.cardItem = this.node.parent.getComponent('CardItem');
        }

        var ctx = cc.find('Canvas/tips').getComponent(cc.Graphics);
        var mgr = cc.find('Canvas/ui/FightUI/targetTips').getComponent('InputMgr');
        var that = this;

        this.node.on('touchstart', function ( event ) {
            //cc.log('Hello! card listen');

            mgr.curSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._startPoint);
            //GameLogic.UsePile(GameLogic.player,0,GameLogic.getEnemys(GameLogic.player)[0]);
        });
        this.node.on('touchmove', function ( event ) {
            //console.log('Hello! card listen touchmove');
            var delta = event.touch.getLocation();
            //var curwindow = event.touch.getLocationInView();
            var newVec2 = that.node.convertToWorldSpace(that.node.position);
            //console.log(newVec2.x.toString() + " =x , y =" + newVec2.y.toString() );
            //console.log(delta.x.toString() + " =x , y =" + delta.y.toString() );
            //console.log(curwindow.x.toString() + " =x , y =" + curwindow.y.toString() );
            ctx.clear();
            ctx.moveTo(newVec2.x - cc.winSize.width/2 + that.node.getContentSize().width/2,newVec2.y);
            ctx.quadraticCurveTo(newVec2.x - cc.winSize.width/2 + that.node.getContentSize().width/2,newVec2.y + 200,delta.x - newVec2.x - that.node.getContentSize().width/2,delta.y - newVec2.y);
            ctx.stroke();

            mgr.touchMove(event.currentTouch.__instanceId,event.touch._point);
            //cc.pDistance(event.touch._startPoint,event.touch._point);
        });

        this.node.on('touchend', function ( event ) {
            cc.log('Hello! card listen touchend ' + that.node.name);
            ctx.clear();
            mgr.CancleSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._point);
        });

        this.node.on('touchcancel', function ( event ) {
            cc.log('Hello! card listen touchcancel ' + that.node.name);
            ctx.clear();
            mgr.CancleSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._point);
        });
    },

    start () {

    },

    // update (dt) {},
});
