

var constant = require('constants')
var loadRes = require('LoadRes')

cc.Class({
    extends: cc.Component,
    
    properties: {
        uiRoot : cc.Node,
        tips : cc.Node,
        dmg : cc.Prefab,

        ///上级
        _beforeUI : null,

        _curMainUI : null,
        _curSecondUI : null,
        _curThirdUI : null,
        ///当前主 UI
        _FirstMainUI : [],
        ///二级 UI 
        _SecondUI :  [],
        /// tips 
        _ThirdUI : []
    },

    onLoad () {
        this.dmgPool = new cc.NodePool();
        let initCount = 5;
        for(let i=0;i<initCount;i++){
            var enemy = cc.instantiate(this.dmg);
            this.dmgPool.put(enemy);
        }
    },

    start () {

    },

    // update (dt) {},
    ///UI 加载接口
    loadUI(ui,callback){
        if(ui.type == 1)        ///主界面
        {
            if(this._FirstMainUI[ui.id] != null)
            {
                this._curMainUI.hide();
                this._curMainUI = this._FirstMainUI[ui.id];
                this._curMainUI.show();

                if(callback != undefined)
                    callback(this._curSecondUI);
                return this._curMainUI;
            }
        }
        else if(ui.type == 2)       ///二级UI
        {
            if(this._SecondUI[ui.id] != null)
            {
                this._curSecondUI.hide();
                this._curSecondUI = this._SecondUI[ui.id];
                this._curSecondUI.show();

                if(callback != undefined)
                    callback(this._curSecondUI);
                return this._curSecondUI;
            }
        }
        else if(ui.type == 3)       ///tips 
        {
            if(this._ThirdUI[ui.id] != null)
            {
                this._curThirdUI.hide();
                this._curThirdUI = this._ThirdUI[ui.id];
                this._curThirdUI.show();

                if(callback != undefined)
                    callback(this._curThirdUI);
                return this._curThirdUI;
            }
        }

        loadRes.load(ui.path,true,(data)=>{
            var go = cc.instantiate(data);

            if(ui.type == 3)
            {
                go.parent = this.tips;
            }
            else
            {
                go.parent = this.uiRoot;
            }

            var scr = go.getComponent(ui.script);
            scr.init(this);

            if(ui.type == 1)
            {
                this._FirstMainUI[ui.id] = scr;
                this._curMainUI = scr;
            }
            else if(ui.type == 2)
            {
                this._SecondUI[ui.id] = scr;
                this._curSecondUI = scr;
            }
            else if(ui.type == 3)
            {
                this._ThirdUI[ui.id] = scr;
                this._curThirdUI = scr;
            }

            if(callback != undefined)
                callback(scr);
        })
    },
    ///伤害跳转接口
    loadDmg(combatunit,dmg){
        let enemy = null;
        if (this.dmgPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.dmgPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.dmg);
        }
        enemy.parent = this.tips; // 将生成的敌人加入节点树
        enemy.getComponent('showDamge').init(combatunit,dmg,this); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    ///伤害对象池收回
    collectDmg(dmg){
        this.dmgPool.put(dmg);
    },
    ///UI 资源释放
    release(){
        
        for(var x in this._FirstMainUI)
        {
            this._FirstMainUI[x].node.destroy();
        }

        this._FirstMainUI.splice(0,this._FirstMainUI.length); 
        this._curMainUI = null;

        this._SecondUI.forEach(function(x, index, a){
            x.node.destroy();
        });
        /*
        for(var i=0;i<this._SecondUI.length;i++)
        {
            this._SecondUI[i].node.destroy();
        }*/

        this._SecondUI.splice(0,this._SecondUI.length); 
        this._curSecondUI = null;

        this._ThirdUI.forEach(function(x, index, a){
            x.node.destroy();
        });
        /*
        for(var i=0;i<this._ThirdUI.length;i++)
        {
            this._ThirdUI[i].node.destroy();
        }*/

        this._ThirdUI.splice(0,this._ThirdUI.length); 
        this._curThirdUI = null;
    },  ///显示tips 
    showTips :function(str){
        this.loadUI(constant.UI.Tips,(data)=>{
            data.showText(str);
        });
    },  ///获取当前主UI
    getCurMainUI (){
        return this._curMainUI;
    }
});
