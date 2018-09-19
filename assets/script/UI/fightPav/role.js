

cc.Class({
    extends: cc.Component,

    properties: {
      heroName:cc.Label,
      userName:cc.Label,
      loadProjess:cc.Label,
      heroImg:cc.Sprite,
      heroIconAtlas : cc.SpriteAtlas,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    initData(index,heroName,userName,loadProjess,heroImg){
        this.heroName.string = heroName;
        this.userName.string = userName;
        this.loadProjess.string = loadProjess + "%";
        this.heroImg.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroImg);
    },

    // update (dt) {},
});
