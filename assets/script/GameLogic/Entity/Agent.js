/**
 *      角色实体类
 *      by pwh         
 */

var loadRes = require('LoadRes')
var constant = require('constants')

 var Agent = function(path,pos,teamid,hp,maxHp,uid,loadok){
    this.go = null;
    this.hpbar = null;
    this.spData = null;
    this.width = 0;
    this.height = 0;
    this.contentSize = null;
    this.aniMgr = null;

    var that = this;

    loadRes.load('UI/hero/hpBar',(data)=>{
        that.hpbar = cc.instantiate(data).getComponent('hpBar');
        that.hpbar.node.parent = cc.find('Canvas/ui'); 
        that.hpbar.freshen(hp,maxHp);

        
    })

    loadRes.load(path,(data)=>{
        that.go = cc.instantiate(data);
        that.go.parent = cc.find('Canvas/pool');
        that.go.position = cc.v2(pos.x,pos.y);
        that.go.scaleX = teamid == constant.Team.own ? constant.Team.enemy : -1;
        var spData = that.go.getComponent(sp.Skeleton);
        that.height = Math.ceil(spData.skeletonData.skeletonJson.skeleton.height);
        that.width = Math.ceil(spData.skeletonData.skeletonJson.skeleton.width);
        that.contentSize = new cc.Rect(pos.x-that.width/2,pos.y,that.width,that.height);
        that.aniMgr = that.go.getComponent('AnimationMgr');

        that.hpbar.node.position = cc.v2(pos.x - 667,pos.y+that.height + 20 - 375);

        loadok();
    })
 }

 Agent.prototype.PlayAnimation = function(ani,loop){
    this.aniMgr.playAnimation(ani,loop)
 }

 Agent.prototype.getContentSize = function(){
     return this.contentSize;
 }

 module.exports = Agent;