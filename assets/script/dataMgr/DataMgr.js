// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dataMgr = {
    load : function (path,callback){
        //var url = cc.url.raw(path);
        cc.loader.loadRes(path,function(err,res)
        {
            // 如果有異常會在 err 變數顯示, 否則在res就會是讀進來的json object
            //cc.log( 'load['+ path +'], err['+err+'] result: ' + JSON.stringify(res));
            var text = JSON.stringify(res);
            var mon = JSON.parse(text);
            console.log("mon = %i",mon[0].ID);
            callback(mon);
            return mon[0].ID;
            //JSON.stringify(res)是使用json库中的方法将json文件转换为字符串。
        });
    },
};

module.exports = dataMgr;
