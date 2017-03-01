var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author: zhu_jun
 * @date: 2017.02.20.
 */
var Model;
(function (Model) {
    var DragonBones = (function () {
        function DragonBones(_parent, _dData, _tData, _pic, _armatureName, _x, _y, _onCallBack) {
            if (_x === void 0) { _x = 640; }
            if (_y === void 0) { _y = 360; }
            if (_onCallBack === void 0) { _onCallBack = null; }
            /**
             * @回调事件.
             */
            this.onCallBack = null;
            this.onCallBack = _onCallBack;
            this.parent = _parent;
            this.createArmature(_dData, _tData, _pic, _armatureName);
            this.armature.getDisplay().x = _x;
            this.armature.getDisplay().y = _y;
            dragonBones.WorldClock.clock.add(this.armature);
            this.parent.addChild(this.armature.getDisplay());
        }
        DragonBones.prototype.setActive = function (_bool) {
            this.armature.display.visible = _bool;
        };
        DragonBones.prototype.reset = function () {
            this.parent.removeChild(this.armature.display);
            dragonBones.WorldClock.clock.remove(this.armature);
            this.armature.dispose();
        };
        /**
         * @修改DB工厂骨架.
         */
        DragonBones.prototype.changeArmature = function (_dData, _tData, _pic, _armatureName, _x, _y, _onCallBack) {
            if (_x === void 0) { _x = 640; }
            if (_y === void 0) { _y = 360; }
            if (_onCallBack === void 0) { _onCallBack = null; }
            this.onCallBack = _onCallBack;
            this.reset(); //删了重新添加.
            this.createArmature(_dData, _tData, _pic, _armatureName);
            this.armature.getDisplay().x = _x;
            this.armature.getDisplay().y = _y;
            dragonBones.WorldClock.clock.add(this.armature);
            this.parent.addChild(this.armature.getDisplay());
        };
        /**
         * @创建DB工厂骨架.
         */
        DragonBones.prototype.createArmature = function (_dData, _tData, _pic, _armatureName) {
            var dragonbonesFactory = new dragonBones.EgretFactory();
            var dragonbonesData = RES.getRes(_dData);
            var textureData = RES.getRes(_tData);
            var texture = RES.getRes(_pic);
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            this.armature = dragonbonesFactory.buildArmature(_armatureName);
            this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.onAnimationEvent, this);
            this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimationEvent, this); //this传谁，监听方法就监听谁.
            this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
        };
        /**
         * @动画监听事件.
         * @TODO:等待完善.
         * @by zhu_jun,2017.02.26.
         */
        DragonBones.prototype.onAnimationEvent = function (evt) {
            switch (evt.type) {
                case dragonBones.AnimationEvent.START:
                    break;
                case dragonBones.AnimationEvent.LOOP_COMPLETE:
                    // alert("LOOP_COMPLETE");
                    // if (this.onCallBack) this.onCallBack();
                    break;
                case dragonBones.AnimationEvent.COMPLETE:
                    // alert("COMPLETE");
                    if (this.onCallBack)
                        this.onCallBack(evt); //拨一次的不一定自动销毁，比如攻击动画.
                    // this.uiGroup.removeChild(evt.armature.display);//动画完成后销毁这个armature,因为有可能在连续点击时候已经被强制销毁,所以要做容错.
                    // dragonBones.WorldClock.clock.remove(evt.armature);
                    // evt.armature.dispose();
                    break;
                case dragonBones.FrameEvent.ANIMATION_FRAME_EVENT:
                    this.onFrameEvent(evt);
                    break;
            }
        };
        DragonBones.prototype.onFrameEvent = function (evt) {
            console.log(evt.type, evt.frameLabel); //打印出事件的类型，和事件的帧标签
            if (evt.frameLabel == "enemyHit") {
                Main.singleton.mainGameVM.enemyHit(); //龙骨播放完成执行受击帧事件.
            }
        };
        /**
         * @播放动画.
         * @parent:父节点.
         * @armature:龙骨.
         * @_actionName:bodyGuanYu_idle.
         */
        DragonBones.prototype.play = function (_actionName, playTimes, _onCallBack) {
            if (playTimes === void 0) { playTimes = 0; }
            if (_onCallBack === void 0) { _onCallBack = null; }
            this.onCallBack = _onCallBack;
            // this.armature.animation.stop();
            this.armature.animation.gotoAndPlay(_actionName, -1, -1, playTimes);
        };
        return DragonBones;
    }());
    Model.DragonBones = DragonBones;
    __reflect(DragonBones.prototype, "Model.DragonBones");
})(Model || (Model = {}));
