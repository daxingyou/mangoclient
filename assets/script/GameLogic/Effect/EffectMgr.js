var datamgr = require('DataMgr')
var LoadRes = require('LoadRes')
var Pool = require('Pool')
var constant = require('constants')
var gameCenter = require('DataCenter')

var mgr = {
    cardList : null,
    effectNameList : null,
    init : function(list){
        var that = this;
        this.cardList = new Array();
        var result = 0;
        for(var i =0;i<list.length;i++)
        {
            if(this.cardList.indexOf(list[i]) == -1)
            {
                this.cardList.push(list[i]);

                var skilList = datamgr.skill[datamgr.card[list[i]].SkillID];

                for(var j in skilList)
                {
                    if(!Pool.hasOwnProperty(skilList[j].Path) && skilList[j].Path != '')
                    {
                        result +=20;
                        Pool.create(skilList[j].Path);
                        //var path = constant.EffectPath.concat();
                        LoadRes.loadEffect(skilList[j].Path,true,function(data,effect){
                            for(var z =0;z<20;z++)
                            {
                                var go = cc.instantiate(data);
                                go.parent = cc.find('Canvas/fightEffect');
                                go.position = new cc.Vec2(0,-1000);
                                var src = go.getComponent('EffectListen')
                                src.init(effect);
                                Pool.put(effect,src);
                                gameCenter.curLoadRes++;
                                //cc.log('gameCenter.curLoadRes = ',gameCenter.curLoadRes);
                            }
                        });
                    }
                }
            }
        }
        //cc.log('effect num',result);
        return result;
    },
    initSword(){
        Pool.create('swordf');
        Pool.create('swordb');
        LoadRes.loadEffect('sword',true,function(data,effect){
            for(var a =0;a<30;a++)
            {
                var go = cc.instantiate(data);
                go.parent = cc.find('Canvas/frontEffect');
                go.position = new cc.Vec2(0,-1000);
                var src = go.getComponent('EffectListen')

                src.init(effect);
                Pool.put(effect+'f',src);
                gameCenter.curLoadRes++;
                //cc.log('gameCenter.curLoadRes = ',gameCenter.curLoadRes);
            }

            for(var z =0;z<30;z++)
            {
                var go = cc.instantiate(data);
                go.parent = cc.find('Canvas/fightEffect');
                go.position = new cc.Vec2(0,-1000);
                var src = go.getComponent('EffectListen')
                src.init(effect);
                Pool.put(effect+'b',src);
                gameCenter.curLoadRes++;
                //cc.log('gameCenter.curLoadRes = ',gameCenter.curLoadRes);
            }
        });

        return 60;
    },
    ///普通特效
    getPosEffect : function(name,pos,effect,teamID,callback){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.show(effect,callback);
        else
            cc.log('not found effect ',effect);
        return go;
       
    },                  //子弹特效
    getMoveEffect : function(name,pos,end,frame,effect,teamID){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showMove(effect,end,frame);

        
            
        return go;
      
    },                  //抛物线特效
    geBezierEffect : function(name,pos,end,frame,effect,teamID,callback){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showBezier(effect,pos,end,callback);
        return go;
    },              //桃木刃插地特效
    getWswordEffect : function(name,pos,teamID){
        var go = this.getSwordEffect(name,pos,teamID);
        if(go != null)
            go.showSword();
        return go;
       
    },
    getSwordWheel : function(name,pos,teamID){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showSword();
        return go;
    },
    getEffect : function(name,pos,teamID){
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);

            if(go != null)
            {
                go.node.position = pos;

                if(teamID == constant.Team.own)
                {
                    go.node.Scale = 1;
                }
                else
                {
                    go.node.Scale = -1;
                }
            }
            else
            {
                cc.error('getEffect not found effect name = ',name);
            }
            

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }
    },
    getSwordEffect : function(name,pos,teamID){
        var go = Pool.getPos(name,pos);
        go.node.position = pos;

        if(teamID == constant.Team.own)
        {
            go.node.Scale = 1;
        }
        else
        {
            go.node.Scale = -1;
        }

        return go;
    },
                  //特效回收
    putEffect : function(name,node){
        if(Pool.hasOwnProperty(name))
        {
            node._MoveAni = false;
            node._active = false;
            node.node.position = new cc.Vec2(0,-1000);
            Pool.put(name,node);
        }
        else{
            cc.error('putEffect not found effect name = ',name);
        }
    },
    release : function(){
        Pool.clear();
        this.cardList = null;
    }
}

module.exports = mgr;