var constant = require('constant')
var Dungeon = require('Dungeon')
var Scene = require('Scene')
var Monster = require('Monster')
var Group = require('Group')
var Matrix = require('Matrix')
var Skill = require('Skill')
var Card = require('Card')
var Hero = require('Hero')

var dataMgr = {
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
    load : function (path,callback){
        //var url = cc.url.raw(path);
        cc.loader.loadRes(path,function(err,res)
        {
            // 如果有異常會在 err 變數顯示, 否則在res就會是讀進來的json object
            //cc.log( 'load['+ path +'], err['+err+'] result: ' + JSON.stringify(res));
            var text = JSON.stringify(res);
            var mon = JSON.parse(text);
            //console.log("mon = %i",mon[0].ID);
            callback(mon);
            cc.loader.releaseRes(path);
            //JSON.stringify(res)是使用json库中的方法将json文件转换为字符串。
        });
    },
    init : function(){
        this.load(constant.DataResPath.dungeon,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Dungeon(data[i]);
                this.dungeon[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.scene,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Scene(data[i]);
                this.scene[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.monster,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Monster(data[i]);
                this.monster[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.group,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Group(data[i]);
                this.group[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.skill,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Skill(data[i]);
                this.skill[item.ID][item.Index] = item;
            }
        });
        this.load(constant.DataResPath.matrix,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Matrix(data[i]);
                this.matrix[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.hero,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Hero(data[i]);
                this.hero[item.ID] = item;
            }
        });
        this.load(constant.DataResPath.card,(data)=>{
            for(var i =0;i<data.length;i++)
            {
                var item = new Card(data[i]);
                this.card[item.ID] = item;
            }
        });
    }
};

module.exports = dataMgr;
