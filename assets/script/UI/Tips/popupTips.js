/**
* 提示弹出框
* @param {this} 指向当前UI 
* @param {string} 提示文本
* @author ljy
* @time:2018/9/25
*/


var UIBase = require("UIBase")
cc.Class({
    extends: UIBase,

    properties: {
      text:cc.RichText,
      _controller:null,
      
    },
    // onLoad () {},

    start () {

    },
    showText(controller,text){
        this.text.string = text;
        this._controller = controller;
    },

    //取消
    onclickCancel(callback) {
        this.hide();
    },

    //确定
    onclickComfirm() {
        this._controller.comfirmDeletFriend();
    },


    // update (dt) {},
});
