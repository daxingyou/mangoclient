

cc.Class({
    extends: cc.Component,
    properties: {
       serverName:cc.Label,
       status:cc.Label,
       _parent:null,
       id:null,
       host:null,
       port:null,
    },

    onLoad () {
        
    },
   
    init : function(data,parent){
        var self = this;
       
        
        self.serverName.string =data.name;
        self.status.string = data.status; 
        self.id = data.id;
        self.host = data.ip;
        self.port = data.port;
        self._parent = parent;//slectServer
    },
    start(){
       
    },
    on_click: function (data) {
        
       this._parent.serverName.string = this.serverName.string;
       this._parent.status.string = this.status.string;
       this._parent.status.string = "新服";
       this._parent.id = this.id;
       this._parent.host = this.host;
       this._parent.port = this.port;
       this._parent.serverList.active = false;
       this._parent.showItem.active = true;
       this._parent.start_btn.active = true;
     //  cc.log(this._parent.host + " ip " + this._parent.port + "port");
    //  cc.log(this.host + " ip " + this.port + "port");
      
        },

   
    // update (dt) {},
});
