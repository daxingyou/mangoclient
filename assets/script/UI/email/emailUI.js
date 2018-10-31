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
       friendMails:null, 
       _friendMails:[],
       look:cc.Node,
       prop0:cc.Node,
       prop1:cc.Node,
       prop2:cc.Node,
       prop3:cc.Node,
       prop4:cc.Node,
       _guid:null,
       _type:null,
       _index:null,
       quickDelType:1,
    },

   

    onLoad () {
        
        this.friendEamil();
        GlobalEvent.on("onAddEmail",this.friendEamil,this);
    },

    start () {
       
    },

    friendEamil (event,cust) {
        let params = parseInt(cust);
        this.quickDelType = params;
        if (params == 1) {
            return;
        }
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
                }
            }
    });
    },

    //查看邮件，删除邮件
    lookEamil (type,guid,reward) {
        this.look.active = true;
        let resIndex = 0;
        //显示宝物
        for (let i in reward) {
           let baowu = dataMgr.item[i];
           this["prop" + resIndex].active = true;
           //this["prop" + resIndex].getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(baowu.Icon);
           let num = this["prop" + resIndex].getChildByName('num');
           let name = this["prop" + resIndex].getChildByName('name');
           num.getComponent(cc.Label).string = reward[i];
           name.getComponent(cc.Label).string = baowu.Name;
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

    // delEamil () {
    //     net.Request(new mailDelMailProto(type,emailID), (data) => {
    //         cc.log("删除",data);
    //     });
    // },

    quickDel () {
        net.Request(new mailQuickDelMailsProto(this.quickDelType), (data) => {
            cc.log("快速删除",data);
        });
    },


    closeLook () {
        this.look.active = false;
    },

    getAward () {
        net.Request(new mailGetMailRewardProto(this._type,this._guid), (data) => {
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

    quickGet () {
        if (this.quickDelType !=1) 
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
    this.display.removeAllChildren();
    },
    sysEamil (event,cust) {
        let params = parseInt(cust);
        this.quickDelType = params;
        if (params == 2) {
            return;
        }
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._sysMails = [];
        cc.loader.loadRes('UI/emailUI/friendEamilItem', function (errorMessage, loadedResource) {
            for (let i=0;i<4;i++) {
               // var itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                // self._friendMails.push(item.getComponent('friendEamilItem'));
                // self._friendMails[i].initData(1,itemData,self);
                //type,itemData,parent
                // if (resIndex == data.length) {
                //     cc.loader.release('UI/emailUI/friendEamilItem');
                // }
            }
         }); 
    },

    infoCenter (event,cust) {
        let params = parseInt(cust);
        this.quickDelType = params;
        if (params == 3) {
            return;
        }
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._sysMails = [];
        cc.loader.loadRes('UI/emailUI/friendEamilItem', function (errorMessage, loadedResource) {
            for (let i=0;i<4;i++) {
               // var itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.display.addChild(item);
                // self._friendMails.push(item.getComponent('friendEamilItem'));
                // self._friendMails[i].initData(1,itemData,self);
                //type,itemData,parent
                // if (resIndex == data.length) {
                //     cc.loader.release('UI/emailUI/friendEamilItem');
                // }
            }
         }); 
    },

    // update (dt) {},
});
