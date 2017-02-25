module Model {
    /**
     *
     * @author: zhu_jun.
     * @date: 2015.12.24.
     */
    export class Tools {
        public constructor() {

        }

        /**
         * @获取随机guid.
         */ 
        public static guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        /**
         * @左补位.
         */ 
        public static padLeft(str:string, pad:string, count) {
            while (str.length < count)
                str = pad + str;
            return str;
        }

        public static GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }

        public static getURLParam(paramName:string):string {
            var paramValue:string = "";
            var isFound:boolean = false;
            var url:string = document.location.href;
            var params:string = document.location.search;
            var reg: RegExp = new RegExp("\\?","g");
            params = String("?" + params.substring(1,params.length).replace(reg,"&")); 
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
        }
        
        /**
         * @创建hashmap.
         * @date: 2015.12.24.
         */ 
        public static createHash(...paramList:any[]):HashMap { 
            var hash: HashMap = new HashMap();
            for(var i = 0; i < paramList.length; i += 2) {
                hash.Set(paramList[i],paramList[i+1]);
            }
            return hash;
        }
        
        public static repeatedExecute(_onEvent: Function,_times: number) {
            for(var i = 0;i < _times;i++) {
                _onEvent();
            }
        }
    }
}
