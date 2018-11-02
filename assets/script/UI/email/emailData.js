let consts = require('consts');

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
                if (res == Object.keys(data).length) {
                    cc.log("循环执行完毕");
                    if (this.friendMails.length != 0) {
                        cc.log("刷新好友邮件");
                        GlobalEvent.emit("onAddFriendMail");
                    }
                    else if (this.systemMails.length != 0) {
                        cc.log("刷新系统邮件");
                        GlobalEvent.emit("onAddSysMail")
                    }
                    else if (this.messages.length != 0) {
                        cc.log("刷新消息中心");
                        GlobalEvent.emit("onAddMassageMail")
                    }
                }
            }
            list.sort(function (a, b) {
                return b.time - a.time;
            });
        }
        
        cc.log(this.friendMails,"this.friendMails",this.systemMails,"this.systemMails",this.messages,"this.messages");
    }
};