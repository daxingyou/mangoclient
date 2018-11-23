var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
        content : cc.Label,
        collide : cc.Node,
        _dialogData : null,
        _curIndex : 1,
        _Tutorialmgr : null
    },

    // onLoad () {},
    init(mgr){
        this._Tutorialmgr = mgr;
    },
    initTutorial(dialog){
        this._dialogData = dialog;
        this.show();
        this.freshenUI();
    },
    freshenUI(){
        this.content.string = this._dialogData[this._curIndex].Text;
    },
    start () {
        var that = this;
        this.collide.on(cc.Node.EventType.TOUCH_START, function (event) {
            that.next();
        }, this);
    },
    next(){
        this._curIndex ++;
        if(this._dialogData[this._curIndex] == null)
        {
            this._Tutorialmgr.NextStep();
        }
        else{
            this.freshenUI();
        }
    }
    // update (dt) {},
});
