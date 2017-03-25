var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.23.
     * @Note:
     * 1.重新分装网络层,主要是为了解决异常处理,加载场景是否中断请求，兼容get请求，兼容非json参数等问题.
     * 2.本质是在业务层和egret的网络层之间又加了一层增加其扩展性，但就目前来看，针对H5游戏有些重了.
     */
    var WebService = (function () {
        function WebService() {
        }
        /**
         * @登录接口.
         */
        WebService.userLogin = function (_account, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            if (Model.WebValue.isWebService) {
                var request = new UserLogin(_account);
                request.successCallBack = _successCallBack;
                request.failedCallBack = _failedCallBack;
                request.StartService();
            }
            else {
                _successCallBack(null);
            }
        };
        /**
         * @更新动态数据接口.
         */
        WebService.updateDyData = function (_successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            if (Model.WebValue.isWebService) {
            }
            else {
                var dyData = JSON.parse(egret.localStorage.getItem("dyDB_json"));
                // alert("dyData 1 " + dyData);
                if (dyData == null || dyData == "undefined") {
                    // alert("dy data RES.getRes " + RES.getRes("dyDB_json"));
                    egret.localStorage.setItem("dyDB_json", JSON.stringify(RES.getRes("dyDB_json")));
                    dyData = JSON.parse(egret.localStorage.getItem("dyDB_json"));
                }
                // alert("dyData 2 " + JSON.stringify(dyData));
                //  = RES.getRes("dyDB_json");
                _successCallBack(dyData);
            }
        };
        /**
         * @更新静态数据接口.
         */
        WebService.updateStData = function (_successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            if (Model.WebValue.isWebService) {
                var request = new UpdateStData();
                request.successCallBack = _successCallBack;
                request.failedCallBack = _failedCallBack;
                request.StartService();
            }
            else {
                var stData = RES.getRes("stDB_json");
                // alert("stData  "+JSON.stringify(stData));
                _successCallBack(stData);
            }
        };
        /**
         * @提交数据.
         */
        WebService.commitData = function (_dataDy, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new CommitData(_dataDy);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @商城购买
         * @by cai_haotian 2016.3.1
         */
        WebService.commitShop = function (_shopDy, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new CommitShop(_shopDy);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @释放技能
         * @by cai_haotian 2016.3.7.
         */
        WebService.ReleaseSkillCD = function (_skillId, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new ReleaseSkillCD(_skillId);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @清除技能CD
         * @by cai_haotian 2016.3.1
         */
        WebService.CleanSkillCD = function (_skillId, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new CleanSkillCD(_skillId);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @获取每日充值信息
         * @by cai_haotian 2016.3.23
         */
        WebService.UpdateDailyRecharge = function (_successCalBack, _failedCallBack) {
            if (_successCalBack === void 0) { _successCalBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new UpdateDailyRecharge();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @获取每日充值奖励
         * @by cai_haotian 2016.3.23.
         */
        WebService.GetDailyRecharge = function (_id, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new GetDailyRecharge(_id);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @获取累积充值信息
         * @by cai_haotian 2016.3.23.
         */
        WebService.UpdateCumulativeRecharge = function (_successCalBack, _failedCallBack) {
            if (_successCalBack === void 0) { _successCalBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new UpdateCumulativeRecharge();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @获取每日充值奖励
         * @by cai_haotian 2016.3.23.
         */
        WebService.GetCumulativeRecharge = function (_id, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new GetCumulativeRecharge(_id);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @排名接口
         */
        WebService.RankingData = function (_successCalBack, _failedCallBack) {
            if (_successCalBack === void 0) { _successCalBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new RankingData();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @测试充值接口
         * @by cai_haotian 2016.3.24.
         */
        WebService.Recharge = function (_successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new Recharge();
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @成就获取接口
         * @by cai_haotian 2016.4.5.
         */
        WebService.AchievementInfo = function (_data, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new AchievementInfo(_data);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        /**
         * @兑换码获取接口
         * @by cai_haotian 2016.4.5.
         */
        WebService.PartInRward = function (_data, _successCallBack, _failedCallBack) {
            if (_successCallBack === void 0) { _successCallBack = function (bObj) { }; }
            if (_failedCallBack === void 0) { _failedCallBack = function (bE) { }; }
            var request = new PartInRward(_data);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        };
        return WebService;
    }());
    Model.WebService = WebService;
    __reflect(WebService.prototype, "Model.WebService", ["Model.IWebService"]);
    /**
     * @登陆接口.
     */
    var UserLogin = (function (_super) {
        __extends(UserLogin, _super);
        /**
         * @构造方法.
         * @param: _accountM : AccountModel.
         */
        function UserLogin(_accountM) {
            return _super.call(this, String(Model.WebServiceBase.SelectedLoginAddress + "user/login/"), _accountM) || this;
        }
        return UserLogin;
    }(Model.WebServiceNonResponseBase));
    Model.UserLogin = UserLogin;
    __reflect(UserLogin.prototype, "Model.UserLogin");
    /**
     * @更新动态数据.
     * @param: "".
     */
    var UpdateDyData = (function (_super) {
        __extends(UpdateDyData, _super);
        /**
         * @构造方法.
         */
        function UpdateDyData() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "update/dynamicData/"), {}) || this;
        }
        return UpdateDyData;
    }(Model.WebServiceResponseBase));
    Model.UpdateDyData = UpdateDyData;
    __reflect(UpdateDyData.prototype, "Model.UpdateDyData");
    /**
     * @更新静态数据.
     */
    var UpdateStData = (function (_super) {
        __extends(UpdateStData, _super);
        /**
         * @构造方法.
         */
        function UpdateStData() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "update/staticData/"), {}) || this;
        }
        return UpdateStData;
    }(Model.WebServiceResponseBase));
    Model.UpdateStData = UpdateStData;
    __reflect(UpdateStData.prototype, "Model.UpdateStData");
    /**
     * @提交数据.
     */
    var CommitData = (function (_super) {
        __extends(CommitData, _super);
        /**
         * @构造方法.
         */
        function CommitData(_dyData) {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "commit/data/"), _dyData) || this;
        }
        return CommitData;
    }(Model.WebServiceNonResponseBase));
    Model.CommitData = CommitData;
    __reflect(CommitData.prototype, "Model.CommitData");
    /**
     * @商城购买数据
     * @by cai_haotian 2016.3.1.
     */
    var CommitShop = (function (_super) {
        __extends(CommitShop, _super);
        /**
         * @构造方法
         */
        function CommitShop(_shopDy) {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "shop/buy/"), _shopDy) || this;
        }
        return CommitShop;
    }(Model.WebServiceNonResponseBase));
    Model.CommitShop = CommitShop;
    __reflect(CommitShop.prototype, "Model.CommitShop");
    /**
     * @释放技能
     * @by cai_haotian 2016.3.7.
     */
    var ReleaseSkillCD = (function (_super) {
        __extends(ReleaseSkillCD, _super);
        /**
         * @构造方法
         */
        function ReleaseSkillCD(_skillId) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("skillId", _skillId);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "skill/releaseSkill/"), hash, Model.WebServiceType.Post, true) || this;
            return _this;
        }
        return ReleaseSkillCD;
    }(Model.WebServiceNonResponseBase));
    Model.ReleaseSkillCD = ReleaseSkillCD;
    __reflect(ReleaseSkillCD.prototype, "Model.ReleaseSkillCD");
    /**
     * @清除技能CD
     * @by cai_haotian 2016.3.7.
     */
    var CleanSkillCD = (function (_super) {
        __extends(CleanSkillCD, _super);
        /**
         * @构造方法
         */
        function CleanSkillCD(_skillId) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("skillId", _skillId);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "skill/cleanSkillCD/"), hash) || this;
            return _this;
        }
        return CleanSkillCD;
    }(Model.WebServiceNonResponseBase));
    Model.CleanSkillCD = CleanSkillCD;
    __reflect(CleanSkillCD.prototype, "Model.CleanSkillCD");
    /**
     * @获取每日充值信息
     * @by cai_haotian 2016.3.23
     */
    var UpdateDailyRecharge = (function (_super) {
        __extends(UpdateDailyRecharge, _super);
        /**
         * @构造方法.
         */
        function UpdateDailyRecharge() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "dailyRecharge/data/"), {}) || this;
        }
        return UpdateDailyRecharge;
    }(Model.WebServiceResponseBase));
    Model.UpdateDailyRecharge = UpdateDailyRecharge;
    __reflect(UpdateDailyRecharge.prototype, "Model.UpdateDailyRecharge");
    /**
     * @获得每日充值奖励
     * @by cai_haotian 2016.3.23.
     */
    var GetDailyRecharge = (function (_super) {
        __extends(GetDailyRecharge, _super);
        /**
         * @构造方法
         */
        function GetDailyRecharge(_id) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("dailyRechargeId", _id);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "dailyRecharge/get/"), hash) || this;
            return _this;
        }
        return GetDailyRecharge;
    }(Model.WebServiceNonResponseBase));
    Model.GetDailyRecharge = GetDailyRecharge;
    __reflect(GetDailyRecharge.prototype, "Model.GetDailyRecharge");
    /**
     * @获取累充奖励信息
     * @by cai_haotian 2016.3.23.
     */
    var UpdateCumulativeRecharge = (function (_super) {
        __extends(UpdateCumulativeRecharge, _super);
        /**
         * @构造方法
         */
        function UpdateCumulativeRecharge() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress) + "cumulativeRecharge/data/", {}) || this;
        }
        return UpdateCumulativeRecharge;
    }(Model.WebServiceResponseBase));
    Model.UpdateCumulativeRecharge = UpdateCumulativeRecharge;
    __reflect(UpdateCumulativeRecharge.prototype, "Model.UpdateCumulativeRecharge");
    /**
     * @获得累充奖励
     * @by cai_haotian 2016.3.23.
     */
    var GetCumulativeRecharge = (function (_super) {
        __extends(GetCumulativeRecharge, _super);
        /**
         * @构造方法
         */
        function GetCumulativeRecharge(_id) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("cumulativeId", _id);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "cumulativeRecharge/get/"), hash) || this;
            return _this;
        }
        return GetCumulativeRecharge;
    }(Model.WebServiceNonResponseBase));
    Model.GetCumulativeRecharge = GetCumulativeRecharge;
    __reflect(GetCumulativeRecharge.prototype, "Model.GetCumulativeRecharge");
    /**
     * @获取累充奖励信息
     * @by cai_haotian 2016.3.28.
     */
    var RankingData = (function (_super) {
        __extends(RankingData, _super);
        /**
         * @构造方法
         */
        function RankingData() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress) + "ranking/Data/", {}) || this;
        }
        return RankingData;
    }(Model.WebServiceResponseBase));
    Model.RankingData = RankingData;
    __reflect(RankingData.prototype, "Model.RankingData");
    /**
     * @充值接口
     * @by cai_haotian 2016.3.30
     */
    var Recharge = (function (_super) {
        __extends(Recharge, _super);
        /**
         * @构造方法
         */
        function Recharge() {
            return _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "recharge/recharge/"), {}) || this;
        }
        return Recharge;
    }(Model.WebServiceResponseBase));
    Model.Recharge = Recharge;
    __reflect(Recharge.prototype, "Model.Recharge");
    /**
     * @成就领取接口
     * @by cai_haotian 2016.4.5
     */
    var AchievementInfo = (function (_super) {
        __extends(AchievementInfo, _super);
        /**
         * @构造方法
         */
        function AchievementInfo(_data) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("achievementModel", _data);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "achievement/get/"), hash) || this;
            return _this;
        }
        return AchievementInfo;
    }(Model.WebServiceNonResponseBase));
    Model.AchievementInfo = AchievementInfo;
    __reflect(AchievementInfo.prototype, "Model.AchievementInfo");
    /**
     * @兑换码接口
     * @by cai_haotian 2016.5.24
     */
    var PartInRward = (function (_super) {
        __extends(PartInRward, _super);
        /**
         * @构造方法
         */
        function PartInRward(_data) {
            var _this = this;
            var hash = new Model.HashMap();
            hash.Set("id", _data);
            _this = _super.call(this, String(Model.WebServiceBase.SelectedServerAddress + "Code/reward"), hash) || this;
            return _this;
        }
        return PartInRward;
    }(Model.WebServiceResponseBase));
    Model.PartInRward = PartInRward;
    __reflect(PartInRward.prototype, "Model.PartInRward");
})(Model || (Model = {}));
//# sourceMappingURL=WebService.js.map