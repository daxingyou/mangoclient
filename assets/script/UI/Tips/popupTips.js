/**
* 提示弹出框
* @param {this} 指向当前UI 
* @param {string} 提示文本
* @author ljy
* @time:2018/9/25
*/
var UIBase = require("UIBase")
var constant = require('constants')
var teamData = require('teamData')
var eventMgr = require('eventMgr')

cc.Class({
    extends: UIBase,

    properties: {
      title:cc.Label,
      text:cc.Node,
      loadData:cc.Node,//头像等信息
      _controller:null,
      _comfirmTarget:null,
      _confirmCallBack:null,
      cancelBtn:cc.Node,
      cancelLabel:cc.Label,
      refuseBtn:cc.Node,//refuse
      comfirmBtn:cc.Node,
      _type:null
    },
    start () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },


    showText(type,text,title) {
        
        //只显示取消和确定
        if (type == 1) {
            this.cancelLabel.string = "取消";
            this.refuseBtn.active = false;
        }

        //显示拒绝，忽略，接受
        else if (type == 2) {
        this.cancelLabel.string = "忽略";
        this._type == 2;
        }

        //邀请，求邀请信息被挂起
        else if (type == 3) {
            this.text.active = false;
            this.cancelBtn.active = false;
            this.refuseBtn.active = false;
            this.comfirmBtn.active = false;
            this._type = 3;
        }
       

        this.text.getComponent(cc.RichText).string = text;
        // this.text.string = text;
        if ( title == undefined )
        return;
        this.title.string = title;
    },

    initCancelBtn(callBack, target) {
        this._ingoreCallBack = callBack;
        this._ingoreTarget = target;
    },//取消+忽略

    initConfirmBtn(callBack,target) {
        this._confirmCallBack = callBack;
        this._comfirmTarget = target;
    },

    initRefuseBtn(callBack,target) {
        this._refuseCallBack = callBack;
        this._refuseTarget = target;
      //  this.comfirmParameter = parameter;
    },

    start () {
     
    },

    initParams (params) {
        if (params == null) 
        return;
        var self = this;
        let resIndex = 0;
        self._forInvitedMe = [];
        self.loadData.removeAllChildren();
        cc.loader.loadRes('UI/buildTeam/forInvitedMe', function (errorMessage, loadedResource) {
            for (let id in params) {
                var itemData = params[id];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                resIndex++;
                let item = cc.instantiate(loadedResource);
                self.loadData.addChild(item);
                self._forInvitedMe.push(item.getComponent('forInvitedMe'));
                self._forInvitedMe[resIndex - 1].initData(resIndex-1,itemData.id,itemData.openid,self);
            }
        });
    },

    _remove (index) {
        let childCount = this.loadData.children;
        childCount[index].removeFromParent();
        this._forInvitedMe.splice(index,1);
        for (let i = 0; i<childCount.length; i++) {
            this._forInvitedMe[i]._curIndex = i;
        }
    },

    confirm() {
        if (this._confirmCallBack) {
            this._confirmCallBack.call(this._comfirmTarget);
        }
        this.hide();
    },

    ingore() {
        
        if (this._ingoreCallBack) {
            this._ingoreCallBack.call(this.__ingoreTarget);
        }
        this.hide();
    },

    refuse() {
        if (this._refuseCallBack) {
            this._refuseCallBack.call(this._refuseTarget);
        }
        this.hide();
    },

     //点击面板任意区域取消
    cancel() {
       
        if (this._type == 2)
        eventMgr.emit("TeamInvited");//暂时被挂起,
       

        if (this._type == 3 && teamData.onForTeamInvited !=null) {
            eventMgr.emit("forTeamInvited");//求邀请暂时被挂起,
        }

        this.hide();
    },
});
