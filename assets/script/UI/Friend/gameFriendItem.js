var uibase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var deleteFriendProto = require("deleteFriendProto")
var addFriendProto= require('addFriendProto')
cc.Class({
    extends: uibase,
    properties: {
       userName:cc.Label,
       level:cc.Label,
       state:cc.Label,
       deleteFriend:cc.Node,
       _curIndex:null,
       _relation:null,
       _type:null,
       _gender: 1,
       genderImg: cc.Sprite,
       genderAltas: cc.SpriteAtlas,
    },


     onLoad () {

     },

    start () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },
    //type == 1 好友 / 2 推荐好友
    initData(index,data,parent,type){
        this._curIndex = index;
        this.userName.string = data.openid;
        this._gender = data.gender;
        if (this._gender == 0) {
            this.genderImg.spriteFrame = this.genderAltas.getSpriteFrame('women');
        } 
        else {
            this.genderImg.spriteFrame = this.genderAltas.getSpriteFrame('male');
        }
        this._parents = parent;
        this._type = type;
        if (this._type == 1) {
            this.node.getChildByName('addFriend').active = false;
            this.node.getChildByName('btnGroup').active = true;
            this._eid = data.eid;
        }
        else {
            this._eid = data.id;
            this.level.string = data.level;
            this.node.getChildByName('btnGroup').active = false;
            this.node.getChildByName('addFriend').active = true;
            this.userState(data.state);
        }
    },
  
    userState(state,id) {
        if (state == 101) {
            this.state.string = "在线";
        }
        else if (state == 102) {
            this.state.string = "离线";
        }
        else if (state == 103) {
            this.state.string = "组队中";
        }
        if (state == 104) {
            this.state.string = "游戏中";
            
        }
    },
    addUser () {
        let self = this;
        let comfirm = function () {
            net.Request(new addFriendProto(self._eid), (data) => {
                cc.log("发送组队邀请 ",data,"邀请的id",self._eid);
            });
        } 
        self._uiMgr.popupTips(1,"少侠，江湖险恶，你我结伴而行，可好？","添加好友",null,null,comfirm,self);
    },


        
    
    
    popupTips () {
        var self = this;
        self._uiMgr.popupTips(1,"确定要删除好友吗","提示",null,null,self.comfirm,self);
    },

    comfirm() {
        var self = this;
        net.Request(new deleteFriendProto(self._eid), function (data) {
            cc.log(data,"删除好友");
            if (data.code == 1) {
                self._uiMgr.showTips("发送消息成功");
            }
            else if (data.code == 2) {
                self._uiMgr.showTips("ID错误");
            }
            else if (data.code == 3) {
                self._uiMgr.showTips("已经发送消息了");
            }
            else if (data.code == 4) {
                self._uiMgr.showTips("已经邀请了");
            }
            else if (data.code == 5) {
                self._uiMgr.showTips("申请者不存在");
            }
            else if (data.code == 6) {
                self._uiMgr.showTips("不是好友");
            }
        });
    },

    // update (dt) {},
});
