var Combat = require('Combat')
var dataMgr = require('DataMgr')
let playerData = require('playerData');
let util = require('util');
var constant = require('constants');
var tutorialMgr = require('TutorialMgr')
var net = require("NetPomelo")
var tutorialEnterDungeonProto = require('tutorialEnterDungeonProto')
let constan = require('Constant')
var gameCenter =require('DataCenter')
var consts = require('consts')

var TutorialCombat = function(){
    Combat.call(this);
} 
util.inherits(TutorialCombat, Combat);

////初始化怪物
TutorialCombat.prototype.init = function(data){

    var index = constan.TutorialDungeon.indexOf(data.dgId);

    if(index < 0)
    {
        cc.error('tutorial dg id error .................');
    }
    else
    {
        this.heroDeck = new Array();
        this.monsterDeck = new Array();

        if(index == 0)
        {
            this.heroDeck = constan.HeroDeck1;
            this.monsterDeck = constan.MonsterDeck1;
        }
        else if(index == 1)
        {
            this.heroDeck = constan.HeroDeck2;
            this.monsterDeck = constan.MonsterDeck2;
        }
        else if(index == 2)
        {
            this.heroDeck = constan.HeroDeck3;
            this.monsterDeck = constan.MonsterDeck3;
        }
        else if(index == 3)
        {
            this.heroDeck = constan.HeroDeck4;
            this.monsterDeck = constan.MonsterDeck4;
        }
        
    }


    data = this.GetfightData(data.dgId);
    Combat.prototype.init.call(this, data);

    this.begin = false;
    this.checkLoadRes = true;

    ///test demo 默认 为 PVE_2
    this.matrix = dataMgr.matrix[5];

    for(var i in data.teamInfo.teamA)
    {
        var entityData = data.teamInfo.teamA[i];
        let entity = this.createEntity(entityData);
        if (entity.uid === playerData.id) {
            entity.InitMyInfo(data.myInfo);
            this.curPlayer = entity;
        }
    }

    var group_Data = dataMgr.group[this.dungeon.MonsterGroupID];
    this.monsterMatrix = dataMgr.matrix[group_Data.Matrix];

    ////怪物数据 暂是本地数据
    for(var i in data.teamInfo.teamB){
        var entityData = data.teamInfo.teamB[i];
        let entity = this.createEntity(entityData);
    }

    //资源数 +1 新手流程走完再发生加载完成
    this.resNum++;

    this.curDgId = data.dgId;

    this.state = constant.tutorialState.begin;
    tutorialMgr.starTutorial(dataMgr.dungeon[data.dgId].Event,dataMgr.dungeon[data.dgId].tutorial,this);
    net.Request(new tutorialEnterDungeonProto(data.dgId));

    //cc.log('cur res = ',this.resNum );
    //gameCenter.resNum = this.resNum;
    //this._loadProgress = 0;
}

TutorialCombat.prototype.Tick = function () {
    Combat.prototype.Tick.call(this);

    ///战斗场景加载完成，开始新手流程
    if(this.UILoadOk && !this.begin)
    {
        this.begin = true;
        this.uiMgr.removeUI(constant.UI.CombatLoading);
    }
}

TutorialCombat.prototype.onFightEnd = function (result) {
    //if (this.teamType === consts.Team.TYPE_RAID)
    ///失败重来
    if(result == consts.FightResult.LOSE)
    {
        var that = this;
        this.uiMgr.loadUI(constant.UI.TutorialOver,function(data) {
            data.showAgain(that.curDgId); 
        })
    }
    else{
        if(tutorialMgr.isFinish)
        {
            ///最后一场
            if(this.curDgId == constan.TutorialDungeon[3])
            {
                this.uiMgr.loadUI(constant.UI.FightOver,function(data) {
                    data.reslut(resss); 
                })
            }
            else
            {
                var that = this;
                this.uiMgr.loadUI(constant.UI.TutorialOver,function(data) {
                    data.showNext(that.curDgId); 
                })
            }
        }
        else
        {
            this.reslut = consts.FightResult.WIN;
            this.state = constant.tutorialState.finish;
            tutorialMgr.fightOver();
        }
    }
}

TutorialCombat.prototype.TutorialFinish = function(){
    if(this.state == constant.tutorialState.begin)          //战斗开始前完成，开始走正常流程开始战斗
    {
        this.uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.fightUI = this.uiMgr.getUI(constant.UI.Fight);
        this.fightUI.FightStart();
        //gameCenter.curLoadRes = this.resNum+1;
    }
    else if(this.state == constant.tutorialState.finish)          
    {
        var that = this;
        if(this.reslut == consts.FightResult.LOSE)
        {
            this.uiMgr.loadUI(constant.UI.TutorialOver,function(data) {
                data.showAgain(that.curDgId); 
            })
        }
        else{
            this.uiMgr.loadUI(constant.UI.TutorialOver,function(data) {
                data.showNext(that.curDgId); 
            })
        }
    }
}

TutorialCombat.prototype.GetfightData = function(curDgId){
    return {
        dgId : curDgId,
        matchNum : 1,
        myInfo : {
            cardsNum: 11,
            combo : 0,
            discardsNum : 0,
            exhaustsNum : 0,
            inHands : [{cid:this.heroDeck[0],lv:1,mp:1,powerUpPercent:0},{cid:this.heroDeck[1],lv:1,mp:1,powerUpPercent:0},{cid:this.heroDeck[2],lv:1,mp:1,powerUpPercent:0}],
            mp : 6,
            mpRecoverRate : 1,
            mpRecoverTime : 3000,
            stopMpRecoverBuffCnt : 0,
            tauntTargetID : "",
            thew : 10
        },
        spawnSummons :{
            groupA : {},
            groupB : {},
            seed : 1544756663957,
        },
        teamInfo : {
            teamA : [{uid:playerData.id,armor:0,feature:0,groupId:'groupA',heroid:1000,hp:18000,inHandsNum:3,lv:1,maxHp:18000,maxMp:10,maxThew:10,mp:6,name:"test61",pos:1,scale:1,thew:10}],
            teamB : [{uid:'abcdefg123456',armor:0,feature:0,groupId:'groupB',monsterid:100013,hp:1000,inHandsNum:3,lv:1,maxHp:1000,maxMp:10,maxThew:10,mp:6,pos:1,scale:1,thew:10}]
        },
        teamType : 'TUTORIAL'
    };
}

TutorialCombat.prototype.useSkill = function(attacker,target,sid){
    return{
        caster : attacker,
        sid : sid,
        slv : 1,
        targets : target,
    }
}

TutorialCombat.prototype.useCard = function(player,idx,cardid){
    player.inHands.splice(idx,1);
    tutorialMgr.onUseCard(player,cardid);

    return{
        discardsNum : 1,
        inHands : player.inHands,
        mp : 5,
        thew : 10,
    }
}

TutorialCombat.prototype.onDamage = function(armor,attacker,hp,sid,targetID){
    return {
        armor : armor,
        attackerID :attacker,
        hp : hp,
        isCrit : 0,
        oriDamage : 150,
        sid : sid,
        targetID : targetID
    }
}

TutorialCombat.prototype.getMonster = function(){
    if(this.monster != null)
        return this.monster;

    for(var i in this.units)
    {
        this.units[i].uid == playerData.id;
        this.monster = this.units[i];
    }
    
    return this.monster;
}

module.exports = TutorialCombat;