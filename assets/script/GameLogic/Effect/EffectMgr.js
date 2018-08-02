var datamgr = require('DataMgr')
var LoadRes = require('LoadRes')
var constant = require('constants')
var Pool = require('Pool')

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

                    if(!Pool.hasOwnProperty(skilList[j].HitEffectPath) && skilList[j].HitEffectPath != '')
                    {
                        Pool.create(skilList[j].HitEffectPath);
                        LoadRes.loadEffect(skilList[j].HitEffectPath,true,function(data,effect){
                            for(var z =0;z<3;z++)
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
    },
    getEffect : function(name,pos,effect){
        if(Pool.hasOwnProperty(name))
        {
            var go = Pool.get(name);
            go.node.position = pos;
            go.show(effect);

            //cc.log('getEffect name = ',name,' effect =',effect,' go =',go,' active = ',go._active);
            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }
    },
    putEffect : function(name,node){
        if(Pool.hasOwnProperty(name))
        {
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