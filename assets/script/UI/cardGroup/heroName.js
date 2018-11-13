var uibase = require('UIBase')
var constant = require('constants')
cc.Class({
    extends: cc.Component,

    properties: {
       heroName: cc.Label,
       selected: cc.Node,
       _parent: null,
       _curIndex: null,
      
    },

    initData (index,parent) {
        this._curIndex = index;
        this.heroName.string = index;
        this._parent = parent;
    },

    select () {
        this.selected.active = true;
    },

    unSelect () {
        this.selected.active = false;
    },

    click () {
        if (this.selected.active) 
        return;
        this._parent.showHeroSelectCard(this._curIndex);
        this.select();
       // this.
    },

    // onLoad () {},

    start () {

    },



    // update (dt) {},
});
