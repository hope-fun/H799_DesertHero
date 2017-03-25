var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author
     *
     */
    var SceneLocalService = (function () {
        function SceneLocalService() {
        }
        Object.defineProperty(SceneLocalService, "SceneData", {
            get: function () {
                return SceneLocalService.sceneData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @场景要在主角和神器之后初始化.
         * @这边只提供给initAllData调用.
         */
        SceneLocalService.setSceneData = function (monsterIndex) {
            if (monsterIndex === void 0) { monsterIndex = 0; }
            if (SceneLocalService.sceneData) {
                SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
                if (Model.WebServiceBase.isDebug) {
                    console.log("场景信息已经有了,这里只会更新当前场景总怪物数量!");
                }
            }
            else {
                //                var st: SceneStModel = Enumerable.From(WebValue.dataStModel.sceneList).Where(x=> x.clanId == WebValue.dataDyModel.sceneModel.scene).FirstOrDefault(null);
                var dySceneId = (Model.WebValue.dataDyModel.playerModel.sceneId % (Number(Model.PlayerLocalService.PlayerData.st.startScene) - 1));
                if (dySceneId == 0) {
                    dySceneId = Number(Model.PlayerLocalService.PlayerData.st.startScene) - 1;
                }
                var st = Enumerable.From(Model.WebValue.dataStModel.sceneList).Where(function (x) { return x.id == dySceneId; }).FirstOrDefault(null);
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun scene data st " + JSON.stringify(st));
                }
                //                SceneLocalService.sceneData = new SceneData(WebValue.dataDyModel.sceneModel,st);
                SceneLocalService.sceneData = new Model.SceneData(Model.WebValue.dataDyModel.playerModel.sceneId, st);
                SceneLocalService.sceneData.currentMonster = monsterIndex;
                SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
            }
            Model.WebValue.dataDyModel.playerModel.sceneId = SceneLocalService.SceneData.sceneId; //设置网络层提交数据.
            return SceneLocalService.sceneData;
        };
        /**
         * @构造下一关卡信息.
         */
        SceneLocalService.setNextSceneData = function () {
            Model.WebValue.dataDyModel.playerModel.sceneId += 1; //场景id往后加.再初始化怪物.
            var dySceneId = (Model.WebValue.dataDyModel.playerModel.sceneId % (Number(Model.PlayerLocalService.PlayerData.st.startScene) - 1));
            if (dySceneId == 0) {
                dySceneId = Number(Model.PlayerLocalService.PlayerData.st.startScene) - 1;
            }
            var st = Enumerable.From(Model.WebValue.dataStModel.sceneList).Where(function (x) { return x.id == dySceneId; }).FirstOrDefault(null);
            SceneLocalService.sceneData = new Model.SceneData(Model.WebValue.dataDyModel.playerModel.sceneId, st);
            SceneLocalService.sceneData.currentMonster = 0;
            SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
        };
        /**
         * @关卡怪物数量=sceneMonsterCount*（1- WEAPON_TYPE_CUT_ENEMY_COUNT）
         * @sceneMonsterCount来源st_system_config
         * @WEAPON_TYPE_CUT_ENEMY_COUNT是神兵的加成
         */
        SceneLocalService.setSceneMonsterCount = function (_data) {
            _data.monsterCount = Math.round(parseInt(Model.PlayerLocalService.PlayerData.st.sceneMonsterNumber) * (1 - Model.MagicWeaponService.CutEnemyCount / 100));
        };
        return SceneLocalService;
    }());
    /**
     * @场景列表数据.
     */
    SceneLocalService.sceneData = null;
    Model.SceneLocalService = SceneLocalService;
    __reflect(SceneLocalService.prototype, "Model.SceneLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=SceneLocalService.js.map