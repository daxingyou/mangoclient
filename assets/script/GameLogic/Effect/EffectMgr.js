var datamgr = require('DataMgr')
var LoadRes = require('LoadRes')
var Pool = require('Pool')
var constant = require('constants')

var mgr = {
    cardList : null,
    effectNameList : null,
    init : function(list){
        var that = this;
        this.cardList = new Array();

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
                        Pool.create(skilList[j].Path);
                        //var path = constant.EffectPath.concat();
                        LoadRes.loadEffect(skilList[j].Path,true,function(data,effect){
                            for(var z =0;z<10;z++)
                            {
                                var go = cc.instantiate(data);
                                go.parent = cc.find('Canvas/fightEffect');
                                go.position = new cc.Vec2(0,-1000);
                                var src = go.getComponent('EffectListen')
                                src.init(effect);
                                Pool.put(effect,src);
                            }
                        });
                    }
                }
            }
        }

        Pool.create('sword');
        LoadRes.loadEffect('sword',true,function(data,effect){
            for(var z =0;z<40;z++)
            {
                var go = cc.instantiate(data);
                go.parent = cc.find('Canvas/fightEffect');
                go.position = new cc.Vec2(0,-1000);
                var src = go.getComponent('EffectListen')
                src.init(effect);
                Pool.put(effect,src);
            }
        });
    },  
    ///普通特效
    getPosEffect : function(name,pos,effect,teamID){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.show(effect);
        return go;
        /*
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);
            go.node.position = pos;
            go.show(effect);

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }*/
    },                  //子弹特效
    getMoveEffect : function(name,pos,end,frame,effect,teamID){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showMove(effect,end,frame);
        return go;
        /*
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);
            go.node.position = pos;
            go.showMove(effect,end,frame);

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }
        */
    },                  //抛物线特效
    geBezierEffect : function(name,pos,end,frame,effect,teamID,callback){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showBezier(effect,pos,end,callback);
        return go;
        /*
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);
            go.node.position = pos;
            go.showBezier(effect,pos,end,callback);

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }*/
    },              //桃木刃插地特效
    getWswordEffect : function(name,pos,teamID){
        var go = this.getEffect(name,pos,teamID);
        if(go != null)
            go.showSword();
        return go;
        /*
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);
            go.node.position = pos;
            go.showSword();

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }*/
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
            go.node.position = pos;

            if(teamID == constant.Team.own)
            {
                go.node.Scale = 1;
            }
            else{
                go.node.Scale = -1;
            }

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }
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