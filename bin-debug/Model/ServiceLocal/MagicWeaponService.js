var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.01.17.
     */
    var MagicWeaponService = (function () {
        function MagicWeaponService() {
        }
        Object.defineProperty(MagicWeaponService, "MagicWeaponList", {
            /**
             * @获取神器数据.
             */
            get: function () {
                return MagicWeaponService.magicWeaponList;
            },
            /**
             * @设置神器数据.
             */
            set: function (_data) {
                MagicWeaponService.magicWeaponList = _data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "BuyCost", {
            /**
             * @神器的购买价格.
             */
            get: function () {
                return MagicWeaponService.buyCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddCommon", {
            /**
             * @挚友伤害和挚友技能加成值.
             */
            get: function () {
                return MagicWeaponService.addCommon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutEnemyCount", {
            /**
             * @减少关卡需要击杀的敌人数量.
             */
            get: function () {
                return MagicWeaponService.cutEnemyCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddOffLineCoin", {
            /**
             * @增加游戏离线时的金币.
             */
            get: function () {
                return MagicWeaponService.addOffLineCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutSkillSealTime", {
            /**
             * @减少武学解除封印时间.
             */
            get: function () {
                return MagicWeaponService.cutSkillSealTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID1SkillCD", {
            /**
             * @减少破风剑诀技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID1SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddCoin", {
            /**
             * @提升铜币数量.
             */
            get: function () {
                return MagicWeaponService.addCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutBossHp", {
            /**
             * @减少boss血量.
             */
            get: function () {
                return MagicWeaponService.cutBossHp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddID3SkillTime", {
            /**
             * @增加破空霸拳技能的持续时间.
             */
            get: function () {
                return MagicWeaponService.addID3SkillTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddCritDamage", {
            /**
             * @增加暴击伤害.
             */
            get: function () {
                return MagicWeaponService.addCritDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddID1SkillDamage", {
            /**
             * @增加破风剑决技能的伤害.
             */
            get: function () {
                return MagicWeaponService.addID1SkillDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddID2SkillTime", {
            /**
             * @增加寒冰心法技能持续时间.
             */
            get: function () {
                return MagicWeaponService.addID2SkillTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID4SkillCD", {
            /**
             * @减少寂灭雷决技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID4SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID3SkillCD", {
            /**
             * @减少破空霸拳技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID3SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddAllSkillDamage", {
            /**
             * @增加所有武学伤害.
             */
            get: function () {
                return MagicWeaponService.addAllSkillDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddID5SkillTime", {
            /**
             * @增加凝神屏息技能持续时间.
             */
            get: function () {
                return MagicWeaponService.addID5SkillTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddBoxCoin", {
            /**
             * @增加宝箱敌人掉金币数量.
             */
            get: function () {
                return MagicWeaponService.addBoxCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddClickDamage", {
            /**
             * @增加点击伤害.
             */
            get: function () {
                return MagicWeaponService.addClickDamage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddCritChance", {
            /**
             * @增加暴击率.
             */
            get: function () {
                //            WEAPON_TYPE_ADD_CRIT_CHANCE
                return MagicWeaponService.addCritChance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID2SkillCD", {
            /**
             * @减少寒冰心法技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID2SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutSkillUselessChance", {
            /**
             * @减少武学禁用几率.
             */
            get: function () {
                return MagicWeaponService.cutSkillUselessChance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutUpLevelMoney", {
            /**
             * @减少升级费用.
             */
            get: function () {
                return MagicWeaponService.cutUpLevelMoney;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddChestChance", {
            /**
             * @增加宝箱敌人出现几率.
             */
            get: function () {
                return MagicWeaponService.addChestChance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID5SkillCD", {
            /**
             * @减少凝神屏息技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID5SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "CutID6SkillCD", {
            /**
             * @减少点石成金技能冷却时间.
             */
            get: function () {
                return MagicWeaponService.cutID6SkillCD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddID4SkillTime", {
            /**
             * @增加寂灭雷决技能持续时间.
             */
            get: function () {
                return MagicWeaponService.addID4SkillTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddBossTime", {
            /**
             * @增加的打boss时间.
             */
            get: function () {
                return MagicWeaponService.addBossTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddBossCoin", {
            /**
             * @增加的boss掉落铜币.
             */
            get: function () {
                return MagicWeaponService.addBossCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponService, "AddMuchCoinChance", {
            /**
             * @有一定概率获得10倍铜币.
             */
            get: function () {
                return MagicWeaponService.addMuchCoinChance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @设置神器数据.
         * @初始化的时候执行.
         */
        MagicWeaponService.setMagicWeaponList = function () {
            MagicWeaponService.addCommon = 0; //神器所有伤害重置.
            MagicWeaponService.cutEnemyCount = 0; //减少关卡要击杀的敌人数量重置
            MagicWeaponService.addOffLineCoin = 0; //增加游戏离线时的金币重置
            MagicWeaponService.cutSkillSealTime = 0; //减少武学解除封印时间重置
            MagicWeaponService.cutID1SkillCD = 0; //减少破风剑诀技能冷却时间重置 
            MagicWeaponService.addCoin = 0; //提升铜币数量重置
            MagicWeaponService.cutBossHp = 0; //减少boss血量重置
            MagicWeaponService.addID3SkillTime = 0; //增加破空霸拳技能的持续时间重置
            MagicWeaponService.addCritDamage = 0; //增加暴击伤害重置
            MagicWeaponService.addID1SkillDamage = 0; //增加破风剑诀进技能的伤害重置
            MagicWeaponService.addID2SkillTime = 0; //增加寒冰心法技能持续时间重置
            MagicWeaponService.cutID4SkillCD = 0; //减少寂灭雷诀技能冷却时间重置
            MagicWeaponService.cutID3SkillCD = 0; //减少破空霸全技能冷却时间重置
            MagicWeaponService.addAllSkillDamage = 0; //增加所有武学伤害重置;
            MagicWeaponService.addID5SkillTime = 0; //增加斌神凝息技能持续时间重置
            MagicWeaponService.addBoxCoin = 0; //增加宝箱敌人掉金币数量重置
            MagicWeaponService.addClickDamage = 0; //增加点击伤害重置
            MagicWeaponService.addCritChance = 0; //增加暴击率重置
            MagicWeaponService.cutID2SkillCD = 0; //减少寒冰心法技能冷却时间重置
            MagicWeaponService.cutSkillUselessChance = 0; //减少武学禁用几率重置
            MagicWeaponService.cutUpLevelMoney = 0; //减少升级费用重置
            MagicWeaponService.addChestChance = 0; //增加宝箱敌人出现几率重置
            MagicWeaponService.cutID5SkillCD = 0; //减少宁生屏息技能冷却时间重置
            MagicWeaponService.cutID6SkillCD = 0; //减少点石成金技能冷却时间重置
            MagicWeaponService.addID4SkillTime = 0; //增加寂灭雷诀技能持续时间重置
            MagicWeaponService.addBossTime = 0; //增加打boss时间重置
            MagicWeaponService.addBossCoin = 0; //增加boss掉落金币数量重置
            MagicWeaponService.addMuchCoinChance = 0; //有一定几率获得十倍铜币重置
            if (MagicWeaponService.magicWeaponList) {
                Model.WebValue.dataDyModel.magicWeaponModelList = []; //重置网络层数据.
                for (var i = 0; i < MagicWeaponService.magicWeaponList.length; i++) {
                    MagicWeaponService.updateMagicWeaponInfo(MagicWeaponService.magicWeaponList[i]);
                    Model.WebValue.dataDyModel.magicWeaponModelList.push(MagicWeaponService.magicWeaponList[i].dy); //更新网络层数据.
                }
            }
            else {
                MagicWeaponService.magicWeaponList = [];
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: WebValue.dataDyModel.magicWeaponModelList " + JSON.stringify(Model.WebValue.dataDyModel.magicWeaponModelList));
                }
                for (var i = 0; i < Model.WebValue.dataStModel.magicWeaponList.length; i++) {
                    var dy = Enumerable.From(Model.WebValue.dataDyModel.magicWeaponModelList).Where(function (x) { return x.magicWeaponId == Model.WebValue.dataStModel.magicWeaponList[i].id; }).FirstOrDefault(null);
                    var data = new Model.MagicWeaponData(dy, Model.WebValue.dataStModel.magicWeaponList[i]);
                    MagicWeaponService.updateMagicWeaponInfo(data);
                    MagicWeaponService.magicWeaponList.push(data);
                }
                MagicWeaponService.MagicWeaponList = Enumerable.From(MagicWeaponService.MagicWeaponList).OrderBy(function (x) { return x.dy == null; }).ThenBy(function (x) { return x.st.id; }).ToArray(); //排序.
            }
            MagicWeaponService.setMagicWeaponBuyCost(); //初始化神兵购买价格.
            return MagicWeaponService.magicWeaponList;
        };
        /**
         * @更新或初始化神器的效果.
         * @购买，升级等情况调用.
         * @购买、初始化:是多少传多少.
         * @升级:传差值.
         */
        MagicWeaponService.updateMagicWeaponInfo = function (_data, _isUpgrade) {
            if (_isUpgrade === void 0) { _isUpgrade = false; }
            if (_data.dy) {
                if (_isUpgrade) {
                    MagicWeaponService.setMagicWeaponEffect(_data.TypeFirst, _data.effectFirstNext - _data.effectFirst);
                    _data.effectFirst = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueFirst, _data.dy.level);
                    _data.effectFirstNext = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueFirst, _data.dy.level + 1);
                    MagicWeaponService.setMagicWeaponEffect(_data.TypeSecond, _data.effectSecondNext - _data.effectSecond);
                    _data.effectSecond = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueSecond, _data.dy.level);
                    _data.effectSecondNext = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueSecond, _data.dy.level + 1);
                }
                else {
                    _data.effectFirstNext = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueFirst, _data.dy.level + 1);
                    _data.effectFirst = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueFirst, _data.dy.level);
                    MagicWeaponService.setMagicWeaponEffect(_data.TypeFirst, _data.effectFirst);
                    _data.effectSecondNext = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueSecond, _data.dy.level + 1);
                    _data.effectSecond = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueSecond, _data.dy.level);
                    MagicWeaponService.setMagicWeaponEffect(_data.TypeSecond, _data.effectSecond);
                }
                _data.upgradeCost = MagicWeaponService.magicWeaponCost(_data.st.upgradeBaseCost, _data.dy.level);
            }
            else {
                _data.upgradeCost = MagicWeaponService.magicWeaponCost(_data.st.upgradeBaseCost, 1);
                _data.effectFirst = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueFirst, 1);
                _data.effectSecond = MagicWeaponService.magicWeaponEffect(_data.st.weaponEffectValueSecond, 1);
            }
        };
        /**
         * @_type:神兵效果类型.
         * @初始化神器效果数值.
         * @购买、初始化:是多少传多少.
         * @升级:传差值.
         */
        MagicWeaponService.setMagicWeaponEffect = function (_type, _addValue) {
            //            Console.log("zhujun: setMagicWeaponEffect(_type: MagicWeaponEffectType " + _type.toString() + " " + _addValue);
            switch (_type) {
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_COMMON:
                    MagicWeaponService.addCommon += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ENEMY_COUNT:
                    MagicWeaponService.cutEnemyCount += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_OFFLINE_COIN:
                    MagicWeaponService.addOffLineCoin += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_SKILL_SEAL_TIME:
                    MagicWeaponService.cutSkillSealTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID1_SKILL_CD:
                    MagicWeaponService.cutID1SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_COIN:
                    MagicWeaponService.addCoin += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_BOSS_HP:
                    MagicWeaponService.cutBossHp += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ID3_SKILL_TIME:
                    MagicWeaponService.addID3SkillTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_CRIT_DAMAGE:
                    MagicWeaponService.addCritDamage += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ID1_SKILL_DAMAGE:
                    MagicWeaponService.addID1SkillDamage += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ID2_SKILL_TIME:
                    MagicWeaponService.addID2SkillTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID4_SKILL_CD:
                    MagicWeaponService.cutID4SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID3_SKILL_CD:
                    MagicWeaponService.cutID3SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE:
                    MagicWeaponService.addAllSkillDamage += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ID5_SKILL_TIME:
                    MagicWeaponService.addID5SkillTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_BOX_COIN:
                    MagicWeaponService.addBoxCoin += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_CLICK_DAMAGE:
                    MagicWeaponService.addClickDamage += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_CRIT_CHANCE:
                    MagicWeaponService.addCritChance += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID2_SKILL_CD:
                    MagicWeaponService.cutID2SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_SKILL_USELESS_CHANCE:
                    MagicWeaponService.cutSkillUselessChance += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_UPLEVEL_MONEY:
                    MagicWeaponService.cutUpLevelMoney += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_CHEST_CHANCE:
                    MagicWeaponService.addChestChance += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID5_SKILL_CD:
                    MagicWeaponService.cutID5SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_CUT_ID6_SKILL_CD:
                    MagicWeaponService.cutID6SkillCD += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_ID4_SKILL_TIME:
                    MagicWeaponService.addID4SkillTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_BOSS_TIME:
                    MagicWeaponService.addBossTime += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_BOSS_COIN:
                    MagicWeaponService.addBossCoin += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_MUCH_COIN_CHANCE:
                    MagicWeaponService.addMuchCoinChance += _addValue;
                    break;
                case Model.MagicWeaponEffectType.WEAPON_TYPE_ADD_CRIT_CHANCE:
                    MagicWeaponService.addCritChance += _addValue;
                default:
                    break;
            }
        };
        /**
         * @神兵购买消耗灵石公式
         * @购买消耗灵石=MAX（1，当前拥有神兵数量^2+（当前拥有神兵数量-1）*2）
         */
        MagicWeaponService.setMagicWeaponBuyCost = function () {
            var list = Enumerable.From(Model.MagicWeaponService.MagicWeaponList);
            var result = list.Where(function (l) { return l.dy != null; }).ToArray();
            var num = result.length;
            MagicWeaponService.buyCost = Math.max(1, Math.pow(num, 2) + (num - 1) * 2);
            return MagicWeaponService.buyCost;
        };
        /**
         * @技能类型1效果=weapon_effect_value_first*神兵等级
         * @技能类型2效果=weapon_effect_value_second*神兵等级
         */
        MagicWeaponService.magicWeaponEffect = function (_effectValue, _level) {
            return _effectValue * _level;
        };
        /**
         * @神器升级消耗.
         * @升级消耗灵石=upgrade_base_cost * 神兵等级当前等级
         */
        MagicWeaponService.magicWeaponCost = function (_upgradeBaseCost, _level) {
            return _upgradeBaseCost * _level;
        };
        /**
         * @是否完全购买完成.
         */
        MagicWeaponService.isFull = function () {
            var noBuyList = Enumerable.From(MagicWeaponService.MagicWeaponList).Where(function (x) { return x.dy == null; }).ToArray(); //取出所有未解锁对象列表.
            if (noBuyList.length == 0) {
                //                alert("已经没有可以购买的神器了 ! ");
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @灵石购买成功回调用.
         */
        MagicWeaponService.buySuccessedCallBack = function () {
            var noBuyList = Enumerable.From(MagicWeaponService.MagicWeaponList).Where(function (x) { return x.dy == null; }).ToArray(); //取出所有未解锁对象列表.
            if (noBuyList.length == 0) {
                //                alert("已经没有可以购买的神器了 ! ");
                return;
            }
            var randomData = noBuyList[Model.Mathf.random(0, noBuyList.length)]; //创建随机解锁对象,TODO:这边查出来来的可能是引用.
            randomData.dy = new Model.MagicWeaponDyModel(randomData.st.id, 1); //给随机神器解锁.
            MagicWeaponService.MagicWeaponList = Enumerable.From(MagicWeaponService.MagicWeaponList).OrderBy(function (x) { return x.dy == null; }).ThenBy(function (x) { return x.st.id; }).ToArray(); //排序.
            Model.PlayerLocalService.PlayerData.AddJewel = -MagicWeaponService.BuyCost; //扣取灵石.
            //            WebValue.dataDyModel.playerModel.jewel -= MagicWeaponService.BuyCost;
            Model.PlayerLocalService.initAllData();
            //            MagicWeaponService.setMagicWeaponBuyCost();//设置下一个购买钱。
            //            MagicWeaponService.updateMagicWeaponInfo(randomData);//设置神器伤害.
            //            FriendLocalService.setFriendList();//reset挚友,神器更改会影响只有秒伤.
            //            PlayerSkillLocalService.setPlayerSkillList();
            //            PlayerLocalService.setPlayerData();
        };
        /**
         * @神器升级成功.
         */
        MagicWeaponService.upgradeSuccessedCallBack = function (_data) {
            //            Console.log("zhujun: upgrade mw is " +　JSON.stringify(_data));
            _data.dy.level += 1; //等级加1. 
            Model.PlayerLocalService.PlayerData.AddJewel = -_data.upgradeCost; //一、先扣取升级耗费的灵石.(注意:两个顺序不能反.)
            //            WebValue.dataDyModel.playerModel.jewel -= _data.upgradeCost;
            //            MagicWeaponService.updateMagicWeaponInfo(_data,true);////二、再计算下一级升级需要扣取多少灵石.三、设置神器伤害.因为是升级,所以要传差值.
            //            FriendLocalService.setFriendList();//reset挚友,神器更改会影响只有秒伤.
            //            PlayerSkillLocalService.setPlayerSkillList();
            Model.PlayerLocalService.initAllData();
        };
        return MagicWeaponService;
    }());
    /**
     * @神器列表数据对象.
     */
    MagicWeaponService.magicWeaponList = null;
    /**
     * @神器的购买价格.
     */
    MagicWeaponService.buyCost = 0;
    /**
     * @挚友伤害和挚友技能加成值.
     */
    MagicWeaponService.addCommon = 0;
    /**
     * @减少关卡需要击杀的敌人数量.
     */
    MagicWeaponService.cutEnemyCount = 0;
    /**
     * @增加游戏离线时的金币.
     */
    MagicWeaponService.addOffLineCoin = 0;
    /**
     * @减少武学解除封印时间.
     */
    MagicWeaponService.cutSkillSealTime = 0;
    /**
     * @减少破风剑诀技能冷却时间.
     */
    MagicWeaponService.cutID1SkillCD = 0;
    /**
     * @提升铜币数量.
     */
    MagicWeaponService.addCoin = 0;
    /**
     * @减少boss血量.
     */
    MagicWeaponService.cutBossHp = 0;
    /**
     * @增加破空霸拳技能的持续时间.
     */
    MagicWeaponService.addID3SkillTime = 0;
    /**
     * @增加暴击伤害.
     */
    MagicWeaponService.addCritDamage = 0;
    /**
     * @增加破风剑决技能的伤害.
     */
    MagicWeaponService.addID1SkillDamage = 0;
    /**
     * @增加寒冰心法技能持续时间.
     */
    MagicWeaponService.addID2SkillTime = 0;
    /**
     * @减少寂灭雷决技能冷却时间.
     */
    MagicWeaponService.cutID4SkillCD = 0;
    /**
     * @减少破空霸拳技能冷却时间.
     */
    MagicWeaponService.cutID3SkillCD = 0;
    /**
     * @增加所有武学伤害.
     */
    MagicWeaponService.addAllSkillDamage = 0;
    /**
     * @增加凝神屏息技能持续时间.
     */
    MagicWeaponService.addID5SkillTime = 0;
    /**
     * @增加宝箱敌人掉金币数量.
     */
    MagicWeaponService.addBoxCoin = 0;
    /**
     * @增加点击伤害.
     */
    MagicWeaponService.addClickDamage = 0;
    /**
     * @增加暴击率.
     */
    MagicWeaponService.addCritChance = 0;
    /**
     * @减少寒冰心法技能冷却时间.
     */
    MagicWeaponService.cutID2SkillCD = 0;
    /**
     * @减少武学禁用几率.
     */
    MagicWeaponService.cutSkillUselessChance = 0;
    /**
     * @减少升级费用.
     */
    MagicWeaponService.cutUpLevelMoney = 0;
    /**
     * @增加宝箱敌人出现几率.
     */
    MagicWeaponService.addChestChance = 0;
    /**
     * @减少凝神屏息技能冷却时间.
     */
    MagicWeaponService.cutID5SkillCD = 0;
    /**
     * @减少点石成金技能冷却时间.
     */
    MagicWeaponService.cutID6SkillCD = 0;
    /**
     * @增加寂灭雷决技能持续时间.
     */
    MagicWeaponService.addID4SkillTime = 0;
    /**
     * @增加的打boss时间.
     */
    MagicWeaponService.addBossTime = 0;
    /**
     * @增加的boss掉落铜币.
     */
    MagicWeaponService.addBossCoin = 0;
    /**
     * @有一定概率获得10倍铜币.
     */
    MagicWeaponService.addMuchCoinChance = 0;
    Model.MagicWeaponService = MagicWeaponService;
    __reflect(MagicWeaponService.prototype, "Model.MagicWeaponService");
})(Model || (Model = {}));
//# sourceMappingURL=MagicWeaponService.js.map