var uibase = require('UIBase');
var constant = require('constants')
var consts = require('consts')
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
    },

    initData (type,data,parent) {
        cc.log(data,"data");
        this._type = type;
        this._mailId = data.maildID;
        this._guid = data.guid;
        this._flag = data.flag;
        this._reward = data.reward;
        this.playerName.string = '';
        this.text.string = '';
        let time = new Date().getTime() - data.time;
        this.time.string = new Date(time);
        this._parents = parent;

        if (this._flag == consts.Mail.FLAG_UNREAD)  {
            this.tips.active = true;
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
    },

    look() {
        this._parents.lookEamil(this._type,this._guid,this._reward);
        this.tips.active = false;
    },

    // onLoad () {},

    start () {

    },

    update (dt) {
        // if (!this._switch) {
        //     if (this._flag != null) {
        //         if ()
        //     }
        // }
    },
});
