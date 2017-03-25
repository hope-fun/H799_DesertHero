var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun
     * @data: 2015.12.18.
     */
    var TweenCustom = (function () {
        /**
         * @初始化动画属性.
         */
        function TweenCustom(_obj, _uiGroup, _sPos, _ePos, _finalPos) {
            /**
             * @金币出现动画总时长.
             */
            this.sAnimTime = 800;
            /**
             * @y轴到达高点时mPos.y的市场.
             */
            this.mPointTime = 200;
            /**
             * @金币落地等待时间.
             */
            this.goldWaitTime = 1500;
            /**
             * @回收动画，贝塞尔曲线P1的Y坐标默认为300
             */
            this.bezierP1Y = 300;
            this.obj = _obj;
            this.uiGroup = _uiGroup;
            this.sPos = _sPos;
            this.ePos = _ePos;
            this.finalPos = _finalPos;
            this.uiGroup.addChild(this.obj);
        }
        /**
         * @金币出现动画.
         */
        TweenCustom.prototype.GoldProductionAnim = function (_onCallBack) {
            var _this = this;
            //            this.onCallBack = _onCallBack;
            var mPos = new Model.Vector2(); //x轴始终向单一方向运动，这边只需要改y轴坐标.
            mPos.y = Model.Mathf.random(this.sPos.y - 300, this.sPos.y); //TODO:
            var tweenX = egret.Tween.get(this.obj);
            tweenX.to({ x: this.ePos.x }, this.sAnimTime, egret.Ease.circOut).call(function () {
                _onCallBack(_this);
            });
            var tweenY = egret.Tween.get(this.obj);
            tweenY.to({ y: mPos.y }, this.mPointTime).to({ y: this.ePos.y }, this.sAnimTime - this.mPointTime, egret.Ease.bounceOut);
        };
        /**
         * @金币回收动画
         * A:
         * B:
         */
        TweenCustom.prototype.GoldRecycleAnim = function (_onCallBack) {
            var _this = this;
            this.onCallBack = _onCallBack;
            egret.Tween.get(this).to({ factor: 1 }, this.sAnimTime, egret.Ease.sineIn).call(function () {
                _onCallBack(_this);
                _this.uiGroup.removeChild(_this.obj);
            });
        };
        Object.defineProperty(TweenCustom.prototype, "factor", {
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
            get: function () {
                return 0;
            },
            /*
             * 二次贝塞尔曲线公式.
             * B(t)=(1-t)(1-t)P0,2t(1-t)P1,t方P2,0<=t<=1.
             * P0(100,100),P1(300,300),P2(100,500)
             * 返回动画P1和P2都已经确定,P1调路径.
             */
            set: function (t) {
                this.obj.x = (1 - t) * (1 - t) * this.ePos.x + 2 * t * (1 - t) * this.bezierP1X + t * t * this.finalPos.x;
                this.obj.y = (1 - t) * (1 - t) * this.ePos.y + 2 * t * (1 - t) * this.bezierP1Y + t * t * this.finalPos.y;
            },
            enumerable: true,
            configurable: true
        });
        return TweenCustom;
    }());
    Model.TweenCustom = TweenCustom;
    __reflect(TweenCustom.prototype, "Model.TweenCustom");
})(Model || (Model = {}));
//# sourceMappingURL=TweenCustom.js.map