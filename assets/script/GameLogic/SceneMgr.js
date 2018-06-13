/**
 *    场景管理器
 *    场景管理加载释放，资源加载释放 
 *    by pwh  
 */

var sceneMgr = {
    curid : Int16Array,

    loadScene : function(id,callback){
        this.curid = id;
        var sceneData = dataMgr.scene[id];

        

        callback();
    }
};

module.exports = sceneMgr;