

cc.Class({
    extends: cc.Component,
    properties: {
       serverName:cc.Label,
       status:cc.Node,
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
        self.status.getComponent(cc.Label).string = data.status+" 级"; 
        self.id = data.id;
        self.host = data.ip;
        self.port = data.port;
        self._parent = parent;//slectServer
       
        if(Object.keys(self._parent.showScore).length!= 0) {
            for(let i in self._parent.showScore) {
                if(self.id == i){
                self.status.active = true;
                self.status.getComponent(cc.Label).string = self._parent.showScore[i] + "级";
            }
        }
        }
    },
    start(){
       
    },
    on_click: function (data) {
        
       this._parent.serverName.string = this.serverName.string;
       this._parent.status.string = this.status.getComponent(cc.Label).string;
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
