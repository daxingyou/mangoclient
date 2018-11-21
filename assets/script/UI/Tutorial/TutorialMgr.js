/**
 *    新手引导管理器
 *    by pwh  
 */

var Tutorial = {
    tutorialUI : null,
    curIndex : 0,
    curTutorialId : 0,

    init : function(){
        this.isInit = true;
    },

    starTutorial : function(tutorialID){
        if(!this.isInit)
            return;

        this.curTutorialId = tutorialID;
        var tutorialGroup = require('TutorialGroup')
        this.curData = tutorialGroup[tutorialID];

        if(this.tutorialUI == null)
        {
            uiMgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.init(this.curData,this);
                this.tutorialUI = data;
            });
        }
        else{
            this.tutorialUI.initTutorial(this.curData,this);
        }
    },
    NextStep(){
        this.curIndex++;

        //判断步骤是否已经走完
        if(this.curIndex == this.curData.length)
        {
            this.tutorialUI.hide();
            
        }
        else
        {
            this.tutorialUI._curIndex ++;
            this.tutorialUI.freshenUI();
        }
    }
}

module.exports = Tutorial;