const constant = require('constants')
var combatMgr = require('CombatMgr')
var utility = require('utility')
var effectMgr = require('EffectMgr')

var SpawnSummoned = {
    summoneds : [],
    index : 0,
    create : function(data){
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

        var index = utility.RandomInt(0,area.length-1);
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

        var x = utility.RandomInt(range.x1,range.x2);
        var y = utility.RandomInt(range.y1,range.y2);

        if(data.type == constant.SummonedType.wSword)
        {
            effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,()=>{
                this.summoneds.push(effectMgr.getWswordEffect('sword',new cc.Vec2(x,y),0));
            });
        }
    },
    Reset(data){
        for(var a =0;a<this.summoneds.length;a++)
        {
            effectMgr.putEffect('sword',this.summoneds[a]);
        }
        this.summoneds.splice(0,this.summoneds.length);

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
    
            var index = utility.RandomInt(0,area.length-1);
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
    
            ///记录位置
            var temp = new Array();
            var index = 0;

            for(var z=0;z<data[i];z++)
            {
                var x = utility.RandomInt(range.x1,range.x2);
                var y = utility.RandomInt(range.y1,range.y2);
        
                temp[z] = new cc.v2(x,y);

                effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,(pos)=>{
                    this.summoneds.push(effectMgr.getWswordEffect('sword',pos),0);
                    index ++;
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
    },      //木刃回收跳伤害
    ShowDamage(){
        for(var i in this.damage) 
        {
            var target = combatMgr.curCombat.units[uid];

            for(var z in this.damage[i])
            {
                if(z == this.index)
                {
                    var value = this.damage[i];

                    this.uimgr.loadDmg(target, value[z], true);
                }
            }
            
        }
        
        this.index++;
    }
}
module.exports = SpawnSummoned;