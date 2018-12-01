var uibase = require('UIBase')
var net = require('NetPomelo')
var tutorialEnterDungeonProto = require('tutorialEnterDungeonProto')

cc.Class({
    extends: uibase,

    properties: {
        _curDgId : 0,
        _nextDgId : 0,
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
        net.Request(new tutorialEnterDungeonProto(this._nextDgId));
        this.hide();

        let combatMgr = require('CombatMgr');
        combatMgr.Release();
    },
    showAgain(dgId){
        this._curDgId = dgId;
        this._nextDgId = dgId;
        this.again.active = true;
        this.next.active = false;
    },
    showNext(dgId){
        this._curDgId = dgId;
        this._nextDgId = ++dgId;

        this.again.active = false;
        this.next.active = true;
    }
});
