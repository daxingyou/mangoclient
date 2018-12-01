var dataMgr = require('DataMgr')
var uibase = require('UIBase');
cc.Class({
    extends: uibase,

    properties: {
       num:cc.Label,
       propName:cc.Label,
       _parents:null,
       _curIndex:null,
       tips:cc.Node,
       _goodId:null,
       _cnt:null,
       _isRead:false,
       _isNew: false,//新道具
    },

    initData (goodId,num,parent,curIndex,isNew) {
        this._goodId = goodId;
        this._cnt = num;
        this.num.string = num;
        this.propName.string = dataMgr.item[goodId].Name;
        this._parents = parent;
        this._curIndex = curIndex;   
        if (isNew != null)    
        this._isNew = isNew; 
    },

    refreash (cnt) {
        this._cnt = cnt;
        this.num.string = cnt;
    },

    select() {
        this.tips.active = true;
    },
    unSelect () {
        this.tips.active = false;
    },

    click () {
        if (this.tips.active)
        return;
        this.select();
        this._parents._curIndex = this._curIndex;
        this._isNew = false;
        this._parents.showSelectGood(this._curIndex);
    },





    

   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
});
