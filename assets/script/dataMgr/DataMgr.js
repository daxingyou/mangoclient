var Dungeon = require('Dungeon')
var Scene = require('Scene')
var Monster = require('Monster')
var Group = require('Group')
var Matrix = require('Matrix')
var Skill = require('Skill')
var Card = require('Card')
var Hero = require('Hero')
var HeroAttributes = require('HeroAttributes')
var buff = require('Buff')
var Raid = require('Raid')
var RaidAward = require('RaidAward')
var RaidShop = require('RaidShop')
var Item = require('Item');
var Mail = require('Mail')
var CardUpgrade = require('CardUpgrade')
//heroAttributes
var dataMgr = {
    index : 0,
    ////关卡
    dungeon : [],
    ////场景
    scene : [],
    ////怪物组
    group : [],
    ////怪物
    monster :[],
    ///阵型表
    matrix : [],
    ///技能表
    skill : [],
    ///卡牌
    card : [],
    ///英雄
    hero : [],
    ///英雄属性
    heroAttributes : [],
    ///buff
    buff : [],

    ///副本
    raid : [],

    ///单人副本关卡
    award : [],

    //单人副本商店
    shop: [],

    //道具，物品
    item: [],

    //邮件
    mail: [],

    //卡牌升级
    cardUpgrade: [],

    
    load : function (path,callback){
        //var url = cc.url.raw(path);
        cc.loader.loadRes(path,function(err,res)
        {
            var text = JSON.stringify(res);
            var mon = JSON.parse(text);
            //console.log("mon = %i",mon[0].ID);
            callback(mon);
            cc.loader.releaseRes(path);
        });
    },
    init : function(callback){
        this.index = 0;
       
        this.dungeon = Dungeon;
        
        this.scene = Scene;
      
        this.monster = Monster;
      
        this.group = Group;
       
        this.skill = Skill;
       
        this.matrix = Matrix;
      
        this.hero = Hero;
      
        this.card = Card;
       

        this.raid = Raid;

        this.award = RaidAward;

        this.shop = RaidShop;

        this.item = Item;

        this.mail = Mail;

        this.cardUpgrade = CardUpgrade;



        this.heroAttributes = HeroAttributes;
        this.buff = buff;
        callback();
    }
};

module.exports = dataMgr;
