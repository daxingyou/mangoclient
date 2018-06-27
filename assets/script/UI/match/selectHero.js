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
var ShaderUtils = require("ShaderUtils")
var net = require("NetPomelo")
var selectHeroProto = require("selectHeroProto")
var confirmHeroProto = require("confirmHeroProto")
var constant = require("constant")

cc.Class({
    extends: UIBase,

    properties: {
        matchUI : cc.Node,
        man : cc.Node,
        woman : cc.Node,
        cdTimeLable : cc.Node,
        cdTime : 10,
        _CDState : true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    onEnable(){
        if(this.woman != null)
            ShaderUtils.setShader(this.woman, "gray");
        //if(this.man != null)
        //    ShaderUtils.setShader(this.man, "normal");
    },

    onDisable(){

    },

    start () {
        
    },

    update (dt) {
        if(_CDState)
        {
            cdTime -= dt;
            if(cdTime <= 0){
                _CDState = false;
                this._mgr.loadUI(constant.UI.Fight,function(data){
                    
                })
                _uiMgr.release();
            }
        }
    },

    back (){
        this.matchUI.active = true;
        this.node.active = false;
    },
    manSelect(event){
        var that = this;
        net.Request(new selectHeroProto(1000),function(data){
            if(data.code == 1)
            {
                if(that.woman != null)
                    ShaderUtils.setShader(that.woman, "normal");
                if(that.man != null)
                    ShaderUtils.setShader(that.man, "gray");
            }
            else if(data.code == 2)
            {
                that._mgr.showTips('已经被选');
            }
            else if(data.code == 3)
            {
                that._mgr.showTips('没有改英雄');
            }
            else if(data.code == 4)
            {
                that._mgr.showTips('已经确认了');
            }
        });

        console.log('manSelect');
    },
    womanSelect(event){
        var that = this;
        net.Request(new selectHeroProto(2000),function(data){
            if(data.code == 1)
            {
                if(that.woman != null)
                    ShaderUtils.setShader(that.woman, "gray");
                if(that.man != null)
                    ShaderUtils.setShader(that.man, "normal");
            }
            else if(data.code == 2)
            {
                that._mgr.showTips('已经被选');
            }
            else if(data.code == 3)
            {
                that._mgr.showTips('没有改英雄');
            }
            else if(data.code == 4)
            {
                that._mgr.showTips('已经确认了');
            }
        });

        console.log('womanSelect');
    },
    beginFight(){
        net.Request(new confirmHeroProto(),function(data){
            _CDState = true;
        });
    }
});
