/**
 *    场景管理器
 *    场景管理加载释放，资源加载释放 
 *    by pwh  
 */

var dataMgr = require('DataMgr');

var sceneMgr = {
    curid : 0,
    sceneRoot : null,

    loadScene : function(id,callback){
        if(this.sceneRoot == null)
            this.sceneRoot = cc.find('background');
            

        this.curid = id;
        var sceneData = dataMgr.scene[id];

        

        callback();
    }
};

module.exports = sceneMgr;