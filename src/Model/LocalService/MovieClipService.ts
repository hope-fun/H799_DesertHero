module Model {
	/**
	 * @author: fangchao
	 * @revise: zhu_jun
	 * @date: 2016.01.07.
	 */
    export class MovieClipService extends eui.Component {
    	/**
    	 * @动画父节点.
    	 */
        private uiGroup: eui.Group;
        /**
         * @回调方法.
         */
        public onCallBack: Function = null;
    	/**
    	 * @序列帧对象.
    	 */
        public movieClip: egret.MovieClip = null;

        public set X(_value: number) {
            this.movieClip.x = _value;
            this.syncRect();
        }

        public get X(): number {
            return this.movieClip.x;
        }

        public set Y(_value: number) {
            this.movieClip.y = _value;
            this.syncRect();
        }

        public get Y(): number {
            return this.movieClip.y;
        }

        public set ScaleX(_value: number) {
            this.movieClip.scaleX = _value;
            // this.movieClip.x -= this.movieClip.movieClipData.textureData.x * _value;//因为是整体缩放.
            // this.movieClip.sy
            this.syncRect();
        }

        /**
         * @如果用scale,mc图片需要在中心点，不能直接带位置信息，位置程序自己调整.
         */
        public get ScaleX(): number {
            return this.movieClip.scaleX;
        }

        public set ScaleY(_value: number) {
            this.movieClip.scaleY = _value;
            // this.movieClip.y -= this.movieClip.y * _value;//因为是整体缩放.
            this.syncRect();
        }

        public get ScaleY(): number {
            return this.movieClip.scaleY;
        }


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
        public constructor(_uiGroup: eui.Group) {
            super();
            this.uiGroup = _uiGroup;
        }

        /**
         * @初始化并播放特效.
         */
        public initMovieClip(_json: string, _png: string, _mcName: string, _playTimes: number = -1, _onCallBack?: Function, _switch: boolean = true): egret.MovieClip {
            this.onCallBack = _onCallBack;
            var mcData: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
            this.movieClip = new egret.MovieClip(mcData.generateMovieClipData(_mcName));
            if (_switch) {
                // alert("_switch " + _switch);
                this.movieClip.addEventListener(egret.Event.COMPLETE, this.onEvent, this);
            } else {
                // alert("_switch " + _switch);
                this.movieClip.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onEvent, this);
            }
            this.uiGroup.addChild(this.movieClip);
            this.movieClip.play(_playTimes);
            //同步坐标与宽高.
            //            this.syncRect();
            return this.movieClip;
        }

        private onEvent(evt: egret.MovieClipEvent) {
            // alert("this.movieClip.currentFrame" + this.movieClip.currentFrame + " e.type " + evt.type + "on event evt.frameLabel " + evt.frameLabel);
            // alert("on event evt.frameLabel " + evt.currentTarget);

            if (this.onCallBack) this.onCallBack();//循环动画没传方法,所以不会进这里.
            //            Model.console.log("zhujun: 循环动画没传方法,所以不会进这里. movie clip is " + this.movieClip);
            //            if(this.movieClip) this.uiGroup.removeChild(this.movieClip);//因为有可能在连续点击时候已经被强制销毁,所以要做容错.
            //            console.log("zhujun : mc play finish ! " + _mcName);
        }

        /**
         * @切换正在播放的MovieClip.
         * @1.不重复添加点击方法.
         * @2.不重复往场景上添加.
         * @敌人切换时使用.
         */
        public changeMovieClip(_json: string, _png: string, _mcName: string, _playTimes: number = -1, _onCallBack?: Function): egret.MovieClip {
            this.onCallBack = _onCallBack;
            if (this.movieClip) {
                //            console.log("zhujun: 切换正在播放的动画 !  ");
                this.movieClip.stop();
                var mcData: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(_json), RES.getRes(_png));
                this.movieClip.movieClipData = mcData.generateMovieClipData(_mcName);
                this.movieClip.play(_playTimes);
                //                this.syncRect();
                return this.movieClip;
            } else {
                return this.movieClip;
            }
        }

        /**
         * @_x:
         * @_y:
         * @_width:
         * @_height:
         * @同步坐标与宽高.
         */
        private syncRect(_x?: number, _y?: number, _width?: number, _height?: number) {
            this.x = this.movieClip.x;
            this.y = this.movieClip.y;
            this.width = this.movieClip.width;
            this.height = this.movieClip.height;
        }
    }
}

