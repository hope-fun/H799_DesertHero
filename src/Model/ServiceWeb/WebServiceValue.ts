module Model {
    /**
	 * @author: zhu_jun.
     * @date: 2015.12.27.
	 */
    export class WebServiceValue implements IWebServiceValue{ 
        /**
         * @构造.
         * @param:请求的基础地址，若为Get请求,也不含参数.
         * @param:请求的参数.
         * @param:请求参数是否为json,默认为true.
         * @param: _type请求类型,默认是WebServiceType.Post.
         */
        public constructor(_bURL : string,_pList : any,_isJson : boolean = true,_type : WebServiceType = WebServiceType.Post) {
            if(WebServiceBase.isDebug) console.log("zhujun: baseURL " + _bURL);
            this.type = _type;
            this.isJson = _isJson;
            this.baseURL = _bURL;
            this.paramList = _pList;
        }
        /**
         * @短链接类型.
         * @默认是WebServiceType.Post.
         */
        private type: WebServiceType = WebServiceType.Post;
        /**
         * @获取请求对象类型.
         * @默认是egret.HttpMethod.POST.
         */ 
        public get Type():string{
            if(this.type == WebServiceType.Post){
                return egret.HttpMethod.POST;            
            }else{
                return egret.HttpMethod.GET;
            }
        }
        
        /**
         * @是否是json.
         */
        public isJson: boolean;
        /**
         * @短链接地址.
         */
        public baseURL: string;
        /**
         * @参数列表.
        */
        public paramList: any;
    }
}
