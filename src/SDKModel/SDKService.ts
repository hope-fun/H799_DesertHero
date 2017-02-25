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
	export class SDKService {   
//    	 platform;
    	
    	public constructor() {
    	    
		}
				
		/*
		 * 初始化平台sdk，区分平台.
		 */ 
        public static initSDK(_onCallBack?:Function) { 
            if(Model.Tools.getURLParam("channel") == "3") {//Play68.
                Play68Service.assignmentPlay68Model();//构造account参数.
                _onCallBack();//call back直接用参数登陆.
            } else {//如果不是任何平台就进else.
                alert("当前平台非法,请勿充值!");
            }
        }
        
        public static initPay(_itemId:string,_itemName:string,_price:number, _onCallBack?:Function) { 
            if(Model.Tools.getURLParam("channel") == "3") {
                payItem(_itemId,_itemName,_price,1);
            } else { 
                alert("当前平台非法,请勿充值!");
            }
        }
	}
}
