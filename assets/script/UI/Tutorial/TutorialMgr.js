/**
 *    新手引导管理器
 *    by pwh  
 */
var event = require('TutorialEvent')
var constant = require('constants')

var Tutorial = {
    tutorialUI : null,
    curIndex : 0,
    curTutorialId : 0,
    curState : null,
    curCombat : null,
    isFinish : false,

    starTutorial : function(eventData,combat){
        this.curCombat = combat;
        this.isFinish = false;
        this.events = new Array();

        for(var item in eventData)
        {
            this.events.push(new event(item,this));
        }

        if(this.tutorialUI == null)
        {
            var that = this;
            uiMgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.hide();
                data.init(that);
                that.tutorialUI = data;
                that.begin();
            });
        }
    },
    NextStep(){
        this.curIndex++;

        if(this.curIndex == this.events.length)
        {
            this.isFinish = true;
        }   
        else
        {
            this.events[this.curIndex].Active(constant.tutorialEvent.animation);
        }
    },
    begin(){
        this.events[this.curIndex].Active(constant.tutorialEvent.begin);
    },
    fightOver(){
        this.events[this.curIndex].Active(constant.tutorialEvent.fightOver);
    }
}

module.exports = Tutorial;