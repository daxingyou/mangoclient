//var GameLogic = require('GameLogic')

cc.Class({
    extends: cc.Component,

    properties: {
        _startPoint : null,
        cardItem : cc.Component,
    },
    
    onLoad () {
        if(this.cardItem == null || this.cardItem == undefined)
        {
            this.cardItem = this.node.parent.getComponent('CardItem');
        }

        var ctx = cc.find('Canvas/tips').getComponent(cc.Graphics);//获取组件
        var mgr = cc.find('Canvas/ui/FightUI/targetTips').getComponent('InputMgr');
        var that = this;

        this.node.on('touchstart', function ( event ) {
            //cc.log('Hello! card listen');

            mgr.curSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._startPoint);//索引值，触摸位移，起始位置
            //GameLogic.UsePile(GameLogic.player,0,GameLogic.getEnemys(GameLogic.player)[0]);
        });
        this.node.on('touchmove', function ( event ) {
            //console.log('Hello! card listen touchmove');
            //var delta = event.touch.getLocation();
            //var curwindow = event.touch.getLocationInView();
            //var newVec2 = that.node.convertToWorldSpace(that.node.position);
            //console.log(newVec2.x.toString() + " =x , y =" + newVec2.y.toString() );
            //console.log(delta.x.toString() + " =x , y =" + delta.y.toString() );
            //console.log(curwindow.x.toString() + " =x , y =" + curwindow.y.toString() );
            //ctx.clear();
            //ctx.moveTo(newVec2.x - cc.winSize.width/2 + that.node.getContentSize().width/2,newVec2.y);
            //起始点-目标点
            //ctx.quadraticCurveTo(newVec2.x - cc.winSize.width/2 + that.node.getContentSize().width/2,newVec2.y + 200,delta.x - newVec2.x - that.node.getContentSize().width/2,delta.y - newVec2.y);
            //ctx.stroke();

            ///当拖拽距离大于5个像素就还原放大显示
            if(cc.pDistance(event.currentTouch._startPoint,event.currentTouch._point) > 5)
                that.cardItem.cardReturnAni();

            mgr.touchMove(event.currentTouch.__instanceId,event.touch._point);
            //cc.pDistance(event.touch._startPoint,event.touch._point);
        });

        this.node.on('touchend', function ( event ) {
            //cc.log('Hello! card listen touchend ' + that.node.name);
            ctx.clear();
            mgr.CancleSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._point);
        });

        this.node.on('touchcancel', function ( event ) {
            //cc.log('Hello! card listen touchcancel ' + that.node.name);
            ctx.clear();
            mgr.CancleSelectCard(that.cardItem._index,event.currentTouch.__instanceId,event.touch._point);
        });
    },

    start () {

    },

    // update (dt) {},
});
