/**
 *      角色实体类
 *      by pwh         
 */

var loadRes = require('LoadRes')
var constant = require('constant')


 var Agent = function(path,pos,teamid){
    go : null;

    loadRes.load(path,(data)=>{
        this.go = cc.instantiate(data);
        this.go.parent = cc.find('pool'); 
        this.go.position = cc.v2(pos.pos.x,pos.pos.y);
        this.go.scaleX = teamid == constant.Team.own ? constant.Team.enemy : -1;
    })
 }

 module.exports = Agent;