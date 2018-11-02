var uibase = require('UIBase');
var constant = require('constants')
var emailData = require('emailData')
var dataCenter = require('DataCenter')
var net = require('NetPomelo')
var consts = require('consts')
var mailReadMailProto = require('mailReadMailProto')
var mailQuickDelMailsProto = require('mailQuickDelMailsProto')
var mailGetMailRewardProto = require('mailGetMailRewardProto')
var mailDelMailProto = require('mailDelMailProto')
var dataMgr = require('DataMgr')
cc.Class({
    extends: uibase,

    properties: {
       display:cc.Node,
       _friendMails:[],
       tips1:cc.Node,
       tips2:cc.Node,
       tips3:cc.Node,

       look:cc.Node,
       lookTitle:cc.Label,
       lookContent:cc.Label,
       lookName:cc.Label,
       prop0:cc.Node,
       prop1:cc.Node,
       prop2:cc.Node,
       prop3:cc.Node,
       prop4:cc.Node,

       _guid:null,
       _type:null,
       _index:null,
       _reward:null,
       _quickDelType: 1,
       goodsItem : cc.Prefab,
       getSucceed:cc.Node,
       showGoods:cc.Node,
       
    },

   

    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.friendEamil();
        GlobalEvent.on("onAddFriendMail",this.friendEamil,this);
        GlobalEvent.on("onAddSysMail",this.sysEamil,this);
        GlobalEvent.on("onAddMassageMail",this.massage,this);
        this._quickDelType = 1;
    },

   
    backMainUI () {
        this._uiMgr.loadUI(constant.UI.Main,function(data){
        });
    },

    friendEamil (event,cust) {
        let params = parseInt(cust);
        this._quickDelType = cust;
        let data = emailData.friendMails;
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._friendMails = [];
        cc.loader.loadRes('UI/emailUI/friendEamilItem', function (errorMessage, loadedResource) {
            for (let i=0;i<data.length;i++) {
                var itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                self._friendMails.push(item.getComponent('friendEamilItem'));
                self._friendMails[i].initData(1,itemData,self);
                //type,itemData,parent
                if (resIndex == data.length) {
                    cc.loader.release('UI/emailUI/friendEamilItem');
                    if (data.length > 5) {
                        self.display.height = 120 * data.length;
                    }
                }
            }
    });
    },

    sysEamil (event,cust) {
        if (this._quickDelType == 3) {
            return;
        }
        let params = parseInt(cust);
        this._quickDelType = params;
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._sysMails = [];
        let data = emailData.systemMails;
        if (data.length == 0)
        return;
        cc.loader.loadRes('UI/emailUI/friendEamilItem', function (errorMessage, loadedResource) {
            for (let i=0;i < data.length;i++) {
                var itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                self._sysMails.push(item.getComponent('friendEamilItem'));
                self._sysMails[i].initData(3,itemData,self);
                //type,itemData,parent
                if (resIndex == data.length) {
                    cc.loader.release('UI/emailUI/friendEamilItem');
                    if (data.length > 5) {
                        self.display.height = 120 * data.length;
                    }
                }
            }
         }); 
    },

    massage (event,cust) {
        if (this._quickDelType == 2) 
        return;
        let params = parseInt(cust);
        this._quickDelType = params;
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._massage = [];
        let data = emailData.messages;
        if (data.length == 0)
        return;
        cc.loader.loadRes('UI/emailUI/friendEamilItem', function (errorMessage, loadedResource) {
            for (let i=0;i<data.length;i++) {
                var itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                self._friendMails.push(item.getComponent('friendEamilItem'));
                self._friendMails[i].initData(2,itemData,self);
                //type,itemData,parent
                if (resIndex == data.length) {
                    cc.loader.release('UI/emailUI/friendEamilItem');
                    if (data.length > 5) {
                        self.display.height = 120 * data.length;
                    }
                }
            }
         }); 
    },

    //查看邮件，删除邮件
    lookEamil (type,guid,reward,kwargs) {
        cc.log(type,guid,reward,kwargs,"类型，邮件id,奖励，字段");
        if (type == 3) {
            this.lookTitle.string = "系统邮件";
        }
        let mailData =  dataMgr.mail[kwargs.id];
        this.lookName.string = "标题:" + kwargs.PlayerName;
        this.look.active = true;
        this._reward = reward;
        let resIndex = 0;
        //显示宝物
       
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

        var allChildren = this.display.children;
        for (let i = 0 ;i < this._friendMails.length;i++) {
            if (this._friendMails[i]._guid == guid) {
                this._type = this._friendMails[i]._type;//便于领取时操作id
                this._guid = this._friendMails[i]._guid;//便于领取时操作id
                this._index = i;
            }
        }
    },

    delRead (type,guid) {
        net.Request(new mailDelMailProto(type,guid), (data) => {
            cc.log("删除",data);
        });
    },

    quickDel () {
        net.Request(new mailQuickDelMailsProto(this._quickDelType), (data) => {
            cc.log("快速删除",data);
        });
        this.display.removeAllChildren();
        emailData.friendMails = [];
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
            cc.log("删除后的emailData.friendMails",emailData.friendMails);
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
        for (let i in this._reward) {
            let baowu = dataMgr.item[i];
            let item = cc.instantiate(this.goodsItem);
            item.parent = this.showGoods;
            item.getComponent('goodsItem').initData(this._reward[i],baowu.Name);
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


    // update (dt) {},
});
