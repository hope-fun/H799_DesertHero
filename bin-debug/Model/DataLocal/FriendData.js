var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun
     * @date: 2016.01.15.
     */
    var FriendData = (function () {
        function FriendData(_dy, _st) {
            /**
             * @十连升挚友升级花费
             * @by cai_haotian 2016.3.9
             */
            this.tenUpgradeCost = 0;
            /**
             * @百连升挚友升级花费
             * @by cai_haotian 2016.3.9
             */
            this.hundredUpgradeCost = 0;
            /**
             * @是否显示item招募
             * @by cai_haotian 2016.3.28.
             */
            this.isShow = false;
            /**
             * @解封钱数
             * @by cai_haotian 2016.4.18.
             */
            this.sealCDMoney = 0;
            /**
             * @是否达到招募条件
             * @by cai_haotian 2016.3.28.
             */
            this.reachRecruit = false;
            /**
             * @招募条件
             * @by cai_haotian 2016.3.28.
             */
            this.recruitDemand = 0;
            this.dy = _dy;
            this.st = _st;
        }
        Object.defineProperty(FriendData.prototype, "DpsDeltaUnit", {
            /**
             * @dps带单位下一级差值.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.dpsDelta);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "DpsNextAndUnit", {
            /**
             * @带单位的下一级dps.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.dpsNext);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "DpsAndUnit", {
            /**
             * @带单位的秒伤.
             */
            get: function () {
                //            _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);
                return Model.MainLocalService.toUnitConversion(this.dps);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "LayerStr", {
            /**
             * @可解锁重级显示的文字.
             */
            get: function () {
                switch (this.layerMatchLevel) {
                    case 1:
                        return "第一重";
                    case 2:
                        return "第二重";
                    case 3:
                        return "第三重";
                    case 4:
                        return "第四重";
                    case 5:
                        return "第五重";
                    case 6:
                        return "第六重";
                    case 7:
                        return "第七重";
                    default:
                        return "满重";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "LayerCostAndUnit", {
            /**
             * @带单位层级cost.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.layerCost);
                ;
                //            _data.LayerCostAndUnit = MainLocalService.toUnitConversion(_data.layerCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "UpgradeCostAndUnit", {
            //        /**
            //         * @只有升级花费单位.
            //         */ 
            //        public get UpgradeCostUnit():string{
            //            return MainLocalService.toUnitConversion(this.upgradeCost);
            //        }
            /**
             * @带单位的挚友升级花费.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.upgradeCost);
                //            _data.UpgradeCostAndUnit = MainLocalService.toUnitConversion(_data.upgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(FriendData.prototype, "TenUpgradeCostAndUnit", {
            /**
             * @十连升挚友升级花费带单位
             * @by cai_haotian 2016.3.9
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.tenUpgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "hundredUpgradeCostAndUnit", {
            /**
             * @百连升挚友升级花费带单位
             * @by cai_haotian 2016.3.9
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hundredUpgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "RecruitDemand", {
            /**
             * @招募条件
             * @by cai_haotian 2016.3.28
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.recruitDemand);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "FirstLayerType", {
            /**
             * @技能一层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.firstLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "SecondLayerType", {
            /**
             * @技能二层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.secondLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "ThirdLayerType", {
            /**
             * @技能三层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.thirdLayerType];
                // this.st.sixthLayerType
                // this.st.seventhLayerType
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "FourthLayerType", {
            /**
             * @技能四层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.fourthLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "FifthLayerType", {
            /**
             * @技能五层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.fifthLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "SixthLayerType", {
            /**
             * @技能六层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.sixthLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "SeventhLayerType", {
            /**
             * @技能七层加成类型.
             */
            get: function () {
                return Model.SkillFloorType[this.st.seventhLayerType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "RecruitMoneyType", {
            /**
             * @招募货币消耗类型枚举.
             */
            get: function () {
                return Model.MoneyType[this.st.recruitMoneyType];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "RecruitCost", {
            /**
             * @挚友招募花费.
             */
            get: function () {
                return Model.MainLocalService.toTenConversion(this.st.recruitCost, this.st.recruitCostMagnitude);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "RecruitCostAndUnit", {
            /**
             * @带单位招募花费的钱.
             */
            get: function () {
                return String(this.st.recruitCost + Model.MainLocalService.getMagnitudeListById(this.st.recruitCostMagnitude));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "IsEnoughRecruit", {
            /**
             * @是够够金币招募.
             * @金币和元宝都通过这里判断.
             */
            get: function () {
                if (this.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_COIN) {
                    return Model.PlayerLocalService.isEnoughGold(this.RecruitCost);
                }
                else if (this.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                    return Model.PlayerLocalService.isEnoughSycee(this.RecruitCost);
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "Type", {
            /**
             * @挚友类型.
             */
            get: function () {
                return Model.FriendType[this.st.type];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "EffectJson", {
            //         _data.DBJson,
            // Model.PlayerLocalService.PlayerData.DBPngJson,
            // Model.PlayerLocalService.PlayerData.DBPng,
            // Model.PlayerLocalService.PlayerData.st.playerDragonBones,
            // /**
            //  * @待机配置.
            //  */
            // public get IdleJson(): string {
            //     return this.st.idle + "_json";
            // }
            // /**
            //  * @待机图片.
            //  */
            // public get IdlePng(): string {
            //     return this.st.idle + "_png";
            // }
            // /**
            //  * @攻击配置
            //  */
            // public get AttackJson(): string {
            //     return this.st.attack + "_json";
            // }
            // /**
            //  * @攻击图片
            //  */
            // public get AttackPng(): string {
            //     return this.st.attack + "_png";
            // }
            /**
             * @特效配置
             */
            get: function () {
                return this.st.effect + "_json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "EffectPng", {
            /**
             * @特效图片
             */
            get: function () {
                return this.st.effect + "_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "Effect", {
            /**
             * @特效粒子
             */
            get: function () {
                return this.st.effect + "_texiao";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "Icon", {
            get: function () {
                return this.st.icon + "_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "Attack", {
            /**
             * @主角攻击.
             */
            get: function () {
                return this.st.dragonBones + "_attack";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "Idle", {
            /**
             * @主角待机.
             */
            get: function () {
                return this.st.dragonBones + "_idle";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendData.prototype, "DBJson", {
            // /**
            //  * @受击动画名称.
            //  */
            // public get Hit(): string {
            //     return this.st.dragonBones + "_hit";
            // }
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
        Object.defineProperty(FriendData.prototype, "DBPngJson", {
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
        Object.defineProperty(FriendData.prototype, "DBPng", {
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
        return FriendData;
    }());
    Model.FriendData = FriendData;
    __reflect(FriendData.prototype, "Model.FriendData");
})(Model || (Model = {}));
