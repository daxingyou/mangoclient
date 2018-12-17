/**********
 *        出牌协议
 * @param idx: 手牌位置
 * @param cid: card id
 * @param tid: target id
 * @param cards: [{idx: 1, cid: 1}, ...] 为卡牌信息列表, 弃牌时对应具体的位置和卡牌id的列表
 */

//function playCardProto(idx, cid, tid, cards) {
function playCardProto(idx, cid, tid) {
    this.head = "fight.fightHandler.playCard";
    //this.data = new playCardData(idx, cid, tid, cards);
    this.data = new playCardData(idx, cid, tid);
}

//function playCardData(idx, cid, tid, cards){
function playCardData(idx, cid, tid){
    this.idx = idx;
    this.cid = cid;
    this.tid = tid;
    //this.cards = cards;
}

module.exports = playCardProto;
