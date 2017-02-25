module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.4.14.
     *
     */
    export class ChallengeData {
    	public constructor(_st:ChallengeStModel) {
    	  this.st=_st;
    	}
    	
    	/**
    	 * @静态数据
    	 */ 
    	public st:ChallengeStModel;
    	
    	/**
    	 * @当前boss血量
    	 */ 
    	public hp:number;
    	
    	/**
    	 * @boss血量
    	 */ 
    	public hpMax:number;
    	
    	
    	/**
    	 * @设置boss扣血量
    	 */ 
        public set AddHp(_value: number) {
            this.hp += _value;
            
            if(Model.WebServiceBase.isDebug) {
                console.log("cai_haotian: this.hp += _value  " + this.hp);
            }
            if(this.hp < 0) {
                this.hp = 0;
            }
        }
    	
    	/**
    	 * @显示boss血量
    	 */ 
    	public get GetHpMax():string{
    	  return MainLocalService.toUnitConversion(this.hpMax);
    	}
    	
    	/**
    	 * @奖励类型
    	 */ 
    	public get Type(){
            return <DailyChallengeType>DailyChallengeType[this.st.rewardType];
    	}
    	
    	
    }
}