var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
        content : cc.Label,
        collide : cc.Node,
        _curIndex : 0,
        _Tutorialmgr : null
    },

    // onLoad () {},

    init(data,mgr){
        this.data = data;
        this._curIndex = 0;
        this._Tutorialmgr = mgr;
        this.show();

        this.content.string = this.data[this._curIndex].Value;
    },

    start () {
        this.collide.on(cc.Node.EventType.TOUCH_START, function (event) {
            this._Tutorialmgr.NextStep();
        }, this);
        
    },
    freshenUI(){
        this._curIndex++;
        this.content.string = this.data[this._curIndex].Value;
    }

    // update (dt) {},
});
