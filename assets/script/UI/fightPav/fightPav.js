var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')
cc.Class({
    extends: uibase,

    properties: {
        top:cc.Node,
        showList:cc.Node,
        showWaitTime:cc.Node,//浮窗
        teamPattern:cc.Node,
        matchSucessed:cc.Node,
        selectHero:cc.Node,

        title:cc.Label,
        state:cc.Node,
        Level:cc.Node,
        _CDState:false,
        cdTime:0,
        waitedTime:cc.Label,
        minTime:0,
        soloBtn:cc.Node,
        teamBtn:cc.Node,
        practiceBtn:cc.Node,//进来的界面

        teamPatternTit:cc.Label,
        canInvite:cc.Node,
        prepareBtn:cc.Node,
        count:cc.Label,
        allRole:4,
        rolesBar:[],
        role0:cc.Node,
        role1:cc.Node,
        role2:cc.Node,
        role3:cc.Node,
        _prepare:false,
        wxImg:cc.Node,
        _wxImgs:[],//teamPattern 显示队友，匹配，踢人阶段

        roleEnterGame:0,
        selfEnterGame:false,
        selectHeroCenter:cc.Node,
        showSelectHero:cc.Sprite,
        heroIconAtlas:cc.SpriteAtlas,//选角阶段
        ownHeros:cc.Node,
        _ownHeros:[],
        showTeamers:cc.Node,
        heroAttribute:1,
        teamer0:cc.Node,
        teamer1:cc.Node,
        teamer2:cc.Node,
        teamer3:cc.Node,
        teamerBar:[],
        comfirmCount:cc.Label,
        changeCount:false,//变成倒计时
    },

     onLoad () {
        this.initData(); 
     },
     initData () {
         cc.log("初始化数据");
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.showLevel(6);
        
        this.showList.active = true;//选择模式
        this.showWaitTime.active = false;//倒计时浮窗
        this.teamPattern.active = false;//匹配
        this.matchSucessed.active = false;//匹配成功
        this.selectHero.active = false;//选择英雄

        var resIndex = 0;

        for (let i=0;i < this.allRole ;i++) {
            this.rolesBar.push(this["role" + i]);
            this.teamerBar.push(this["teamer"] + i);
        }   
        
        var self = this;
        cc.loader.loadRes('UI/matchTeam/wxImg', function (errorMessage, loadedResource) {
            for (var i = 0; i < 8; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.wxImg.addChild(item);

                self._wxImgs.push(item.getComponent('wxImg'));
                if (resIndex == 8) {
                    cc.loader.release('UI/matchTeam/wxImg');
                }
            }
        });

        cc.loader.loadRes('UI/matchTeam/ownHero', function (errorMessage, loadedResource) {
            for (var i = 0; i < 8; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
                let item = cc.instantiate(loadedResource);
                // resIndex++;
                self.ownHeros.addChild(item);
                self._ownHeros.push(item.getComponent('ownHero'));
                // if (resIndex == 8) {
                //     cc.loader.release('UI/matchTeam/ownHero');
                // }
            }
        });
     },

    start () {
        this.scheduleOnce(function () {
            this.matchSucess();
        },10);
        this.scheduleOnce(function () {
            this.pickHero();
        },20);
    },

    backMainUI () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.Main);
    },

    onClickState () {
        cc.log("点击说明按钮");
        if (!this.state.active) {
            this.state.active = true;
            var scaleOut = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
            this.state.runAction(scaleOut);
        }
        else {
            var scaleBack = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
            var end_func = cc.callFunc(function() {
                this.state.active = false;
            }.bind(this));
        
            var seq = cc.sequence([scaleBack, end_func]);
            this.state.runAction(seq);
        }
    },

    showLevel (data) {
        cc.log("等级大于5 显示组队/单人 小于5 显示开启天梯");
         if (data > 5) {
            this.Level.getChildByName("moreFive").active = true;
            this.Level.getChildByName("lessFive").active = false;
         }
         else {
            this.Level.getChildByName("moreFive").active = false;
            this.Level.getChildByName("lessFive").active = true;
         }
    },

    solo () {
        cc.log("单人模式");
        this._CDState = true;
        this.showWaitTime.active = true;
        this.unEableClick();
    },
    
    team (event, customEventData,teamData) {
        cc.log("组队模式 or 练习模式");
        this._CDState = true;
        this.unEableClick();
        this.title.string = "组队准备"; 
        this.showList.active = false;
        this.teamPattern.active = true;
        if (customEventData == 1) {
            this.teamPatternTit.string = "天梯模式";
            this.canInvite.active = true;//加判断，可以邀请的段位
        }
        else if (customEventData == 2) {
            this.teamPatternTit.string = "4v4组队";
            this.showWaitTime.active = true;
            this.canInvite.active = false;
        } 
        //if () {cc.log("如果是队长显示开始匹配");}
        this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "取消准备";
        this._prepare = true;
      //  this.matchSucess();//直接匹配成功

    },
    cancelPrepare() {
        cc.log("准备/取消准备");
        //加判断是不是队长
        if (this._prepare) {
            this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "准备";
            this._prepare = false;
        }
        else {
            this._prepare = true;
            this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "取消准备";
        }
    },

    cancel () {
        cc.log("取消匹配");
        this.eableClick();
        this._CDState = false;
        this.cdTime = 0;
        this.minTime = 0;
        this.title.string = "对弈亭";
        this.showWaitTime.active = false;
        this.showList.active = true;
        this.teamPattern.active = false;
    },

    unEableClick () {
        cc.log("选择模式后禁用按钮");
        this.soloBtn.getComponent(cc.Button).interactable = false;
        this.teamBtn.getComponent(cc.Button).interactable = false;
        this.practiceBtn.getComponent(cc.Button).interactable = false;
    },

    eableClick () {
        cc.log("关闭禁用按钮");
        this.soloBtn.getComponent(cc.Button).interactable = true;
        this.teamBtn.getComponent(cc.Button).interactable = true;
        this.practiceBtn.getComponent(cc.Button).interactable = true;
    },
   
    kickRole (event,cust) {
        cc.log("踢人");
        let nowIndex = parseInt(cust);
        // if () {
        //     return;
        // }//如果不是队长，不止执行
        // this.rolesBar[nowIndex].opacity = 0;
        this.rolesBar[nowIndex].active = false;
     
        if (nowIndex == this.rolesBar.length - 1) {
            return;
        }
        else {
            let firstMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex].x,this.rolesBar[nowIndex].y).easing(cc.easeQuadraticActionOut());
            if (nowIndex == 1 && this.allRole == 4) {
            this.rolesBar[nowIndex + 1].runAction(firstMovAct);
            let secondMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex +1].x,this.rolesBar[nowIndex +1].y).easing(cc.easeQuadraticActionOut());
            this.rolesBar[nowIndex + 2].runAction(secondMovAct);
        }
           else {
               if (this.allRole!=4) {
                this.rolesBar[this.allRole].runAction(firstMovAct);
               }
               else {
                this.rolesBar[nowIndex + 1].runAction(firstMovAct);
               }
        }
        }
        this.allRole -=1;
    },
    inviteRole () {
        cc.log("邀请人");
          // if () {
        //     return;
        // }//如果踢完人之后有空位
    },

    matchSucess () {
        this.teamPattern.active = false;
        this.matchSucessed.active = true; 
        this.top.active = false;
        this._CDState = true;
        this.cdTime = 30;
        this.changeCount = true;
        this.showWaitTime.active = false;
        this.minTime = 0;
        cc.log("匹配成功，显示头像");
        for (let i=0;i<8;i++) {
            this._wxImgs[i].initData(i,"attack",this);
        }
    },
    
    onClickEnterGame () {
        cc.log("点击进入游戏，显示蓝色边框，需要显示队友的，需要服务器通知");
        this.selfEnterGame = true;
    },

   pickHero () {
       cc.log("选择英雄");
       this.selectHero.active = true;
       this.selectHeroCenter.active = false;
       this.matchSucessed.active = false;
       this.changeCount = true;
       this.cdTime = 60;
       for (let i=0;i<8;i++) {
        this._ownHeros[i].initOwnHero(i,"yuxiaoxue","于小雪",this);
       }
   },
   pickHeroAtt(event,cust) {
       cc.log("选择英雄属性");
       if (cust == 1) {
           this.heroAttribute = 1;
       }
       else if (cust == 2) {
           this.heroAttribute = 2;
       }
       else {
           this.heroAttribute = 3;
       }
   },
    


   
     update (dt) {
        if (this._CDState) {
            if (!this.changeCount) {
                this.cdTime += dt;
            var temp = Math.floor(this.cdTime);
            var moreSec = temp%59;
            if ( moreSec == 0 && temp!=0) {
               this.minTime = Math.floor(temp/59);
               this.cdTime = 0;
               temp = 0;
            }
            if (temp < 10) {
                this.waitedTime.string ="0"+ this.minTime + ":0" + temp.toString();
            }
            else {
                this.waitedTime.string ="0"+ this.minTime + ":" + temp.toString();
            } 
            }
            else {
                this.cdTime -=dt;
                var  temp = Math.floor(this.cdTime);
                this.count.string = temp + "秒";
                this.comfirmCount.string = temp;
                if (temp <= 0 ) {
                    temp == 0;
                }
            }
        }
     },
});
