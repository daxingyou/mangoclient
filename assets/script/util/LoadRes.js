/*****
 * Date:2018/6/4
 * Author:pwh
 * Description:资源加载工具类
 */

var load = {
    load : function (path,callback,release){
        cc.loader.loadRes(path,function(err,res)
        {
            callback(res);
            
            if(release)
                cc.loader.release(path);
        });
    },
};

module.exports = load;