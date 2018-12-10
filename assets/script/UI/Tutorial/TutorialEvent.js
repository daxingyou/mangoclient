var constant = require('constants')
var dialog = require('Dialog')

var event = function(eventData,mgr){
    this.event = eventData;
    this.mgr = mgr;
}

event.prototype.getUnitForSid = function(sid){
    for(var item in this.mgr.curCombat.units) 
    {
        if(this.mgr.curCombat.units[item].hasOwnProperty('heroid'))
            if(this.mgr.curCombat.units[item].heroid == sid)
                return this.mgr.curCombat.units[item];
        if(this.mgr.curCombat.units[item].hasOwnProperty('monsterid'))
            if(this.mgr.curCombat.units[item].monsterid == sid)
                return this.mgr.curCombat.units[item];
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
                var that = this;
                player.agent.setCompleteCallback(this.event.animation,
                    ()=>{
                        that.mgr.tutorialUI.initTutorial(dialog[this.event.dialog]);
                    });
                player.agent.PlayAnimation(this.event.animation,false);
            }
            else
            {
                cc.error('error tutorial event heroID this id = ',this.event.target);
            }
        }
        else 
        {
            this.mgr.tutorialUI.initTutorial(dialog[this.event.dialog]);
        }
    }
}

module.exports = event;