var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')

cc.Class({
    extends: uibase,

    properties: {
        showSelect:cc.Node,
        comfirmCount:cc.Label,
        ownHeros:cc.Node,
        _ownHeros:[],
        showSelectHero:cc.Sprite,
        heroIconAtlas : cc.SpriteAtlas,
        _CDState:false,
    },


     onLoad () {
         var self = this;
         var resIndex = 0;
        cc.loader.loadRes('UI/fightPav/ownHero', function (errorMessage, loadedResource) {
            for (var i = 0; i < 8; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.ownHeros.addChild(item);
                self._ownHeros.push(item.getComponent('ownHero'));
                if (resIndex == 8) {
                    cc.loader.release('UI/fightPav/ownHero');
                    self.pickHero();
                }
            }
        });
     },

    start () {

    },
    pickHero () {
        cc.log("选择英雄");
        this.showSelect.active = false;
        this.cdTime = 5;
        this._CDState = true;

        for (let i=0;i<8;i++) {
         this._ownHeros[i].initOwnHero(i,"yuxiaoxue","于小雪",this);
        }
    },
    pickHeroAtt(event,cust) {
        cc.log("选择英雄属性");
        if (cust == 1) {
            this.heroAttribute = 1;
        }
        else if (cust == 2) {
            this.heroAttribute = 2;
        }
        else {
            this.heroAttribute = 3;
        }
    },
    enterPileKu () {
             var uimgr = cc.find('Canvas').getComponent('UIMgr');
                uimgr.loadUI(constant.UI.PileKu,function(data){
            });
    },
    enterTreasure() {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Treasure,function(data){
    });
    },

     

    update (dt) {
        if (this._CDState) {  
            this.cdTime -=dt;
            var  temp = Math.floor(this.cdTime);
            if (temp == 0 ) {
                this._CDState = false;
            //     var uimgr = cc.find('Canvas').getComponent('UIMgr');
            //     uimgr.loadUI(constant.UI.Load,function(data){
            // });
            }
            if (this.comfirmCount == undefined)
            return;
            this.comfirmCount.string = temp;
        }
     },
});
