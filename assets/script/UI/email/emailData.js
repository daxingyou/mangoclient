let consts = require('consts');
var eventMgr = require('eventMgr')

module.exports = {
    mailInfo: {}, //一登录就有的
    friendMails: [],
    systemMails: [],
    messages: [],

    initMainInfo: function (data) {
        this.mailInfo = data;
        this.refreshEmailListInfo();
    },

    updateMailInfo: function (newMailInfo) {
        for (let type in newMailInfo) {
            let mails = newMailInfo[type];
            let mailData;
            let parType = parseInt(type);
            switch (parType) {
                case consts.Mail.TYPE_FRIEND:
                    mailData = this.mailInfo.friendMails;
                    break;
                case consts.Mail.TYPE_SYSTEM:
                    mailData = this.mailInfo.systemMails;
                    break;
                case consts.Mail.TYPE_MESSAGE:
                    mailData = this.mailInfo.messages;
                    break;
                default:
                    throw new Error('unknow type');
            }
            for (let guid in mails) {
                mailData[guid] = mails[guid];
            }
        }
        this.refreshEmailListInfo();
    },

    refreshEmailListInfo: function () {
        let res = 0;
        this.friendMails = [];
        this.systemMails = [];
        this.messages = [];
        let datas = [this.mailInfo.friendMails, this.mailInfo.systemMails, this.mailInfo.messages];
        let datasLists = [this.friendMails, this.systemMails, this.messages];
        for (let i = 0; i < datas.length; i++) {
            let list = datasLists[i], data = datas[i];
            for  (let guid in data) {
                let info = data[guid];
                info.guid = guid;
                list.push(info);
                res++;
            }
            list.sort(function (a, b) {
                return b.time - a.time;
            });

            if (res == Object.keys(data).length) {
              
                if (this.friendMails.length != 0) {
                    
                    eventMgr.emit("onAddFriendMail");
                }
                else if (this.systemMails.length != 0) {
                    
                    eventMgr.emit("onAddSysMail")
                }
                else if (this.messages.length != 0) {
                  
                    eventMgr.emit("onAddMassageMail")
                }
            }
        }
        
       // cc.log(this.friendMails,"this.friendMails",this.systemMails,"this.systemMails",this.messages,"this.messages");
    }
};