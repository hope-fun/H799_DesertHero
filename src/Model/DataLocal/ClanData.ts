module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.4.7
     *
     */
    export class ClanData {
    	public constructor(_st:ClanStModel,_dy:ClanDyModel) {
        	this.st=_st;
        	this.dy=_dy;
    	}
    	
    	/**
        * @静态数据
        */ 
    	public st:ClanStModel;
    	
    	/**
    	 * @动态数据
    	 */ 
    	public dy:ClanDyModel;
    	
    	/**
    	 * @加成类型
    	 */ 
    	public get Type(){
            return <FamliyType>FamliyType[this.st.clanType];
    	}
    	
    }
}