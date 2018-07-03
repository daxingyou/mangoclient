/**
 *      角色实体类
 *      by pwh         
 */

var loadRes = require('LoadRes')
var constant = require('constants')

 var Agent = function(path,pos,teamid,hp,loadok){
    this.go = null;
    this.hpbar = null;

    var that = this;
    loadRes.load(path,(data)=>{
        that.go = cc.instantiate(data);
        that.go.parent = cc.find('Canvas/pool');
        that.go.getChildByName('Collider').getComponent('TargetListen').init(pos.index);
        that.go.position = cc.v2(pos.pos.x,pos.pos.y);
        that.go.scaleX = teamid == constant.Team.own ? constant.Team.enemy : -1;
        loadok();
    })

    loadRes.load('UI/hero/hpBar',(data)=>{
        that.hpbar = cc.instantiate(data).getComponent('hpBar');
        that.hpbar.node.parent = cc.find('Canvas/pool'); 
        that.hpbar.node.position = cc.v2(pos.pos.x,pos.pos.y+270);
        that.hpbar.freshen(hp,hp);
    })
 }

 module.exports = Agent;