var Combat = require('Combat')
var dataMgr = require('DataMgr')
var Hero_ = require('Hero_')
var constant = require('constants')
var Effectmgr = require('EffectMgr')
var gameCenter = require('DataCenter')

var PVPCombat = function(){
    Combat.call(this);//调用一个对象的方法，用另外一个对象去替换它
} 

PVPCombat.prototype = new Combat();

////初始化怪物
PVPCombat.prototype.init = function(data){
    cc.log(data,"PVP ------------------data,初始化怪物");
    Combat.prototype.init.call(this,data);

    ///pvp alpha demo 左侧阵营
    this.matrix = dataMgr.matrix[6];

    var first = 0;
    var seceond = 2;
    var teamA = new Array();
    var teamB = new Array();

    var lr = 0;

    for(var i in data.teamInfo.teamA)
    {
        var entity = data.teamInfo.teamA[i];
        var pos = this.matrix.MatrixPos[entity.pos];

        if(pos.y == 255)
        {
            teamA[seceond] = data.teamInfo.teamA[i];
            seceond ++;
        }
        else
        {
            teamA[first] = data.teamInfo.teamA[i];
            first ++;
        }

        if(entity.uid == gameCenter.uuid)
        {
            lr = 0;
            this.curPlayerIndex = entity.pos;
        }
    }

    first = 0;
    seceond = 2;
    for(var i in data.teamInfo.teamB)
    {
        var entity = data.teamInfo.teamB[i];
        var pos = this.matrix.MatrixPos[entity.pos];

        if(pos.y == 255)
        {
            teamB[seceond] = data.teamInfo.teamB[i];
            seceond ++;
        }
        else
        {
            teamB[first] = data.teamInfo.teamB[i];
            first ++;
        }

        if(entity.uid == gameCenter.uuid)
        {
            lr = 1;
            this.curPlayerIndex = entity.pos;
        }
    }

        for(var i in teamA)
        {
            var entity = teamA[i];
            if(entity.heroid / 1000 == 1)
               this.resNum +=Effectmgr.initSword();
   
            this.resNum++;
            var uid = entity.uid , idx = entity.pos;
            var hero = new Hero_(entity,dataMgr.heroAttributes[entity.heroid],this.matrix.MatrixPos[idx],constant.Team.own,this,uid,idx);

            if(entity.uid == gameCenter.uuid)
            {
                if(data.hasOwnProperty('myInfo'))
                    hero.InitMyInfo(data.myInfo);
            }

            if(lr == 1)
            {
                this.enemy[idx] = hero;
            }
            else
            {
                this.own[idx] = hero;
            }
            
            this.resNum +=Effectmgr.init(dataMgr.hero[entity.heroid].InitialDrawPile);
            this.units[uid] = hero;
        }

        ///pvp alpha demo 右侧阵营
       this.monsterMatrix = dataMgr.matrix[7];
   
       for(var i in teamB)
       {
           var entity = teamB[i];
           if(entity.heroid / 1000 == 1)
               this.resNum +=Effectmgr.initSword();
   
           this.resNum++;
           var uid = entity.uid , idx = entity.pos;
           var hero = new Hero_(entity,dataMgr.heroAttributes[entity.heroid],this.monsterMatrix.MatrixPos[idx],constant.Team.enemy,this,uid,idx);
           ///设置站位为右边
           hero.pos = 1;

           if(lr == 1)
           {
               this.own[idx] = hero;
           }
           else
           {
               this.enemy[idx] = hero;
           }
   
           this.resNum +=Effectmgr.init(dataMgr.hero[entity.heroid].InitialDrawPile);

            if(entity.uid == gameCenter.uuid)
            {
                if(data.hasOwnProperty('myInfo'))
                    hero.InitMyInfo(data.myInfo);
            }
           
           this.units[uid] = hero;
       }


       cc.log('cur res = ',this.resNum );
       gameCenter.resNum = this.resNum;
       this.checkLoadRes = true;
       this._loadProgress = 0;
}

module.exports = PVPCombat;