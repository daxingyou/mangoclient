var uibase = require('UIBase');
var constant = require('constants')
var consts = require('consts')
var dataMgr = require('DataMgr')
cc.Class({
    extends: uibase,

    properties: {
       _mailId:null,
       _flag:null,
      
       playerName:cc.Label,
       text:cc.Label,
       time:cc.Label,
       _parents:null,
       tips:cc.Node,
       _switch:false,
       _type:null,
       _guid:null,
       _reward:null,
       _mId:null,
       _kwargs:null,
    },

    initData (type,data,parent) {
       // cc.log(data,"data",data.flag,data.guid,data.time,parent,data.kwargs.PlayerName);
        this._type = type;
        this._mailId = data.maildID;
        this._guid = data.guid;
        this._flag = data.flag;
        this._reward = data.reward;
        this._kwargs = data.kwargs;
        this.playerName.string = data.kwargs.PlayerName;
        let time = new Date().getTime() - data.time;
        if (time < 86400000) {
            this.time.string = "今天";
        }
        else {
            let show = Math.ceil(time / 86400000);
            this.time.string = show + "天前";
        }
        this._parents = parent;

        if (this._flag == consts.Mail.FLAG_UNREAD)  {
            this.tips.active = true;
            this._parents.leftBtnTips(type);
        }
        else if (this._flag == consts.Mail.FLAG_READ) {
            this.tips.active = false;
        }
        else if (this._flag == consts.Mail.FLAG_GOT) {
            cc.log("已领");
        }
        else if (this._flag == consts.Mail.FLAG_DEL) {
            cc.log("删除");
        }
        if (data.kwargs.id != undefined) {
            let mailData = dataMgr.mail[data.kwargs.id];
            this.text.string = mailData.Describe;
        }
    },

    look() {
        this._parents.lookEamil(this._type,this._guid,this._reward,this._kwargs);
        this.tips.active = false;
    },

    // onLoad () {},

    start () {

    },

    update (dt) {
      
    },
});
