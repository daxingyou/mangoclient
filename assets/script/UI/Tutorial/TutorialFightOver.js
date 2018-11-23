var uibase = require('UIBase')

cc.Class({
    extends: uibase,

    properties: {
        _curDgId : 0,
        again : cc.Node,
        next : cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    // update (dt) {},

    click(){
        net.Request(new tutorialEnterDungeonProto(this._curDgId++));
    },
    showAgain(dgId){
        this._curDgId = dgId;

        this.again.active = true;
        this.next.active = false;
    },
    showNext(dgId){
        this._curDgId = dgId;

        this.again.active = false;
        this.next.active = true;
    }
});
