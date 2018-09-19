var uibase = require('UIBase');
var constant = require('constants');
cc.Class({
    extends: uibase,

    properties: {
        allRole:4,
        rolesBar:[],
        role0:cc.Node,
        role1:cc.Node,
        role2:cc.Node,
        role3:cc.Node,
        prepareBtn:cc.Node,
        _prepare:false,
        title:cc.Label,
    },
     onLoad () {
        for (let i=0;i < this.allRole ;i++) {
            this.rolesBar.push(this["role" + i]);
        }  
        this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "取消准备";
        this._prepare = true;//默认准备
     },

    start () {
        this.scheduleOnce(function(){
            var uimgr = cc.find('Canvas').getComponent('UIMgr');
            uimgr.loadUI(constant.UI.MatchSucess,function(data){
                // data.init(()=>{
                //     data._CDState = true;
                //     data.cdTime = 30;
                //     cc.log("匹配成功，显示头像");
                //     // for (let i=0;i<8;i++) {
                //     //     data._wxImgs[i].initData(i,"attack",data);
                //     // }
                //     // data.matchSucessd();
                // });
            });
          uimgr.getUI(constant.UI.FightPavTop).hide();
        },5);//假设匹配成功
    },
    cancelPrepare() {
        cc.log("准备/取消准备");
        //加判断是不是队长
        if (this._prepare) {
            this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "准备";
            this._prepare = false;
        }
        else {
            this._prepare = true;
            this.prepareBtn.getChildByName('Label').getComponent(cc.Label).string = "取消准备";
        }
    },
    kickRole (event,cust) {
        cc.log("踢人");
        let nowIndex = parseInt(cust);
        // if () {
        //     return;
        // }//如果不是队长，不止执行
        // this.rolesBar[nowIndex].opacity = 0;
        this.rolesBar[nowIndex].active = false;
     
        if (nowIndex == this.rolesBar.length - 1) {
            return;
        }
        else {
            let firstMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex].x,this.rolesBar[nowIndex].y).easing(cc.easeQuadraticActionOut());
            if (nowIndex == 1 && this.allRole == 4) {
            this.rolesBar[nowIndex + 1].runAction(firstMovAct);
            let secondMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex +1].x,this.rolesBar[nowIndex +1].y).easing(cc.easeQuadraticActionOut());
            this.rolesBar[nowIndex + 2].runAction(secondMovAct);
        }
           else {
               if (this.allRole!=4) {
                this.rolesBar[this.allRole].runAction(firstMovAct);
               }
               else {
                this.rolesBar[nowIndex + 1].runAction(firstMovAct);
               }
        }
        }
        this.allRole -=1;
    },
   

    // update (dt) {},
});
