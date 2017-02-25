module ViewModel{
    /**
     *
     * @author 
     *
     */
    export class KilledViewVM extends eui.Component{
        /**
         * @技能图标
         */ 
        private skillIcon:eui.Image;
        
        /**
         * @技能名
         */ 
        private skillName:eui.Label;
        
        /**
         * @技能被封详情
         */ 
        private detail:eui.Label;
        
        /**
         * @技能复活剩余时间
         */ 
        private leftTime:eui.Label;
        
        /**
         * @技能复活所需金钱
         */ 
        private needMoney:eui.Label;
        
        /**
         * @被扣dps
         */ 
        private leftDps:eui.Label;
        
        /**
         * @提交按钮
         */ 
        private commit:ViewModel.BtnShareVM;
        
        /**
         * @剩余时间
         */ 
        private countTime:number;
        
        /**
         * @单条数据
         */ 
        private fData:Model.FriendData;
        
        /**
         * @关闭按钮
         */ 
        private CloseBtn:ViewModel.CloseBtnVM;
        
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        /**
         * @回调函数
         */ 
        private onCallBack:Function;
        
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
   
                this.skinName = View.KilledView;
        	
        	
            
        	this.uiLayer=_uiLayer;
        	this.onCallBack=_onCallBack;
        	this.uiLayer.addChild(this);
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	      this.initVM();
    	}
    	
    	/**
    	 * @初始化
    	 */ 
    	private initVM(){
            this.commit.costIcon.visible = false;
            this.commit.costNum.visible = false;
            
            if(Model.WebValue.isTraditional){
                this.commit.description.text = "現在復活！";
            }else{
                this.commit.description.text = "现在复活！";
            }
            
            this.CloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
                if(this.countTime){
                    egret.clearInterval(this.countTime);
                }
            },this)
    	}
    	
    	/**
    	 * @设置信息
    	 */ 
    	public setFDataInfo(_data:Model.FriendData){
        	this.fData=_data;
        	this.skillIcon.source=_data.Icon;
        	
        	if(Model.WebValue.isTraditional){
                this.skillName.textFlow = <Array<egret.ITextElement>>[
                    { text: _data.st.name,style: { "textColor": 0xFF0000 } },{ text: "被首領殺掉了！" }
                ]
        	}else{
                this.skillName.textFlow = <Array<egret.ITextElement>>[
                    { text: _data.st.name,style: { "textColor": 0xFF0000 } },{ text: "被首领杀掉了！" }
                ]
        	}
            
            var myDate = new Date();
            var now = myDate.getTime() / 1000;
            this.leftDps.text="-"+_data.DpsAndUnit;
            var lastTime = _data.dy.sealCD - now;
            
            
            var des = Model.TimeSpan.FromSeconds(lastTime)
            this.leftTime.text = des.toString();
            this.countTime = egret.setInterval(() => {
                var des = Model.TimeSpan.FromSeconds(lastTime)
                this.leftTime.text = des.toString();
                lastTime--;
            },this,1000);
            
            Model.FriendLocalService.setResurgenceMoney(_data,lastTime);
            this.needMoney.text=_data.sealCDMoney+"";
            
            this.commit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.callBackFunc,this);
    	}
    	
    	private callBackFunc(){
    	  if(this.onCallBack){
    	      this.onCallBack(this.fData);
    	      if(this.fData.dy.sealCD==0){
                  this.uiLayer.removeChild(this);
                  if(this.countTime) {
                      egret.clearInterval(this.countTime);
                  }
    	      }
    	  }
    	}
    	
    	
    }
}