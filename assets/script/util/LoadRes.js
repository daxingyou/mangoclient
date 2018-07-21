/*****
 * Date:2018/6/4
 * Author:pwh
 * Description:资源加载工具类
 */

var load = {
    load : function (path,release,callback){
        cc.loader.loadRes(path,function(err,res)
        {
            callback(res);
            
            if(release)
                cc.loader.release(path);
        });
    },
    loadSprite : function(path,release,callback){
        cc.loader.loadRes(path,cc.SpriteFrame,function(err,res)
        {
            callback(res);
            
            if(release)
                cc.loader.release(path);
        });
    }
};

module.exports = load;