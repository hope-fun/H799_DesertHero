module Model {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
	export class Play68Model {
		public constructor() {
		}
		 /*
         * 平台分配的appid.
         */ 
        public appid: number;
        /*
         * 平台标志.
         */ 
        public pf: string;
        
        /*
         * 用户唯一识别ID.
         */ 
        public openid: string;
        /*
         * 当前系统时间.
         */ 
        public ts: string;
        /*
         * 接口签名.
         */ 
        public sign: string;
	}
	
    export class P68UserInfo {
        /*
         * 返回结果码.
         */ 
        public ret: number;
        /*
         * 返回提示信息.
         */ 
        public msg: string;
        /*
         * 用户昵称.
         */ 
        public nickname: string;
        /*
         * 用户头像.
         */ 
        public headimg: string;
    } 
    
    
}
