var uiBase = require('UIBase')
var heroData = require('Hero')
var back = require('backMainUI')
cc.Class({
    extends: uiBase,

    properties: {
        _items : null,
        _state: 0,      //0 ： 英雄选择界面 , 1: 未获得英雄展示界面 2: 已经获得英雄展示界面 3: 宝物展示界面

        heroNoHave : uiBase,

        HeroImage : cc.Prefab,
        ImageRoot : cc.Node,
        HeroList : cc.Node,
        HasHero : cc.Node,
        NoHaveHero : cc.Node,
        ToolShow : cc.Node
    },

    onLoad () {
        this._super();
        this.addCommonBackBtn('英雄');
    },

    start () {
        this._state = 0;
        this._items = new Array();

        for(var i in heroData)
        {
            var button = cc.instantiate(this.HeroImage);
            button.parent = this.ImageRoot;
            var item = button.getComponent('HeroImageItem');
            item.init(heroData[i],this);
            this._items.push(item);
        }
    },

    // update (dt) {},
    ShowHeroUI(){
        if(this._state == 0)
        {
            this.HeroList.active = true;
            this.heroNoHave.realse();
            this.heroNoHave.hide();
            this.ToolShow.active = false;
            this.HasHero.active = false;
            
        }
        else if(this._state == 1)
        {
            this.HeroList.active = false;
            this.HasHero.active = false;

            this.heroNoHave.init(this.curSelectHeroId);
            this.heroNoHave.show();
        }
        else if(this._state == 2)
        {
            
        }
        else if(this._state == 3)
        {
            
        }
    },
    curHeroSelect(heroId){
        // 判断当前英雄是否拥有 
        this._state = 1;   //显示未拥有英雄
        //this._state = 2;   // 显示已经获得英雄

        this.curSelectHeroId = heroId;
        this.ShowHeroUI();
    },
    backClick(){
        if(this._state == 0)
        {
            back.backMainUI();
        }
        else{
            this._state = 0;
            this.ShowHeroUI();
        }
    }
});
