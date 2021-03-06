var constant = require('constants')
var loadRes = require('LoadRes')
var Pool = require('Pool')
var effectMgr = require('EffectMgr')
var combatMgr = require('CombatMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        uiRoot: cc.Node,
        SecondRoot : cc.Node,
        frontRoot : cc.Node,
        tips: cc.Node,
        dmgGreen: cc.Prefab,
        dmgRed: cc.Prefab,
        dmgWhite: cc.Prefab,

        hotTip: cc.Prefab,

        blurBg: cc.Sprite,

        ///上级
        _beforeUI: null,
        _frontUI : null,
        _curMainUI: null,
        _curSecondUI: null,
        _curThirdUI: null,
        ///当前主 UI
        _FirstMainUI: [],
        ///二级 UI 
        _SecondUI: [],
        /// tips 
        _ThirdUI: [],
        /// frontUI 
        _FrontUIs: []
    },

    onLoad() {
        
    },

    initDmg(){
        Pool.init();
        for (var k in constant.dmg) {//战斗飘字类型
            var name = constant.dmg[k];
            Pool.create(name);
            for (var z = 0; z < 80; z++) {
                var go = cc.instantiate(this[k]);
                go.parent = this.tips;
                go.position = new cc.Vec2(0, -1000);
                var src = go.getComponent('EffectListen')
                src.init(name);
                Pool.put(name, src);
            }
        }
    },

    start() {
        
    },

    // update (dt) {},
    ///UI 加载接口
    loadUI(ui, callback) {
        if (ui.type == 1)        ///主界面
        {
            if (this._FirstMainUI[ui.id] != null) {
                this._curMainUI.hide();
                this._curMainUI = this._FirstMainUI[ui.id];
                this._curMainUI.show();

                if (callback != undefined)
                    callback(this._curMainUI);
                return this._curMainUI;
            }
        }
        else if (ui.type == 2)       ///二级UI
        {
            if (this._SecondUI[ui.id] != null) {
                this._curSecondUI.hide();
                this._curSecondUI = this._SecondUI[ui.id];
                this._curSecondUI.show();

                if (callback != undefined)
                    callback(this._curSecondUI);
                return this._curSecondUI;
            }
        }
        else if (ui.type == 3)       ///tips 
        {
            if (this._ThirdUI[ui.id] != null) {
                this._curThirdUI.hide();
                this._curThirdUI = this._ThirdUI[ui.id];
                this._curThirdUI.show();

                if (callback != undefined)
                    callback(this._curThirdUI);
                return this._curThirdUI;
            }
        }
        else if (ui.type == 5)       ///frontUI
        {
            if (this._FrontUIs[ui.id] != null) {
                if (this._curMainUI != null)
                    this._curMainUI.hide();
                this._frontUI.hide();
                this._frontUI = this._FrontUIs[ui.id];
                this._frontUI.show();

                if (callback != undefined)
                    callback(this._frontUI);
                return this._frontUI;
            }
        }
        
        loadRes.load(ui.path, true, (data) => {
            if (ui.blurBg) {
                this.refreshBlurBg();
                this.blurBg.node.active = true;
            }
            var go = cc.instantiate(data);

            if(go == null) 
                cc.log('cur go === null ,path = ',ui.path); 

            if (ui.type == 3) {
                go.parent = this.tips;
            }
            else if(ui.type == 5){
                go.parent = this.frontRoot;
            }
            else if(ui.type == 2){
                go.parent = this.SecondRoot;
            }
            else {
                go.parent = this.uiRoot;
            }

            var scr = go.getComponent(ui.script);
            scr.init(this);

            if (ui.type == 1) {
                if (this._curMainUI != null)
                    this._curMainUI.hide();
                this._FirstMainUI[ui.id] = scr;
                this._curMainUI = scr;
                this._curMainUI.show();

            }
            else if (ui.type == 2) {
                if (this._curSecondUI != null)
                    this._curSecondUI.hide();
                this._SecondUI[ui.id] = scr;
                this._curSecondUI = scr;
                this._curSecondUI.show();
            }
            else if (ui.type == 3) {
                if (this._curThirdUI != null)
                    this._curThirdUI.hide();
                this._ThirdUI[ui.id] = scr;
                this._curThirdUI = scr;
                this._curThirdUI.show();
            }
            else if (ui.type == 5) {
                if (this._curMainUI != null)
                    this._curMainUI.hide();
                if (this._frontUI != null)
                    this._frontUI.hide();
                this._FrontUIs[ui.id] = scr;
                this._frontUI = scr;
                this._frontUI.show();
            }
            
            if (callback != undefined)
                callback(scr);
        })
    },
    ///伤害跳转接口
    loadDmg(combatunit, dmg, dmgorheal, casterID, isCrit) {
        var combatSelfID = combatMgr.getSelf().uid;
        // 不是自己造成或受到的治疗或伤害不显示
        if (casterID !== combatSelfID && combatunit.uid !== combatSelfID) {
            return;
        }
        let name, showType;
        // 治疗
        if (!dmgorheal) {
            name = constant.dmg.dmgGreen;
            if (combatunit.uid === combatSelfID) {
                showType = constant.CombatWordType.CAUSE_HEAL;
            }
            else {
                showType = constant.CombatWordType.GET_HEAL;
            }
        }
        else if (combatunit.uid === combatSelfID){  // 自己受伤
            name = constant.dmg.dmgRed;
            showType = constant.CombatWordType.GET_DAMAGE;
        }
        else {
            name = constant.dmg.dmgWhite;
            showType = constant.CombatWordType.CAUSE_DAMAGE;
        }
        var go = effectMgr.getEffect(name, cc.v2(0, 0), combatunit.teamid);
        go.showDmg(combatunit, dmg, dmgorheal, showType, isCrit);
        if (casterID === combatSelfID) {
            this.getUI(constant.UI.Fight).updateCombo();
        }
    },
    ///伤害对象池收回
    collectDmg(dmg) {
        this.dmgPool.put(dmg);
    },
    ///UI 资源释放
    release() {
        this.blurBg.node.active = false;
        for (var x in this._FirstMainUI) {
            this._FirstMainUI[x].node.destroy();
        }

        this._FirstMainUI.splice(0, this._FirstMainUI.length);
        this._curMainUI = null;

        this._SecondUI.forEach(function (x, index, a) {
            x.node.destroy();
        });
        /*
        for(var i=0;i<this._SecondUI.length;i++)
        {
            this._SecondUI[i].node.destroy();
        }*/

        this._SecondUI.splice(0, this._SecondUI.length);
        this._curSecondUI = null;

        this._ThirdUI.forEach(function (x, index, a) {
            x.node.destroy();
        });
        /*
        for(var i=0;i<this._ThirdUI.length;i++)
        {
            this._ThirdUI[i].node.destroy();
        }*/

        this._ThirdUI.splice(0, this._ThirdUI.length);
        this._curThirdUI = null;
    },
    releaseLoading(){
        for(var i in this._FrontUIs)
        {
            this._FrontUIs[i].node.destroy();
            delete this._FrontUIs[i];
        }

        this._frontUI = null;
        this.blurBg.node.active = false;
    },
      ///显示tips 
    showTips: function (str,pos) {
        this.loadUI(constant.UI.Tips, (data) => {
            data.showText(str,pos);
        });
    }, 

    //弹出提示框
    popupTips: function (type,text,title,cancelCallback,refuseCallback,comfirmCallback,target,params) {
        this.loadUI(constant.UI.PopupTips,(data) => {
            data.showText(type,text,title);
            data.initCancelBtn(cancelCallback,target);
            data.initConfirmBtn(comfirmCallback,target);
            data.initRefuseBtn(refuseCallback,target);
            data.initParams(params);
        });
    },

    hotTips: function (x,y,parent) {
        let item = cc.instantiate(this.hotTip);
        item.getComponent('hotTips').init(x,y,parent);
    },
    
    getCurMainUI() {
        if(this._frontUI != null && this._frontUI.node.active)
            return this._frontUI;
        return this._curMainUI;
    },  ///获取UI 
    getUI(ui){
        if (ui.type == 1) {
            return this._FirstMainUI[ui.id];
        }
        else if (ui.type == 2) {
            return this._SecondUI[ui.id];
        }
        else if (ui.type == 3) {
            return this._ThirdUI[ui.id];
        }
        else if (ui.type == 5) {
            return this._FrontUIs[ui.id];
        }
    },

    _getUIDict(type) {
        if (type == 1) {
            return this._FirstMainUI;
        }
        else if (type == 2) {
            return this._SecondUI;
        }
        else if (type == 3) {
            return this._ThirdUI;
        }
        else if (type == 5) {
            return this._FrontUIs;
        }
    },

    _checkResetUINode(type, src) {
        if (type == 1) {
            if (this._curMainUI == src)
                this._curMainUI = null;
        }
        else if (type == 2) {
            if (this._curSecondUI == src)
                this._curSecondUI = null;
        }
        else if (type == 3) {
            if (this._curThirdUI == src)
                this._curThirdUI = null;
        }
        else if (type == 5) {
            if (this._frontUI == src)
                this._frontUI = null;
        }
    },

    removeUI(ui) {
        let uiDict = this._getUIDict(ui.type);
        if (uiDict.hasOwnProperty(ui.id)) {
            this._checkResetUINode(ui.type, uiDict[ui.id]);
            uiDict[ui.id].node.destroy();
            delete uiDict[ui.id];
            if (ui.blurBg) {
                this.blurBg.node.active = false;
            }
        }
    },

    refreshBlurBg() {
        let size = cc.director.getWinSize();
        let texture = new cc.RenderTexture(size.width, size.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        texture.setPosition(cc.p(size.width / 2, size.height / 2));
        texture.begin();
        cc.Canvas.instance.node._sgNode.visit();
        texture.end();
        this.blurBg.spriteFrame = texture.getSprite().getSpriteFrame();
    }
});
