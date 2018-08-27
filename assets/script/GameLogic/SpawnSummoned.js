const constant = require('constants')
var combatMgr = require('CombatMgr')
var utility = require('utility')
var effectMgr = require('EffectMgr')

var SpawnSummoned = {
    summoneds : [],
    index : 0,
    create : function(data){
        if(combatMgr.curCombat.summonedMgr == null)
            combatMgr.curCombat.summonedMgr = this;

        var area = null;

        if(data.area == 1)
        {
            area = combatMgr.curCombat.monsterMatrix.Area1;
        }else if(data.area == 2)
        {
            area = combatMgr.curCombat.monsterMatrix.Area2;
        }else if(data.area == 3)
        {
            area = combatMgr.curCombat.monsterMatrix.Area3;
        }

        var index = utility.RandomSeedInt(0,area.length-1);
        //// 最大只填了3
        if(index > 3)
            index = 3;

        var pos =  area[index];
        var range = null;

        if(pos == 1)
        {
            range = combatMgr.curCombat.monsterMatrix.Range1;
        }
        else if(pos == 2)
        {
            range = combatMgr.curCombat.monsterMatrix.Range2;
        }
        else if(pos == 3)
        {
            range = combatMgr.curCombat.monsterMatrix.Range3;
        }

        var x = utility.RandomSeedInt(range.x1,range.x2);
        var y = utility.RandomSeedInt(range.y1,range.y2);

        if(data.type == constant.SummonedType.wSword)
        {
            effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,()=>{
                this.summoneds.push(effectMgr.getWswordEffect('sword',new cc.Vec2(x,y),0));
            });

            combatMgr.curCombat.summoneds = this.summoneds;
        }
    },
    Reset(data){


        for(var i in data)
        {
            var area = null;

            if(i == 1)
            {
                area = combatMgr.curCombat.monsterMatrix.Area1;
            }else if(i == 2)
            {
                area = combatMgr.curCombat.monsterMatrix.Area2;
            }else if(i == 3)
            {
                area = combatMgr.curCombat.monsterMatrix.Area3;
            }
    
            var index = utility.RandomSeedInt(0,area.length-1);

            //// 最大只填了3
            if(index > 3)
                index = 3;
    
            var pos =  area[index];
            var range = null;
    
            if(pos == 1)
            {
                range = combatMgr.curCombat.monsterMatrix.Range1;
            }
            else if(pos == 2)
            {
                range = combatMgr.curCombat.monsterMatrix.Range2;
            }
            else if(pos == 3)
            {
                range = combatMgr.curCombat.monsterMatrix.Range3;
            }

            for(var z=0;z<data[i];z++)
            {
                var x = utility.RandomSeedInt(range.x1,range.x2);
                var y = utility.RandomSeedInt(range.y1,range.y2);
        
                cc.log('cur num = ',data[i],' cur pos = x ',x,' y=',y);

                effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,(curPos)=>{
                    this.summoneds.push(effectMgr.getWswordEffect('sword',curPos,0));

                    cc.log('cur EffectMgr pos = ',curPos);
                    //index ++;
                });
            }
        }
    },      //回收召唤物
    collect(damage){
        this.index = 0;
        ///当前一轮的伤害
        this.damage = damage;
        for(var i =0;i<this.summoneds.length;i++)
        {
            this.summoneds[i].showCollect(this.ShowDamage);
        }
        
    },   
    collectItem(){
        if(this.summoneds[a].node.position.y >= 300)
        {
            effectMgr.putEffect('swordf',this.summoneds[0]);
        }
        else{
            effectMgr.putEffect('swordb',this.summoneds[0]);
        }
        this.summoneds.splice(0,1);
        
        combatMgr.curCombat.summoneds = this.summoneds;
    },
    collectAll(){
        this.Release();
        combatMgr.curCombat.summoneds = this.summoneds;
    },
       //木刃回收跳伤害
    ShowDamage(){
        for(var i in this.damage) 
        {
            var target = combatMgr.curCombat.units[i];

            for(var z in this.damage[i])
            {
                if(z == this.index)
                {
                    var value = this.damage[i];

                    this.uimgr.loadDmg(target, value[z], true,this.damage['caster']);
                }
            }
        }
        
        this.index++;
    },
    Release(){
        for(var a =0;a<this.summoneds.length;a++)
        {
            if(this.summoneds[a] instanceof cc.Component)
            {
                var name = 'sword';
                if(this.summoneds[a].node.position.y >= 300)
                {
                    effectMgr.putEffect('swordf',this.summoneds[a]);
                }
                else{
                    effectMgr.putEffect('swordb',this.summoneds[a]);
                }
            }
                
        }
        this.summoneds.splice(0,this.summoneds.length);
    }
}
module.exports = SpawnSummoned;