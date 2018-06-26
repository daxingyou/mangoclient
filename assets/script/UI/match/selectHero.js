// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIBase = require('UIBase')
var ShaderUtils = require("ShaderUtils");
var net = require("NetPomelo")

cc.Class({
    extends: UIBase,

    properties: {
        matchUI : cc.Node,
        man : cc.Node,
        woman : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    onEnable(){
        if(this.woman != null)
            ShaderUtils.setShader(this.woman, "gray");
        if(this.man != null)
            ShaderUtils.setShader(this.man, "normal");
    },

    onDisable(){

    },

    start () {
        
    },

    // update (dt) {},
    back (){
        this.matchUI.active = true;
        this.node.active = false;
    },
    manSelect(event){
        if(this.woman != null)
            ShaderUtils.setShader(this.woman, "normal");
        if(this.man != null)
            ShaderUtils.setShader(this.man, "gray");

        net.Request(new selectHeroProto(1000));

        console.log('manSelect');
    },
    womanSelect(event){
        if(this.woman != null)
            ShaderUtils.setShader(this.woman, "gray");
        if(this.man != null)
            ShaderUtils.setShader(this.man, "normal");

            net.Request(new selectHeroProto(2000));

        console.log('womanSelect');
    },
    beginFight(){
        net.Request(new confirmHeroProto());
    }
});
