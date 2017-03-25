var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author fangchao
     *
     */
    var Tx_skillTemp = (function (_super) {
        __extends(Tx_skillTemp, _super);
        function Tx_skillTemp(_role) {
            var _this = _super.call(this) || this;
            _this.role = _role;
            var textureData = RES.getRes("texture_" + _this.role + "_json");
            var skeletonData = RES.getRes("texture_" + _this.role + "_texiao");
            var texture = RES.getRes("texture_" + _this.role + "_png");
            _this.factory = new dragonBones.EgretFactory();
            _this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            _this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            //获取Armature的名字，dragonBones4.0的数据可以包含多个骨架，这里取第一个Armature
            _this.armatureName = skeletonData.armature[0].name;
            //从工厂里创建出Armature
            _this.armature = _this.factory.buildArmature(_this.armatureName);
            //获取装载Armature的容器
            var armatureDisplay = _this.armature.display;
            armatureDisplay.x = 400;
            armatureDisplay.y = 300;
            //把它添加到舞台上
            _this.addChild(armatureDisplay);
            //取得这个Armature动画列表中的第一个动画的名字
            _this.curAnimationName = _this.armature.animation.animationList[0];
            var lastAnimationName = _this.armature.animation.animationList[_this.armature.animation.animationList.length - 1];
            _this.animation = _this.armature.animation;
            _this.animation.play();
            _this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, function () {
                _this.animation.stop();
                _this.removeChild(armatureDisplay);
            }, _this);
            dragonBones.WorldClock.clock.add(_this.armature);
            //心跳时钟开启
            egret.Ticker.getInstance().register(function (advancedTime) {
                dragonBones.WorldClock.clock.advanceTime(-1);
            }, _this);
            return _this;
        }
        return Tx_skillTemp;
    }(eui.Group));
    ViewModel.Tx_skillTemp = Tx_skillTemp;
    __reflect(Tx_skillTemp.prototype, "ViewModel.Tx_skillTemp");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=Tx_skillTemp.js.map