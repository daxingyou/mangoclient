var UIBase = require('UIBase')
var ShaderUtils = require("ShaderUtils")
var net = require("NetPomelo")
var selectHeroProto = require("selectHeroProto")
var confirmHeroProto = require("confirmHeroProto")
var dataCenter = require('DataCenter')
var heroData = require('Hero')
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
        user_first:cc.Label,
        user_second:cc.Label,
        yu_icon:cc.Label,
        yu_name:cc.Label,
        selectMan_light:cc.Node,
        selectWomen_light:cc.Node,
        first_man:cc.Node,
        first_women:cc.Node,
        second_man:cc.Node,
        second_women:cc.Node,
        judge:false,
        
    },
    onLoad () {
     this.init();
    },
    init(){
        var chen =  datamgr.hero[1000];
        var yu =  datamgr.hero[2000];
        this.chen_name.string = chen.HeroName; 
        this.yu_name.string = yu.HeroName; 
        cc.log(dataCenter.uuid,"我是谁");
        this.user_first.string = dataCenter.user_first;
        this.user_second.string = dataCenter.user_second;       
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
        this._mgr = cc.find('Canvas').getComponent('UIMgr');
        cc.log(dataCenter.uuid,dataCenter._first_uid,dataCenter._second_uid,"0,1,2");

        if(dataCenter.uuid == dataCenter._first_uid){
            cc.log("第一个位置是自己");
            this.judge = true;
        }
        else{
            cc.log("第二个位置是自己的");
        }
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
                if(that.woman != null){
                    ShaderUtils.setShader(that.woman, "gray");
                    that.selectMan_light.active = true;
                    that.selectWomen_light.active = false;
                    if(dataCenter.uuid==dataCenter._first_uid){
                      
                            ShaderUtils.setShader(that.first_man.getComponent(cc.Sprite),"gray");
                            that.first_man.active = true;
                            that.first_women.active = false;
                    }
                    else{
                        
                        ShaderUtils.setShader(that.second_man.getComponent(cc.Sprite), "gray");
                        that.second_man.active = true;
                        that.second_women.active = false;
                        
                    }
                }
                else{
                    that.selectMan_light.active = false;
                    that.first_man.active = false;
                    that.second_man.active = false;
                }
                   
                if(that.man != null){
                    ShaderUtils.setShader(that.man, "normal");
                }  
            }
            else if(data.code == 2)
            {
                
                that._mgr.showTips('已经被选');
                //""+dataCenter.userName+
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
                if(that.woman != null){
                    ShaderUtils.setShader(that.woman, "normal");
                    that.selectWomen_light.active = true;
                    that.selectMan_light.active = false;
                if(dataCenter.uuid==dataCenter._first_uid){
                     
                        ShaderUtils.setShader(that.first_women.getComponent(cc.Sprite),"gray");
                        that.first_women.active = true;
                        that.first_man.active = false;
                }
                else{
                   
                    ShaderUtils.setShader(that.second_women.getComponent(cc.Sprite), "gray");
                    that.second_women.active = true;
                    that.second_man.active = false;
                    
                }
                }
                else{
                    that.selectWomen_light.active = false;
                    that.first_women.active = false;
                    that.second_women.active = false;

                }
                   
                if(that.man != null){
                    // that.selectMan_light.active = true;
                    // that.selectWomen_light.active = false;
                    ShaderUtils.setShader(that.man, "gray");
                   
                }
                // else{
                //     that.selectMan_light.active = false;
                // }
                    
            }
            else if(data.code == 2)
            {
                that._mgr.showTips('已经被选');
                //""+dataCenter.userName+
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

        cc.log('womanSelect',"女的");
    },
    beginFight(){
        var that = this;

        if(dataCenter.uuid==dataCenter._first_uid){
           if(that.first_women.active == true){
            ShaderUtils.setShader(that.first_women.getComponent(cc.Sprite),"normal");
           }
           else{
            ShaderUtils.setShader(that.first_man.getComponent(cc.Sprite),"normal"); 
           }
    }

    else{
        if(that.second_women.active == true){
            ShaderUtils.setShader(that.second_women.getComponent(cc.Sprite),"normal");
           }
           else{
            ShaderUtils.setShader(that.second_man.getComponent(cc.Sprite),"normal"); 
           }
        
    }

        net.Request(new confirmHeroProto(),function(data){
        });//点击准备执行
    },
    beginLoadCD(){
        this._CDState = true;
        this.cdTime = 11;
    },
    showTeamSelect(heroId){
        if(this.judge==true){
            cc.log("我是第1个位置，现在显示第2个队友的位置");
            if(heroId==1000){
                cc.log("第2个队友----1");
                ShaderUtils.setShader(this.second_man.getComponent(cc.Sprite), "gray");
                 this.second_man.active = true;
                 this.second_women.active = false;
            }
            else{
                cc.log("第2个队友----2");
                ShaderUtils.setShader(this.second_women.getComponent(cc.Sprite), "gray");
                this.second_man.active = false;
                this.second_women.active = true;
               
            }
        }
        else{
            cc.log("我是第2个位置，现在显示第1个队友的位置");
            if(heroId==1000){
                ShaderUtils.setShader(this.first_man.getComponent(cc.Sprite), "gray");
                cc.log("第1个人选了男");
                 this.first_man.active = true;
                 this.first_women.active = false;
             }
             else{
                 cc.log("第1个人选了女的");
                ShaderUtils.setShader(this.first_women.getComponent(cc.Sprite), "gray");
                this.first_man.active = false;
                this.first_women.active = true;
              
             }
        }
      },

      showTeamPrepare(heroId){
        if(this.judge==true){
            if(heroId==1000){
               ShaderUtils.setShader(this.second_man.getComponent(cc.Sprite), "normal");
             
            }
            else{
             
               ShaderUtils.setShader(this.second_women.getComponent(cc.Sprite), "normal");
            }
        }
        else{
            if(heroId==1000){
            
               ShaderUtils.setShader(this.first_man.getComponent(cc.Sprite), "normal");
            }
            else{
               
               ShaderUtils.setShader(this.first_women.getComponent(cc.Sprite), "normal");
            }
        }
      },

});
