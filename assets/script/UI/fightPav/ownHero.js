cc.Class({
    extends: cc.Component,

    properties: {
        heroIconAtlas : cc.SpriteAtlas,
        heroImg : cc.Node, 
        heroName :cc.Label,
        heroid:null,
        _parents:null,
        _heroName:null,
        tips: cc.Node,
        _curIndex: null,

    },
     onLoad () {},

    start () {

    },
    initData (index,heroid,heroName,heroIcon,parents) {
        this._curIndex = index;
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

    select() {
        this.tips.active = true;
    },
    unSelect () {
        this.tips.active = false;
    },

    onTouchHero(event,heroid) {
        var self = this;
        if (self._parents!=null && self._parents._CDState) {
           self._parents.selectHero(this.heroid,this._curIndex);   
        }
        this.select();
    },
   
     update (dt) {
         
        
     },
});
