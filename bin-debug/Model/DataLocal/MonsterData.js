var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.02.03.
     * @怪物动态信息，在SceneData.
     */
    var MonsterData = (function () {
        function MonsterData(_st) {
            this.st = _st;
        }
        Object.defineProperty(MonsterData.prototype, "Idle", {
            // /**
            //  * @主角攻击.
            //  */
            // public get Attack(): string {
            // 	return this.st.dragonBones + "_attack";
            // }
            /**
             * @主角待机.
             */
            get: function () {
                return this.st.dragonBones + "_idle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "Hit", {
            /**
             * @受击动画名称.
             */
            get: function () {
                return this.st.dragonBones + "_hit";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "DBJson", {
            /**
             * @主角龙骨配置.
             * @bodyGuanYu_ske_json
             */
            get: function () {
                return this.st.dragonBones + "_ske_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "DBPngJson", {
            /**
             * @主角待机图片配置.
             * @bodyGuanYu_tex_json
             */
            get: function () {
                return this.st.dragonBones + "_tex_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "DBPng", {
            /**
             * @主角待机图片.
             * @示例:bodyGuanYu_tex_png
             */
            get: function () {
                return this.st.dragonBones + "_tex_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "AddHp", {
            /**
             * @怪物血量设置.
             */
            set: function (_value) {
                this.hp += _value;
                if (Model.WebServiceBase.isDebug) {
                }
                if (this.hp < 0) {
                    this.hp = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HpAndUnit", {
            /**
             * @带单位怪物血量.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hp);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "HpMaxAndUnit", {
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hpMax);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "DropMoneyAndUnit", {
            /**
             * @带单位怪物金币掉落数量.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.dropMoney);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonsterData.prototype, "MonsterType", {
            /**
             * @怪物类型.
             */
            get: function () {
                return Model.MonsterType[this.st.monsterType];
            },
            enumerable: true,
            configurable: true
        });
        return MonsterData;
    }());
    Model.MonsterData = MonsterData;
    __reflect(MonsterData.prototype, "Model.MonsterData");
})(Model || (Model = {}));
