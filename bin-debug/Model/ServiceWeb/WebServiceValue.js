var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.27.
     */
    var WebServiceValue = (function () {
        /**
         * @构造.
         * @param:请求的基础地址，若为Get请求,也不含参数.
         * @param:请求的参数.
         * @param:请求参数是否为json,默认为true.
         * @param: _type请求类型,默认是WebServiceType.Post.
         */
        function WebServiceValue(_bURL, _pList, _isJson, _type) {
            if (_isJson === void 0) { _isJson = true; }
            if (_type === void 0) { _type = Model.WebServiceType.Post; }
            /**
             * @短链接类型.
             * @默认是WebServiceType.Post.
             */
            this.type = Model.WebServiceType.Post;
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: baseURL " + _bURL);
            this.type = _type;
            this.isJson = _isJson;
            this.baseURL = _bURL;
            this.paramList = _pList;
        }
        Object.defineProperty(WebServiceValue.prototype, "Type", {
            /**
             * @获取请求对象类型.
             * @默认是egret.HttpMethod.POST.
             */
            get: function () {
                if (this.type == Model.WebServiceType.Post) {
                    return egret.HttpMethod.POST;
                }
                else {
                    return egret.HttpMethod.GET;
                }
            },
            enumerable: true,
            configurable: true
        });
        return WebServiceValue;
    }());
    Model.WebServiceValue = WebServiceValue;
    __reflect(WebServiceValue.prototype, "Model.WebServiceValue", ["Model.IWebServiceValue"]);
})(Model || (Model = {}));
//# sourceMappingURL=WebServiceValue.js.map