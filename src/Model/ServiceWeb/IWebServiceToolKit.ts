module Model {
	/**
	 *
	 * @author 
	 *
	 */
	export interface IWebServiceToolKit {
    	  /**
    	   * @玩家token.
    	   */ 
        UserToken:string;
        /**
         * @发送请求时调用.
         */ 
        onRequestSend:Function;
        /**
         * @请求回调是调用.
         */ 
        onResponseRecived:Function;
        /**
         * @自定义超时时间.
         */ 
        customTimeOut:number;
        /**
         * @成功回调方法.
         */ 
        successCallBack:Function;
        /**
         * @失败回调方法.
         */ 
        failedCallBack:Function;
        /**
         * @发送中回调方法.
         */ 
        onProgressCallBack:Function;
        /**
         * @请求参数.
         */ 
        wsValue:WebServiceValue;
        /**
         * @是否开启风火轮.
         */ 
        isShowFireWind:boolean;
	}
}
