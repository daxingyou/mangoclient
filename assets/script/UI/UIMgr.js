// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var constant = require('constant')

cc.Class({
    extends: cc.Component,
    
    properties: {
        uiRoot : cc.Node,
        dmg : cc.Prefab
    },

    onLoad () {
        this.enemyPool = new cc.NodePool();
        let initCount = 5;
        for(let i=0;i<initCount;i++){
            var enemy = cc.instantiate(this.dmg);
            this.enemyPool.put(enemy);
        }
    },

    start () {

    },

    // update (dt) {},

    loadUI(path){

    },
    loadDmg(combatunit,dmg){
        let enemy = null;
        if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.enemyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.dmg);
        }
        enemy.parent = this.node; // 将生成的敌人加入节点树
        enemy.getComponent('showDamge').init(combatunit,dmg); //接下来就可以调用 enemy 身上的脚本进行初始化
    }

});
