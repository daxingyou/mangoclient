var uiBase = require('UIBase')
var hero = require('Hero')
var monster = require('Monster')
var loadRes = require('LoadRes')

cc.Class({
    extends: uiBase,

    properties: {
        content : cc.RichText,
        collide : cc.Node,
        playerName : cc.Label,
        modelRoot : cc.Node,
        _dialogData : null,
        _curIndex : 1,
        _Tutorialmgr : null,
        _modelPlayer : null,
    },

    // onLoad () {},
    init(mgr){
        this._Tutorialmgr = mgr;
    },
    initTutorial(dialog){
        this._curIndex = 1;
        this._dialogData = dialog;
        this.show();
        this.freshenUI();
    },
    freshenUI(){
        this.content.string = this._dialogData[this._curIndex].Text;

        if(this._modelPlayer != null)
        {
            this._modelPlayer.destroy();
            this._modelPlayer = null; 
        }

        var that = this;

        if(this._dialogData[this._curIndex].CharacterID % 1000 > 10)
        {
            var data = monster[this._dialogData[this._curIndex].CharacterID];
            this.playerName.string = data.Name;

            loadRes.load(data.Model, true, (data) => {
                that._modelPlayer = cc.instantiate(data);
                that._modelPlayer.parent = that.modelRoot;
                that._modelPlayer.position = cc.v2(0,0);
            });
        }
        else
        {
            var data = hero[this._dialogData[this._curIndex].CharacterID];
            this.playerName.string = data.HeroName;
            loadRes.load(data.HeroModel, true, (data) => {
                that._modelPlayer = cc.instantiate(data);
                that._modelPlayer.parent = that.modelRoot;
                that._modelPlayer.position = cc.v2(0,0);
            });
        }
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
            this.hide();
            this._Tutorialmgr.NextStep();
        }
        else{
            this.freshenUI();
        }
    }
    // update (dt) {},
});
