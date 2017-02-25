module Model {
	/**
	 *
	 * @author 
	 *
	 */
	export class FriendDyModel {
        public constructor(_friendId: number,_level:number,_layerId:number,_sealCD:number = 0) {
    		this.friendId = _friendId;
    		this.level= _level;
    		this.layerId = _layerId;
            this.sealCD = _sealCD;
		}
		/**
		 * @挚友（技能）ID
		 */ 
        public friendId: number;
        /**
		 * @挚友（技能）等级
		 */ 
        public level: number;
        /**
         * @挚友重级id.
         */ 
        public layerId:number;
        /**
         * @技能锁定的CD.
         * @>0在封印中.
         * @<=0封印结束.
         */ 
        public sealCD:number;
	}
}
