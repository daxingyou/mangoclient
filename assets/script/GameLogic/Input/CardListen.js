// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var GameLogic = require('GameLogic')

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
        var ctx = cc.find('Canvas/tips').getComponent(cc.Graphics);
        var that = this;

        this.node.on('touchstart', function ( event ) {
            console.log('Hello! card listen');
            //GameLogic.UsePile(GameLogic.player,0,GameLogic.getEnemys(GameLogic.player)[0]);
        });
        this.node.on('touchmove', function ( event ) {
            //console.log('Hello! card listen touchmove');
            var delta = event.touch.getLocation();
            var curwindow = event.touch.getLocationInView();
            var newVec2 = that.node.convertToWorldSpace(that.node.position);
            //console.log(newVec2.x.toString() + " =x , y =" + newVec2.y.toString() );
            //console.log(delta.x.toString() + " =x , y =" + delta.y.toString() );
            //console.log(curwindow.x.toString() + " =x , y =" + curwindow.y.toString() );
            ctx.clear();
            ctx.moveTo(newVec2.x - cc.winSize.width/2,newVec2.y);
            ctx.quadraticCurveTo(newVec2.x - cc.winSize.width/2,newVec2.y + 200,delta.x - newVec2.x - that.node.getContentSize().width/2,delta.y - newVec2.y);
            ctx.stroke();
        });
        this.node.on('touchend', function ( event ) {
            console.log('Hello! card listen touchend' + that.node.name);
            ctx.clear();
        });
        this.node.on('touchcancel', function ( event ) {
            console.log('Hello! card listen touchcancel' + that.node.name);
            ctx.clear();
        });

        
        this.node.on('mouseup', function ( event ) {
            console.log('Hello! card listen mouseup ' + that.node.name);
            ctx.clear();
        });
    },

    start () {

    },

    // update (dt) {},
});
