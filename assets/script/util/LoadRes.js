/*****
 * Date:2018/6/4
 * Author:pwh
 * Description:资源加载工具类
 */

var constant = require('constants')

var load = {
    load : function (path,release,callback){
        cc.loader.loadRes(path,function(err,res)
        {
            callback(res);
            if(err != null)
                cc.error(err);
            if(release)
                cc.loader.release(path);
        });
    },
    loadSprite : function(path,release,callback){
        cc.loader.loadRes(path,cc.SpriteFrame,function(err,res)
        {
            callback(res);
            if(err != null)
                cc.error(err);
            if(release)
                cc.loader.release(path);
        });
    },
    loadEffect : function(path,release,callback){
        var effectpath = constant.EffectPath.concat(path);
        cc.loader.loadRes(effectpath,function(err,res)
        {
            callback(res,effectpath.replace(constant.EffectPath,''));
            if(err != null)
                cc.error(err);
            if(release)
                cc.loader.release(path);
        });
    },

    loadPrefab: function(path, release, callback) {
        cc.loader.loadRes(path, cc.Prefab, function(err, res) {
            if (err) {
                cc.error('load prefab error.', err.message || err);
                callback(null);
                return;
            }
            callback(res);
            if(release)
                cc.loader.release(path);
        });
    }
};

module.exports = load;