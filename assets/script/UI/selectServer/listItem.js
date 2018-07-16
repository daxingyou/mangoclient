

cc.Class({
    extends: cc.Component,

    properties: {
       serverName:cc.Label,
       status:cc.Label,
       _parent:null,
       host:null,
       port:null,
    },

    onLoad () {
    },
    init : function(data,parent){
        var self = this;
        self.serverName.string = data.name;
        self.status.string = data.status; 
        this.host = data.ip;
        this.port = data.port;
        self._parent = parent;//slectServer
    },
    on_click: function (data) {
       this._parent.serverName.string = this.serverName.string;
       this._parent.status.string = this.status.string;
       this._parent.host = this.host;
       this._parent.port = this.port;
     cc.log(this._parent.host + " ip " + this._parent.port + "port");
     cc.log(this.host + " ip " + this.port + "port");
      
        },

   
    // update (dt) {},
});
