var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun
     * @date: 2016.02.03.
     */
    var MonsterLocalService = (function () {
        function MonsterLocalService() {
        }
        Object.defineProperty(MonsterLocalService, "MonsterList", {
            /**
             * @怪物数据.
             */
            get: function () {
                return MonsterLocalService.monsterList;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @怪物初始化要在场景好了之后.
         * @怪物数量由公式决定.
         * @这里只提供给initAllData调用.
         */
        MonsterLocalService.setMonsterList = function (isEscape) {
            if (isEscape === void 0) { isEscape = false; }
            if (MonsterLocalService.monsterList) {
                if (Model.WebServiceBase.isDebug) {
                    console.log("怪物列表已经有了,这里只管长度是否改变.");
                }
                var delta = MonsterLocalService.monsterList.length - Model.SceneLocalService.SceneData.monsterCount;
                //                if(delta > 0){
                for (var i = 0; i < delta; i++) {
                    MonsterLocalService.monsterList.shift();
                }
            }
            else {
                MonsterLocalService.setMonsterData(isEscape);
            }
            return MonsterLocalService.monsterList;
        };
        /**
         * @构造下一个关卡怪物.
         */
        MonsterLocalService.setMonsterData = function (isEscape) {
            if (isEscape === void 0) { isEscape = false; }
            MonsterLocalService.monsterList = [];
            var normalStList = null;
            var bossStList = null;
            normalStList = Enumerable.From(Model.WebValue.dataStModel.monsterList).
                Where(function (x) { return x.monsterType == Model.MonsterType[Model.MonsterType.MONSTER_TYPE_BOSS]; }).ToArray();
            bossStList = Enumerable.From(Model.WebValue.dataStModel.monsterList).
                Where(function (x) { return x.monsterType == Model.MonsterType[Model.MonsterType.MONSTER_TYPE_BOX] || x.monsterType == Model.MonsterType[Model.MonsterType.MONSTER_TYPE_PERSON]; }).ToArray();
            var st = null;
            for (var i = 0; i < Model.SceneLocalService.SceneData.monsterCount; i++) {
                if (!isEscape && i == Model.SceneLocalService.SceneData.monsterCount - 1) {
                    st = normalStList[Model.Mathf.random(0, normalStList.length)];
                }
                else {
                    st = bossStList[Model.Mathf.random(0, bossStList.length)];
                }
                var data = new Model.MonsterData(st);
                MonsterLocalService.setMonsterHp(data);
                MonsterLocalService.setMonsterDropMoney(data);
                MonsterLocalService.setBossLeftTime(data);
                MonsterLocalService.monsterList.push(data);
            }
        };
        /**
         * @设置刷怪模式怪物数据.
         */
        MonsterLocalService.setFarmMonsterData = function () {
            MonsterLocalService.monsterList = [];
            var stList = Enumerable.From(Model.WebValue.dataStModel.monsterList).
                Where(function (x) { return x.monsterType != Model.MonsterType[Model.MonsterType.MONSTER_TYPE_BOSS]; }).ToArray();
            var st = null;
            for (var i = 0; i < Model.SceneLocalService.SceneData.monsterCount; i++) {
                st = stList[Model.Mathf.random(0, stList.length)];
                var data = new Model.MonsterData(st);
                MonsterLocalService.setMonsterHp(data);
                MonsterLocalService.setMonsterDropMoney(data);
                MonsterLocalService.setBossLeftTime(data);
                MonsterLocalService.monsterList.push(data);
            }
        };
        /**
         * @非BOSS血量= ROUNDUP（monsterHpRatio^关卡序号，0）
         * @BOSS血量= ROUNDUP（monsterHpRatio^关卡序号*5*（1- WEAPON_TYPE_CUT_BOSS_HP)，0）
         * @monsterHpRatio在st_system_config里，WEAPON_TYPE_CUT_BOSS_HP在st_magic_weapon里
         */
        MonsterLocalService.setMonsterHp = function (_data) {
            _data.hp = Math.ceil(Math.pow(parseFloat(Model.PlayerLocalService.PlayerData.st.monsterHpRatio), Model.SceneLocalService.SceneData.sceneId));
            if (_data.MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                _data.hp = Math.ceil(_data.hp * 5 * (1 - Model.MagicWeaponService.CutBossHp / 100));
            }
            _data.hpMax = _data.hp;
        };
        /**
         * @怪物区分来源于st_monster的monster_type字段
         * @ BOSS掉钱= ROUNDUP（怪物血量/4*（1+BOSS掉落加成），0）
         * @ BOSS掉落加成包括神兵效果里的
         * @ 在非Boss的基础上，增加的boss掉落铜币（WEAPON_TYPE_ADD_BOSS_COIN）
         * @BOX怪物掉钱= ROUNDUP（怪物血量*1.25*（1+宝箱铜币掉落加成），0）
         * @宝箱铜币加成包括挚友技能效果里的
         * @提升宝箱铜币掉落数量（FRIEND_SKILL_TYPE_BOX_COIN）
         * @神兵效果里的
         * @提升宝箱铜币掉落数量(WEAPON_TYPE_ADD_BOX_COIN)
         * @非BOX怪物掉钱= ROUNDUP（怪物血量/4*（1+铜币掉落加成），0）
         * @铜币掉落加成包括挚友技能效果里的
         * @提升铜币掉落数量（FRIEND_SKILL_TYPE_COIN）
         * @神兵效果里的
         * @提升获得铜币数量（WEAPON_TYPE_ADD_COIN）
         */
        MonsterLocalService.setMonsterDropMoney = function (_data) {
            if (_data.MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                _data.dropMoney = Math.ceil(_data.hp / 4 * (1 + Model.FriendLocalService.FriendSkillTypeCoin / 100 + Model.MagicWeaponService.AddCoin / 100 + Model.MagicWeaponService.AddBossCoin / 100));
            }
            else if (_data.MonsterType == Model.MonsterType.MONSTER_TYPE_BOX) {
                _data.dropMoney = Math.ceil(_data.hp * 1.25 * (1 + Model.FriendLocalService.FriendSkillTypeBoxCoin / 100 + Model.MagicWeaponService.AddBoxCoin / 100));
            }
            else {
                _data.dropMoney = Math.ceil(_data.hp / 4 * (1 + Model.FriendLocalService.FriendSkillTypeCoin / 100 + Model.MagicWeaponService.AddCoin / 100));
            }
        };
        /**
         * @BOSS倒计时=timeBOSS*（1+ WEAPON_TYPE_ADD_BOSS_TIME）
         * @timeBOSS来源st_system_config
         * @WEAPON_TYPE_ADD_BOSS_TIME是神兵的加成
         */
        MonsterLocalService.setBossLeftTime = function (_data) {
            _data.leftTime = parseFloat(Model.PlayerLocalService.PlayerData.st.timeBOSS) * (1 + Model.MagicWeaponService.AddBossTime / 100);
        };
        return MonsterLocalService;
    }());
    /**
     * @怪物数据.
     */
    MonsterLocalService.monsterList = null;
    Model.MonsterLocalService = MonsterLocalService;
    __reflect(MonsterLocalService.prototype, "Model.MonsterLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=MonsterLocalService.js.map