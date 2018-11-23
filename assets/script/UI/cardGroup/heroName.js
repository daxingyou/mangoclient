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

    initData (index,name,parent) {
        this._curIndex = index;
        this.heroName.string = name;
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
        this._parent.selectedHero(this._curIndex,this.heroName.string);
        this.select();
       // this.
    },

    // onLoad () {},

    start () {

    },



    // update (dt) {},
});
