var fight = {
    init : function(){
        pomelo.on('onBeginSelect', function (data){
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            //setTimeout(function(){
                //pomelo.request("fight.fightHandler.selectHero", {heroid: [1000, 2000][Math.floor(Math.random() * 2)]}, function(data){
                //    cc.log("选择英雄结果：" + data.code);
                //})
            //}, 5000)
        });
    
        pomelo.on('onSelectHeroNotify', function (data){
            cc.log('%s选择英雄:%s', data.uid, data.heroid);
        });
    
        pomelo.on('onConfirmHeroNotify', function (data){
            cc.log('%s确认英雄:%s', data.uid, data.heroid);
        });
    
        pomelo.on('onEnterLoadCD', function (data){
            cc.log('加载前倒计时:');
        });
    
        pomelo.on('onStartLoad', function(data){
            cc.log('开始加载战斗：', data.teamInfo, data.myInfo);
            setTimeout(function(){
                pomelo.request("fight.fightHandler.loadFinished", {}, function(data){
                    cc.log("xxxxxxx");
                })
            })
        });
    
        pomelo.on('onFightBegin', function(data){
            cc.log('战斗开始');
        });
    
        pomelo.on('onUseCard', function(data){
            cc.log('%s 使用卡牌：%i, tid: %s', data.uid, data.cid, data.tid);
        });
    
        pomelo.on('onFightAttriUpdate', function(data){
            cc.log('属性更新：' + Object.getOwnPropertyNames(data));
        });
    },
    OnFreshPile : function(data)
    {
       
    }

}

module.exports = fight;