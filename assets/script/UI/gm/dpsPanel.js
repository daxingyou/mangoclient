/*
 * @Author: liuguolai 
 * @Date: 2018-10-16 20:50:33 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-10-19 11:49:05
 */
let UIBase = require('UIBase');
let net = require("NetPomelo");
let debugGetDpsProto = require('debugGetDpsProto');
let heroTpl = require("Hero");
let monsterTpl = require("Monster");
let skillTpl = require("Skill");
let consts = require('consts');

cc.Class({
    extends: UIBase,
    properties: {
        refreshBtn: cc.Button,
        closeBtn: cc.Button,
        exportBtn: cc.Button,

        doDamageBtn: cc.Button,
        doHealBtn: cc.Button,

        heroPanelTitle: cc.Label,
        skillPanelTitle: cc.Label,

        heroListContent: cc.Layout,
        skillListContent: cc.Layout,

        heroItem: cc.Node,
        skillItem: cc.Node,

        divideItem: cc.Node
    },

    // refs: https://blog.csdn.net/foupwang/article/details/80188651 
    saveForBrowser(textToWrite, fileNameToSaveAs) {
        if (cc.sys.isBrowser) {
            let textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null)
            {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else
            {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    },

    onLoad() {
        this.closeBtn.node.on('click', this._onCloseBtnClick, this);
        this.refreshBtn.node.on('click', this.onRefreshBtnClick, this);
        this.exportBtn.node.on('click', this.doExport, this);

        this.doDamageBtn.node.on('click', this._onDoDamageBtnClick, this);
        this.doHealBtn.node.on('click', this._onDoHealBtnClick, this);
        this._funcListBtns = [this.doDamageBtn, this.doHealBtn];
        this._curFuncBtn = null;
        this._curFuncType = null;
        this._curSelectedId = null;

        this._curDatas = null;
        this._heroListItems = [];
        this._skillListItems = [];

        this._doDamageInfo = null;
        this._doHealInfo = null;
        this._idToHeroid = null;
        this._idToMonsterid = null;
        this._usedTime = 0;
        this._groupAName = null;
        this._groupBName = null;
    },

    _onCloseBtnClick(button) {
        this.hide();
    },

    onRefreshBtnClick(button) {
        let self = this;
        net.Request(new debugGetDpsProto(), function (data) {
            if (data.code === consts.Code.OK) {
                self.updateInfo(data);
            }
            self.refresh();
        });
    },

    updateInfo(data) {
        this._usedTime = data.usedTime;
        this._doDamageInfo = data.doDamageInfo;
        this._doHealInfo = data.doHealInfo;
        this._idToHeroid = data.idToHeroid;
        this._idToMonsterid = data.idToMonsterid;
        this._prepareData();
    },

    _prepareData() {
        this._groupAName = {}, this._groupBName = {};
        for (let id in this._idToHeroid) {
            let data = this._idToHeroid[id];
            if (data.groupId === "groupA") {
                this._groupAName[id] = {
                    name: heroTpl[data.heroid].HeroName
                };
            }
            else {
                this._groupBName[id] = {
                    name: heroTpl[data.heroid].HeroName
                };
            }
        }
        for (let id in this._idToMonsterid) {
            let data = this._idToMonsterid[id];
            if (data.groupId === "groupA") {
                this._groupAName[id] = {
                    name: monsterTpl[data.monsterid].Name
                };
            }
            else {
                this._groupBName[id] = {
                    name: monsterTpl[data.monsterid].Name
                };
            }
        }
    },

    _getExportInfoList(datas) {
        let exportInfoList = [];
        for (let groupNames of [this._groupAName, this._groupBName]) {
            let teamTotal = 0;
            for (let id in groupNames) {
                let heroTotal = 0;
                if (id in datas) {
                    for (let sid in datas[id]) {
                        heroTotal += datas[id][sid];
                    }
                }
                groupNames[id].total = heroTotal;
                teamTotal += heroTotal;
            }
            if (teamTotal === 0)
                teamTotal = 1;
            for (let id in groupNames) {
                let info = groupNames[id];
                let data = {
                    name: info.name,
                    skillInfo: []
                }
                if (id in datas) {
                    let skillInfo = data.skillInfo;
                    for (let sid in datas[id]) {
                        let total = datas[id][sid];
                        skillInfo.push({
                            name: skillTpl[sid][1].SkillName,
                            total: total,
                            perSec: Math.floor(total / this._usedTime * 10) / 10,
                            percent: Math.floor(total / teamTotal * 1000) / 10
                        })
                    }
                }
                exportInfoList.push(data);
            }
        }
        return exportInfoList;
    },

    // 导出
    doExport() {
        if (!this._doDamageInfo)
            return;
        let exportDoDamgeList = this._getExportInfoList(this._doDamageInfo);
        let exportDoHealList = this._getExportInfoList(this._doHealInfo);
        let exportInfo = {
            doDamage: exportDoDamgeList,
            doHeal: exportDoHealList
        }
        let time = new Date();
        let fileName = 'dps_' + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + '_' + time.getTime();
        this.saveForBrowser(JSON.stringify(exportInfo, undefined, 2), fileName);
    },

    _onDoDamageBtnClick(button) {
        this._curFuncBtn = this.doDamageBtn;
        this._curFuncType = "doDamage";
        this.refresh();
    },

    _onDoHealBtnClick(button) {
        this._curFuncBtn = this.doHealBtn;
        this._curFuncType = "doHeal";
        this.refresh();
    },

    _updateFuncBtns() {
        for (let btn of this._funcListBtns) {
            if (btn === this._curFuncBtn) {
                btn.interactable = false;
            }
            else {
                btn.interactable = true;
            }
        }
    },

    show() {
        this._super();
        if (this._curFuncBtn === null) {
            this._funcListBtns[0].node.emit('click');
        }
        else
            this.refresh();
    },

    refresh() {
        this._updateFuncBtns();
        this.heroPanelTitle.string = this._curFuncBtn.node.getChildByName('Label').getComponent(cc.Label).string;
        if (!this._doDamageInfo)
            return;
        this._refreshHeroListPanel();
    },

    _getDatas() {
        let datas;
        if (this._curFuncType === "doDamage") {
            datas = this._doDamageInfo;
        }
        else if (this._curFuncType === "doHeal") {
            datas = this._doHealInfo;
        }
        else {
            throw new Error("unknow type");
        }
        return datas;
    },

    _getSkillItem(sid, num, totalNum) {
        if (totalNum === 0)
            totalNum = 1;
        let item = cc.instantiate(this.skillItem);
        item.active = true;
        let labelName = item.getChildByName('name').getComponent(cc.Label);
        let labelDetail = item.getChildByName('detail').getComponent(cc.Label);
        labelName.string = skillTpl[sid][1].SkillName;
        labelDetail.string = num.toString() + '(' + Math.floor(num / this._usedTime * 10) / 10 + ', ' + Math.floor(num / totalNum * 1000) / 10 + '%)'

        return item;
    },

    _onHeroItemClicked(name, id, total) {
        this._curSelectedId = id;
        this.skillPanelTitle.string = name;
        for (let item of this._skillListItems) {
            item.parent = null;
        }
        this._skillListItems = [];
        let skillData = this._curDatas[id];
        if (!skillData)
            return;
        let totalHeight = 0;
        for (let sid in skillData) {
            let num = skillData[sid];
            let item = this._getSkillItem(sid, num, total);
            item.parent = this.skillListContent.node;
            this._skillListItems.push(item);
            totalHeight += item.height;
        }
        this.skillListContent.node.height = totalHeight;
    },

    _getHeroItem(id, name, heroTotal, teamTotal) {
        if (teamTotal === 0)
            teamTotal = 1;
        let item = cc.instantiate(this.heroItem);
        item.active = true;
        let labelName = item.getChildByName('name').getComponent(cc.Label);
        let labelDetail = item.getChildByName('detail').getComponent(cc.Label);
        labelName.string = name;
        labelDetail.string = heroTotal.toString() + '(' + Math.floor(heroTotal / this._usedTime * 10) / 10 + ', ' + Math.floor(heroTotal / teamTotal * 1000) / 10 + '%)'
        item.on(cc.Node.EventType.TOUCH_END, this._onHeroItemClicked.bind(this, name, id, heroTotal));

        return item;
    },

    _refreshHeroListPanel() {
        for (let item of this._heroListItems) {
            item.parent = null;
        }
        this._heroListItems = [];
        let datas = this._getDatas();
        this._curDatas = datas;
        let teamTotal = 0, totalHeight = 0, firstItem = null, bClick = false;
        for (let id in this._groupAName) {
            let heroTotal = 0;
            if (id in datas) {
                for (let sid in datas[id]) {
                    heroTotal += datas[id][sid];
                }
            }
            this._groupAName[id].total = heroTotal;
            teamTotal += heroTotal;
        }
        for (let id in this._groupAName) {
            let info = this._groupAName[id];
            let item = this._getHeroItem(id, info.name, info.total, teamTotal);
            item.parent = this.heroListContent.node;
            this._heroListItems.push(item);
            totalHeight += item.height;
            if (this._curSelectedId === id) {
                bClick = true;
                item.emit(cc.Node.EventType.TOUCH_END);
            }
            if (!firstItem)
                firstItem = item;
        }

        let divideItem = cc.instantiate(this.divideItem);
        divideItem.active = true;
        divideItem.parent = this.heroListContent.node;
        this._heroListItems.push(divideItem);
        totalHeight += divideItem.height;

        teamTotal = 0;
        for (let id in this._groupBName) {
            let heroTotal = 0;
            if (id in datas) {
                for (let sid in datas[id]) {
                    heroTotal += datas[id][sid];
                }
            }
            this._groupBName[id].total = heroTotal;
            teamTotal += heroTotal;
        }
        for (let id in this._groupBName) {
            let info = this._groupBName[id];
            let item = this._getHeroItem(id, info.name, info.total, teamTotal);
            item.parent = this.heroListContent.node;
            this._heroListItems.push(item);
            totalHeight += item.height;
            if (this._curSelectedId === id) {
                bClick = true;
                item.emit(cc.Node.EventType.TOUCH_END);
            }
            if (!firstItem)
                firstItem = item;
        }
        this.heroListContent.node.height = totalHeight;
        if (!bClick && firstItem) {
            firstItem.emit(cc.Node.EventType.TOUCH_END);
        }
    }

});