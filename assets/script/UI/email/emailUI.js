var uibase = require('UIBase');
var constant = require('constants')
var emailData = require('emailData')
var back = require('backMainUI')
var dataCenter = require('DataCenter')
var net = require('NetPomelo')
var consts = require('consts')
var mailReadMailProto = require('mailReadMailProto')
var mailQuickDelMailsProto = require('mailQuickDelMailsProto')
var mailGetMailRewardProto = require('mailGetMailRewardProto')
var mailDelMailProto = require('mailDelMailProto')
var dataMgr = require('DataMgr')
var eventMgr = require('eventMgr')
cc.Class({
    extends: uibase,

    properties: {
       display: cc.Node,
       _friendMails: [],
       tips1: cc.Node,
       tips2: cc.Node,
       tips3: cc.Node,

       look: cc.Node,
       lookTitle: cc.Label,
       lookContent: cc.Label,
       lookName: cc.Label,
       prop0: cc.Node,
       prop1: cc.Node,
       prop2: cc.Node,
       prop3: cc.Node,
       prop4: cc.Node,

       _guid: null,
       _type: null,
       _index: null,
       _reward: null,
       _quickDelType: 1,
       goodsItem : cc.Prefab,
       getSucceed: cc.Node,
       showGoods: cc.Node,
       nerverMail: cc.Node,
    },

   

    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        eventMgr.on("onAddFriendMail",this.friendEamil,this);
        eventMgr.on("onAddSysMail",this.sysEamil,this);
        eventMgr.on("onAddMassageMail",this.massage,this);
        this._quickDelType = 1;
        this.friendEamil();
    },

    start () {
       
    },

   
    backMainUI () {
       back.backMainUI();
    },

    _initMailItem (item,type,mailInfo) {
        item.getComponent('mailItem').initData(type,mailInfo,this);
    },

    friendEamil (event,cust) {
        var self = this;
        var resIndex = 0;
        self._quickDelType = parseInt(cust);
        let data = emailData.friendMails;
        self.node.getChildByName('quickDel').active = false;
        self.node.getChildByName('quickGet').active = true;
        self._friendMails = [];
        if (self.display.childrenCount != 0) {
            self.display.removeAllChildren();
        }
        if (data.length == 0) {
            self.nerverMail.active = true;
            self.node.getChildByName('quickGet').getComponent(cc.Button).interactable = false;
            return;
        }
        else {
            self.node.getChildByName('quickGet').getComponent(cc.Button).interactable = true;
            self.nerverMail.active = false;
        }
        cc.loader.loadRes('UI/emailUI/mailItem', function (loadedResource) {
            for (let i=0;i<data.length;i++) {
                var itemData = data[i];
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
               // self._initMailItem(item,1,itemData); 
                self._friendMails.push(item.getComponent('mailItem'));
            }
            if (resIndex == data.length) {
                cc.loader.release('UI/emailUI/mailItem');
                if (data.length > 5) {
                    self.display.height = 120 * data.length;
                }
            }
    });
    },

    sysEamil (event,cust) {
        if (this._quickDelType == 2) {
            return;
        }
        var self = this;
        var resIndex = 0;
        self._quickDelType = parseInt(cust);
        if (self.display.childrenCount != 0) {
            self.display.removeAllChildren();
        }
        self._sysMails = [];
        let data = emailData.systemMails;
        self.node.getChildByName('quickDel').active = true;
        if (data.length == 0) {
            self.nerverMail.active = true;
            self.node.getChildByName('quickGet').active = false;
            self.node.getChildByName('quickDel').active = true;
            return;
        }
        else {
            self.nerverMail.active = false;
            self.node.getChildByName('quickGet').getComponent(cc.Button).interactable = true;
            self.node.getChildByName('quickDel').getComponent(cc.Button).interactable = true;
            self.node.getChildByName('quickGet').active = false;
        }
        cc.loader.loadRes('UI/emailUI/mailItem', function (loadedResource) {
            for (let i=0;i < data.length;i++) {
                var itemData = data[i];
                if (Object.keys(itemData.reward).length != 0) {
                    self.node.getChildByName('quickGet').active = true;
                }
                else {
                    self.node.getChildByName('quickDel').x = 471;
                    self.node.getChildByName('quickDel').y = -268;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                self._initMailItem(item,2,itemData); 
                self._sysMails.push(item.getComponent('mailItem'));

            }
            if (resIndex == data.length) {
                cc.loader.release('UI/emailUI/mailItem');
                if (data.length > 5) {
                    self.display.height = 120 * data.length;
                }
            }
         }); 
    },

    //检测系统邮件有无奖励
    checkSysAward () {
        // for (let i = 0;i<this._sysMails.length;i++) {
        //     if (Object.keys(this._sysMails[i]._reward).length != 0) {

        //     }
        // }
    },

    massage (event,cust) {
        if (this._quickDelType == 3) 
        return;
        var self = this;
        var resIndex = 0;
        let params = parseInt(cust);
        self._quickDelType = params;
        self.node.getChildByName('quickDel').active = false;
        self.node.getChildByName('quickGet').active = true;
        if (self.display.childrenCount != 0) {
            self.display.removeAllChildren();
        }
        self._massage = [];
        let data = emailData.messages;
        if (data.length == 0) {
            self.node.getChildByName('quickDel').getComponent(cc.Button).interactable = false;
            self.nerverMail.active = true;
            return;
        }
        else {
            self.node.getChildByName('quickDel').getComponent(cc.Button).interactable = true;
            self.nerverMail.active = false;
        }
        cc.loader.loadRes('UI/emailUI/mailItem', function (errorMessage,loadedResource) {
            for (let i=0;i<data.length;i++) {
                if (errorMessage) {
                    cc.log(errorMessage,"载入失败");
                }
                var itemData = data[i];
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                self._friendMails.push(item.getComponent('mailItem'));
                self._friendMails[i].initData(3,itemData,self);
            }
            if (resIndex == data.length) {
                cc.loader.release('UI/emailUI/mailItem');
                if (data.length > 5) {
                    self.display.height = 120 * data.length;
                }
            }
         }); 
    },

    //查看邮件，删除邮件
    lookEamil (type,guid,reward,kwargs) {
        if (type == 2) {
            this.lookTitle.string = "系统邮件";
        }
        else if (type == 1){
            this.lookTitle.string = "好友邮件";
        }
        let mailData =  dataMgr.mail[kwargs.id];
        this.lookName.string = "标题:" + kwargs.PlayerName;
        this.look.active = true;
        this._reward = reward;
        this._type = type;
        this._guid = guid;
        let resIndex = 0;
       
        if (Object.keys(reward).length != 0) {
            for (let i in reward) {
                let baowu = dataMgr.item[i];
                this["prop" + resIndex].active = true;
                //this["prop" + resIndex].getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(baowu.Icon);
                let num = this["prop" + resIndex].getChildByName('num');
                let name = this["prop" + resIndex].getChildByName('name');
                num.getComponent(cc.Label).string = reward[i];
                name.getComponent(cc.Label).string = baowu.Name;
             }
        }
       
        net.Request(new mailReadMailProto(type,guid), (data) => {
            if (data.code == consts.MailCode.OK) {
                cc.log("读邮件");
            }
            else if (data.code == consts.MailCode.NOT_EXIST) {
                cc.log("邮件不存在");
            }
            else if (data.code == consts.MailCode.NO_REWARD) {
                cc.log("邮件没有奖励");
            }
            else if (data.code == consts.MailCode.HAD_GOT) {
                cc.log("已经领取");
            }
            else if (data.code == consts.MailCode.HAD_READ) {
                cc.log("已读");
            }
            else if (data.code == consts.MailCode.HAVE_REWARD) {
                cc.log("有奖励未领取");
            }
        });
    },

    delRead (type,guid) {
        net.Request(new mailDelMailProto(type,guid), (data) => {
            cc.log("删除",data);
        });
    },

    quickDel () {
        let self = this;
        var callComfirm = function () {
            net.Request(new mailQuickDelMailsProto(this._quickDelType), (data) => {
                cc.log("快速删除",data);
                if (data.code == 1) {
                   self.display.removeAllChildren();
                   emailData.systemMails = [];
                }
            });
        };
        this._uiMgr.popupTips(1,"确定删除所有已读邮件吗？","快速删除",null,null,callComfirm,this);
    },


    closeLook () {
        this.look.active = false;
    },

    getAward () {
        var self = this;
        net.Request(new mailGetMailRewardProto(self._type,self._guid), (data) => {
            if (data.code == consts.MailCode.OK) {
                cc.log("领取成功");
                self.getAwardSucceed();
            }
            else if (data.code == consts.MailCode.NOT_EXIST) {
                cc.log("邮件不存在");
            }
            else if (data.code == consts.MailCode.NO_REWARD) {
                cc.log("邮件没有奖励");
                self._uiMgr.showTips("没用奖励可领！");
            }
            else if (data.code == consts.MailCode.HAD_GOT) {
                cc.log("已经领取");
            }
            else if (data.code == consts.MailCode.HAD_READ) {
                cc.log("已读");
            }
            else if (data.code == consts.MailCode.HAVE_REWARD) {
                cc.log("有奖励未领取");
            }
        });

        this.look.active = false;
        var allChildren = this.display.children;
        allChildren[this._index].removeFromParent();
        if (this._guid == emailData.friendMails[this._index].guid) {
            emailData.friendMails.splice(i,1);
            this._friendMails.splice(i,1);
          //  cc.log("删除后的emailData.friendMails",emailData.friendMails);
        }


        // if (data.code == consts.MailCode.OK) {
        //     cc.log("领取成功");
        // }
        // else if (data.code == consts.MailCode.NOT_EXIST) {

        // }
        // else if (data.code == consts.MailCode.NO_REWARD) {
            
        // }
        // else if (data.code == consts.MailCode.HAD_GOT) {
            
        // }
        // else if (data.code == consts.MailCode.HAD_READ) {
            
        // }
        // else if (data.code == consts.MailCode.HAVE_REWARD) {
            
        // }
    },

    //好友，系统，消息按钮对应的红点
    leftBtnTips (id) {
        this["tips" + id].active = true;
    },

    checkFlag () {
        let datasLists = [emailData.friendMails,emailData.systemMails, emailData.messages];
        for (let i = 0; i < datasLists.length; i++) {
            let list = datasLists[i];
        }
    },

    getAwardSucceed() {
        this.getSucceed.active = true;
        this.showGoods.removeAllChildren();
        for (let i in this._reward) {
            let item = cc.instantiate(this.goodsItem);
            item.parent = this.showGoods;
            item.getComponent('goodsItem').initData(i,this._reward[i],this);
            }
    },

    closegetSucceed () {
        this.getSucceed.active = false;
    },

    quickGet () {
      
        if (this._quickDelType != 1) 
        return;
     
        for (let i = 0; i<this._friendMails.length;i++) {
            net.Request(new mailGetMailRewardProto(this._friendMails[i]._type,this._friendMails[i]._guid), (data) => {
                if (data.code == consts.MailCode.OK) {
                    cc.log("领取成功");
                }
                else if (data.code == consts.MailCode.NOT_EXIST) {
                    cc.log("邮件不存在");
                }
                else if (data.code == consts.MailCode.NO_REWARD) {
                    cc.log("邮件没有奖励");
                }
                else if (data.code == consts.MailCode.HAD_GOT) {
                    cc.log("已经领取");
                }
                else if (data.code == consts.MailCode.HAD_READ) {
                    cc.log("已读");
                }
                else if (data.code == consts.MailCode.HAVE_REWARD) {
                    cc.log("有奖励未领取");
                }
            });
        }
    emailData.friendMails = [];
    this.display.removeAllChildren();
    },


    onDestroy() {
        eventMgr.off("onAddFriendMail",this.friendEamil);
        eventMgr.off("onAddSysMail",this.sysEamil);
        eventMgr.off("onAddMassageMail",this.massage);
    },


    // update (dt) {},
});
