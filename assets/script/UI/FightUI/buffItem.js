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

    fresh(image, level){
        this.image.spriteFrame = this.atls.getSpriteFrame(image);
        if (!level) {
            this.level.string = "";
        }
        else {
            this.level.string = level;
        }
    }
    // update (dt) {},
});
