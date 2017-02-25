module Model {
	/**
	 * @author: zhu_jun 
	 * @data: 2015.12.18.
	 */
	export class TweenCustom {
    	/**
		 * @需要运动的游戏对象.
		 */
        public obj: eui.Image;
        /**
         * @动画起始点坐标.
         */ 
        private sPos: Vector2;
        /**
         * @金币出现动画总时长.
         */ 
        public sAnimTime: number = 800;

        /**
         * @y轴到达高点时mPos.y的市场.
         */ 
        private mPointTime: number = 200;
        /**
         * @金币落地等待时间.
         */ 
        public goldWaitTime: number = 1500;
        /**
         * @动画结束点坐标.
         */ 
        public ePos: Vector2;
        /**
         * @回收动画，贝塞尔曲线P1的X坐标. 
         */ 
        public bezierP1X:number;
        /**
         * @回收动画，贝塞尔曲线P1的Y坐标默认为300
         */ 
        public bezierP1Y: number = 300;
        /**
         * @浮动钱币显示
         */
        private label: eui.BitmapLabel;
        
        /**
         * @金币最终飞到的坐标
         */ 
        public finalPos:Vector2;
        
        /**
         * @回调方法.
         */ 
        private onCallBack: Function;
        
        /**
         * @父节点
         */ 
        public uiGroup: eui.Group;
        
    	/**
    	 * @初始化动画属性.
    	 */ 
        public constructor(_obj: eui.Image,_uiGroup: eui.Group,_sPos?: Vector2,_ePos?: Vector2,_finalPos?:Vector2) {
            this.obj = _obj;
            this.uiGroup = _uiGroup
            this.sPos = _sPos;
            this.ePos = _ePos;
            this.finalPos = _finalPos;
            this.uiGroup.addChild(this.obj);
		}
		
        /**
         * @金币出现动画.
         */
        public GoldProductionAnim(_onCallBack?: Function) { 
//            this.onCallBack = _onCallBack;
            var mPos: Vector2=new Model.Vector2();//x轴始终向单一方向运动，这边只需要改y轴坐标.
            mPos.y = Mathf.random(this.sPos.y-300,this.sPos.y);//TODO:
            var tweenX = egret.Tween.get(this.obj);
            tweenX.to({ x: this.ePos.x },this.sAnimTime,egret.Ease.circOut).call(() => {
                _onCallBack(this);
            });
            var tweenY = egret.Tween.get(this.obj);
            tweenY.to({ y: mPos.y },this.mPointTime).to({ y: this.ePos.y },this.sAnimTime - this.mPointTime,egret.Ease.bounceOut);
        }
        
        /**
         * @金币回收动画
         * A:
         * B:
         */
        public GoldRecycleAnim(_onCallBack?: Function) {
            this.onCallBack = _onCallBack;
            egret.Tween.get(this).to({ factor: 1 },this.sAnimTime,egret.Ease.sineIn).call(() => {
                _onCallBack(this);     
                this.uiGroup.removeChild(this.obj);
            });
        }
        
//        /**
//         * @处理显示钱币
//         * @by cai_haotian 2016.2.17.
//         */ 
//        private initText(){
//            this.label = new eui.BitmapLabel();
//            this.label.font = RES.getRes("gold-font_fnt");
//            this.label.text = this.text;
//            
//            this.label.x = this.ePos.x - this.label.textWidth / 2;//TODO:现在宽度问题尚未解决
//            this.label.y = this.ePos.y - this.obj.height;
//            this.uiGroup.addChild(this.label);
//            egret.Tween.get(this.label).to({ y: 350,alpha: 0 },1200).call(() => {
//                this.uiGroup.removeChild(this.label);
//            });
//        }
        
        public get factor(): number {
            return 0;
        }
        
        /*
         * 二次贝塞尔曲线公式.
         * B(t)=(1-t)(1-t)P0,2t(1-t)P1,t方P2,0<=t<=1.
         * P0(100,100),P1(300,300),P2(100,500)
         * 返回动画P1和P2都已经确定,P1调路径.
         */
        public set factor(t: number) {
            this.obj.x = (1 - t) * (1 - t) * this.ePos.x + 2 * t * (1 - t) * this.bezierP1X + t * t * this.finalPos.x;
            this.obj.y = (1 - t) * (1 - t) * this.ePos.y + 2 * t * (1 - t) * this.bezierP1Y + t * t * this.finalPos.y;
        }
	}
}
