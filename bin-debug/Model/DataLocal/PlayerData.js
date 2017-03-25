var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author by cai_haotian 2015.12.23.
     * @modification: zhu_jun,
     * @date: 2016.01.14.
     */
    var PlayerData = (function () {
        function PlayerData(_dy, _st) {
            /**
             * @每秒点击伤害.
             */
            this.perSecondTapDamage = 0;
            /*
             * @当前dps值.
             */
            this.currentDps = 0;
            /**
             * @10连升花费
             * @by cai_haotian 2016.3.8.
             */
            this.tenUpgradeCost = 0;
            /**
             * @100连升花费
             * @by cai_haotian 2016.3.8.
             */
            this.hundredUpgradeCost = 0;
            /**
             * @所有挚友等级
             * @by cai_haotian 2016.3.21
             */
            this.allFriendLevel = 0;
            /**
             * @秒伤加成
             * @by cai_haotian 2016.3.21
             */
            this.allDamageAdd = 0;
            /**
             * @所有铜钱加成
             * @by cai_haotian 2016.3.21
             */
            this.allGoldAdd = 0;
            /**
             * @所有暴击伤害加成
             * @by cai_haotian 2016.3.21
             */
            this.allCritdDamageAdd = 0;
            /**
             * @保护挚友是否开启
             * @by cai_haotian 2016.3.21
             */
            this.protectFriend = false;
            /**
             * @挚友攻击动画帧率
             * @by cai_haotian 2016.3.23
             */
            this.friendFrameRate = 0;
            /**
             * @离线奖励钱币
             * @by cai_haotian 2016.4.10
             */
            this.offLineMoney = 0;
            /**
             * @商城购买标示
             * @by cai_haotian 2016.4.15
             */
            this.shopFlag = true;
            /**
             * @是否进行活动
             * @by cai_haotian 2016.4.18.
             */
            this.isChallenge = false;
            this.dy = _dy;
            this.st = _st;
        }
        Object.defineProperty(PlayerData.prototype, "PerSecondTapDamage", {
            set: function (_value) {
                this.perSecondTapDamage += _value;
                this.CurrentDps = this.perSecondTapDamage + this.dy.friendDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "CurrentDps", {
            set: function (_value) {
                this.currentDps = _value;
                Main.singleton.mainMenuVM.setCurrentDps(this.CurrentDpsAndUnit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "CurrentDpsAndUnit", {
            /**
             * @带单位当前秒伤.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.currentDps);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "Jewel", {
            /**
             * @直接设置灵石数量.
             */
            set: function (_value) {
                this.dy.jewel = _value;
                //            Main.singleton.mainGameVM.sceneInfo
                //TODO: by zhu_jun,这边需要更新灵石.
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "AddJewel", {
            /**
             * @正加负减灵石数量.
             */
            set: function (_value) {
                this.dy.jewel = Number(this.dy.jewel) + _value;
                //            Main.singleton.mainGameVM.sceneInfo
                //TODO: by zhu_jun,这边需要更新灵石.
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "Gold", {
            /**
             * @设置动态金币数量.
             */
            set: function (_value) {
                this.dy.gold = _value;
                Main.singleton.mainGameVM.setMoney(this.SilverAndUnit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "AddGold", {
            /**
             * @正加负减金币数量.
             */
            set: function (_value) {
                this.dy.gold += _value;
                Main.singleton.mainGameVM.setMoney(this.SilverAndUnit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "SilverAndUnit", {
            /**
             * @带单位金币总额.
             */
            get: function () {
                var value = Model.MainLocalService.toUnitConversion(this.dy.gold);
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "ClickDamage", {
            set: function (_value) {
                this.dy.clickDamage = _value;
                Main.singleton.mainMenuVM.setTapDamage(this.ClickDamageAndUnit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "ClickDamageAndUnit", {
            /**
             * @带单位点击伤害.
             */
            get: function () {
                var value = Model.MainLocalService.toUnitConversion(this.dy.clickDamage);
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "ClickDamageDeltaUnit", {
            /**
             * @带单位的和下一级的点击伤害差值.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.clickDamageDelta);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "UpgradeCostAndUnit", {
            /**
             * @带单位升级花费.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.upgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "TenUpgradeCostAndUnit", {
            /**
             * @带单位10连升花费
             * @by cai_haotian 2016.3.8.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.tenUpgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "HundredUpgradeCostAndUnit", {
            /**
             * @带单位100连升花费
             * @by cai_haotian 2016.3.8.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hundredUpgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "FriendDamage", {
            /**
             * @设置挚友伤害.
             */
            set: function (_value) {
                this.dy.friendDamage = _value;
                Main.singleton.mainMenuVM.setFriendDps(this.FriendDamageAndUnit);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "FriendDamageAndUnit", {
            /**
             * @带单位挚友总秒伤.
             */
            get: function () {
                var value = Model.MainLocalService.toUnitConversion(this.dy.friendDamage);
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "BaseCritDmageMultiple", {
            /**
             * @获得基础暴击率
             * @by cai_haotian 2016.3.23
             */
            get: function () {
                var value = Number(this.st.baseCritDamageMultiple);
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "CritDamage", {
            /**
             * @获取暴击伤害.
             * @by cai_haotian 2016.3.23.
             */
            get: function () {
                this.critDamage = (this.BaseCritDmageMultiple + Model.FriendLocalService.FriendSkillTypeCrit / 100 + Model.MagicWeaponService.AddCritDamage / 100 + Model.ClanLocalService.AddTypeCrit / 100) * this.dy.clickDamage;
                return this.critDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "CritRate", {
            /**
             * @获取暴击率.
             * @by cai_haotian 2016.3.23
             */
            get: function () {
                this.critRate = this.st.baseCritProbability * 100 + Model.FriendLocalService.FriendSkillTypeCritProbability / 1 + Model.MagicWeaponService.AddCritChance / 1;
                if (this.critRate > 100) {
                    this.critRate = 100;
                }
                return this.critRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "OffLineMoney", {
            /**
             * @离线奖励显示
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.offLineMoney);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "EffectPngJson", {
            /**
     * @特效配置
     */
            get: function () {
                return this.st.playerEffect + "_tex_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "EffectPng", {
            /**
             * @特效图片
             */
            get: function () {
                return this.st.playerEffect + "_tex_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "Effect", {
            /**
             * @特效粒子
             */
            get: function () {
                return this.st.playerEffect + "_ske_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "AttackJson", {
            /**
             * @主角攻击配置.
             */
            get: function () {
                return this.st.playerDragonBones + "_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "AttackPng", {
            /**
             * @主角攻击图片.
             */
            get: function () {
                return this.st.playerDragonBones + "_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "PlayerAttack", {
            /**
             * @主角攻击.
             */
            get: function () {
                return this.st.playerDragonBones + "_attack";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "PlayerIdle", {
            /**
             * @主角待机.
             */
            get: function () {
                return this.st.playerDragonBones + "_idle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "DBJson", {
            /**
             * @主角龙骨配置.
             * @bodyGuanYu_ske_json
             */
            get: function () {
                return this.st.playerDragonBones + "_ske_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "DBPngJson", {
            /**
             * @主角待机图片配置.
             * @bodyGuanYu_tex_json
             */
            get: function () {
                return this.st.playerDragonBones + "_tex_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "DBPng", {
            /**
             * @主角待机图片.
             * @示例:bodyGuanYu_tex_png
             */
            get: function () {
                return this.st.playerDragonBones + "_tex_png";
            },
            enumerable: true,
            configurable: true
        });
        return PlayerData;
    }());
    Model.PlayerData = PlayerData;
    __reflect(PlayerData.prototype, "Model.PlayerData");
})(Model || (Model = {}));
//# sourceMappingURL=PlayerData.js.map