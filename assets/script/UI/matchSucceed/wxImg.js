cc.Class({
    extends: cc.Component,

    properties: {
        cardAtlas : cc.SpriteAtlas,
        wxImage : cc.Sprite, 
        comfirmImg :cc.Node,
        userName:cc.Label,
        _parents:null,
        _eid:null,
        _index:null,
        
    },
    // onLoad () {},

    start () {

    },
    initData (index,id,openid,parents) {
        this._index = index;
        this._parents = parents;
        this.userName.string = openid;
        this._eid = id;
    },

    onclickBegin () {
        this.comfirmImg.active = true;
        
        //cc.log(this._index,"点击开始游戏");
    },

});
