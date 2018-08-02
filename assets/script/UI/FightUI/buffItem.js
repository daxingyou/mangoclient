var UIBase = require('UIBase');

cc.Class({
    extends: UIBase,

    properties: {
        level : cc.Label,
        image : cc.Sprite,
        atls : cc.SpriteAtlas,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    fresh(image){
        this.image.spriteFrame = this.atls.getSpriteFrame(image);
    }
    // update (dt) {},
});
