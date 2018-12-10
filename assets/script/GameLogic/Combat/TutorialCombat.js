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
    Combat.prototype.init.call(this, data);//PVECombat脚本

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
    tutorialMgr.starTutorial(dataMgr.dungeon[data.dgId].Event,this);
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
        var ui = this.uiMgr.getUI(constant.UI.UploadProjess);
        ui.hide();
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
        gameCenter.curLoadRes = this.resNum+1;
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

module.exports = TutorialCombat;