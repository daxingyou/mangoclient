var constant = require('constants');

/*
ALL : "all",
RANDOM : "random",
SINGEL: "singel",
LowHP:"lowHP",
SELF:"self",
None:"",

    Team : {
        own : 0,
        enemy : 1,
    },
*/

var CombatUtility = {
    ////当前玩家操作，获取显示目标
     getTargets : function(targetData,combat){
         if(targetData.type == constant.SkillTargetType.SINGEL)
         {
             if(targetData.team == constant.Team.own)
             {
                 if(targetData.hasOwnProperty('dead'))
                 {
                     var result = [];
                     for(var i in combat.own)
                     {
                         if(combat.own[i].IsDie)
                         {
                            result.push(combat.own[i]);
                         }
                     }

                     return result;
                 }
                 return combat.own;
             }
             else if(targetData.team == constant.Team.enemy)
             {
                if(targetData.hasOwnProperty('dead'))
                {
                    var result = [];
                    for(var i in combat.enemy)
                    {
                        if(combat.enemy[i].IsDie)
                        {
                           result.push(combat.enemy[i]);
                        }
                    }

                    return result;
                }
                return combat.enemy;
             }
         }
         else if(targetData.type == constant.SkillTargetType.ALL)
         {
             if(targetData.team == constant.Team.own)
             {
                 return combat.own;
             }
             else if(targetData.team == constant.Team.enemy)
             {
                return combat.enemy;
             }
         }
         else if(targetData.type == constant.SkillTargetType.SELF)
         {
            return combat.getSelf();
         }
         else if(targetData.type == constant.SkillTargetType.LowHP)
         {
            var result = null;
            var temp = 99999999999;
            if(targetData.team == constant.Team.own)
            {
                for(var i in combat.own)
                {
                    if(combat.own[i].HP < temp)
                    {
                        temp = combat.own[i].HP;
                        result = temp;
                    }
                }
            }
            else if(targetData.team == constant.Team.enemy)
            {
                for(var i in combat.enemy)
                {
                    if(combat.enemy[i].HP < temp)
                    {
                        temp = combat.enemy[i].HP;
                        result = temp;
                    }
                }
            }

            return result;
         }
     },
     getEnemys : function(target){
        if(target.teamid == target.curCombat.getSelf().teamid)
        {
            return target.curCombat.enemy;
        }
        else{
            return target.curCombat.own;
        }
     },
     getTargetForPoint : function(point,combat){
        for(var i in combat.own) 
        {
            if(combat.own[i].agent.getContentSize().contains(point))
            {
                return combat.own[i];
            }
        }

        for(var i in combat.enemy) 
        {
            if(combat.enemy[i].agent.getContentSize().contains(point))
            {
                return combat.enemy[i];
            }
        }

        return null;
     }
}

module.exports = CombatUtility;