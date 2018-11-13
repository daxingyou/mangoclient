/*********************
 *          显示未获得英雄
 *          by pwh
 */

var uiBase = require('UIBase')
var hero = require('Hero')
var loadRes = require('LoadRes')

cc.Class({
    extends: uiBase,

    properties: {
        model : cc.Node
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    init(heroId){
        var that = this;
        var data = hero[heroId];

        loadRes.load(data.HeroModel,true,(data)=>{
            that.go = cc.instantiate(data);
            that.go.parent = this.model;
            that.go.position = cc.v2(0, 0);
        })
    },
    realse(){
        this.go.destroy();
    }
});
