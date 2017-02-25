module Model {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.28.
	 */
	export interface IWebServiceValue {
    	  /**
    	   * @请求类型.
    	   */ 
    	  Type:string;
    	  /**
    	   * @是json.
    	   */ 
    	  isJson:boolean;
        /**
         * @url.
         */ 
    	  baseURL:string;
        /**
         * @参数.
         */ 
    	  paramList:any;
	}
}
