var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun
     * @date: 2016.02.24.
     * @场景动态信息是玩家属性,直接调用WebValue.
     */
    var SceneData = (function () {
        function SceneData(_dy, _st) {
            /**
             * @当前怪物index.
             */
            this.currentMonster = 0;
            /**
             * @关卡怪物数量.
             */
            this.monsterCount = 0;
            this.sceneId = _dy;
            this.st = _st;
        }
        return SceneData;
    }());
    Model.SceneData = SceneData;
    __reflect(SceneData.prototype, "Model.SceneData");
})(Model || (Model = {}));
//# sourceMappingURL=SceneData.js.map