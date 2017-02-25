declare function payItem(itemid,itemname,price,count): void;

module Model {
	/**
	 *
	 * @author 
	 * http://www.luckywings.net/game/h005/?channel=3
	 * http://www.play68.com/play/ly_axb
	 * appid:656
     * 爱学霸
     * key:b92ababa363be1e416db0ace8f16fe33
	 */
	export class Play68Service {
        private static play68Url: string = "http://www.play68.com/";
        private static play68key: string = "b92ababa363be1e416db0ace8f16fe33";
        private static onCompleteBack: Function;
		public constructor() {
    		
		}
		
		/*
		 * 获取Play68游戏基本信息.
		 */ 
        public static assignmentPlay68Model() { 
            var paramKey = ["openid","pf","ts"];
            paramKey.sort();
            var hash: any = new HashMap();
            hash.Set(paramKey[0],Tools.getURLParam(paramKey[0]));
            hash.Set(paramKey[1],Tools.getURLParam(paramKey[1]));
            hash.Set(paramKey[2],Tools.getURLParam(paramKey[2]));
            hash.Set("sign",Tools.getURLParam("sign"));
            Play68Value.p68Model = hash;
            var md5: Model.MD5 = new Model.MD5();
            var localSign = md5.hex_md5(String(hash.Get(paramKey[0]) + hash.Get(paramKey[1]) + hash.Get(paramKey[2])+Play68Service.play68key));
            WebValue.accountM.id = Play68Value.p68Model.openid;
            WebValue.accountM.thirdAccountId = Play68Value.p68Model.openid;
            WebValue.accountM.platform = Play68Value.p68Model.pf;
            WebValue.accountM.time = Play68Value.p68Model.ts;
            WebValue.accountM.sign = Play68Value.p68Model.sign;
//            Play68Value.p68Model.appid = 656;//appid前台没用,by zhu_jun,2015.11.25.
            if(Play68Value.p68Model.sign != localSign) { 
                alert("当前平台不合法，请勿充值!");
                return;
            }
        }
        
        		
        /*三方平台get请求移到服务端调用,by zhu_jun,2015.11.25.
        public static p68UserInfo(_onCompleteBack?: Function) { 
            this.onCompleteBack = _onCompleteBack;
            var paramKey = ["appid=" + Play68Value.p68Model.appid,"openid=" + Play68Value.p68Model.openid,"ts=" + Play68Value.p68Model.ts];
            paramKey.sort();
            console.log("p68UserInfo: json " + JSON.stringify(paramKey));
            var md5: Model.MD5 = new Model.MD5();
            console.log("md5 " + paramKey[0].split('=')[1] + " =======" + paramKey[1].split('=')[1] + " =======" +  paramKey[2].split('=')[1]);
            var localSign = md5.hex_md5(paramKey[0].split('=')[1] + paramKey[1].split('=')[1] + paramKey[2].split('=')[1] + Play68Service.play68key);
            var request = new egret.HttpRequest();
            var param = String("?" + paramKey[0] +"&"+ paramKey[1] + "&" + paramKey[2] + "&sign=" + localSign);
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(this.play68Url+"api/userinfo"+param,egret.HttpMethod.GET);
            request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
            request.send();
        }
        
        private static onGetComplete(event: egret.Event): void {
            var request = <egret.HttpRequest>event.currentTarget;
            console.log("zhujun: on get data : ",request.response);
            if(this.onCompleteBack != null) {
                this.onCompleteBack(request);
            }
        }
        
        private static onGetIOError(event: egret.IOErrorEvent): void {
            console.log("post error : " + event);
//            if(this.onErrorBack != null) {
//                this.onErrorBack();
//                //                this.onErrorBack = null;
//            }
        }

        private static onGetProgress(event: egret.ProgressEvent): void {
//            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
//            if(this.onProgressBack != null) {
//                this.onProgressBack();
//                //                this.onProgressBack = null;
//            }
        }
        
        private static createSign() { 
            return "";
        }
        */


		
	}
}
