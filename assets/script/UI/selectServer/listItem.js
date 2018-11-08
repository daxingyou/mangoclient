let consts = require('consts');

cc.Class({
    extends: cc.Component,
    properties: {
        serverName: cc.Label,
        status: cc.Node,
        _parent: null,
        id: null,
        host: null,
        port: null,
        statusIcon: cc.Sprite,
        atlas: cc.SpriteAtlas,
    },

    onLoad() {

    },

    init: function (data, parent) {
        var self = this;
        self.data = data;

        self.serverName.string = data.name;
        self.status.active = false;
        self.id = data.id;
        self.host = data.ip;
        self.port = data.port;
        self._parent = parent;//slectServer
        this._updateServerStatus(data.status);

        if (Object.keys(self._parent.showScore).length != 0) {
            for (let i in self._parent.showScore) {
                if (self.id == i) {
                    self.status.active = true;
                    self.status.getComponent(cc.Label).string = self._parent.showScore[i] + "级";
                }
            }
        }
    },
    _updateServerStatus(status) {
        switch (status) {
            case consts.ServerList.STATUS_CLOSED:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('mantain');
                break;
            case consts.ServerList.STATUS_NEW:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('new');
                break;
            case consts.ServerList.STATUS_BUSY:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('busy');
                break;
            case consts.ServerList.STATUS_HOT:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('hot');
                break;
        }
    },
    on_click: function (data) {
        this._parent.updateSelectedServer(this.data);
        this._parent.serverList.active = false;
        this._parent.showItem.active = true;
        this._parent.start_btn.active = true;
    },
});
