var uibase = require('UIBase')
var tutorialGroup = require('TutorialGroup')
var tutorial = require('Tutorial')
let playerData = require('playerData');

cc.Class({
    extends: uibase,

    properties: {
        context : cc.Label,
        bg1 : cc.Node,
        _fightUI : null,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        
    },
    init(id,mgrUI){
        this.datas = tutorialGroup[id].Group;
        this.index = 0;
        this.curTime = 999;
        this.tutorialUI = mgrUI;
        this.next();

        this._direction = new Array();
        this._direction[0] = {'x':0,'y':99};
        this._direction[1] = {'x':-184,'y':0};
        this._direction[2] = {'x':0,'y':-99};
        this._direction[3] = {'x':184,'y':0};
    },
    start () {
        
    },
    next(){
        if(this.index == this.datas.length)
        {
            this.hide();
            this.tutorialUI.hide();
            return;
        }    

        this._direction = new Array();
        this._direction[0] = {'x':0,'y':99};
        this._direction[1] = {'x':184,'y':0};
        this._direction[2] = {'x':0,'y':-99};
        this._direction[3] = {'x':-184,'y':0};

        this.data = tutorial[this.datas[this.index]];

        this.curTime = this.data.LeastAppear;
        this.context.string = this.data.Value;

        this.node.position = cc.v2(this.data.Position.x,this.data.Position.y);
        this.setDir(this.data.Direction);

        if(this.data.Event.hasOwnProperty("trigger"))
        {
            var trigger = this.data.Event.trigger;
            if(trigger.action == "useCard")
            {
                var combat = this.tutorialUI._Tutorialmgr.curCombat;
                var targets = new Array();
                targets[1] = combat.getSelf();
                combat.getMonster().useSkill(combat.useSkill(combat.getMonster(),combat.getSelf(),trigger.cardID),targets);
            }   
        }
        
        if(this.data.Event.hasOwnProperty("finish"))
        {
            var finish = this.data.Event.finish;

            if(finish.target = "owner")
            {
                this.uid = playerData.id;
            }
            else if(finish.target = "target")
            {
                this.uid = this.tutorialUI._Tutorialmgr.getMonster().uid;
            }
            this.cid = finish.cardID;

            this.tutorialUI.collide.active = false;
        }

        this.index ++;
    },
    setDir(dir){
        this.bg1.position = cc.v2(this._direction[dir].x,this._direction[dir].y);
        this.bg1.rotation = dir * 90;
    },
    update (dt) {
        //this.curTime -= dt;

        //if(this.curTime <= 0)
        //{
        //    this.next();
        //}
    },
    onUseCard(user,cid){
        if(user.uid == this.uid && cid == this.cid)
        {
            this.next();
            this.tutorialUI.collide.active = true;
            this.cid = 0;
            this.uid = 0;
        }   
    }
});
