var UIBase = require('UIBase')
var ShaderUtils = require("ShaderUtils")
var net = require("NetPomelo")
var unmatchProto = require('unmatchProto')
var consts = require('consts')
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
        chen_name:cc.Label,
        user_first:cc.Label,
        user_second:cc.Label,
        yu_name:cc.Label,
        selectMan_light:cc.Node,
        selectWomen_light:cc.Node,
        first_man:cc.Node,
        first_women:cc.Node,
        second_man:cc.Node,
        second_women:cc.Node,
        is_firstPostion:false,
        firstComfirm:false,
        secondComfirm:false,
        start_pipei:cc.Label,
        pipeiIngBg:cc.Node,
        match:cc.Node,
        enter:cc.Node,
    },
    onLoad () {
     this.init();
   
    },
    init(){
        var chen =  datamgr.hero[1000];
        var yu =  datamgr.hero[2000];
        this.chen_name.string = chen.HeroName; 
        this.yu_name.string = yu.HeroName; 
        this.user_first.string = dataCenter.user_first;
        this.user_second.string = dataCenter.user_second;  
        
        this._mgr = cc.find('Canvas').getComponent('UIMgr');
        if(dataCenter.uuid == dataCenter._first_uid){
            cc.log("第一个位置是自己");
            this.is_firstPostion = true;
        }
        else{
            cc.log("第二个位置是自己的");
        }
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
                    if(that.is_firstPostion){
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
                
                that._mgr.showTips('陈靖仇已经被选');
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

                    if(that.is_firstPostion){

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
                    ShaderUtils.setShader(that.man, "gray");
                   
                }   
            }
            else if(data.code == 2)
            {
                that._mgr.showTips('于小雪已经被选');
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
        if(that.is_firstPostion){
            if(that.first_man.active == false && that.first_women.active == false){
                cc.log("你还没有选角色");
            }

           else if(that.first_women.active == true){
            ShaderUtils.setShader(that.first_women.getComponent(cc.Sprite),"normal");
            that.enter.active = false; 
           }
           else{
            ShaderUtils.setShader(that.first_man.getComponent(cc.Sprite),"normal"); 
            that.enter.active = false; 
           }
           
           that.firstComfirm = true;
           cc.log("1准备了");
        //    if(that.firstComfirm && dataCenter.userName=="于小雪"){

        //    }
    }

    else{
        if(that.second_man.active == false && that.second_women.active == false){
            cc.log("你还没有选角色");
        }
        else if(that.second_women.active == true){
            ShaderUtils.setShader(that.second_women.getComponent(cc.Sprite),"normal");
            that.enter.active = false;
           }
        else{
        ShaderUtils.setShader(that.second_man.getComponent(cc.Sprite),"normal"); 
        that.enter.active = false;
        }
        that.secondComfirm = true;
        cc.log("2准备了");
       
    }
        net.Request(new confirmHeroProto(),function(data){
        });//点击准备执行
    },
    beginLoadCD(){
        this._CDState = true;
        this.cdTime = 11;
        if((this.first_man.active == false && this.first_women.active == false && this.second_man.active == false && this.second_women.active == false)||(this.firstComfirm==false && this.secondComfirm == false)){
            cc.log("两个人都没有选择或者某一个人选择了但是都没有准备");
            if(this.is_firstPostion){
                dataCenter.userName = "陈靖仇";
            }
            else{
                dataCenter.userName = "于小雪";
            }
        }
        if((this.firstComfirm == true && this.secondComfirm == false)){
            cc.log("有一个人准备了第二个人默认-----");
            if(this.first_man.active == true){
                dataCenter.ComfirmFirst = true;
            }
            else{
                dataCenter.ComfirmFirst = false;
            }
        }

        if(this.firstComfirm == false && this.secondComfirm == true){
            if(this.second_man.active == true){
                dataCenter.ComfirmSecond = true;
            }
            else{
                dataCenter.ComfirmSecond = false;
            }
        }
    },
    showTeamSelect(heroId){
        if(this.is_firstPostion){
            if(heroId == 1000){
                cc.log("第2个队友----1");
                ShaderUtils.setShader(this.second_man.getComponent(cc.Sprite), "gray");
                 this.second_man.active = true;
                 this.second_women.active = false;
            }
            else{
         
                ShaderUtils.setShader(this.second_women.getComponent(cc.Sprite), "gray");
                this.second_man.active = false;
                this.second_women.active = true;
               
            }
        }
        else{
            if(heroId == 1000){
                ShaderUtils.setShader(this.first_man.getComponent(cc.Sprite), "gray");
                 this.first_man.active = true;
                 this.first_women.active = false;
             }
             else{
                ShaderUtils.setShader(this.first_women.getComponent(cc.Sprite), "gray");
                this.first_man.active = false;
                this.first_women.active = true;
              
             }
        }
      },

      showTeamPrepare(heroId){
        if(this.is_firstPostion){
            if(heroId == 1000){
               ShaderUtils.setShader(this.second_man.getComponent(cc.Sprite), "normal");
            }
            else{
               ShaderUtils.setShader(this.second_women.getComponent(cc.Sprite), "normal");
            }
            this.secondComfirm = true;
            cc.log("队友2准备了");
        }
        else{
            if(heroId == 1000){
            
               ShaderUtils.setShader(this.first_man.getComponent(cc.Sprite), "normal");
            }
            else{
               
               ShaderUtils.setShader(this.first_women.getComponent(cc.Sprite), "normal");
            }
            this.firstComfirm = true;
            cc.log("队友1准备了");
        }
      },

});
