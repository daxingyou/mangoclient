var UIBase = require('UIBase');

cc.Class({
    extends: UIBase,

    properties: {
        level : cc.Label,
        image : cc.Sprite,
        buffId: cc.Node,
        atls : cc.SpriteAtlas,
        _buffId: null,
        _click: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

  

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    },

    onTouch () {
        this._click += 1;
        this.buffId.active = true;
        this.buffId.getComponent(cc.Label).string = this._buffId;
        if (this._click == 2) {
            this.buffId.active = false;
            this._click = 0;
        }
    },

    offTouch () {
        this.buffId.active = false;
    },

    fresh(image,id,level){ // id 和 level 换了位置 
        this.image.spriteFrame = this.atls.getSpriteFrame(image);
        if (!level) {
            this.level.string = "";
        }
        else {
            this.level.string = level;
        }

        if (!id) {
            this.buffId.active = false;
        }
        else {
            this._buffId = id;
            this.buffId.getComponent(cc.Label).string = id;
        }
    },
   
    // update (dt) {},
});
