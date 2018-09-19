

cc.Class({
    extends: cc.Component,

    properties: {
        cardAtlas : cc.SpriteAtlas,
        wxImage : cc.Sprite, 
        comfirmImg :cc.Node,
        _parents:null,
    },
    // onLoad () {},

    start () {

    },
    initData (index,wxImage,parents) {
        this.wxImage.spriteFrame = this.cardAtlas.getSpriteFrame(wxImage);
        this._parents = parents;
    },
  

     update (dt) {
         if (this._parents!=null) {
             if (this._parents.selfEnterGame) {
                 this.comfirmImg.active = true;
             }
             else {
                this.comfirmImg.active = false; 
             }
         }
     },
});
