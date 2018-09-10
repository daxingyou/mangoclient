var UIBase = require('UIBase')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')
var uimgr = require('UIMgr')

cc.Class({
    extends: UIBase,

    properties: {
        match: cc.Node,
        select: cc.Node,
        _type: 0,
        selectScr: UIBase,
        pipeiIng: cc.Node,
        dot: cc.Node,
        btn_label: cc.Label,
        cancel: false,
        start_pipei: cc.Node,
        pipei_bg: cc.Node,
        //matching : 1,
        //select : 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initMatch();
    },

    start() {
    },
    initMatch() {
        this.match.active = true;
        this.select.active = false;
        this._type = 0;
        this.selectScr.init(this._mgr);
    },

    update(dt) {

    },
    matchTeam() {//点击了开始匹配
        // this.select.active = true;
        this.dot.getComponent(cc.Label).string = ".";
        // this.cancel = true;
        // cc.log(this.cancel,"this.cancel");
        if (this.cancel) {
            this._type = 1;
            uimgr = cc.find('Canvas').getComponent('UIMgr');
            net.Request(new matchProto(consts.MatchType.PVE, 2, 1), (data) => {
                cc.log("开始匹配 ");
                ///匹配成功
                if (data.code == 1) {
                    this._type = 2;
                    // this.start_pipei.active = true;
                    // uimgr.showTips('正在匹配');

                    this.pipeiIng.active = true;
                    this.dot.active = true;
                    this.pipei_bg.active = true;

                    var dot = this.dot.getComponent(cc.Label).string;
                    this.schedule(function () {
                        this.dot.getComponent(cc.Label).string += dot;
                        if (this.dot.getComponent(cc.Label).string == "....") {
                            this.dot.getComponent(cc.Label).string = ".";
                        }
                    }, 0.7);
                    this.btn_label.string = "取消匹配";
                    this.cancel = false;

                }  ///队列中
                else if (data.code == 2) {
                    cc.log(data.code, "data.code");
                    uimgr.showTips('队列中');
                }
                else {
                    uimgr.showTips('匹配失败');
                }
            });
        }
        else {
            net.Request(new unmatchProto(), (data) => {
                cc.log("match " + data + "取消匹配");
                this.cancel = true;
                this.btn_label.string = "开始匹配";
                this.pipeiIng.active = false;
                this.dot.active = false;
                this.pipei_bg.active = false;
            });
        }
    },
    showSelect() {
        cc.log("进入选角界面");
        this.match.active = false;
        this.select.active = true;
    }
});
