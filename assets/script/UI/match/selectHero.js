
var UIBase = require('UIBase')
var ShaderUtils = require("ShaderUtils")
var net = require("NetPomelo")
var selectHeroProto = require("selectHeroProto")
var confirmHeroProto = require("confirmHeroProto")
var dataCenter = require('DataCenter')
var heroData = require('Hero');
var datamgr = require('DataMgr')

cc.Class({
    extends: UIBase,

    properties: {
        matchUI : cc.Node,
        man : sp.Skeleton,
        woman : sp.Skeleton,
        cdTimeLable : cc.Label,
        cdTime : 30,
        _CDState : true,
        pipei:cc.Node,
        dot:cc.Node,
        chen_icon:cc.Label,
        chen_name:cc.Label,
        chen_nameLeft:cc.Label,
        yu_nameLeft:cc.Label,
        yu_icon:cc.Label,
        yu_name:cc.Label,   
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
     this.init()
     
    
    },
    init(){
      
        var chen =  datamgr.hero[1000];
        var yu =  datamgr.hero[2000];
        this.chen_name.string = chen.HeroName; 
        this.chen_nameLeft.string = chen.HeroName;
        this.chen_icon.string = chen.HeroIcon;
        this.yu_name.string = yu.HeroName; 
        this.yu_nameLeft.string = yu.HeroName;
        this.yu_icon.string =yu.HeroIcon;
    },

    onEnable(){
        this._CDState = true;
        if(this.woman != null)
            ShaderUtils.setShader(this.woman, "gray");
        if(this.man != null)
            ShaderUtils.setShader(this.man, "gray");

        //normal
    },

    onDisable(){

    },

    start () {
        
    },

    update (dt) {
        if(this._CDState)
        {
            this.cdTime -= dt;
            var temp = Math.floor(this.cdTime);
            this.cdTimeLable.string = temp.toString();
            if(this.cdTime <= 0){
                this.cdTimeLable.string = '0';
                this._CDState = false; 
            }
        }
    },

    back (){
        this.matchUI.active = true;
        this.pipei.active = false;
        this.dot.active = false;
        this.dot.getComponent.string = ".";
        this.node.active = false;
    },
    manSelect(event){
        var that = this;
        
        dataCenter.userName = '陈靖仇';
       
        net.Request(new selectHeroProto(1000),function(data){
            if(data.code == 1)
            {
                if(that.woman != null)
                    ShaderUtils.setShader(that.woman, "gray");
                if(that.man != null)
                    ShaderUtils.setShader(that.man, "normal");
            }
            else if(data.code == 2)
            {
                that._mgr.showTips(""+dataCenter.userName+'已经被选');
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

        cc.log('manSelect');
    },
    womanSelect(event){
        var that = this;
        dataCenter.userName = '于小雪';
     
        net.Request(new selectHeroProto(2000),function(data){
            if(data.code == 1)
            {
                if(that.woman != null)
                    ShaderUtils.setShader(that.woman, "normal");
                if(that.man != null)
                    ShaderUtils.setShader(that.man, "gray");
            }
            else if(data.code == 2)
            {
                that._mgr.showTips(""+dataCenter.userName+'已经被选');
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

        cc.log('womanSelect');
    },
    beginFight(){
        var that = this;
        net.Request(new confirmHeroProto(),function(data){
            
        });//点击准备执行
    },
    beginLoadCD(){
        this._CDState = true;
        this.cdTime = 11;
    }
});
