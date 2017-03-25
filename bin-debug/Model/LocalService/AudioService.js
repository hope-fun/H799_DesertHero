var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @by cai_haotian
     * @date 2016.3.18
     *
     */
    var AudioService = (function () {
        function AudioService() {
            this.bgm = new egret.Sound();
            this.sound = new egret.Sound();
        }
        AudioService.Shared = function () {
            if (AudioService.shared == null)
                AudioService.shared = new AudioService();
            return AudioService.shared;
        };
        /**
         * @播放背景音乐
         */
        AudioService.prototype.PlayBGM = function (_bgmSrc) {
            if (_bgmSrc) {
                this.bgmSrc = _bgmSrc;
                this.bgm = RES.getRes(this.bgmSrc);
            }
            if (this.IsMusic) {
                this.bgmChannel = this.bgm.play(0, 0);
            }
        };
        /**
         * @停止播放背景音乐
         */
        AudioService.prototype.StopBGM = function () {
            if (this.bgmChannel != null) {
                this.bgmChannel.stop();
            }
        };
        /**
         * @播放音效
         */
        AudioService.prototype.PlaySound = function (_soundSrc) {
            this.sound = RES.getRes(_soundSrc);
            if (this.IsSound) {
                this.sound.play(0, 1);
            }
        };
        /**
         * @循环播放循环音效
         */
        AudioService.prototype.PlayLoopSound = function (_soundSrc) {
            this.sound = RES.getRes(this.soundSrc);
            if (this.IsSound) {
                this.sound.play(0, 0);
            }
        };
        Object.defineProperty(AudioService.prototype, "IsMusic", {
            get: function () {
                var b = egret.localStorage.getItem("ismusic");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //音乐是否播放，保存设置
            set: function (value) {
                if (!value) {
                    egret.localStorage.setItem("ismusic", "0");
                    this.StopBGM();
                }
                else {
                    egret.localStorage.setItem("ismusic", "1");
                    this.PlayBGM();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AudioService.prototype, "IsSound", {
            get: function () {
                var b = egret.localStorage.getItem("isSound");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //声效是否播放，保存设置
            set: function (value) {
                if (value) {
                    egret.localStorage.setItem("isSound", "1");
                }
                else {
                    egret.localStorage.setItem("isSound", "0");
                }
            },
            enumerable: true,
            configurable: true
        });
        return AudioService;
    }());
    Model.AudioService = AudioService;
    __reflect(AudioService.prototype, "Model.AudioService");
})(Model || (Model = {}));
//# sourceMappingURL=AudioService.js.map