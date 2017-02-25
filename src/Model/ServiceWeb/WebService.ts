module Model {
    /**
	 * @author: zhu_jun.
	 * @date: 2015.12.23.
	 * @Note:
	 * 1.重新分装网络层,主要是为了解决异常处理,加载场景是否中断请求，兼容get请求，兼容非json参数等问题.
	 * 2.本质是在业务层和egret的网络层之间又加了一层增加其扩展性，但就目前来看，针对H5游戏有些重了.
	 */
    export class WebService implements IWebService {

        public constructor() {

        }

        /**
         * @登录接口.
         */
        public static userLogin(_account: AccountModel, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            if (WebValue.isWebService) {
                var request: UserLogin = new UserLogin(_account);
                request.successCallBack = _successCallBack;
                request.failedCallBack = _failedCallBack;
                request.StartService();
            } else {
                _successCallBack(null);
            }
        }

        /**
         * @更新动态数据接口.
         */
        public static updateDyData(_successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            if (WebValue.isWebService) {
                // var request = new UpdateDyData();
                // request.successCallBack = _successCallBack;
                // request.failedCallBack = _failedCallBack;
                // request.StartService();
            } else {
                let dyData = JSON.parse(egret.localStorage.getItem("dyDB_json"));
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

        }

        /**
         * @更新静态数据接口.
         */
        public static updateStData(_successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            if (WebValue.isWebService) {//发送网络请求.
                var request = new UpdateStData();
                request.successCallBack = _successCallBack;
                request.failedCallBack = _failedCallBack;
                request.StartService();
            } else {//不发送网络请求.
                var stData = RES.getRes("stDB_json");
                // alert("stData  "+JSON.stringify(stData));
                _successCallBack(stData);
            }
        }

        /**
         * @提交数据.
         */
        public static commitData(_dataDy: DataDyModel, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new CommitData(_dataDy);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @商城购买
         * @by cai_haotian 2016.3.1
         */
        public static commitShop(_shopDy: ShopDyModel, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new CommitShop(_shopDy);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @释放技能
         * @by cai_haotian 2016.3.7.
         */
        public static ReleaseSkillCD(_skillId: number, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new ReleaseSkillCD(_skillId);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @清除技能CD
         * @by cai_haotian 2016.3.1
         */
        public static CleanSkillCD(_skillId: number, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new CleanSkillCD(_skillId);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @获取每日充值信息
         * @by cai_haotian 2016.3.23
         */
        public static UpdateDailyRecharge(_successCalBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new UpdateDailyRecharge();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @获取每日充值奖励
         * @by cai_haotian 2016.3.23.
         */
        public static GetDailyRecharge(_id: number, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new GetDailyRecharge(_id);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @获取累积充值信息
         * @by cai_haotian 2016.3.23.
         */
        public static UpdateCumulativeRecharge(_successCalBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new UpdateCumulativeRecharge();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @获取每日充值奖励
         * @by cai_haotian 2016.3.23.
         */
        public static GetCumulativeRecharge(_id: number, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new GetCumulativeRecharge(_id);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @排名接口
         */
        public static RankingData(_successCalBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new RankingData();
            request.successCallBack = _successCalBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @测试充值接口
         * @by cai_haotian 2016.3.24.
         */
        public static Recharge(_successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new Recharge();
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @成就获取接口
         * @by cai_haotian 2016.4.5.
         */
        public static AchievementInfo(_data: Model.AchievementDyModel, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new AchievementInfo(_data);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

        /**
         * @兑换码获取接口
         * @by cai_haotian 2016.4.5.
         */
        public static PartInRward(_data: string, _successCallBack: <T>(backObj: T) => void = (bObj) => { }, _failedCallBack: (error: WebServiceErrorCode) => void = (bE) => { }) {
            var request = new PartInRward(_data);
            request.successCallBack = _successCallBack;
            request.failedCallBack = _failedCallBack;
            request.StartService();
        }

    }

	/**
	 * @登陆接口.
	 */
    export class UserLogin extends WebServiceNonResponseBase {
        /**
         * @构造方法.
         * @param: _accountM : AccountModel.
         */
        public constructor(_accountM: AccountModel) {
            super(String(WebServiceBase.SelectedLoginAddress + "user/login/"), _accountM);
        }
    }
	/**
	 * @更新动态数据.
	 * @param: "".
	 */
    export class UpdateDyData extends WebServiceResponseBase<DataDyModel>{
        /**
         * @构造方法. 
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress + "update/dynamicData/"), {});
        }
    }
    /**
     * @更新静态数据.
     */
    export class UpdateStData extends WebServiceResponseBase<DataStModel>{
        /**
         * @构造方法.
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress + "update/staticData/"), {});
        }
    }
    /**
     * @提交数据.
     */
    export class CommitData extends WebServiceNonResponseBase {
        /**
         * @构造方法.
         */
        public constructor(_dyData: DataDyModel) {
            super(String(WebServiceBase.SelectedServerAddress + "commit/data/"), _dyData);
        }
    }

    /**
     * @商城购买数据
     * @by cai_haotian 2016.3.1.
     */
    export class CommitShop extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_shopDy: ShopDyModel) {
            super(String(WebServiceBase.SelectedServerAddress + "shop/buy/"), _shopDy);
        }
    }

    /**
     * @释放技能
     * @by cai_haotian 2016.3.7.
     */
    export class ReleaseSkillCD extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_skillId: number) {
            var hash: HashMap = new HashMap();
            hash.Set("skillId", _skillId);
            super(String(WebServiceBase.SelectedServerAddress + "skill/releaseSkill/"), hash, WebServiceType.Post, true);
        }
    }

    /**
     * @清除技能CD
     * @by cai_haotian 2016.3.7.
     */
    export class CleanSkillCD extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_skillId: number) {
            var hash: HashMap = new HashMap();
            hash.Set("skillId", _skillId);
            super(String(WebServiceBase.SelectedServerAddress + "skill/cleanSkillCD/"), hash);
        }
    }


    /**
     * @获取每日充值信息 
     * @by cai_haotian 2016.3.23
     */
    export class UpdateDailyRecharge extends WebServiceResponseBase<DailyRechargeInfo>{
        /**
         * @构造方法. 
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress + "dailyRecharge/data/"), {});
        }
    }

    /**
     * @获得每日充值奖励
     * @by cai_haotian 2016.3.23.
     */
    export class GetDailyRecharge extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_id: number) {
            var hash: HashMap = new HashMap();
            hash.Set("dailyRechargeId", _id);
            super(String(WebServiceBase.SelectedServerAddress + "dailyRecharge/get/"), hash);
        }
    }

    /**
     * @获取累充奖励信息
     * @by cai_haotian 2016.3.23.
     */
    export class UpdateCumulativeRecharge extends WebServiceResponseBase<CumulativeRechargeInfo>{
        /**
         * @构造方法
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress) + "cumulativeRecharge/data/", {});
        }
    }

    /**
     * @获得累充奖励
     * @by cai_haotian 2016.3.23.
     */
    export class GetCumulativeRecharge extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_id: number) {
            var hash: HashMap = new HashMap();
            hash.Set("cumulativeId", _id);
            super(String(WebServiceBase.SelectedServerAddress + "cumulativeRecharge/get/"), hash);
        }
    }

    /**
     * @获取累充奖励信息
     * @by cai_haotian 2016.3.28.
     */
    export class RankingData extends WebServiceResponseBase<RankDyModel>{
        /**
         * @构造方法
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress) + "ranking/Data/", {});
        }
    }

    /**
     * @充值接口
     * @by cai_haotian 2016.3.30
     */
    export class Recharge extends WebServiceResponseBase<ShopStModel>{
        /**
         * @构造方法
         */
        public constructor() {
            super(String(WebServiceBase.SelectedServerAddress + "recharge/recharge/"), {});
        }
    }

    /**
     * @成就领取接口
     * @by cai_haotian 2016.4.5
     */
    export class AchievementInfo extends WebServiceNonResponseBase {
        /**
         * @构造方法
         */
        public constructor(_data: AchievementDyModel) {
            var hash: HashMap = new HashMap();
            hash.Set("achievementModel", _data);
            super(String(WebServiceBase.SelectedServerAddress + "achievement/get/"), hash);
        }
    }

    /**
     * @兑换码接口 
     * @by cai_haotian 2016.5.24
     */
    export class PartInRward extends WebServiceResponseBase<ShopStModel>{
        /**
         * @构造方法
         */
        public constructor(_data: string) {
            var hash: HashMap = new HashMap();
            hash.Set("id", _data);
            super(String(WebServiceBase.SelectedServerAddress + "Code/reward"), hash);
        }
    }
}
