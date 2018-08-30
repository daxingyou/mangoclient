
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
            ui.selectHero(event, 1000);
        }
        else if(that.param == 'woman')
        {
            ui.selectHero(event, 2000);
        }
    }

    // update (dt) {},
});
