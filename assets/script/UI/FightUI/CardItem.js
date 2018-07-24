
var UIBase = require('UIBase');

cc.Class({
    extends: UIBase,

    properties: {
        Name : cc.Label,
        _index : 0,
        cardAtlas : cc.SpriteAtlas,
        cardImage : cc.Sprite, 
        select:cc.Node,
    },



    // onLoad () {},

  
    initData(data,srpiteName,index){
        this._index = index;
        this.Name.string = data;
        this.cardImage.spriteFrame = this.cardAtlas.getSpriteFrame(srpiteName);
    }




   
    // update (dt) {},
});
