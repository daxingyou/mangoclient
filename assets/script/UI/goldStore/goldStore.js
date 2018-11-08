var UIBase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')

cc.Class({
    extends: UIBase,

    properties: {
      silverNum:cc.Label,
      goldNum:cc.Label, 
      goldItem:  cc.Prefab,
      content: cc.Node,
    },
    init (silver,gold) {
        this.silverNum.string = silver;
        this.goldNum.string = gold;
    },

 

     onLoad () {
        // for (let i=0;i<25;i++) {
        //     var item = cc.instantiate(this.goldItem);
        //     this.content.addChild(item);
        // }
       
     },

    start () {

    },

    // update (dt) {},
});
