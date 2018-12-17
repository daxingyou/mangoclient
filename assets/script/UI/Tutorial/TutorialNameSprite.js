

cc.Class({
    extends: cc.Component,

    properties: {
        left : cc.Node,
        right : cc.Node,
        PlayerName : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var len = this.PlayerName.string.length;
        this.left.position = cc.v2(-(len/2+0.5)*30,0);
        this.right.position = cc.v2((len/2+0.5)*30,0);
        cc.log();
    },
});
