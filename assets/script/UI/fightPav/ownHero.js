cc.Class({
    extends: cc.Component,

    properties: {
        heroIconAtlas : cc.SpriteAtlas,
        heroImg : cc.Node, 
        heroName :cc.Label,
        heroid:null,
        _parents:null,
        selected:cc.Node,
        _heroName:null,

    },
     onLoad () {},

    start () {

    },
    initData (heroid,heroName,heroIcon,parents) {
        this.heroid = heroid;
        this.heroName.string = heroName;
        this._heroName = heroName;
        var heroImgSpr = this.heroImg.getComponent(cc.Sprite);
        heroImgSpr.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this._parents = parents;
    },
    start () {
        this.heroImg.on('touchstart',this.onTouchHero,this);
    },
    onTouchHero(event,heroid) {
        var self = this;
        if (self._parents!=null) {
           self._parents.selectHero(this.heroid);   
        }
    },
   
     update (dt) {
         
        
     },
});
