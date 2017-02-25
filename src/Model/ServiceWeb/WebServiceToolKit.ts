/**
 * @author: zhu_jun.
 * @date: 2015.12.24.
*/	
module Model {
    /**
     * @网络请求错误枚举.
     */ 
    export enum WebServiceErrorCode { 
        SYSTEM_ERROR,
        SERVICE_TIMEOUT,
        USER_NOT_EXISTS,
        URL_ERROR,
        ERROR,
        UNKNOWN = 0,
        NO_ACTION = 1,
        NOT_MATCH = 2,
        FAILED = 5,
        DATA_EXCEPTION=18,
        CODE_NOT_EXIST=610,
        CODE_HAVE_USED=611,
        PACKAGE_NOT_EXIST=612,
        PACKAGE_IS_NULL=613,
        USER_CODE_HAVE_USED=614,
        USER_BACTCH_CODE_HAVE_USED=615,
        USER_PACKAGE_HAVE_USED_CODE=616,
        CODE_EFFECTIVE_DATE=617,
        CODE_SERVER_NOT_USED=618
    }
    
    /**
     * @请求类型.
     */ 
    export enum WebServiceType { 
        Get,
        Post
    }
    
    /**
     * @网络服务工具包.
     */ 
	export class WebServiceToolKit {
//		/** 
//		 * @短链接header.
//		 */ 
//        private static webServiceHeader: string = "";
        /**
         * @请求发送时调用方法.
         */ 
        public static onRequestSend: Function = null;
        /**
         * @请求回响时调用.
         */ 
        public static onResponseRecived:Function = null;

        /**
         * @获取UserToken.
         */ 
        public get UserToken() : string{
            if(WebValue.webServiceHeader != "") {
                return WebValue.webServiceHeader;
            } else { 
                throw "Get some error hare ! ";
            }
        }
        /**
         * @自定义超时时间.
         */ 
        public customTimeOut: number = 20000;
        /**
         * @成功回调方法.
         */ 
        public successCallBack: (backObj: string) => void = null;//Function = null;
        /**
         * @失败回调方法.
         */ 
        public failedCallBack: (error: WebServiceErrorCode) => void;//Function = null;//
        /**
         * @发送中回调方法.
         */ 
        public onProgressCallBack: Function = null;
        /**
         * @请求参数.
         */ 
        public wsValue: WebServiceValue = null;
        /**
         * @是否开启风火轮.
         */ 
        public isShowFireWind : boolean= false;

        /**
         * @请求完成.
         */
        private isDone = false;
        /**
         * @构造.
         */ 
        public constructor() {
//            this.initHeader("H008");
        }
        /**
		 * @初始化短链接头.
		 */ 
//        private initHeader(token: string) {
//            this.webServiceHeader = token;
//        }
        /**
         * @修改USER-TOKEN.
         * @by cai_haotian 2016.3.21
         */ 
        public changeHeader(token: string) {
            if(WebValue.webServiceHeader != "" && WebValue.webServiceHeader != token) {
                WebValue.webServiceHeader = token;
            } else {
                console.log("zhujun: webServerHeader is no change ! ");
            }
        }
         
        /**
         * @开始请求.
         */ 
        public startService(){
            console.log("zhujun: start service " + JSON.stringify(this.wsValue));
            if(this.wsValue == null || this.successCallBack == null || this.failedCallBack == null) {
                if(WebServiceBase.isDebug) console.log("Service value is null, cant start service ! ");
                return;
            } else { 
                if(this.wsValue.Type == egret.HttpMethod.POST) {
                    if(this.wsValue.isJson) {
                        this.postWebServiceWithJson(this.wsValue.baseURL,JSON.stringify(this.wsValue.paramList));
                    } else { //如果不需要传json，就不进行序列化，直接把参数往下传.
                        this.postWebServiceWithoutJson(this.wsValue.baseURL,this.wsValue.paramList);
                    }
                } else { 
                    this.getWebService("");//TODO: ValueParse.UrlParse (_wsValue._baseURL, _wsValue._paramList)
                }
                if(WebServiceToolKit.onRequestSend && this.isShowFireWind) WebServiceToolKit.onRequestSend();//开启风火轮.
            }
        }
        
        /**
         * @发送get请求.(缺UrlParse)
         * @TODO:这层封装貌似没什么用了,如果将来不用扩展，可以直接删了.
         */ 
        private getWebService(_serviceUrl : string){
            var request = new egret.HttpRequest();
            request.open(_serviceUrl,this.wsValue.Type);
            this.CallService(request);
        }
        
        /**
         * @支持json的Post请求.
         * @TODO:这层封装貌似没什么用了,如果将来不用扩展，可以直接删了.
         */ 
        private postWebServiceWithJson(_serviceUrl: string,_jstring: string) { 
            var request = new egret.HttpRequest();
            request.open(_serviceUrl,this.wsValue.Type);
            this.CallService(request,_jstring);
        }
        
        /**
         * @不支持json的Post请求.(缺UrlParse)
         * @TODO:这层封装貌似没什么用了,如果将来不用扩展，可以直接删了.
         */ 
        private postWebServiceWithoutJson(_serviceUrl:string,_jstring:string) { 
            var request = new egret.HttpRequest();
            request.open(_serviceUrl,this.wsValue.Type);
            this.CallService(request,_jstring);
        }

        private CallService(request: egret.HttpRequest,_jstring: string = null) { 
            if(!WebValue.isWebService){
                this.successCallBack(request.response);
                console.log("zhujun: cant send web service , immediate return success ! ");   
                return;   
            }
            request.responseType = egret.HttpResponseType.TEXT;
            console.log("zhujun: this.webServiceHeader " + WebValue.webServiceHeader);
            request.setRequestHeader("USER-TOKEN",WebValue.webServiceHeader);
            request.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onProgress,this);
            
            
//            console.log("cai_hoatian _jstring " + _jstring);
//            console.log(_jstring == "null");
//            var aaa : string = null;
//            var bbb : any = null;
//             console.log(aaa==bbb);
            
            
            
//            if(_jstring == null){
//                Model.Console.log("zhu_jun 1  _jstring" + _jstring);
//                request.send(true);
//            }else{
//                request.send(_jstring);
//                Model.Console.log("cai_hoatian2 _jstring " + _jstring);
//            }
            _jstring == null ? request.send(true) : request.send(_jstring);
//            _jstring
            
//            request.send(_jstring);
            
            var serviceStartTime = egret.getTimer();//开始计时.
//            while(!this.isDone) {
//                console.log("egret.getTimer() " + egret.getTimer() + " serviceStartTime "+ serviceStartTime);
//                if(egret.getTimer() - serviceStartTime >= this.customTimeOut) {//超时.
//                    if(WebServiceBase.isDebug)console.log("Service time out ! ");
//                    if(WebServiceToolKit.onResponseRecived) WebServiceToolKit.onResponseRecived();//关闭风火轮.
//                    this.failedCallBack(WebServiceErrorCode.SERVICE_TIMEOUT);
//                    request.abort();
//                    break;
//                }
//            }
            if(WebServiceToolKit.onResponseRecived && this.isShowFireWind) WebServiceToolKit.onResponseRecived;//关闭风火轮.
            //NOTE:异常处理移到成功
            
//            			#region http state OK
//			if (string.IsNullOrEmpty (www.error)) {
////				#if WEBSERVICE_DEBUG
////				Debug.Log("www.text : " + www.text);
////				#endif
//				IDictionary response = (IDictionary)MiniJSON.Json.Deserialize (www.text);
//				if (response.Contains ("errorStatus")) {
//					#if WEBSERVICE_DEBUG
//					Debug.Log("get custom error with : " + www.text);
//					#endif
//					webServiceErrorCode error = webServiceErrorCode.SYSTEM_ERROR;
//					try {//get请求,非jsond格式error返回容错.
//						error = (webServiceErrorCode)System.Enum.Parse (typeof(webServiceErrorCode), response ["errorStatus"].ToString ());
//					} catch (Exception e) {
//						Debug.LogError (e);
//					} finally {
//						_FailedCallBack (error);
//					}
//					//call back
//				} else {
//					#if WEBSERVICE_DEBUG
//					Debug.Log(www.text);
//					#endif
//					
//					#region set header user token
//					if (www.responseHeaders.ContainsKey ("USER-TOKEN") && !string.IsNullOrEmpty (www.responseHeaders ["USER-TOKEN"]))
//						WebServiceToolKit.ChangeUserToken (www.responseHeaders ["USER-TOKEN"]);
//					#endregion
//					//call back
//					_SuccessCallBack (www.text);
//				}
//			}
//			#endregion
//			#region other state
//			else {
//				#if WEBSERVICE_DEBUG
//				Debug.Log("get error with : " + www.error);
//				#endif
//				
//				#region call back
//				string[] tArray = www.error.Split (new char[] { ' ' });
//				if (tArray [0].Equals ("401")) {
//					_FailedCallBack (webServiceErrorCode.ERROR_UNAUTHOR_OR_AUTHOR_TIMEOUT);
//				} else if (tArray [0].Contains ("404") || tArray [0].StartsWith ("java")) {
//					_FailedCallBack (webServiceErrorCode.URL_ERROR);
//				} else {
//					_FailedCallBack (webServiceErrorCode.SYSTEM_ERROR);
//				}
//				#endregion
//			}
//			#endregion
         }
         
        /**
         * @请求完成.
         */
        private onComplete(event: egret.Event): void {
            this.isDone = true;
            var request = <egret.HttpRequest>event.currentTarget;
            console.log("back token ",request.getResponseHeader("USER-TOKEN"));
            this.changeHeader(request.getResponseHeader("USER-TOKEN"));
            console.log("post data : ",request.response);//error
            console.log("back token ",request.getResponseHeader("USER-TOKEN"));
            
            //by cai_haotian 2016.6.3
            if(JSON.parse(request.response).errorMessage || JSON.parse(request.response).errorStatus || JSON.parse(request.response).errorCode){
                if(this.successCallBack) {
                    this.failedCallBack(request.response);
                }
            }else{
                if(this.successCallBack) {
                    this.successCallBack(request.response);//TODO:自定义错误判定.by zhu_jun,2015.12.28.返回webServiceErrorCode
                }
            }
            
            
//            request.abort();
//            this.clearListenEvent(request);
        }
        
        /**
         * @请求系统错.
         */ 
        private onIOError(event: egret.IOErrorEvent): void {
            this.isDone = true;
            console.log("post error : " + event);
            if(this.failedCallBack != null) {
//                event
                this.failedCallBack(WebServiceErrorCode.SYSTEM_ERROR);//TODO:系统错误判定.by zhu_jun,2015.12.28.返回webServiceErrorCode
            }
        }

        /**
         * @发送中回调.
         */ 
        private onProgress(event: egret.ProgressEvent): void {
            this.isDone = true;
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            if(this.onProgressCallBack != null) {
                this.onProgressCallBack(event);
            }
//            this.clearListenEvent(event.);
        }
        
        private clearListenerEvent(request : egret.HttpRequest){
            request.removeEventListener(egret.Event.COMPLETE,this.onComplete,this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onProgress,this);
        }
	}
}
