var datamgr = require('DataMgr')
var LoadRes = require('LoadRes')
var constant = require('constants')

var mgr = {
    Pool : null,
    cardList : null,
    effectNameList : null,
    init : function(list){
        var that = this;
        if(this.Pool == null)
        {
            this.Pool = new Array();
            this.cardList = new Array();
        }

        for(var i =0;i<list.length;i++)
        {
            if(this.cardList.indexOf(list[i]) == -1)
            {
                this.cardList.push(list[i]);

                var skilList = datamgr.skill[datamgr.card[list[i]].SkillID];

                for(var j in skilList)
                {
                    if(!this.Pool.hasOwnProperty(skilList[j].Path) && skilList[j].Path != '')
                    {
                        this.Pool[skilList[j].Path] = new cc.NodePool();
                        var path = constant.EffectPath.concat();
                        LoadRes.loadEffect(skilList[j].Path,true,function(data,effect){
                            var go = cc.instantiate(data);
                            go.parent = cc.find('Canvas/fightEffect');
                            go.position = new cc.Vec2(0,-1000);
                            go.getComponent('EffectListen').init(effect);
                            that.Pool[effect].put(go);
                        });

                    }
                }
            }
        }
    },
    getEffect : function(name,pos,effect){
        if(this.Pool.hasOwnProperty(name))
        {
            var go = this.Pool[name].get();
            go.parent = cc.find('Canvas/fightEffect');
            go.position = pos;
            go.getComponent('EffectListen').show(effect);

            return go;
        }
        else{
            cc.error('getEffect not found effect name = ',name);
        }
    },
    putEffect : function(name,node){
        if(this.Pool.hasOwnProperty(name))
        {
            node.position = new cc.Vec2(0,-1000);
            this.Pool[name].put(node);
        }
        else{
            cc.error('putEffect not found effect name = ',name);
        }
    },
    release : function(){
        this.Pool.clear();
        this.Pool = null;
        this.cardList = null;
    }
}

module.exports = mgr;