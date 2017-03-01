var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model;
(function (Model) {
    /**
     * @author: fangchao
     * @revise: zhu_jun
     * @date: 2016.01.07.
     */
    var MovieClipService = (function (_super) {
        __extends(MovieClipService, _super);
        //感觉没啥用,by zhu_jun,2017.02.26.
        // public set Width(_value: number) {
        //     this.movieClip.width = _value;
        //     // this.movieClip.sy
        //     this.syncRect();
        // }
        // public get Width(): number {
        //     return this.movieClip.width;
        // }
        // public set Height(_value: number) {
        //     this.movieClip.height = _value;
        //     this.syncRect();
        // }
        // public get Height(): number {
        //     return this.movieClip.height;
        // }
        /**
         * @英雄攻击、待机动画播放.
         * @param: _uiGroup父节点.
         * @param: _name测试角色名,仅供测试时使用.
         */
        function MovieClipService(_uiGroup) {
            var _this = _super.call(this) || this;
            /**
             * @回调方法.
             */
            _this.onCallBack = null;
            /**
             * @序列帧对象.
             */
            _this.movieClip = null;
            _this.uiGroup = _uiGroup;
            return _this;
        }
        Object.defineProperty(MovieClipService.prototype, "X", {
            get: function () {
                return this.movieClip.x;
            },
            set: function (_value) {
                this.movieClip.x = _value;
                this.syncRect();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClipService.prototype, "Y", {
            get: function () {
                return this.movieClip.y;
            },
            set: function (_value) {
                this.movieClip.y = _value;
                this.syncRect();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClipService.prototype, "ScaleX", {
            /**
             * @如果用scale,mc图片需要在中心点，不能直接带位置信息，位置程序自己调整.
             */
            get: function () {
                return this.movieClip.scaleX;
            },
            set: function (_value) {
                this.movieClip.scaleX = _value;
                // this.movieClip.x -= this.movieClip.movieClipData.textureData.x * _value;//因为是整体缩放.
                // this.movieClip.sy
                this.syncRect();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClipService.prototype, "ScaleY", {
            get: function () {
                return this.movieClip.scaleY;
            },
            set: function (_value) {
                this.movieClip.scaleY = _value;
                // this.movieClip.y -= this.movieClip.y * _value;//因为是整体缩放.
                this.syncRect();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @初始化并播放特效.
         */
        MovieClipService.prototype.initMovieClip = function (_json, _png, _mcName, _playTimes, _onCallBack, _switch) {
            if (_playTimes === void 0) { _playTimes = -1; }
            if (_switch === void 0) { _switch = true; }
            this.onCallBack = _onCallBack;
            var mcData = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
            this.movieClip = new egret.MovieClip(mcData.generateMovieClipData(_mcName));
            if (_switch) {
                // alert("_switch " + _switch);
                this.movieClip.addEventListener(egret.Event.COMPLETE, this.onEvent, this);
            }
            else {
                // alert("_switch " + _switch);
                this.movieClip.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onEvent, this);
            }
            this.uiGroup.addChild(this.movieClip);
            this.movieClip.play(_playTimes);
            //同步坐标与宽高.
            //            this.syncRect();
            return this.movieClip;
        };
        MovieClipService.prototype.onEvent = function (evt) {
            // alert("this.movieClip.currentFrame" + this.movieClip.currentFrame + " e.type " + evt.type + "on event evt.frameLabel " + evt.frameLabel);
            // alert("on event evt.frameLabel " + evt.currentTarget);
            if (this.onCallBack)
                this.onCallBack(); //循环动画没传方法,所以不会进这里.
            //            Model.console.log("zhujun: 循环动画没传方法,所以不会进这里. movie clip is " + this.movieClip);
            //            if(this.movieClip) this.uiGroup.removeChild(this.movieClip);//因为有可能在连续点击时候已经被强制销毁,所以要做容错.
            //            console.log("zhujun : mc play finish ! " + _mcName);
        };
        /**
         * @切换正在播放的MovieClip.
         * @1.不重复添加点击方法.
         * @2.不重复往场景上添加.
         * @敌人切换时使用.
         */
        MovieClipService.prototype.changeMovieClip = function (_json, _png, _mcName, _playTimes, _onCallBack) {
            if (_playTimes === void 0) { _playTimes = -1; }
            this.onCallBack = _onCallBack;
            if (this.movieClip) {
                //            console.log("zhujun: 切换正在播放的动画 !  ");
                this.movieClip.stop();
                var mcData = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
                this.movieClip.movieClipData = mcData.generateMovieClipData(_mcName);
                this.movieClip.play(_playTimes);
                //                this.syncRect();
                return this.movieClip;
            }
            else {
                return this.movieClip;
            }
        };
        /**
         * @_x:
         * @_y:
         * @_width:
         * @_height:
         * @同步坐标与宽高.
         */
        MovieClipService.prototype.syncRect = function (_x, _y, _width, _height) {
            this.x = this.movieClip.x;
            this.y = this.movieClip.y;
            this.width = this.movieClip.width;
            this.height = this.movieClip.height;
        };
        return MovieClipService;
    }(eui.Component));
    Model.MovieClipService = MovieClipService;
    __reflect(MovieClipService.prototype, "Model.MovieClipService");
})(Model || (Model = {}));
