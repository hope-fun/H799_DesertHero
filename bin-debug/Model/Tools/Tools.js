var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun.
     * @date: 2015.12.24.
     */
    var Tools = (function () {
        function Tools() {
        }
        /**
         * @获取随机guid.
         */
        Tools.guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        /**
         * @左补位.
         */
        Tools.padLeft = function (str, pad, count) {
            while (str.length < count)
                str = pad + str;
            return str;
        };
        Tools.GetQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURI(r[2]);
            return null;
        };
        Tools.getURLParam = function (paramName) {
            var paramValue = "";
            var isFound = false;
            var url = document.location.href;
            var params = document.location.search;
            var reg = new RegExp("\\?", "g");
            params = String("?" + params.substring(1, params.length).replace(reg, "&"));
            if (params.indexOf("?") == 0 && params.indexOf("=") > 1) {
                var arrSource = params.substring(1, params.length).split("&");
                var i = 0;
                while (i < arrSource.length && !isFound) {
                    if (arrSource[i].indexOf("=") > 0) {
                        if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                            paramValue = arrSource[i].split("=")[1];
                            isFound = true;
                        }
                    }
                    i++;
                }
            }
            return paramValue;
        };
        /**
         * @创建hashmap.
         * @date: 2015.12.24.
         */
        Tools.createHash = function () {
            var paramList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paramList[_i] = arguments[_i];
            }
            var hash = new Model.HashMap();
            for (var i = 0; i < paramList.length; i += 2) {
                hash.Set(paramList[i], paramList[i + 1]);
            }
            return hash;
        };
        Tools.repeatedExecute = function (_onEvent, _times) {
            for (var i = 0; i < _times; i++) {
                _onEvent();
            }
        };
        return Tools;
    }());
    Model.Tools = Tools;
    __reflect(Tools.prototype, "Model.Tools");
})(Model || (Model = {}));
//# sourceMappingURL=Tools.js.map