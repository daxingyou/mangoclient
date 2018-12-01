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
    isInit : false,

    init : function ()
    {
        this.isInit = true;
    },
    starTutorial : function(eventData,combat){
        this.curIndex =0;
        this.curCombat = combat;
        this.isFinish = true;
        this.events = new Array();

        for(var item in eventData)
        {
            this.isFinish = false;
            this.events.push(new event(eventData[item],this));
        }

        if(this.tutorialUI == null)
        {
            var that = this;
            this.curCombat.uiMgr.loadUI(constant.UI.Tutorial,(data) =>{
                data.init(that);
                that.tutorialUI = data;
                data.hide();
                that.begin();
            });
        }
        else
        {
            this.tutorialUI.init(this);
            this.begin();
        }
    },
    NextStep(){
        this.curIndex++;

        if(this.curIndex <= this.events.length)
        {
            this.isFinish = true;
            this.curCombat.TutorialFinish();
        }   
        else
        {
            this.events[this.curIndex].Active(constant.tutorialEvent.animation);
        }
    },
    begin(){            //战斗开始事件
        if(this.curIndex < this.events.length)  
        {
            /// 如果第一个事件是开始事件，如果不是就开始战斗
            if(this.events[this.curIndex].event.event == constant.tutorialEvent.begin)
                this.events[this.curIndex].Active(constant.tutorialEvent.begin);
            else
                this.curCombat.TutorialFinish();
        }
        else                
        {
            this.curCombat.TutorialFinish();
        }
    },
    fightOver(){
        for(var i in this.events)
        {
            if(this.events[i].event.event == constant.tutorialEvent.fightOver)
                this.events[i].Active(constant.tutorialEvent.fightOver);
        }
    }
}

module.exports = Tutorial;