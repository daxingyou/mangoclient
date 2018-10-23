var uibase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr')
var net = require("NetPomelo")
var matchProto = require('matchProto')
var buildTeamProto = require('buildTeamProto')
var consts = require('consts')


cc.Class({
    extends: uibase,

    properties: {
        Level:cc.Node,
        soloBtn:cc.Node,
        teamBtn:cc.Node,
        practiceBtn:cc.Node,
        teamKind:1,
    },


    onLoad () {
       
    },

    start () {
      this.showLevel(10);//假装等级为10
      this._uimgr = cc.find('Canvas').getComponent('UIMgr');
      GlobalEvent.emit("h",10);
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

    init () {
        this._CDState = false;
        this.eableClick();
    },
    
    team (event, customEventData) {
        this.unEableClick();
        let cust = parseInt(customEventData);
        this.teamKind = cust;
        if (cust == 1) {
            net.Request(new buildTeamProto(consts.Team.TYPE_LADDER,0), (data) => {
                cc.log("创建天梯队伍",data);
            });    
            // this.canInvite.active = true;//加判断，可以邀请的段位
        }
        else if (cust == 2) {
          net.Request(new buildTeamProto(consts.Team.TYPE_PRACTICE,0), (data) => {
            cc.log("创建4v4队伍",data);
            if (data.code == 1) {
                cc.log("创建成功");
            }
            else if (data.code == 2) {
                 cc.log("类型错误");
            }
            else if (data.code == 3) {
                cc.log("已经创建了队伍");
            }
        });
        } 
        else if (customEventData == 3) {//协议暂时和4v4一样
            net.Request(new buildTeamProto(consts.Team.TYPE_PRACTICE,0), (data) => {
                cc.log("创建单人队伍",data);
                if (data.code == 1) {
                    cc.log("创建成功");
                }
                else if (data.code == 2) {
                     cc.log("类型错误");
                }
                else if (data.code == 3) {
                    cc.log("已经创建了队伍");
                }
            });
        }
        this.laodTeamPattern();
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

    laodTeamPattern() {
        console.log("进入组队模式");
        var self = this;
        self._uimgr.loadUI(constant.UI.BuildTeam,data =>{
             if (self.teamKind == 1) {
                data.title.string = "天梯模式";
             }
             else if (self.teamKind == 2){
                data.title.string = "4v4组队";
             }
             else if (self.teamKind == 3) {
                data.title.string = "单人模式";
             }
            data.laodFriendList();
         });
        
         //隐藏顶部，返回按钮
         var ui = self._uimgr.getUI(constant.UI.FightPavTop);
         if(ui != null)
             ui.changeTitle(self.teamKind);
    },

    enterStore() {
        cc.log("进入商店");
        this._uimgr.loadUI(constant.UI.Store,function(data){});
        var ui = this._uimgr.getUI(constant.UI.FightPavTop);
        if(ui != null) {
            ui.changeTitle(4);
        }     
    },
});
