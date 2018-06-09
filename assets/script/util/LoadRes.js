/*****
 * Date:2018/6/4
 * Author:pwh
 * Description:资源加载工具类
 */

var load = {
    load : function (path,callback){
        cc.loader.loadRes(path,function(err,res)
        {
            callback(res);
        });
    },
};

module.exports = load;