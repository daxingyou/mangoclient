var combatMgr = require('CombatMgr')//战斗相关
var gameLogic = require('GameLogic')//怪物相关
var consts = require('consts')
var gameData = require('DataCenter')
var spawnSummoned = require('SpawnSummoned')
var constant = require('constants')
var hero = require('Hero_')
var monster = require('Monster_')
var dataMgr = require('DataMgr')
var FSMEvent = require('FSMEvent');
var efferMgr = require('EffectMgr');
var disposeInvite = require('disposeInvite')
var net = require("NetPomelo")
var acceptInviteProto = require("acceptInviteProto")
var refuseTeamInviteProto = require("refuseTeamInviteProto")
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var leaveTeamProto = require('leaveTeamProto')
var teamData = require('teamData')

var fight = {
    _uimgr: null,
  
    init: function () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        var membersNum = 0;
        pomelo.on('onRefreshTeam', function (data) {
            cc.log("队伍信息刷新", data);
             if (data.members === undefined) {
               return;
            }
            teamData.refreshTeam = data;
            GlobalEvent.emit("onRefreshTeam");
            membersNum = data.members.length;
            /*
              "onRefreshTeam": {
                "required string teamType": 1,
                "message MemberInfo": {
                "required string id": 1,
                "required string openid": 2,
                "required uInt32 pos": 3,
                "required uInt32 ready": 4,
                "required uInt32 punishBeginTime": 5
                },
                "repeated MemberInfo members": 2
            },
            */
        });

        pomelo.on('onTeamInvited', function (data) {
            //加判断未解散，人数已满
            cc.log("收到组队邀请", data);
            teamData.onTeamInvited.push(data);
            let num = teamData.onTeamInvited.length;
            var callComfirm =  function () {
                //TeamPattern
                that._uimgr.loadUI(constant.UI.BuildTeam,(data) =>{
                    data.initFriendList();//先移除
                    data.laodFriendList();//加载可以邀请的好友信息
                    that._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                        data.initBackBtn(backShowListUI,that);
                        data.changeTitle(2);
                    });
                });
                    
            //返回选择模式界面
            var backShowListUI = function () {
                var comfirm = function() {
                        net.Request(new leaveTeamProto(gameData.uuid), (data) => {
                            cc.log("离开队伍",data);
                        })
                        that._uimgr.loadUI(constant.UI.ShowList,data => {
                        data.init();
                        that._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                            data.initBackBtn(null,null);
                            data.changeTitle(0);
                        });
                    });};
                if (membersNum > 1) {
                    that._uimgr.popupTips(1,"确定要退出吗","提示",null,null,comfirm,that);
                }
                else {
                    // that._uimgr.release();
                    net.Request(new leaveTeamProto(gameData.uuid), (data) => {
                        cc.log("离开队伍",data);
                    })
                    that._uimgr.loadUI(constant.UI.ShowList,data =>{data.init();});   
                    that._uimgr.loadUI(constant.UI.FightPavTop);   
                }
            };
            teamData.onTeamInvited.splice(num-1,1);
            net.Request(new acceptInviteProto(data.id,data.teamId), (data) => {
                cc.log("同意组队邀请",data);
            });
            };

            var callRefuse = function () {
                teamData.onTeamInvited.splice(num-1,1);
                net.Request(new refuseTeamInviteProto(data.id), (data) => {
                    cc.log("拒绝组队邀请",data);
                });
            }
            var callIgnore = function () {
                teamData.onTeamInvited.splice(num-1,1);
                net.Request(new ignoreTeamInviteProto(data.id), (data) => {
                    cc.log("忽略组队邀请",data);
                    // gameData.ingoreInvited = true;
                    // gameData.inviteList.push(data.id);
                });
            };
            that._uimgr.popupTips(2,data.openid+"邀请你一起玩游戏","邀请",callIgnore,callRefuse,callComfirm,that);
          
            /*  "onTeamInvited": {
                "required string id": 1,
                "required string openid": 2,
                "required string teamType": 3,
                "required uInt32 rank": 4
            },
            */
        });

        pomelo.on('onTeamApplyed', function (data) {
            cc.log("收到求邀申请", data);

            /*
              "onTeamApplyed": {
                "required string id": 1,
                "required string openid": 2,
                "required uInt32 rank": 3
            },
            */

        });

        pomelo.on('onTeamBeRefused', function (data) {
            cc.log("组队邀请被拒", data);
            that._uimgr.showTips(data.name+"拒绝了你的组队邀请");
            /* "onTeamBeRefused": {
                "required string name": 1
            },*/

        });

        pomelo.on('onTeamBeKicked', function (data) {
            cc.log("被提出队伍", data);
            that._uimgr.showTips("队长将你请离队伍");
            GlobalEvent.emit("onTeamBeKicked");
        });

        pomelo.on('onTeamReadyStateChange', function (data) {
            cc.log("队员准备状态变更", data);
            var ui = that._uimgr.getCurMainUI();
            teamData.TeamReadyState = data;
            GlobalEvent.emit("onTeamReadyStateChange");
            //ui.changePrepareState(data);
            /*"onTeamReadyStateChange": {
                "required string id": 1,
                "required uInt32 ready": 2
            },

            */
        });

        pomelo.on('onBeginMatch', function (data) {
            cc.log("匹配开始", data);
            GlobalEvent.emit("onBeginMatch");
            /*  "onBeginMatch": {
                "required uInt32 predictTime": 1
            },
            */
        });

        pomelo.on('onUnmatch', function (data) {
            cc.log("匹配取消", data);
        });

        pomelo.on('onEnterMatchConfirm', function (data) {
            cc.log("进入匹配成功确认", data);
            var ui = that._uimgr.getCurMainUI();
            ui.teamMatchSucess(data);
        });

        pomelo.on('onMatchConfirm', function (data) {
            cc.log("匹配确认", data);
            var ui = that._uimgr.getCurMainUI();
            gameData.beginGame +=1;
            ui.showComfirmTeamer(gameData.beginGame,data);
        });

        pomelo.on('onMatchNoConfirm', function (data) {
            cc.log("匹配未确认，回组队", data);
            //that._uimgr.release();
            that._uimgr.loadUI(constant.UI.ShowList,(data) =>{
                data.init();
            });
            that._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.initBackBtn(null,null);
                data.changeTitle(0);
            }); 
        });

        pomelo.on('onPunishBeginTimeUpdate', function (data) {
            cc.log("超时惩罚开始时间更新", data);

            /*
             "onPunishBeginTimeUpdate": {
                "required uInt32 punishBeginTime": 1
            }
            */
        });

        
        pomelo.on('onBeginSelect', function (data) {
            var ui = that._uimgr.getCurMainUI();
            cc.log("当前ui",ui);
            that._uimgr.showTips('匹配成功');
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            let teamA = data.teamInfo.teamA;
            let teamB = data.teamInfo.teamB;
            that._uimgr.loadUI(constant.UI.PickHero,function(data){
                data.initData(teamA,teamB);
                
            });
            // var teamInfo = data.teamInfo;
            // var teamA = teamInfo.teamA;
            // ui.selectScr.initData(teamA);
            // ui.showSelect();
        });

        pomelo.on('onSelectHeroNotify', function (data) {
            cc.log(data.uid, '选择英雄:%s', data.heroid);
            var ui = that._uimgr.getCurMainUI();
            ui.selectScr.showTeamSelect(data);
        });

        pomelo.on('onConfirmHeroNotify', function (data) {
            cc.log(data.uid, '%s确认英雄:%s', data.heroid);
            // var ui = that._uimgr.getCurMainUI();
            // ui.selectScr.showTeamPrepare(data);
        });

        pomelo.on('onEnterLoadCD', function (data) {
            cc.log('加载前倒计时:', data);
             var ui = that._uimgr.getCurMainUI();
             ui.defalutSelect(data);
            // ui.selectScr.beginLoadCD(data);
        });
      
        pomelo.on('onStartLoad', function (data) {
            cc.log(data);
            var myInfo = data.myInfo;

            gameData.mp = myInfo.mp;
            gameData.discardsNum = myInfo.discardsNum;
            gameData.exhaustsNum = myInfo.exhaustsNum;
            gameData.cardsNum = myInfo.cardsNum;
            gameData.thew = myInfo.thew;
            gameData.fightEnd = false;
           
            cc.log('开始加载战斗：', data.teamInfo, data.myInfo);
            cc.log(data,"data");
            combatMgr.initCombat(data);

            //that._uimgr.getUI(constant.UI.Match).hide();

            that._uimgr.getCurMainUI().hide();

            that._uimgr.loadUI(constant.UI.loadProjess, function (data) {
                
                that._uimgr.loadUI(constant.UI.Fight, function (data) {
                    data.initData(()=>{
                        combatMgr.curCombat.UILoadOk = true;

                        var player = combatMgr.curCombat.getSelf();
                        if(player != null)
                        {
                            player.Mp = myInfo.mp;
                            player.Thew = myInfo.thew;
                        }

                    });
                })
            });
            
            spawnSummoned.seed = data.spawnSummons.seed % 233280;
        });

        pomelo.on('onFightBegin', function (data) {
            cc.log('战斗开始 ', data);
            var ui = that._uimgr.getCurMainUI();
            // ui.selectScr.fightBegin();
            gameData.loadBegin = false;
            spawnSummoned.reset();
         
            gameData.IsLayoutAction = true;
            that._uimgr.releaseLoading();
            that._uimgr.getUI(constant.UI.Fight).show();
            var ui = that._uimgr.getUI(constant.UI.Fight);
          
           
            ui.ShowHandCards();//第一次加载
            ui.schedule(ui.callback,1);
            ui.showNum(gameData);
            ui.onFreshMp(gameData.mp, true);
            gameLogic.init();
        });

        pomelo.on('onUseCard', function (data) {
            data.inHands = data.inHands || [];
            gameData.mp = data.mp;
            gameData.thew = data.thew;

            if ("exhaustsNum" in data)
                gameData.exhaustsNum = data.exhaustsNum;
            if ("discardsNum" in data)
                gameData.discardsNum = data.discardsNum;

            cc.log('使用卡牌：', data);
            
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);

            combatMgr.curCombat.getSelf().Mp = data.mp;
            combatMgr.curCombat.getSelf().Thew = data.thew;
            combatMgr.getSelf().onUsePile(data.inHands);
            gameData.IsLayoutAction = true;
            ui.ShowHandCards();
        });

        pomelo.on('onUseCardNotify', function (data) {
            cc.log('别人使用卡牌：', data);

            //暂时没有表现
            //var player = gameLogic.getCombatUnitForUid(data.uid);
            //player.useCard(data);
        });

        pomelo.on('onDamage', function (data) {
            cc.log("伤害", data);
            if(gameData.IsReconnect)
                return;
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            var curdata = data;

            player.onDamage(curdata.oriDamage, gameLogic.getCombatUnitForUid(curdata.attackerID), curdata);

            var ui = that._uimgr.getCurMainUI();
            
            ui.FreshHp();

            var curskill = dataMgr.skill[curdata.sid][1];
            if(curskill.HitTime.length > 0 && curskill.DmgFlag == 1)
            {
                //存储技能伤害
                if(gameData.fightDamage.hasOwnProperty(curdata.attackerID))
                {
                    if(gameData.fightDamage[curdata.attackerID].hasOwnProperty(curdata.sid))
                    {
                        gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                    }
                    else
                    {
                        gameData.fightDamage[curdata.attackerID][curdata.sid] = new Array();
                        gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                    }
                }
                else{
                    gameData.fightDamage[curdata.attackerID] = new Array();
                    gameData.fightDamage[curdata.attackerID][curdata.sid] = new Array();
                    gameData.fightDamage[curdata.attackerID][curdata.sid].push(curdata.oriDamage);
                }
            }
            else {
                if (curskill.HitEffect != '') {
                    efferMgr.getPosEffect(curskill.HitEffectPath, new cc.v2(player.agent.go.position.x + player.table.HitPoint[0], player.agent.go.position.y + player.table.HitPoint[1]), curskill.HitEffect, player.teamid);
                }
            }
        })

        pomelo.on('onSkillEffective', function (data) {
            cc.log("技能生效", data);
            if(gameData.IsReconnect)
                return;
            var player = gameLogic.getCombatUnitForUid(data.casterID);
            player.skillEffective(data);
        });

        pomelo.on('onDrawCard', function (data) {
            if(gameData.IsReconnect)
                return;
            data.inHands = data.inHands || [];
            gameData.cardsNum = data.cardsNum;
            if ("discardsNum" in data)
                gameData.discardsNum = data.discardsNum;

            var ui = that._uimgr.getCurMainUI();
           
           
            ui.showNum(gameData);
            gameData.IsLayoutAction = false;
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        pomelo.on('onDrawCardNotify', function (data) {
            cc.log('别人抽牌', data);
        });

        pomelo.on('onMpRecover', function (data) {
            cc.log('灵力恢复', data);
            gameData.mp = data.mp;

            if(gameData.IsReconnect)
                return;

            combatMgr.getSelf().Mp = data.mp;
            var ui = that._uimgr.getCurMainUI();
            ui.onFreshMp(data.mp, true);
        });

        pomelo.on('onAddSpawnSummon', function (data) {
            cc.log('增加召唤物', data);

            /*
                "onAddSpawnSummon": {
                "required string groupId": 1,
                "required string type": 2,
                "message AreaInfo": {
                "required uInt32 area": 1,
                "required uInt32 num": 2
                },
                "repeated AreaInfo addList": 3
            },

            "onRemoveSpawnSummon": {
                "required string groupId": 1,
                "required string type": 2,
                "message AreaInfo": {
                "required uInt32 area": 1,
                "required uInt32 num": 2
                },
                "repeated AreaInfo removeList": 3
            },

            */
            spawnSummoned.create(data);
        })

        pomelo.on('onUseSkill', function (data) {
            cc.log('使用技能', data);
            

            if(gameData.IsReconnect)
                return;

            var player = gameLogic.getCombatUnitForUid(data.caster);
            var target = new Array();

            for (var i in data.targets) {
                target[i] = new Array();
                for(var z in data.targets[i])
                {
                    target[i].push(gameLogic.getCombatUnitForUid(data.targets[i][z]));
                }
            }

            if(player != null)
                player.useSkill(data, target);
        });

        pomelo.on('onSpecificDrawCard', function (data) {
            var num =   combatMgr.getSelf().handsPile.length;
            cc.log('指定抽卡','指订抽卡后的牌的张数', data,num);
            gameData.IsLayoutAction = false;
            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        ///他人接收指定抽卡 更新手牌数
        pomelo.on('onSpecificDrawCardNotify', function (data) {
            cc.log('别人指定抽卡', data);
            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            ui.ShowHandCards();
        });

        pomelo.on('onCreateCard', function (data) {
            cc.log('生成卡牌', data);
            var ui = that._uimgr.getCurMainUI();
            combatMgr.getSelf().onDrawPile(data.inHands);
            var num =   combatMgr.getSelf().handsPile.length;
            cc.log("生成卡牌时当前卡牌的张数",num);
            gameData.IsLayoutAction = false;
            ui.ShowHandCards();
        });

        pomelo.on('onCreateCardNotify', function (data) {
           cc.log('别人生成卡牌', data);
        });

        pomelo.on('onReverse', function (data) {
            cc.log('回收召唤物伤害', data);

            var damage = new Array();

            damage['caster'] = data.caster;
            
            for (var uid in data.damageInfo) {
                damage[uid] = new Array();

                var index = 0;
                var damageInfo = new Array();

                for (var damageItem of data.damageInfo[uid].damageList) {
                    var deltaHp = damageItem[0] - damageItem[1];
                    var deltaArmor = damageItem[2] - damageItem[3];

                    damageInfo[index] = deltaHp + deltaArmor;
                    index++;
                }
                damage[uid] = damageInfo;

                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid], data.caster);
            }

            spawnSummoned.collect(damage);
        });

        pomelo.on('onSwordWheel', function (data) {
            cc.log('swordWheel伤害', data);

            for (var uid in data.damageInfo) {
                var unit = gameLogic.getCombatUnitForUid(uid);
                unit.onSpawnSummonDamage(data.damageInfo[uid], data.caster);
            }

            spawnSummoned.Reset(data.summons);
        });

        pomelo.on('onHeal', function (data) {
            cc.log('治疗', data);

            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP, data.toHP - data.fromHp, data.casterID);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onRelive', function (data) {
            cc.log('复活', data);
            /// 技能id data.sid  .casterHp 释放者的血量 .casterID 释放者 .hp 目标回复血量 .targetID 目标Id
            if(gameData.IsReconnect)
                return;

            var player = gameLogic.getCombatUnitForUid(data.casterID);
            player.freshAttri({Hp: data.casterHp});

            var target = gameLogic.getCombatUnitForUid(data.targetID);
            target.fsm.handleEvent(FSMEvent.RELIVE, data);
        });

        pomelo.on('onBuffUpdate', function (data) {
          //  cc.log("Buff更新", data);
            if(gameData.IsReconnect)
                return;
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if (player)
                player.buffUpdate(data.realID, data.info);
        });

        pomelo.on('onBuffModHp', function (data) {
           // cc.log('onBuffModHp', data);
            if(gameData.IsReconnect)
                return;
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            player.onHeal(data.toHP, data.val, data.casterID);

            var ui = that._uimgr.getCurMainUI();
            ui.FreshHp();
        });

        pomelo.on('onPropUpdate', function (data) {
            cc.log('onPropUpdate', data);
            if(gameData.IsReconnect)
                return;
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            if (player != null)
                player.porpUpdate(data);
        });

        pomelo.on('onDropCard', function (data) {
            cc.log('弃牌', data);
            data.inHands = data.inHands || [];
            combatMgr.getSelf().onUsePile(data.inHands);
            for (var info of data.dropInfo) {
                if (info.toPile === consts.PileType.CARDS) {
                    gameData.cardsNum++;
                }
                else if (info.toPile === consts.PileType.DISCARDS) {
                    gameData.discardsNum++;
                }
                else if (info.toPile === consts.PileType.EXHAUSTS) {
                    gameData.exhaustsNum++;
                }
            }
            var ui = that._uimgr.getCurMainUI();
            ui.showNum(gameData);
        });

        pomelo.on('onDropCardNotify', function (data) {
            cc.log('弃牌广播', data);

        });

        pomelo.on('onFightEnd', function (data) {
            cc.log('战斗结束', data);
            gameData.fightEnd = true;
            var res = data.result;
            var ui = that._uimgr.getCurMainUI();
            ui.loadFightOver(res);
        });

        pomelo.on('onDie', function (data) {
            var player = gameLogic.getCombatUnitForUid(data.targetID);
            // player.onDie();
            player.fsm.handleEvent(FSMEvent.DIE);
        });

        pomelo.on('onDungeonReconnect', function (data) {
            cc.log('副本顶号重连', data);
            var ui = that._uimgr.getCurMainUI();
            gameData.IsReconnect = true;

            var teamInfo = data.teamInfo;
            var teamA = teamInfo.teamA;
            var unComfirm = data.unconfirm;
            var myInfo = data.myInfo;


            var selectLeftTime = data.leftTime; 
            gameData.curFightTime = new Date().getTime() + data.leftTime; 
            
            switch(data.status)
            {
                
                case consts.DungeonStatus.END:  // 已经完结
                that._uimgr.loadUI(constant.UI.FightOver,function(data){
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true; 
                });
                break;

                case consts.DungeonStatus.IN_SELECT_HERO:   // 选角中
                var  uimgr = cc.find('Canvas').getComponent('UIMgr');
                uimgr.loadUI(constant.UI.Match,function(data) {
                    data.showSelect();
                    data.selectScr.initData(teamA,unComfirm,selectLeftTime); 
                });
                break;

                case consts.DungeonStatus.IN_BEFORE_LOAD_CD:    // 加载前倒计时
               // var  uimgr = cc.find('Canvas').getComponent('UIMgr');
                uimgr.loadUI(constant.UI.Login);
                break;

                case consts.DungeonStatus.IN_LOAD:    // 加载中
                var  uimgr = cc.find('Canvas').getComponent('UIMgr');
                gameData.teamA = teamA;
                var projess = data.loadMemProgress;
                for (let i in projess) {
                    gameData.otherLoadRes[i] = projess[i];
                }   
                
                for (let j in teamA) {
                if (teamA[j].uid == gameData.uuid) {
                    var heroData = dataMgr.hero[teamA[j].heroid];
                    gameData.userName = heroData.HeroName;
                }
                }              
                that._uimgr.loadUI(constant.UI.loadProjess,function(res){
                    that._uimgr.loadUI(constant.UI.Fight,function(res){
                        combatMgr.curCombat.UILoadOk = true;
                        gameData.IsReconnect = false;
                    })
                });
                that._uimgr.loadUI(constant.UI.loadProjess,function(res){
                    combatMgr.initCombat(data);
                    that._uimgr.loadUI(constant.UI.Fight,function(res){
                    res.initData(()=>{
                        combatMgr.curCombat.UILoadOk = true;
                        gameData.IsReconnect = false;});
                    }); 
                });
                break;

                case consts.DungeonStatus.IN_FIGHT:    // 战斗中
                var mp = myInfo.mp;
                that._uimgr.loadUI(constant.UI.loadProjess,function(res){
                    combatMgr.initCombat(data);
                    that._uimgr.loadUI(constant.UI.Fight,function(res){
                      
                    res.initData(()=>{
                        var ui = that._uimgr.getUI(constant.UI.loadProjess);
                        ui.hide();
                            res.is_chongLian = true;
                            res.min_time = parseInt(selectLeftTime/60000);
                            res.sec_time = parseInt(selectLeftTime /1000)%60;
                            res.onFreshMp(mp,true);
                            var player = combatMgr.getSelf();
                            res.playerHpBar.progress = player.Hp / player.MaxHp;
                            for (let i in teamA) { 
                                if (gameData.uuid == teamA[i].uid) {   
                                    var heroData = dataMgr.hero[teamA[i].heroid];
                                    res.userName.string = heroData.HeroName;
                                    res.headImg.getComponent(cc.Sprite).spriteFrame = res.heroIcon.getSpriteFrame(heroData.HeroIcon);
                                }
                            }
                        combatMgr.curCombat.UILoadOk = true;
                        gameData.IsReconnect = false;});
                    }); 
                });
                break;
            }
        });

        pomelo.on('onAddMonster', function (data) {
            cc.log('新增怪物', data);
            var info = data.monsterInfo;
            var uid = info.uid;
            if (info.groupId == "groupA") {
                var pos = combatMgr.curCombat.matrix.MatrixPos[info.pos];
                var teamid = 0;
                var array = combatMgr.curCombat.own;
            }
            else {
                var pos = combatMgr.curCombat.monsterMatrix.MatrixPos[info.pos];
                var teamid = 1;
                var array = combatMgr.curCombat.enemy;
            }
            var ent = new monster(info, dataMgr.monster[info.monsterid], pos, teamid, combatMgr.curCombat, uid);
            combatMgr.curCombat.units[uid] = ent;
            array[info.pos] = ent;

            efferMgr.init(dataMgr.monster[info.monsterid].InitialDrawPile);
        });

        pomelo.on('onAddMonsterSummon', function (data) {
            cc.log('增加分身', data);

            ///重置位置
            var player = gameLogic.getCombatUnitForUid(data.casterID);

            if (player.Pos !== data.casterPos) {
                if (player.teamid == combatMgr.curCombat.getSelf().teamid) {
                    combatMgr.curCombat.own[data.casterPos] = player;
                    delete combatMgr.curCombat.own[player.Pos];
                }
                else {
                    combatMgr.curCombat.enemy[data.casterPos] = player;
                    delete combatMgr.curCombat.enemy[player.Pos];
                }
            }

            player.onAddSummon(data.casterPos);

            ///初始化分身
            for (var i in data.newEnts) {
                var uid = data.newEnts[i].uid;
                if (data.newEnts[i].hasOwnProperty('monsterid')) {
                    combatMgr.curCombat.units[uid] = new monster(data.newEnts[i], dataMgr.monster[data.newEnts[i].monsterid], combatMgr.curCombat.monsterMatrix.MatrixPos[data.newEnts[i].pos], player.teamid, combatMgr.curCombat, uid);
                    if (player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
                else {
                    combatMgr.curCombat.units[uid] = new hero(data.newEnts[i], dataMgr.heroAttributes[data.newEnts[i].heroid], combatMgr.curCombat.matrix.MatrixPos[data.newEnts[i].pos], player.teamid, combatMgr.curCombat, uid);
                    if (player.teamid == combatMgr.curCombat.getSelf().teamid)
                        combatMgr.curCombat.own[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                    else
                        combatMgr.curCombat.enemy[data.newEnts[i].pos] = combatMgr.curCombat.units[uid];
                }
            }
        });

        pomelo.on('onRemoveMonsterSummon', function (data) {
            cc.log('移除分身', data);

            combatMgr.curCombat.units[data.entID].release();
            combatMgr.curCombat.units[data.entID] = null;
            delete (combatMgr.curCombat.units[data.entID]);

            var index = 0;
            for (var i in combatMgr.curCombat.own) {
                if (combatMgr.curCombat.own[i].uid == data.entID) {
                    index = i;
                }
            }

            if (index != 0) {
                delete combatMgr.curCombat.own[index];
                return;
            }

            for (var i in combatMgr.curCombat.enemy) {
                if (combatMgr.curCombat.enemy[i].uid == data.entID) {
                    index = i;
                }
            }

            if (index != 0) {
                delete combatMgr.curCombat.enemy[index];
                return;
            }
        });

        pomelo.on('onGetMp', function (data) {
            cc.log("获取mp", data);
            if(gameData.IsReconnect)
                return;

            gameData.mp = data.mp;
            var player = combatMgr.getSelf();
            if(player != null)
                player.Mp = data.mp;
            var ui = that._uimgr.getUI(constant.UI.Fight);
            if(ui != null)
                ui.onFreshMp(data.mp);
        });

        pomelo.on('onMpRecoverRateUpdate', function (data) {
            cc.log("mp恢复速率更新", data);
            if(gameData.IsReconnect)
                return;
            var player = combatMgr.getSelf();
            if(player != null)
            player.SetMpRecoverRate(data.mpRecoverRate, data.stopMpRecoverBuffCnt);
        });

        pomelo.on('onBounce', function (data) {
            /*
            "onBounce": {
                "required uInt32 sid": 1,
                "required string casterID": 2,
                "message DamageInfo": {
                  "required string targetID": 1,
                  "required uInt32 fromHp": 2,
                  "required uInt32 fromArmor": 3,
                  "required uInt32 toHp": 4,
                  "required uInt32 toArmor": 5
                },
                "repeated DamageInfo damageLine": 3
              }
            */
        });

        /*清除召唤物
        "onClearSpawnSummon": {
            "required string groupId": 1,
            "required string type": 2
          },

          */
        pomelo.on('onClearSpawnSummon', function (data) {

        }); 
    }
}

module.exports = fight;