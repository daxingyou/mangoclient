var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var getRecommendListProto = require("getRecommendListProto")
cc.Class({
    extends: uiBase,

    properties: {
        showRecommend:cc.Node,
        _clickToggle1: 1,
        _clickToggle2: 0,
    },

   init () {
       let self = this;
    net.Request(new getRecommendListProto(0), function (data) {
        // cc.log(data,"data-----getRecommendListProto");
        self._addRecommonFriend(data.res);
    });
   },

   _addRecommonFriend (data) {
    let resIndex = 0;
    let self = this;
    self._showRecommend = [];
    self.showRecommend.removeAllChildren();
    cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            if (errorMessage) {
                cc.log('载入预制资源失败, 原因:' + errorMessage);
                return;
            }
            let item = cc.instantiate(loadedResource);
            resIndex++;
            self.showRecommend.addChild(item);
            self._showRecommend.push(item.getComponent('gameFriendItem'));
            self._showRecommend[i].initData(i,itemData,self,2);
            if (resIndex == data.length) {
                cc.loader.release('UI/Friend/gameFriendItem');
                if (data.length > 5)
                self.showGameFriend.height = friends.length * 160;
            }
        }
    });
    },

    // 选择在不在线
    limitRecommend (event,cust) {
        let limit = parseInt(cust);
        this._limitRecom = limit;
        if (limit == 1) {
            let sexNode = this.node.getChildByName('recommondLimit').getChildByName('toggle1').getChildByName('checkmark');
            sexNode.active = true;    
            this._clickToggle1 += 1;
           
            if (this._clickToggle1 == 2) {
                sexNode.active = false;    
                this._clickToggle1 = 0;
            } 
        }   
        else {
            let onLineNone = this.node.getChildByName('recommondLimit').getChildByName('toggle2').getChildByName('checkmark');
            onLineNone.active = true;    
            this._clickToggle2 += 1;
            if (this._clickToggle2 == 2) {
                onLineNone.active = false;    
                this._clickToggle2 = 0;
            } 
        } 
    },

    // 换一批
    refreshList () {
        this.init();
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
