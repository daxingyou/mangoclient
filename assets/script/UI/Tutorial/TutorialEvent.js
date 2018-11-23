var constant = require('constants')
var dataMgr = require('DataMgr')

var event = function(eventData,mgr){
    this.event = eventData.event;
    this.mgr = mgr;
}

event.prototype.getUnitForSid = function(sid){
    for(var item in this.mgr.curCombat.units) 
    {
        if(item.heroid == sid)
            return item;
    }

    return null;
},

event.prototype.Active = function(state){
    if(this.event.event == state)
    {
        if(this.event.event == constant.tutorialEvent.animation)
        {
            var player = this.getUnitForSid(this.event.target);

            if(player != null)
            {
                player.agent.setCompleteCallback(this.event.animation,AnimationFinish);
                player.agent.PlayAnimation(this.event.animation,false);
            }
            else
            {
                cc.error('error tutorial event heroID this id = ',this.event.target);
            }
        }
        else 
        {
            this.mgr.tutorialUI.initTutorial(dataMgr.dungeon[this.event.dialog]);
        }
    }
}

event.prototype.AnimationFinish = function(){
    this._Tutorialmgr.NextStep();
}

module.exports = event;