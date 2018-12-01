var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
       image : cc.Sprite,
       Heroname : cc.Label,
       heroIconAtla:cc.SpriteAtlas,
    },

    // onLoad () {},

    start () {
    },

    // update (dt) {},
    init(item,parent){
        this.parent = parent;
        this.Id = item.ID;
        this.Heroname.string = item.HeroName;
        this.image.spriteFrame = this.heroIconAtla.getSpriteFrame(item.HeroIcon);
    },
    click(){
        this.parent.curHeroSelect(this.Id);
    }
});
