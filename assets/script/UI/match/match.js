var UIBase = require('UIBase')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')
var uimgr = require('UIMgr')

cc.Class({
    extends: UIBase,

    properties: {
        match : cc.Node,
        select : cc.Node,
        _type : 0,
        selectScr : UIBase,
        pipei:cc.Node,
        dot:cc.Node,
        btn_label:cc.Label,
        cancel:0,
        start_pipei:cc.Node,
        pipei_bg:cc.Node,
        //matching : 1,
        //select : 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.match.active = true;
        //this.select.active = true;
        this._type = 0;
    },

    start () {
        this.match.active = true;
        this.select.active = false;
        this._type = 0;
        this.selectScr.init(this._mgr);
    },

    update (dt) {

    },
    matchTeam(){
        this.dot.getComponent(cc.Label).string = ".";
        this.start_pipei.active = false;
        if(this.cancel ==0){
            this._type = 1;
            uimgr = cc.find('Canvas').getComponent('UIMgr');
            this.pipei.active = true;
            this.dot.active = true;
            this.pipei_bg.active = true;
            var dot = this.dot.getComponent(cc.Label).string;
            this.schedule(function(){
                this.dot.getComponent(cc.Label).string += dot;
                if(this.dot.getComponent(cc.Label).string == "...."){
                    this.dot.getComponent(cc.Label).string = ".";
                }
            },0.5);  
            this.btn_label.string = "取消匹配";
            this.cancel = 1;
            net.Request(new matchProto(consts.MatchType.PVE_2,1),(data)=>{
                cc.log("match "+data);
    
                ///匹配成功
                if(data.code == 1)
                {
                    this._type = 2;
                   // uimgr.showTips('匹配成功');
                   
                }  ///队列中
                else if(data.code == 2)
                {
                    uimgr.showTips('队列中');
                }
            });
        }
        else{
                this.cancel = 0;
                this.btn_label.string = "开始匹配";
                this.pipei.active = false;
                this.dot.active = false;
                this.pipei_bg.active = false;
                net.Request(new unmatchProto(consts.MatchType.PVE_2,1),(data)=>{
                    cc.log("match "+data + "取消匹配");
                });
        }
       
    }, 
    showSelect(){
        this.match.active = false;
        this.select.active = true;
    }
});
