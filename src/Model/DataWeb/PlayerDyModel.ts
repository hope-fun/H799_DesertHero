module Model {
	/**
	 * @author: zhu_jun
	 * @date: 2016.01.05.
	 */
	export class PlayerDyModel {
		public constructor() {
		
		}
		/**
		 * @玩家唯一id
		 */ 
        public id: number;
        /**
		 * @玩家名
		 */ 
        public nickName: string;
        /**
		 * @铜币数量
		 */ 
        public gold: number;
//        /**
//         * @金币数量级单位id.
//         */ 
//        public goldMagnitudeId:string;
        /**
		 * @元宝数量
		 */ 
        public treasure: number;
        /**
         * @灵石数量.
         */ 
        public jewel:number;
        /**
		 * @玩家等级
		 */ 
        public level: number;
        /**
         * @玩家总点击伤害.
         */ 
        public clickDamage:number;
//        /**
//         * @点击伤害数量级单位.
//         */ 
//        public clickDamageMagnitude:string;
        /**
         * @挚友秒伤.
         */ 
        public friendDamage:number;
//        /**
//         * @挚友秒伤数量级单位.
//         */ 
//        public friendDamageMagnitude:string;
        /**
         * @玩家当前关数
         * @by cai_haotian 2016.3.28.
         */ 
        public sceneId:number;
        /**
         * @玩家最后一次提交数据时间
         * @by cai_haotian 2016.4.11 
         */ 
        public offLineTime:number;
        /**
         * @玩家最后一次进行每日挑战的时间
         * @by cai_haotian 2016.4.18.
         */ 
        public chanllengeTime:number;
        /**
         * @玩家获得免费试用技能的开始时间
         * @by cai_haotian 2016.4.18.
         */ 
        public freeSkillTime:number;
        /**
         * @小飞箱双倍概率的出现时间
         * @by cai_haotian 2016.4.18.
         */ 
        public doubleProbabilityTime:number;
        /**
         * @累计登录时间
         * @by cai_haotian 2016.4.18
         */ 
        public cumulativeLogin:number;
        
        
        
	}
}
