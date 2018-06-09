var constant = require('constant')
var Dungeon = require('Dungeon')
var Scene = require('Scene')

var dataMgr = {
    ////关卡
    dungeon : [],
    ////场景
    scene : [],

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
    }
};

module.exports = dataMgr;
