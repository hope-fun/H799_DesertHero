/**
 *
 * @author: zhu_jun
 * @date: 2017.02.20.
 */
module Model {
    export class DragonBones {
        /**
         * @暴露出去销毁用.
         */
        private armature: dragonBones.Armature;
        /**
         * @回调事件.
         */
        private onCallBack: Function = null;

        public constructor(_parent: egret.DisplayObjectContainer, _dData: string, _tData: string, _pic: string, _armatureName: string, _x: number = 640, _y: number = 360, _onCallBack: Function = null) {
            this.onCallBack = _onCallBack;
            this.createArmature(_dData, _tData, _pic, _armatureName);
            this.armature.getDisplay().x = _x;
            this.armature.getDisplay().y = _y;
            dragonBones.WorldClock.clock.add(this.armature);
            _parent.addChild(this.armature.getDisplay());
        }

        public setActive(_bool: boolean) {
            this.armature.display.visible = _bool;
        }

        /**
         * @修改DB工厂骨架.
         */
        public changeArmature(_dData: string, _tData: string, _pic: string, _armatureName: string, _x: number = 640, _y: number = 360, _onCallBack: Function = null) {
            this.onCallBack = _onCallBack;
            this.createArmature(_dData, _tData, _pic, _armatureName);
            this.armature.getDisplay().x = _x;
            this.armature.getDisplay().y = _y;
        }

        /**
         * @创建DB工厂骨架.
         */
        private createArmature(_dData: string, _tData: string, _pic: string, _armatureName: string) {
            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory = new dragonBones.EgretFactory();
            var dragonbonesData = RES.getRes(_dData);
            var textureData = RES.getRes(_tData);
            var texture = RES.getRes(_pic);
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            this.armature = dragonbonesFactory.buildArmature(_armatureName);
            this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onAnimationEvent, this);
            this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimationEvent, this);//this传谁，监听方法就监听谁.
            this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
        }


        /**
         * @动画监听事件.
         * @TODO:等待完善.
         * @by zhu_jun,2017.02.26.
         */
        private onAnimationEvent(evt: dragonBones.AnimationEvent): void {
            switch (evt.type) {
                case dragonBones.AnimationEvent.START:
                    break;
                case dragonBones.AnimationEvent.LOOP_COMPLETE://循环动画会进这里.
                    // alert("LOOP_COMPLETE");
                    // if (this.onCallBack) this.onCallBack();
                    break;
                case dragonBones.AnimationEvent.COMPLETE://循环动画进不了这里.
                    // alert("COMPLETE");
                    if (this.onCallBack) this.onCallBack(evt);//拨一次的不一定自动销毁，比如攻击动画.
                    // this.uiGroup.removeChild(evt.armature.display);//动画完成后销毁这个armature,因为有可能在连续点击时候已经被强制销毁,所以要做容错.
                    // dragonBones.WorldClock.clock.remove(evt.armature);
                    // evt.armature.dispose();
                    break;
                case dragonBones.FrameEvent.ANIMATION_FRAME_EVENT:
                    this.onFrameEvent(evt);
                    break;
            }
        }

        private onFrameEvent(evt: dragonBones.FrameEvent): void {
            console.log(evt.type, evt.frameLabel);//打印出事件的类型，和事件的帧标签
            if (evt.frameLabel == "enemyHit") {
                Main.singleton.mainGameVM.enemyHit();//龙骨播放完成执行受击帧事件.
            }
        }


        /**     
         * @播放动画.
         * @parent:父节点.
         * @armature:龙骨.
         * @_actionName:bodyGuanYu_idle.
         */
        public play(_actionName: string, playTimes: number = 0, _onCallBack: Function = null): void {
            this.onCallBack = _onCallBack;
            // this.armature.animation.stop();
            this.armature.animation.gotoAndPlay(_actionName, -1, -1, playTimes);
        }

        // /**
        //  * @改变龙骨,不重新add到场景.
        //  */
        // public changeDB() {

        // }

        // /**
        //  * @创建工厂, 加载资源,添加事例, 添加纹理
        //  * @by cai_haotian 2016.2.15.
        //  * @by zhu_jun 2017.02.20.
        //  * @dData:示例bodyGuanYu_ske_json
        //  * @tData:示例bodyGuanYu_tex_json
        //  * @pic:示例bodyGuanYu_tex_png
        //  */
        // public static addArmatureToFactory(dData: string, tData: string, pic: string): dragonBones.EgretFactory {
        //     var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        //     try {
        //         dragonbonesFactory = new dragonBones.EgretFactory();
        //         var dragonbonesData = RES.getRes(dData);
        //         var textureData = RES.getRes(tData);
        //         var texture = RES.getRes(pic);
        //         dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        //         dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        //     } catch (e) {
        //         console.error("DragonBones Factory Get Resource or Parse Data Error.");
        //     }
        //     return dragonbonesFactory;
        // }
        // /**
        //  * @构建骨架.
        //  * @name:bodyGuanYu.
        //  */
        // public static buildArmature(factory: dragonBones.EgretFactory, name: string): dragonBones.Armature {
        //     var armature: dragonBones.Armature;
        //     try {
        //         armature = factory.buildArmature(name);
        //     } catch (e) {
        //         console.error("DragonBones Factory Build Armature Error.");
        //     }
        //     return armature;
        // }


    }
}