module Model {
    /**
     * 
     * @by cai_haotian
     * @date 2016.3.18
     * 
     */ 
    export class AudioService {
        private static shared: AudioService;
        public static Shared(): AudioService {
            if(AudioService.shared == null)
                AudioService.shared = new AudioService();
            return AudioService.shared;
        }
        private sound: egret.Sound;//一般音效
        private bgm: egret.Sound;//背景音乐
        private bgmChannel: egret.SoundChannel;//保存用来静音用
        private bgmSrc:string;
        private soundSrc:string;
        
        public constructor() {
            this.bgm = new egret.Sound();
            this.sound=new egret.Sound();
        }
        
        /**
         * @播放背景音乐
         */ 
        public PlayBGM(_bgmSrc?: string) {
            if(_bgmSrc){
                this.bgmSrc=_bgmSrc;
                this.bgm = RES.getRes(this.bgmSrc);
            }
            
            if(this.IsMusic) {
                this.bgmChannel = this.bgm.play(0,0);
            }
        }
        
        /**
         * @停止播放背景音乐
         */ 
        public StopBGM() {
            if(this.bgmChannel != null) {
                this.bgmChannel.stop();
            }
        }
        
        /**
         * @播放音效
         */ 
        public PlaySound(_soundSrc: string) {
            this.sound = RES.getRes(_soundSrc);
            if(this.IsSound) {
                this.sound.play(0,1);
            }
        }
        
        /**
         * @循环播放循环音效
         */
        public PlayLoopSound(_soundSrc:string) {
            this.sound = RES.getRes(this.soundSrc);
            if(this.IsSound) {
                this.sound.play(0,0);
            }
        }
        
        //音乐是否播放，保存设置
        public set IsMusic(value) {
            if(!value) {
                egret.localStorage.setItem("ismusic","0");
                this.StopBGM();
            } else {
                egret.localStorage.setItem("ismusic","1");
                this.PlayBGM();
            }
        }
        
        public get IsMusic(): boolean {
            var b = egret.localStorage.getItem("ismusic");
            if(b == null || b == "") {
                return true;
            } else {
                return b == "1";
            }
        }
        
        //声效是否播放，保存设置
        public set IsSound(value) {
            if(value) {
                egret.localStorage.setItem("isSound","1");
            } else {
                egret.localStorage.setItem("isSound","0");
            }
        }
        
        public get IsSound(): boolean {
            var b = egret.localStorage.getItem("isSound");
            if(b == null || b == "") {
                return true;
            } else {
                return b == "1";
            }
        }
    }
}