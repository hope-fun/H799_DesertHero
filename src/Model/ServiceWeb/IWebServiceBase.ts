module Model {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.27.
	 */
    export interface IWebServiceBase<T>  {
//    	  /**
//         * @登陆服务器地址.
//         */
//        SelectedLoginAddress: string;
//        /**
//         * @逻辑服务器地址.
//         */ 
//        SelectedServerAddress:string;
        /**
         * @网络请求成功回调.
         */ 
        successCallBack: Function;//<T>(backObj: T) => void;
        /**
         * @网络请求失败回调.
         */ 
        failedCallBack: Function;//(error: WebServiceErrorCode) => void;
        /**
         * @短链接请求开始发送.
         */ 
        StartService : Function;
        /**
         * @成功回调.
         */ 
//        onSuccess:Function;
        /**
         * @失败回调.
         */ 
//        onFailed:Function;
	}
}
