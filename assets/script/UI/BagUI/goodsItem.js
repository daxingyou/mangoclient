
cc.Class({
    extends: cc.Component,

    properties: {
       num:cc.Label,
       propName:cc.Label,
    },

    initData (num,name) {
        this.num.string = num;
        this.propName.string = name;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
