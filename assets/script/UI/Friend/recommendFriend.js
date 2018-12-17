var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
let loadRes = require('LoadRes');

let ITEM_HEIGHT = 110;
cc.Class({
    extends: uiBase,

    properties: {
        showRecommend: cc.Node,
        sexToggle: cc.Toggle,
    },

    onLoad() {
        this._super();
        this.addCommonBackBtn('好友', () => {
            this._uiMgr.loadUI(constant.UI.Friend);
        });
        this.lastGetRecommendTime = 0;
        this.sexToggle.node.on('toggle', this.onSexChanged, this);
    },

    onSexChanged(event) {
        this.refreshList();
    },

    init() {
        this.refreshList();
    },

    _addRecommonFriend(data) {
        let self = this;
        self.showRecommend.removeAllChildren();
        loadRes.loadPrefab('UI/Friend/gameFriendItem', true, function (loadedResource) {
            for (var i = 0; i < data.length; i++) {
                var itemData = data[i];
                let item = cc.instantiate(loadedResource);
                self.showRecommend.addChild(item);
                item.getComponent('gameFriendItem').initData(2, itemData);
            }
            self.showRecommend.height = data.length * ITEM_HEIGHT + 10;
        });
    },

    // 换一批
    refreshList() {
        let timeNow = new Date().getTime();
        if (timeNow - this.lastGetRecommendTime < 5 * 1000) {
            this._uiMgr.showTips('请歇一歇');
            return;
        }
        this.lastGetRecommendTime = timeNow;
        let self = this;
        net.requestWithCallback('getRecommendListProto', this.sexToggle.isChecked ? 1 : 0, function (data) {
            self._addRecommonFriend(data.res);
        });
    },
});
