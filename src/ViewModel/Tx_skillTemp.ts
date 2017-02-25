module ViewModel {
	/**
	 *
	 * @author fangchao
	 *
	 */
	export class Tx_skillTemp extends eui.Group {
        private role: string;
        public factory: dragonBones.EgretFactory;
        public armatureName: string;
        public armature: dragonBones.Armature;
        public curAnimationName: string;
        public animation: dragonBones.Animation;
        private isFirst: boolean;
		public constructor(_role:string) {
            super();
            this.role = _role;
            var textureData = RES.getRes("texture_"+this.role+"_json");
            var skeletonData = RES.getRes("texture_"+this.role+"_texiao");
            var texture = RES.getRes("texture_"+this.role+"_png");
            this.factory= new dragonBones.EgretFactory();
            this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
            //获取Armature的名字，dragonBones4.0的数据可以包含多个骨架，这里取第一个Armature
            this.armatureName = skeletonData.armature[0].name;
            //从工厂里创建出Armature
            this.armature=this.factory.buildArmature(this.armatureName);
            //获取装载Armature的容器
            var armatureDisplay = this.armature.display;
            armatureDisplay.x = 400;
            armatureDisplay.y = 300;
            //把它添加到舞台上
            this.addChild(armatureDisplay);
            //取得这个Armature动画列表中的第一个动画的名字
            this.curAnimationName = this.armature.animation.animationList[0];
            var lastAnimationName = this.armature.animation.animationList[this.armature.animation.animationList.length-1]
            this.animation= this.armature.animation;
            this.animation.play();
                this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE,() => {
                    this.animation.stop();
                    this.removeChild(armatureDisplay);
                },this)
                dragonBones.WorldClock.clock.add(this.armature);
                //心跳时钟开启
                egret.Ticker.getInstance().register(function(advancedTime) {
                    dragonBones.WorldClock.clock.advanceTime(-1);
                },this);
		}
	}
}
