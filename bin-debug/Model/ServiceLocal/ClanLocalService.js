var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @date 2016.3.21
     *
     */
    var ClanLocalService = (function () {
        function ClanLocalService() {
        }
        Object.defineProperty(ClanLocalService, "ClanListData", {
            /**
             * @获取家族数据
             */
            get: function () {
                return ClanLocalService.clanListData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClanLocalService, "AddTypeAll", {
            /**
             * @获取增加所有伤害数值
             */
            get: function () {
                return ClanLocalService.addTypeAll;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClanLocalService, "AddTypeClick", {
            /**
             * @获取增加所有点击伤害数值
             */
            get: function () {
                return ClanLocalService.addTypeClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClanLocalService, "AddTypeCrit", {
            /**
             * @获取增加的暴击伤害
             */
            get: function () {
                return ClanLocalService.addTypeCrit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClanLocalService, "CutSkillCd", {
            /**
             * @获取减cd数值
             */
            get: function () {
                return ClanLocalService.cutSkillCd;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @设置家族数据
         */
        ClanLocalService.setClanList = function () {
            if (ClanLocalService.clanListData) {
                ClanLocalService.addTypeAll = 0;
                ClanLocalService.addTypeClick = 0;
                ClanLocalService.addTypeCrit = 0;
                ClanLocalService.cutSkillCd = 0;
                Model.WebValue.dataDyModel.clanModelList = []; //重置网络层数据.
                for (var _i = 0, _a = ClanLocalService.clanListData; _i < _a.length; _i++) {
                    var info = _a[_i];
                    ClanLocalService.setClanAttribute(info);
                    Model.WebValue.dataDyModel.clanModelList.push(info.dy);
                }
            }
            else {
                ClanLocalService.clanListData = [];
                for (var _b = 0, _c = Model.WebValue.dataStModel.clanList; _b < _c.length; _b++) {
                    var stInfo = _c[_b];
                    var dy = Enumerable.From(Model.WebValue.dataDyModel.clanModelList).Where(function (x) { return x.clanId == stInfo.id; }).FirstOrDefault(null);
                    var data = new Model.ClanData(stInfo, dy);
                    ClanLocalService.setClanAttribute(data);
                    ClanLocalService.clanListData.push(data);
                }
            }
            return ClanLocalService.clanListData;
        };
        /**
         * @设置各自属性
         */
        ClanLocalService.setClanAttribute = function (_data) {
            if (_data.dy) {
                switch (_data.Type) {
                    case Model.FamliyType.CLAN_TYPE_ALL:
                        ClanLocalService.addTypeAll += _data.st.clanValue;
                        break;
                    case Model.FamliyType.CLAN_TYPE_CLICK:
                        ClanLocalService.addTypeClick += _data.st.clanValue;
                        break;
                    case Model.FamliyType.CLAN_TYPE_CRIT:
                        ClanLocalService.addTypeCrit += _data.st.clanValue;
                        break;
                    case Model.FamliyType.CLAN_TYPE_CUT_SKILL_CD:
                        ClanLocalService.cutSkillCd += _data.st.clanValue;
                        break;
                    default: alert("家族加成属性出错！！请联系管理员！c");
                }
            }
        };
        /**
         * @购买回调函数
         */
        ClanLocalService.buySuccessCallBack = function (_data) {
            Model.PlayerLocalService.PlayerData.dy.treasure -= _data.st.activationCost;
            var dy = new Model.ClanDyModel(_data.st.id);
            _data.dy = dy;
            Model.PlayerLocalService.initAllData();
        };
        return ClanLocalService;
    }());
    /**
     * @家族数据
     */
    ClanLocalService.clanListData = null;
    /**
     * @增加所有伤害数值
     */
    ClanLocalService.addTypeAll = 0;
    /**
     * @增加所有点击伤害数值
     */
    ClanLocalService.addTypeClick = 0;
    /**
     * @增加暴击伤害
     */
    ClanLocalService.addTypeCrit = 0;
    /**
     * @减cd
     */
    ClanLocalService.cutSkillCd = 0;
    Model.ClanLocalService = ClanLocalService;
    __reflect(ClanLocalService.prototype, "Model.ClanLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=ClanLocalService.js.map