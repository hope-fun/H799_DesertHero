var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun.
     * @data: 2016.01.15.
     *
     */
    var FriendLocalService = (function () {
        function FriendLocalService() {
        }
        Object.defineProperty(FriendLocalService, "FriendSkillTypeAll", {
            /**
             * @挚友模块提供的所有伤害提升率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeAll;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkillTypeCrit", {
            /**
             * @挚友模块提供的暴击伤害加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeCrit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkillTypeCritProbability", {
            /**
             * @挚友模块提供的暴击率加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeCritProbability;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkillTypeClick", {
            /**
             * @挚友模块提供的点击伤害加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkillTypeCoin", {
            /**
             * @挚友模块提供的铜币掉落数量加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkillTypeBoxCoin", {
            /**
             * @挚友模块提供的宝箱铜币掉落数量加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeBoxCoin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendSkilTypeBoss", {
            /**
             * @挚友模块提供的Boss伤害加成率.
             */
            get: function () {
                return FriendLocalService.friendSkillTypeBoss;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FriendLocalService, "FriendList", {
            /**
             * @获取挚友数据.
             */
            get: function () {
                return FriendLocalService.friendList;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @设置挚友数据.
         */
        FriendLocalService.setFriendList = function () {
            Model.PlayerLocalService.PlayerData.dy.friendDamage = 0; //重置总秒伤.
            FriendLocalService.friendSkillTypeAll = 0;
            FriendLocalService.friendSkillTypeCrit = 0;
            FriendLocalService.friendSkillTypeCritProbability = 0;
            FriendLocalService.friendSkillTypeClick = 0;
            FriendLocalService.friendSkillTypeCoin = 0;
            FriendLocalService.friendSkillTypeBoxCoin = 0;
            FriendLocalService.friendSkillTypeBoss = 0;
            if (FriendLocalService.friendList) {
                Model.WebValue.dataDyModel.friendModelList = []; //重置网络层数据.
                Model.PlayerLocalService.PlayerData.allFriendLevel = 0;
                for (var i = 0; i < FriendLocalService.friendList.length; i++) {
                    FriendLocalService.updateFriendData(FriendLocalService.friendList[i]);
                    Model.WebValue.dataDyModel.friendModelList.push(FriendLocalService.friendList[i].dy); //更新网络层数据.
                }
            }
            else {
                FriendLocalService.friendList = [];
                for (var i = 0; i < Model.WebValue.dataStModel.friendSkillList.length; i++) {
                    var dy = Enumerable.From(Model.WebValue.dataDyModel.friendModelList).Where(function (x) { return x.friendId == Model.WebValue.dataStModel.friendSkillList[i].id; }).FirstOrDefault(null);
                    var data = new Model.FriendData(dy, Model.WebValue.dataStModel.friendSkillList[i]);
                    FriendLocalService.updateFriendData(data);
                    FriendLocalService.friendList.push(data);
                    FriendLocalService.recruitDemand(data); //设置招募条件 by cai_haotian 2016.3.28.
                }
            }
            return FriendLocalService.friendList;
        };
        /**
         * @购买或升级后更新挚友信息.
         */
        FriendLocalService.updateFriendData = function (_data) {
            _data.layerPercent = 0;
            //            _data.recruitCost = Model.MainLocalService.toTenConversion(_data.st.recruitCost,_data.st.recruitCostMagnitude); by zhu_jun,2016.02.20.
            //            PlayerLocalService.changeGold(_data.st.recruitCost,_data.st.recruitCostMagnitude);
            //            PlayerLocalService.changeGold();//TODO: by zhu_jun,2016.02.23.上面几句应该都没用了,如果没问题过段时间可以删掉.
            //            console.log("zhujun: _data.st.upgrade base damage " + _data.st.baseDamage);
            _data.dpsBase = Model.MainLocalService.toTenConversion(_data.st.baseDamage, _data.st.baseDamageMagnitude);
            if (_data.dy) {
                FriendLocalService.layerMatch(_data); //设置挚友层级对自身的加成，注意:必须要先算层级加成.
                //                console.log("zhujun: _data.st.upgrade base cost " + _data.st.upgradeBaseCost);
                _data.upgradeBaseCost = Model.MainLocalService.toTenConversion(_data.st.upgradeBaseCost, _data.st.baseCostMagnitude);
                _data.upgradeCost = FriendLocalService.friendUpgradeCost(_data.upgradeBaseCost, _data.st.upgradeCostMultiple, _data.dy.level); //这个要在算效果之前调用.
                _data.tenUpgradeCost = FriendLocalService.tenFriendUpgradeCost(_data.upgradeBaseCost, _data.st.upgradeCostMultiple, _data.dy.level); //10连升耗费金币 by cai_haotian 2016.3.9
                _data.hundredUpgradeCost = FriendLocalService.hundredFriendUpgradeCost(_data.upgradeBaseCost, _data.st.upgradeCostMultiple, _data.dy.level); //10连升耗费金币 by cai_haotian 2016.3.9
                _data.layerCost = FriendLocalService.layerCost(_data.upgradeCost);
                //                _data.layerMatchLevel = FriendLocalService.layerMatchLevel(_data.sceneId.level);
                _data.layerMatchLevel = FriendLocalService.layerMatchLevel(_data.dy); //by cai_haotian 2016.3.22.
                //                if(_isUpgrade) {//升级时是先加后算。//by zhu_jun,2016.02.19.
                //                    PlayerLocalService.PlayerData.sceneId.friendDamage += _data.dpsDelta;//升级加总值的时候，加的是插值.
                //                    PlayerLocalService.PlayerData.FriendDamageUnit = MainLocalService.toUnitConversion(PlayerLocalService.PlayerData.sceneId.friendDamage);
                //                    _data.dps = FriendLocalService.setFriendEffect(_data);//设置挚友单个挚友伤害.
                //                    _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);
                //                    _data.dpsNext = FriendLocalService.setFriendEffect(_data,true);
                //                    _data.DpsNextAndUnit = MainLocalService.toUnitConversion(_data.dpsNext);
                //                    _data.dpsDelta = _data.dpsNext - _data.dps;
                //                    _data.DpsDeltaUnit = MainLocalService.toUnitConversion(_data.dpsDelta);
                //                } else {//解锁是先算后加.
                _data.dps = FriendLocalService.setFriendEffect(_data); //设置挚友单个挚友伤害.
                _data.dpsNext = FriendLocalService.setFriendEffect(_data, true);
                //                    _data.DpsNextAndUnit = MainLocalService.toUnitConversion(_data.dpsNext);by zhu_jun,2017.01.24.理论上用的时候直接get.
                _data.dpsDelta = _data.dpsNext - _data.dps;
                var myDate = new Date();
                var now = myDate.getTime() / 1000;
                if (_data.dy.sealCD < now) {
                    Model.PlayerLocalService.PlayerData.dy.friendDamage += _data.dps; //最后把所有的单个技能秒伤效果相加，得到挚友总秒伤
                    _data.dy.sealCD = 0; //重置技能封印cd时间
                }
                Model.PlayerLocalService.PlayerData.allFriendLevel += _data.dy.level; //by cai_haotian 2016.3.25.
            }
            else {
                _data.upgradeBaseCost = Model.MainLocalService.toTenConversion(_data.st.upgradeBaseCost, _data.st.baseCostMagnitude);
                _data.upgradeCost = FriendLocalService.friendUpgradeCost(_data.upgradeBaseCost, _data.st.upgradeCostMultiple, 1); //这个要在算效果之前调用.
                //                _data.UpgradeCostAndUnit = Model.MainLocalService.toUnitConversion(_data.upgradeCost);
                _data.layerCost = FriendLocalService.layerCost(_data.upgradeCost);
                //                _data.LayerCostAndUnit = Model.MainLocalService.toUnitConversion(_data.layerCost);
                _data.dps = FriendLocalService.setFriendEffect(_data);
                //                _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);TODO:by zhu_jun,2017.01.24.理论上这边不用赋值,用的时候直接get.
                _data.dpsDelta = _data.dps;
                //                _data.DpsDeltaUnit = _data.DpsAndUnit;TODO:by zhu_jun,这句话没看懂,理论上用的时候直接get.
                Model.PlayerLocalService.PlayerData.dy.friendDamage += 0; //最后把所有的单个技能秒伤效果相加，得到挚友总秒伤
            }
        };
        /**
         * @挚友技能升级效果计算公式.
         * @技能效果=base_damage*upgrade_damage_multiple ^（技能等级-1）
         * @_type: 挚友或挚友技能
         * @技能效果=skill_effect_value + skill_effect_add*（技能等级-1）
         * @单个技能秒伤效果=挚友技能升级效果*（1+N）
         * @获取挚友加成 1.挚友技能效果里的提升本技能伤害（FRIEND_SKILL_TYPE_SLEF）2.提升所有伤害（FRIEND_SKILL_TYPE_ALL）
         * @获取神器加成 1.神兵效果里的增加挚友伤害（WEAPON_TYPE_ADD_COMMON），2.增加所有武学伤害（WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE）
         * @兼容_data.sceneId==null时，数据初始化.
         */
        FriendLocalService.setFriendEffect = function (_data, isNext) {
            if (isNext === void 0) { isNext = false; }
            if (_data.dy) {
                if (isNext) {
                    var effect = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple, _data.dy.level);
                }
                else {
                    var effect = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple, _data.dy.level - 1);
                }
                //                Console.log("zhujun: effect base " + effect);
                switch (_data.Type) {
                    case Model.FriendType.FRIEND_TYPE_FRIEND:
                        effect = effect * (100 + _data.layerPercent + FriendLocalService.FriendSkillTypeAll + Model.MagicWeaponService.AddCommon + Model.ClanLocalService.AddTypeAll) / 100;
                        break;
                    case Model.FriendType.FRIEND_TYPE_SKILL:
                        effect = effect * (100 + _data.layerPercent + FriendLocalService.FriendSkillTypeAll + Model.MagicWeaponService.AddCommon + Model.MagicWeaponService.AddAllSkillDamage + Model.ClanLocalService.AddTypeAll) / 100;
                        break;
                    default:
                        alert("挚友类型错误,请联系客服 ! ");
                        break;
                }
            }
            else {
                var effect = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple, 0);
                //                Console.log("zhujun: var effect: number = _data.st.baseDamage * Math.pow(_data.st.upgradeDamageconsolee,0); " + effect);
                switch (_data.Type) {
                    case Model.FriendType.FRIEND_TYPE_FRIEND:
                        effect = effect * (100 + FriendLocalService.FriendSkillTypeAll + Model.MagicWeaponService.AddCommon + Model.ClanLocalService.AddTypeAll) / 100;
                        break;
                    case Model.FriendType.FRIEND_TYPE_SKILL:
                        effect = effect * (100 + FriendLocalService.FriendSkillTypeAll + Model.MagicWeaponService.AddCommon + Model.MagicWeaponService.AddAllSkillDamage + Model.ClanLocalService.AddTypeAll) / 100;
                        break;
                    default:
                        alert("挚友类型错误,请联系客服 ! ");
                        break;
                }
            }
            //            Console.log("zhujun: effect extra " + effect);
            return effect;
        };
        /**
         * @挚友技能升级消耗铜币公式.
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1).
         */
        FriendLocalService.friendUpgradeCost = function (_upgradeBaseCost, _upgradeCostMultiple, _level) {
            //            console.log("zhujun: _upgradeBaseCost " + _upgradeBaseCost);
            var value = 0;
            //TODO: by zhu_jun,本来是要做十连升，和百连升.
            //            for(var i = 1;i<_level;i++){
            //                
            //            }
            var value = _upgradeBaseCost * Math.pow(_upgradeCostMultiple, _level - 1);
            return value;
        };
        /**
         * @十连升挚友技能升级消耗铜币
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1).
         */
        FriendLocalService.tenFriendUpgradeCost = function (_upgradeBaseCost, _upgradeCostMultiple, _level) {
            var value = 0;
            for (var i = 0; i < 10; i++) {
                value += _upgradeBaseCost * Math.pow(_upgradeCostMultiple, _level + i - 1);
            }
            return value;
        };
        /**
         * @百连升挚友技能升级消耗铜币
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1).
         */
        FriendLocalService.hundredFriendUpgradeCost = function (_upgradeBaseCost, _upgradeCostMultiple, _level) {
            var value = 0;
            for (var i = 0; i < 100; i++) {
                value += _upgradeBaseCost * Math.pow(_upgradeCostMultiple, _level + i - 1);
            }
            return value;
        };
        /**
         * @设置招募条件
         * @by cai_haotian 2016.3.28.
         */
        FriendLocalService.recruitDemand = function (_data) {
            _data.recruitDemand = Number(_data.upgradeBaseCost) * Math.pow(Number(_data.st.upgradeCostMultiple), 1);
        };
        /**
         * @设置是否显示item
         * @by cai_haotian 2016.3.28.
         */
        FriendLocalService.isShow = function (_data, _friendDataList) {
            if (Model.PlayerLocalService.PlayerData.dy.gold >= _data.recruitDemand) {
                _data.reachRecruit = true;
            }
            else {
                var flag = Enumerable.From(_friendDataList).Select(function (x) { return x.reachRecruit == true; }).FirstOrDefault(null);
                if (flag) {
                    var maxId = Enumerable.From(_friendDataList).Where(function (x) { return x.reachRecruit == true; }).Max(function (x) { return x.st.id; });
                }
                else {
                    var maxId = 0;
                }
                if (maxId >= _data.st.id || _data.st.id - maxId == 1) {
                    _data.isShow = true;
                }
            }
        };
        /**
         * @层级开启消耗铜币公式：
         * @层级开启消耗铜币= upgrade_base_cost * upgrade_cost_multiple^(层级开启等级-1)*5
         */
        FriendLocalService.layerCost = function (_friendCost) {
            var value = _friendCost * 5;
            return value;
        };
        /**
         * @根据等级计算挚友当前可开启的层级.
         */
        FriendLocalService.layerMatchLevel = function (_data) {
            var layer = 0;
            //            if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFirst) <= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond)){
            //                return layer= 1;
            //            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond) <= _level && _level <parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird)){
            //                return layer = 2;
            //            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird) <= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth)){
            //                return layer = 3;
            //            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth)<=_level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth)){
            //                return layer = 4;
            //            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth)<= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth)){
            //                return layer = 5;
            //            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth)<=_level&& _level<parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh)){
            //                return layer = 6;
            //            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh) <= _level){
            //                return layer = 7;
            //            }else{
            //                return layer;
            //            }
            if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFirst) <= _data.level && _data.layerId == 0) {
                return layer = 1;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond) <= _data.level && _data.layerId == 1) {
                return layer = 2;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird) <= _data.level && _data.layerId == 2) {
                return layer = 3;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth) <= _data.level && _data.layerId == 3) {
                return layer = 4;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth) <= _data.level && _data.layerId == 4) {
                return layer = 5;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth) <= _data.level && _data.layerId == 5) {
                return layer = 6;
            }
            else if (parseInt(Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh) <= _data.level) {
                return layer = 7;
            }
            else {
                return layer;
            }
        };
        /**
         * @层级匹配.
         * @设置挚友层级加成效果对自身的影响以及对全局性的影响.
         * @不要break,几层就进几个case.
         */
        FriendLocalService.layerMatch = function (_data) {
            switch (_data.dy.layerId) {
                case 7:
                    FriendLocalService.setFriendLayerEffect(_data.SeventhLayerType, _data.st.seventhLayerValue, _data);
                case 6:
                    FriendLocalService.setFriendLayerEffect(_data.SixthLayerType, _data.st.sixthLayerValue, _data);
                case 5:
                    FriendLocalService.setFriendLayerEffect(_data.FifthLayerType, _data.st.fifthLayerValue, _data);
                case 4:
                    FriendLocalService.setFriendLayerEffect(_data.FourthLayerType, _data.st.fourthLayerValue, _data);
                case 3:
                    FriendLocalService.setFriendLayerEffect(_data.ThirdLayerType, _data.st.thirdLayerValue, _data);
                case 2:
                    FriendLocalService.setFriendLayerEffect(_data.SecondLayerType, _data.st.secondLayerValue, _data);
                case 1:
                    FriendLocalService.setFriendLayerEffect(_data.FirstLayerType, _data.st.firstLayerValue, _data);
                    break;
                case 0:
                    _data.layerPercent = 0;
                    if (Model.WebServiceBase.isDebug) {
                        console.log("zhujun: no friend layer , until break ! ");
                    }
                    break;
                default:
                    alert("技能层级数据异常,请联系客服人员 ! ");
                    break;
            }
        };
        /**
         * @设置好友层级加成.
         */
        FriendLocalService.setFriendLayerEffect = function (_type, _value, _data) {
            if (_type == Model.SkillFloorType.FRIEND_SKILL_TYPE_SLEF) {
                _data.layerPercent += _value;
                return;
            }
            if (_data.dy.sealCD > 0) {
                return;
            }
            switch (_type) {
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_ALL:
                    FriendLocalService.friendSkillTypeAll += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_CRIT:
                    FriendLocalService.friendSkillTypeCrit += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_CRIT_PROBABILITY:
                    FriendLocalService.friendSkillTypeCritProbability += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_CLICK:
                    FriendLocalService.friendSkillTypeClick += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_COIN:
                    FriendLocalService.friendSkillTypeCoin += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_BOX_COIN:
                    FriendLocalService.friendSkillTypeBoxCoin += _value;
                    break;
                case Model.SkillFloorType.FRIEND_SKILL_TYPE_BOSS:
                    FriendLocalService.friendSkillTypeBoss += _value;
                    break;
                default:
                    alert("挚友层级类型有误,请联系客服人员 ! ");
                    break;
            }
        };
        /**
         * @挚友或挚友技能购买成功回调用.
         */
        FriendLocalService.buySuccessedCallBack = function (_data) {
            _data.dy = new Model.FriendDyModel(_data.st.id, 1, 0); //创建挚友对象.
            if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_COIN) {
                Model.PlayerLocalService.changeGold(-_data.RecruitCost);
            }
            else if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                Model.PlayerLocalService.changeSycee(-_data.st.recruitCost);
            }
            else {
                alert("您的货币类型不正确,请及时联系客服!");
            }
            Model.PlayerLocalService.initAllData();
        };
        /**
         * @挚友升级成功.
         * @by cai_haotian 2016.3.14.
         */
        FriendLocalService.upgradeSuccessedCallBack = function (_data, _time) {
            switch (_time) {
                case 1:
                    _data.dy.level += 1; //等级加1. 
                    Model.PlayerLocalService.PlayerData.AddGold = -_data.upgradeCost;
                    break;
                case 10:
                    _data.dy.level += 10; //等级加10. 
                    Model.PlayerLocalService.PlayerData.AddGold = -_data.tenUpgradeCost;
                    break;
                case 100:
                    _data.dy.level += 100; //等级加100. 
                    Model.PlayerLocalService.PlayerData.AddGold = -_data.hundredUpgradeCost;
                    break;
                default: alert("挚友升级出错，请联系管理员！");
            }
            Model.PlayerLocalService.initAllData();
        };
        /**
         * @层级解锁成功.
         */
        FriendLocalService.layerSuccessedCallBack = function (_data) {
            _data.dy.layerId += 1;
            Model.PlayerLocalService.PlayerData.AddGold = -_data.layerCost;
            Model.PlayerLocalService.initAllData();
        };
        /**
         * @技能封印.
         * @封印在BOSS死亡时触发
         * @所有数据都在st_system_config里
         * @bossSkillFriendProbability是封印的概率
         * @bossSkillFriendTimeMin
         * @bossSkillFriendTimeMax为封印时间的下限和上限
         * @dieSceneCount开启等级.
         */
        FriendLocalService.sealFriendAndSkills = function () {
            if (Model.PlayerLocalService.PlayerData.dy.sceneId < Model.PlayerLocalService.PlayerData.st.dieSceneCount) {
                return;
            }
            var random = Model.Mathf.random(0, 10000);
            if (random >= Model.PlayerLocalService.PlayerData.st.bossSkillFriendProbability) {
                return;
            }
            var dyList = Enumerable.From(FriendLocalService.FriendList).Where(function (x) { return x.dy != null; }).ToArray();
            if (dyList.length) {
                var myDate = new Date();
                var now = myDate.getTime() / 1000;
                var randomData = dyList[Model.Mathf.random(0, dyList.length)]; //创建随机解锁对象,TODO:这边查出来来的可能是引用.dyList[0];//
                //这里技能封印时间设置为最终的时间 方便计算不要每秒去减 by cai_haotian 2016.4.18
                randomData.dy.sealCD = Math.round(Number(now) + Model.Mathf.random(Model.PlayerLocalService.PlayerData.st.bossSkillFriendTimeMin, Model.PlayerLocalService.PlayerData.st.bossSkillFriendTimeMax));
                if (Model.WebServiceBase.isDebug) {
                    console.log("cht sealcd is" + randomData.dy.sealCD);
                }
                Model.PlayerLocalService.initAllData(); //该数据,UI. TODO: 在层级和挚友那边都要做是否被封印的判断.
                Main.singleton.mainGameVM.switchFriend(randomData); //改主页
            }
            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                }
            }, function () {
                if (Model.WebValue.isTraditional) {
                    alert("數據提交失敗請聯繫管理員！！！！");
                }
                else {
                    alert("数据提交失败请联系管理员！！！！");
                }
            });
        };
        /**
         * @技能解封索需要钱数
         * @by cai_haotian 2016.4.18
         */
        FriendLocalService.setResurgenceMoney = function (_data, lastTime) {
            _data.sealCDMoney = Math.round(lastTime / 1800);
        };
        /**
         * @解除封印
         * @by cai_haotian 2016.4.18.
         */
        FriendLocalService.removeSealCD = function (_data) {
            Model.PlayerLocalService.PlayerData.dy.treasure -= _data.sealCDMoney;
            _data.dy.sealCD = 0;
            Model.PlayerLocalService.initAllData(); //TODO: 在层级和只有那边都要做是否被封印的判断.
            Main.singleton.mainGameVM.switchFriend(_data); //改主页
            //                Main.singleton.mainGameVM. 改主页
        };
        return FriendLocalService;
    }());
    /**
     * @挚友提供的所有伤害提升率.
     */
    FriendLocalService.friendSkillTypeAll = 0;
    /**
     * @挚友模块提供的暴击伤害加成率.
     */
    FriendLocalService.friendSkillTypeCrit = 0;
    /**
     * @挚友模块提供的暴击率加成率.
     */
    FriendLocalService.friendSkillTypeCritProbability = 0;
    /**
     * @挚友模块提供的点击伤害加成率.
     */
    FriendLocalService.friendSkillTypeClick = 0;
    /**
     * @挚友模块提供的铜币掉落数量加成率.
     */
    FriendLocalService.friendSkillTypeCoin = 0;
    /**
     * @挚友模块提供的宝箱铜币掉落数量加成率.
     */
    FriendLocalService.friendSkillTypeBoxCoin = 0;
    /**
     * @挚友模块提供的Boss伤害加成率.
     */
    FriendLocalService.friendSkillTypeBoss = 0;
    /**
     * @挚友列表数据.
     */
    FriendLocalService.friendList = null;
    Model.FriendLocalService = FriendLocalService;
    __reflect(FriendLocalService.prototype, "Model.FriendLocalService");
})(Model || (Model = {}));
