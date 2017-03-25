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
     * @date: 2015.12.24.
     */
    var WebServiceBase = (function () {
        /**
         * @构造.
         * @param: _wsValue请求参数.
         * @param: _canLoadLevel加载场景是否继续请求.
         * @param: _isShowFireWind是否风火轮.
         */
        function WebServiceBase(_wsValue, _isShowFireWind, _canLoadLevel) {
            if (_isShowFireWind === void 0) { _isShowFireWind = false; }
            if (_canLoadLevel === void 0) { _canLoadLevel = false; }
            var _this = this;
            /**
             * @设置逻辑服务器地址.
             */
            // public static set SelectedServerAddress(_url: string) {
            //     // alert(2);
            //     WebServiceBase.withinServerUrl = _url;
            // }
            /**
             * @网络请求成功回调.
             */
            this.successCallBack = null; //Function = null;// 
            /**
             * @网络请求失败回调.
             */
            this.failedCallBack = null; //Function = null;//
            /**
             * @短链接请求方法.
             */
            this.startService = null;
            var toolKit = new Model.WebServiceToolKit();
            toolKit.isShowFireWind = _isShowFireWind;
            toolKit.wsValue = _wsValue;
            toolKit.successCallBack = function (bObj) { _this.onSuccess(bObj); };
            toolKit.failedCallBack = function (bE) { _this.onFailed(bE); };
            if (WebServiceBase.isDebug)
                console.log("this.toolKit.failedCallBack ", toolKit.failedCallBack);
            if (WebServiceBase.isDebug)
                console.log("zhujun: this.toolKit.wsValue " + toolKit.wsValue);
            this.startService = function () {
                toolKit.startService();
            };
        }
        Object.defineProperty(WebServiceBase, "Test", {
            get: function () {
                // alert("test");
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebServiceBase, "SelectedLoginAddress", {
            /**
             * @获取登陆服务器地址.
             */
            get: function () {
                if (WebServiceBase.isDebug)
                    console.log("SelectedLoginAddress: this.baseServerUrl is " + WebServiceBase.baseServerUrl + " this.withinLoginUrl " + WebServiceBase.withinLoginUrl);
                return WebServiceBase.isOutWeb ? WebServiceBase.baseServerUrl + WebServiceBase.outLoginUrl : WebServiceBase.baseServerUrl + WebServiceBase.withinLoginUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebServiceBase, "SelectedServerAddress", {
            /**
             * @获取逻辑服务器地址.
             */
            get: function () {
                // alert(1);
                if (WebServiceBase.isDebug)
                    console.log("SelectedServerAddress: this.baseServerUrl is ", WebServiceBase.baseServerUrl, " this.withinServerUrl " + WebServiceBase.withinServerUrl);
                return WebServiceBase.isOutWeb ? WebServiceBase.baseServerUrl + WebServiceBase.outServerUrl : WebServiceBase.baseServerUrl + WebServiceBase.withinServerUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebServiceBase.prototype, "StartService", {
            /**
             * @短链接请求开始发送.
             * @get属性点出来就能执行，不需要再加园括号.
             */
            get: function () {
                //            if(WebServiceBase.isDebug) console.log("zhujun: Start server ! " + JSON.stringify(toolKit.wsValue));
                return this.startService;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @请求成功调用.
         * @给toolkit执行.
         */
        WebServiceBase.prototype.onSuccess = function (_jString) {
            if (WebServiceBase.isDebug)
                console.log("zhujun: WebServiceBase onSuccess ! ");
        };
        ;
        /**
         * @请求失败调用.
         * @给toolkit执行.
         */
        WebServiceBase.prototype.onFailed = function (_error) {
            if (this.failedCallBack != null) {
                this.failedCallBack(_error);
            }
            else {
                if (WebServiceBase.isDebug)
                    console.log("Failed call back is null, set it first ! ");
            }
        };
        ;
        return WebServiceBase;
    }());
    /**
     * @是否发布外网.
     */
    WebServiceBase.isOutWeb = true;
    /**
     * @是否开启日志.
     */
    WebServiceBase.isDebug = true;
    //    	/**
    //    	 * @短链接工具包.
    //    	 */ 
    //        private toolKit: WebServiceToolKit = null;
    //        /**
    //         * @服务器基本地址.(本地)
    //         */
    //        public static baseServerUrl: string = "http://localhost:8080/";
    //        /**
    //         * @服务器基本地址.
    //         */ 
    //        public static baseServerUrl : string = "http://120.26.53.158:8082/";
    //        /**
    //         * @服务器基本地址.(赵超)
    //         */ 
    //        public static baseServerUrl: string = "http://10.20.20.66:8080/";
    //        /**
    //         * @服务器基本地址.(蔡昊天)
    //         */
    //        public static baseServerUrl: string = "http://10.20.20.60:8080/";
    //        /**
    //         * @服务器基本地址.(陈銘麒)
    //         */
    //          public static baseServerUrl: string = "http://10.20.20.39:8080/";
    //        /**
    //         * @服务器基本地址.(骏哥)
    //         */
    //         public static baseServerUrl: string = "http://10.20.20.3:8080/";
    /**
     * @外网测试地址.
     * @by cai_haotian 2016.2.1.
     */
    //        http://www.luckywings.net/sdk/js/1/channel/"正式国内
    //"http://webapp.hoperun.com:7070/";润和测试
    //        public static baseServerUrl: string = " http://www.luckywings.net/";
    //        public static baseServerUrl: string = "http://actcis.h5play.com.tw/api/";//台湾地址
    /**
     * @朱骏哥地址
     */
    WebServiceBase.baseServerUrl = " http://www.run7.pub/";
    /**
     * @登陆服务器地址
     */
    WebServiceBase.withinLoginUrl = "h601-login-service/mobiapi/1/";
    WebServiceBase.outLoginUrl = "h601/login/";
    // /**
    //  * @设置登陆服务器地址.
    //  */ 
    // public static set SelectedLoginAddress(_url: string) {
    //     WebServiceBase.withinLoginUrl = _url;
    // }
    /**
     * @逻辑服务器地址.
     */
    WebServiceBase.withinServerUrl = "h601-logical-service/mobiapi/1/";
    WebServiceBase.outServerUrl = "h601/logical/";
    Model.WebServiceBase = WebServiceBase;
    __reflect(WebServiceBase.prototype, "Model.WebServiceBase", ["Model.IWebServiceBase"]);
    /**
     * @无返回值接口基类.
     * @TODO: by zhu_jun,2015.12.27.
     * @1.这边当初需要处理不同返回值,所以分开,可能分的太细.如果将来不需要这种细分case,是可以合并的.
     * @2.无论可不合并,都可以在这一层直接传WebServiceValue.
     * @3.无法多重构造,在封装上遇到了瓶颈,不能在一个类中给主调方中提供差异性接口.这里结合第1条,将来的WebServiceBase的子类的实现有可能变为调用方主导，而非返回方主导.
     */
    var WebServiceNonResponseBase = (function (_super) {
        __extends(WebServiceNonResponseBase, _super);
        function WebServiceNonResponseBase(_url, _paramList, _type, _isShowFireWind, _canOverLoad) {
            if (_paramList === void 0) { _paramList = null; }
            if (_type === void 0) { _type = Model.WebServiceType.Post; }
            if (_isShowFireWind === void 0) { _isShowFireWind = false; }
            if (_canOverLoad === void 0) { _canOverLoad = false; }
            return _super.call(this, new Model.WebServiceValue(_url, _paramList, true, _type), _isShowFireWind, _canOverLoad) || this;
        }
        /**
         * @无返回值成功回掉.
         */
        WebServiceNonResponseBase.prototype.onSuccess = function (_jString) {
            if (WebServiceBase.isDebug)
                console.log("zhujun: WebServiceNonResponseBase onSuccess ! ");
            _super.prototype.onSuccess.call(this, _jString);
            this.successCallBack(true);
        };
        return WebServiceNonResponseBase;
    }(WebServiceBase));
    Model.WebServiceNonResponseBase = WebServiceNonResponseBase;
    __reflect(WebServiceNonResponseBase.prototype, "Model.WebServiceNonResponseBase");
    /**
     * @有返回值接口基类.
     * @TODO: by zhu_jun,2015.12.27.
     * @1.这边当初需要处理不同返回值,所以分开,可能分的太细.如果将来不需要这种细分case,是可以合并的.
     * @2.无论可不合并,都可以在这一层直接传WebServiceValue.
     * @3.无法多重构造,在封装上遇到了瓶颈,不能在一个类中给主调方中提供差异性接口.这里结合第1条,将来的WebServiceBase的子类的实现有可能变为调用方主导，而非返回方主导.
     */
    var WebServiceResponseBase = (function (_super) {
        __extends(WebServiceResponseBase, _super);
        function WebServiceResponseBase(_url, _paramList, _type, _isShowFireWind, _canOverLoad) {
            if (_paramList === void 0) { _paramList = null; }
            if (_type === void 0) { _type = Model.WebServiceType.Post; }
            if (_isShowFireWind === void 0) { _isShowFireWind = false; }
            if (_canOverLoad === void 0) { _canOverLoad = false; }
            var _this = this;
            console.log("zhujun:   _paramList : any = null " + _paramList);
            _this = _super.call(this, new Model.WebServiceValue(_url, _paramList, _paramList == null ? false : true, _type), _isShowFireWind, _canOverLoad) || this;
            return _this;
        }
        /**
         * @有返回值成功回掉.
         */
        WebServiceResponseBase.prototype.onSuccess = function (_jString) {
            if (WebServiceBase.isDebug)
                console.log("zhujun: WebServiceResponseBase onSuccess ! ");
            _super.prototype.onSuccess.call(this, _jString);
            var info = JSON.parse(_jString);
            this.successCallBack(info);
        };
        return WebServiceResponseBase;
    }(WebServiceBase));
    Model.WebServiceResponseBase = WebServiceResponseBase;
    __reflect(WebServiceResponseBase.prototype, "Model.WebServiceResponseBase");
})(Model || (Model = {}));
//# sourceMappingURL=WebServiceBase.js.map