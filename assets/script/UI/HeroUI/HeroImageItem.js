var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
       image : cc.Sprite,
       Heroname : cc.Label
    },

    // onLoad () {},

    start () {
    },

    // update (dt) {},
    init(item,parent){
        this.parent = parent;
        this.Id = item.ID;
        this.Heroname.string = item.HeroName;
    },
    click(){
        this.parent.curHeroSelect(this.Id);
    }
});
