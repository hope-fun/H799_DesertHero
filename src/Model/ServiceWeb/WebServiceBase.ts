module Model {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.24.
	 */
    export class WebServiceBase<T> implements IWebServiceBase<T> {
        /**
         * @是否发布外网.
         */ 
        private static isOutWeb : boolean = true;
        /**
         * @是否开启日志.
         */
        public static isDebug: boolean = true;
        
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
        public static baseServerUrl: string = " http://www.run7.pub/";

        /**
         * @登陆服务器地址
         */ 
        public static withinLoginUrl: string = "h601-login-service/mobiapi/1/";
        public static outLoginUrl: string = "h601/login/";

        public static get Test():string{
            // alert("test");
            return "";
        }

        /**
         * @获取登陆服务器地址.
         */
        public static get SelectedLoginAddress():string{
           if(WebServiceBase.isDebug) console.log("SelectedLoginAddress: this.baseServerUrl is " + WebServiceBase.baseServerUrl + " this.withinLoginUrl " + WebServiceBase.withinLoginUrl);
            return WebServiceBase.isOutWeb ? WebServiceBase.baseServerUrl + WebServiceBase.outLoginUrl :  WebServiceBase.baseServerUrl + WebServiceBase.withinLoginUrl;            
        }
        // /**
        //  * @设置登陆服务器地址.
        //  */ 
        // public static set SelectedLoginAddress(_url: string) {
        //     WebServiceBase.withinLoginUrl = _url;
        // }
        /**
         * @逻辑服务器地址.
         */
        public static withinServerUrl = "h601-logical-service/mobiapi/1/";
        public static outServerUrl: string = "h601/logical/";
        
        /**
         * @获取逻辑服务器地址.
         */ 
        public static get SelectedServerAddress(): string {
            // alert(1);
            if(WebServiceBase.isDebug) console.log("SelectedServerAddress: this.baseServerUrl is ",WebServiceBase.baseServerUrl," this.withinServerUrl " + WebServiceBase.withinServerUrl);
            return WebServiceBase.isOutWeb ? WebServiceBase.baseServerUrl + WebServiceBase.outServerUrl : WebServiceBase.baseServerUrl + WebServiceBase.withinServerUrl;
        }
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
        public successCallBack: <T>(backObj: T) => void = null; //Function = null;// 
        /**
         * @网络请求失败回调.
         */ 
        public failedCallBack: (error: WebServiceErrorCode) => void = null;//Function = null;//
        /**
         * @短链接请求开始发送.
         * @get属性点出来就能执行，不需要再加园括号.
         */ 
        public get StartService():Function{
//            if(WebServiceBase.isDebug) console.log("zhujun: Start server ! " + JSON.stringify(toolKit.wsValue));
            return this.startService;
        }
        /**
         * @短链接请求方法.
         */ 
        protected startService: Function = null;
        /**
         * @构造.
         * @param: _wsValue请求参数.
         * @param: _canLoadLevel加载场景是否继续请求.
         * @param: _isShowFireWind是否风火轮.
         */ 
        public constructor(_wsValue: WebServiceValue,_isShowFireWind: boolean = false,_canLoadLevel: boolean = false) {

            var toolKit = new WebServiceToolKit();
            toolKit.isShowFireWind = _isShowFireWind;
            toolKit.wsValue = _wsValue;
            toolKit.successCallBack = (bObj) => {this.onSuccess(bObj);}
            toolKit.failedCallBack = (bE:WebServiceErrorCode) => { this.onFailed(bE);}
            if(WebServiceBase.isDebug) console.log("this.toolKit.failedCallBack ",toolKit.failedCallBack);
            if(WebServiceBase.isDebug) console.log("zhujun: this.toolKit.wsValue " + toolKit.wsValue);
            this.startService = () => { 
                toolKit.startService();
            }
        }
        
        /**
         * @请求成功调用.
         * @给toolkit执行.
         */ 
        public onSuccess(_jString:string){
            if(WebServiceBase.isDebug) console.log("zhujun: WebServiceBase onSuccess ! ");
        };
        
        /**
         * @请求失败调用.
         * @给toolkit执行.
         */ 
        public onFailed(_error:WebServiceErrorCode){
            if(this.failedCallBack != null){
                this.failedCallBack(_error);
            }else{
                if(WebServiceBase.isDebug) console.log("Failed call back is null, set it first ! ");
            }
        };
	}
	
	/**
	 * @无返回值接口基类.
	 * @TODO: by zhu_jun,2015.12.27.
	 * @1.这边当初需要处理不同返回值,所以分开,可能分的太细.如果将来不需要这种细分case,是可以合并的.
	 * @2.无论可不合并,都可以在这一层直接传WebServiceValue.
	 * @3.无法多重构造,在封装上遇到了瓶颈,不能在一个类中给主调方中提供差异性接口.这里结合第1条,将来的WebServiceBase的子类的实现有可能变为调用方主导，而非返回方主导.
	 */ 
    export class WebServiceNonResponseBase extends WebServiceBase<boolean> { 
        public constructor(_url : string,
                            _paramList : any = null,
                            _type : WebServiceType=WebServiceType.Post,
                            _isShowFireWind : boolean = false,
                            _canOverLoad : boolean = false){
            super(new WebServiceValue(_url,_paramList,true,_type),_isShowFireWind,_canOverLoad); 
        }
        
        /**
         * @无返回值成功回掉.
         */ 
        public onSuccess(_jString:string){
            if(WebServiceBase.isDebug) console.log("zhujun: WebServiceNonResponseBase onSuccess ! ");
            super.onSuccess(_jString);
            this.successCallBack(true);
        }
    }
    
    /**
     * @有返回值接口基类.
	 * @TODO: by zhu_jun,2015.12.27.
	 * @1.这边当初需要处理不同返回值,所以分开,可能分的太细.如果将来不需要这种细分case,是可以合并的.
	 * @2.无论可不合并,都可以在这一层直接传WebServiceValue.
	 * @3.无法多重构造,在封装上遇到了瓶颈,不能在一个类中给主调方中提供差异性接口.这里结合第1条,将来的WebServiceBase的子类的实现有可能变为调用方主导，而非返回方主导.
	 */ 
    export class WebServiceResponseBase<T> extends WebServiceBase<T> {
        public constructor(_url : string,
                            _paramList : any = null,
                            _type : WebServiceType = WebServiceType.Post,
                            _isShowFireWind : boolean = false,
                            _canOverLoad : boolean = false){
            console.log("zhujun:   _paramList : any = null " + _paramList);
            super(new WebServiceValue(_url,_paramList,_paramList == null ? false : true,_type),_isShowFireWind,_canOverLoad);
        }
        
        /**
         * @有返回值成功回掉.
         */ 
        public onSuccess(_jString){
            if(WebServiceBase.isDebug) console.log("zhujun: WebServiceResponseBase onSuccess ! ");
            super.onSuccess(_jString);
            var info : T = JSON.parse(_jString);
            this.successCallBack(info);
        }
    }
}
