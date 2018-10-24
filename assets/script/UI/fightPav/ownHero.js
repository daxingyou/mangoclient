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
       // cc.log("选择了英雄，中间展示");
        var self = this;
        if (self._parents!=null) {
           self._parents.selectHero(this.heroid);   
        }
       // cc.log("右边显示，需要显示队友的，需要服务器通知");

        // net.Request(new selectHeroProto(heroid), function (data) {
        //     if (data.code == consts.SelectHeroCode.OK) {
                
        //     }
        //     else if (data.code == consts.SelectHeroCode.BE_SELECEED) {
        //         that._mgr.showTips(heroData.HeroName + '已经被选');
        //     }
        //     else if (data.code == consts.SelectHeroCode.NOT_EXIST) {
        //         that._mgr.showTips('没有改英雄');
        //     }
        //     else if (data.code == consts.SelectHeroCode.ALREADY_CONFIRMED) {
        //         that._mgr.showTips('已经确认了');
        //     }
        // }); 网络连接

    },
   
     update (dt) {
         
        
     },
});
