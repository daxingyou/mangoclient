// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIBase = require('UIBase')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var consts = require('consts')

cc.Class({
    extends: UIBase,

    properties: {
        match : cc.Node,
        select : cc.Node,
        _type : 0,
        selectScr : UIBase,
        //matching : 1,
        //select : 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.match.active = true;
        //this.select.active = true;
        //this._type = 0;
    },

    start () {
        this.match.active = true;
        this.select.active = false;
        this._type = 0;
    },

    update (dt) {

    },

    matchTeam(){
        this._type = 1;
        this._mgr.showTips('正在匹配');
        net.Request(new matchProto(consts.MatchType.PVE_2,1),(data)=>{
            console.log("match "+data);

            ///匹配成功
            if(data.code == 1)
            {
                this._type = 2;
            }  ///队列中
            else if(data.code == 2)
            {
                this._mgr.showTips('队列中');
            }
        });
    }, ///显示选择英雄
    showSelect(){
        this.match.active = false;
        this.select.active = true;
    }
});
