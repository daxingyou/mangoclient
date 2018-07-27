
cc.Class({
    extends: cc.Component,

    properties: {
        param : '',
        parentUI : cc.Node
    },


    // onLoad () {},

    start () {
        this.node.on('touchstart',this.listen,this);
    },
    listen(event){
        var that = this;
        var ui = that.parentUI.getComponent('selectHero');

        if(that.param == 'man')
        {
            ui.manSelect(event);
        }
        else if(that.param == 'woman')
        {
            ui.womanSelect(event);
        }
    }

    // update (dt) {},
});
