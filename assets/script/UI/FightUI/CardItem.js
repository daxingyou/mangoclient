
var UIBase = require('UIBase');

cc.Class({
    extends: UIBase,

    properties: {
        Name : cc.Label,
        _index : 0,
        cardAtlas : cc.SpriteAtlas,
        cardImage : cc.Sprite, 
        select:cc.Node,
    },



    // onLoad () {},

  
    initData(data,srpiteName,index){
        this._index = index;
        this.Name.string = data;
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(srpiteName);
    },


    // start () {
    //     var self = this;
    //     self.start_rotation = self.node.rotation;
    //     self.start_y = self.node.y;
    //     cc.log(self.start_y,self.start_rotation,"y,rotation");
       
    //     self.node.on(cc.Node.EventType.TOUCH_START, function (event) {//节点区域时   
    //         cc.log("start----------------");
    //        self.show_dlg();
    //     }, self.node);
    //     self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {//当手指在屏幕上目标点区域内移动时    
    //     cc.log("move");
    //     }, self.node);

    //     self.node.on(cc.Node.EventType.TOUCH_END, function (event) {//当手指在目标节点区域内离开屏幕时
    //         self.hide_dlg();
    //         cc.log("end---");
    //     }, self.node);
        
    //    self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {//当手指在目标节点区域外离开屏幕时
    //         cc.log("end---");
    //     },self.node);
    // },
    // show_dlg: function() {
    //     cc.log("start-----------end");
    //     this.node.rotation = 0;
    //     this.node.y = this.start_y+200;
    //     this.node.zIndex = 1000;
    //     var s = cc.scaleTo(0.001, 1.3).easing(cc.easeBackOut());
    //     this.node.runAction(s);
    // },

    // hide_dlg: function() {
    //     cc.log("hide_dlg");
    //     this.node.zIndex = 1;
    //     this.node.rotation = this.start_rotation;
    //     this.node.y -=-(this.start_y+200);
    //     var s = cc.scaleTo(0.001, 1).easing(cc.easeBackIn());
    //     this.node.runAction(s);
    //     cc.log("hide_dlg------end");
    // },




   
    // update (dt) {},
});
