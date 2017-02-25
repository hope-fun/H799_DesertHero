module ViewModel {
    /**
     * @author cai_haotian 
     * @date 2015.12.28.
     */
    export class SceneInfoVM extends eui.Component {
        /**
         * @boss血条.
         */
        public bossHp: ViewModel.ProgressHp;
        /**
         * @剩余时间条.
         */
        public countTimeImage: eui.Image;
        /**
        *@剩余时间数值显示
        */
        public countTimeLabel: eui.Label;
        // /**
        //  * @玩家拥有金币
        //  */
        // public charMoney: eui.BitmapLabel;
        /**
         * @boss挑战切换按钮.
         */
        public bossBtn: eui.ToggleButton;
        /**
         * @当前闯关数
         */
        public sceneNumLabel: eui.Label;
        /**
         * @当前关数
         */
        public currentRound: eui.Label;
        /**
         * @当前关数图片 
         */
        public currentImage: eui.Image;
        /**
         * @前一关数
         */
        public preRound: eui.Label;
        /**
         * @前一关数图片
         */
        public preImage: eui.Image;
        /**
         * @下一关数
         */
        public nextRound: eui.Label;
        /**
         * @下一关数图片
         */
        public nextImage: eui.Image
        /**
         * @金币
         */
        public gold: eui.Image;
        /**
         * @剑
         */
        public swardIcon: eui.Image;
        /**
         * @父节点
         */
        public uiLayer: eui.UILayer;
        /**
         * @boss血量数字.
         */
        public bossHpLabel: eui.Label;

        /**
         * @回调函数
         */
        public onCallBack: Function;
        /**
         * @boss详情父节点.
         */
        public bossInfoGroup: eui.Group;
        /**
         * @boss计时器声明.
         */
        private bossTimer: egret.Timer;
        /**
         *@金币呼吸动画对象
         */
        public goldAnimel: egret.MovieClip;
        /**
         * @boss倒计时结束事件.
         */
        public onTimeLeft: Function = null;
        /**
         * @当前剩余时间.
         */
        private currentLeftTime: number = 0;
        /**
         * @倒计时次数.
         */
        private countDownTimes: number;
        /**
         * @进度条减去的每份长度.
         */
        private countTimePercent: number;
        /**
         * @正常ui显示组
         * @by cai_haotian 2016.4.18
         */
        private currentInfo: eui.Group;

        public constructor(_uiLayer?: eui.UILayer, _onCallBack?: Function) {
            super();
            this.skinName = View.SceneInfoView;
            this.uiLayer = _uiLayer;
        }

        protected createChildren() {
            super.createChildren();
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.bossHp.labelDisplay.visible = false;
            this.bossInfoGroup.visible = false;
            this.init();
        }

        public init() {
            this.setMoney(Model.PlayerLocalService.PlayerData.GoldAndUnit);
            this.setMonsterIndex();
            this.setSceneIndex();
            this.setMonsterHp();
            this.goldIcon();
            this.bossBtn.addEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
            //            this.bossBtn.currentState = "upAndSelected";
            //            console.log("zhujun bossBtn 默认状态: " + this.bossBtn.selected);//默认是false.
        }


        /**
         * @boss按钮切换事件.
         * @false:逃跑状态,进入方法变true,按钮变绿,倒计时去掉.
         * @true:挑战状态,进入方法变false,按钮变红,
         */
        public bossBtnEvent() {
            if (this.bossBtn.selected) {//true: 执行true的方法.
                this.timeLeftComplete();//重置倒计时.
            } else {//false: 默认是逃跑状态.这里是点击按钮重新过来挑战boss.
                //重置回调事件，逃跑时，回调事件是构造boss关卡数据,切换到boss.
                //TODO: 这段最好是传下来.
                Model.MonsterLocalService.setMonsterData();
                Model.SceneLocalService.SceneData.currentMonster = Model.MonsterLocalService.MonsterList.length - 1;
                this.bossBtn.currentState = "upAndSelected";
                this.countTimeLabel.visible = true;
                this.countTimeImage.visible = true;
                this.sceneNumLabel.visible = false;
                this.swardIcon.visible = false;
                this.setCountDown(this.onTimeLeft);
                this.bossBtn.removeEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
                this.init();
            }
        }

        /**
         * @boss死亡事件.
         * @切换回普通战斗.
         */
        public bossDeathEvent() {
            //终止所有计时.
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            //            this.bossBtn.removeEventListener(egret.Event.CHANGE,this.bossBtnEvent,this);
            //重置为正常战斗UI.
            this.swardIcon.visible = true;//关小剑.
            this.bossInfoGroup.visible = false;//显示倒计时，逃跑按钮，进度条
            this.sceneNumLabel.visible = true;
        }

        /**
         * @倒计时到0,或者点击逃跑,UI重置.
         */
        public runAwayEvent() {
            this.bossBtn.currentState = "downAndSelected";//"down";
            this.countTimeLabel.visible = false;
            this.countTimeImage.visible = false;
            this.sceneNumLabel.visible = false;
            this.swardIcon.visible = false;
        }

        /**
         * @设置金币.
         * @TODO: by zhu_jun,2017.02.19.
         */
        public setMoney(_value: string) {
            // this.charMoney.font = RES.getRes("gold-show-font_fnt");
            // this.charMoney.text = _value;
            Main.singleton.mainMenuVM.refreshMenu();//改钱之后，会更新相关模块UI.
        }

        /**
         * @设置怪物index.
         * @怪物切换时候更新.
         */
        public setMonsterIndex() {
            this.sceneNumLabel.text = String(Model.SceneLocalService.SceneData.currentMonster + 1 + "/" + Model.SceneLocalService.SceneData.monsterCount);
        }

        /**
         * @设置关卡序号.
         */
        public setSceneIndex() {
            this.preRound.text = String(Model.SceneLocalService.SceneData.sceneId - 1);
            this.currentRound.text = Model.SceneLocalService.SceneData.sceneId + "";
            this.nextRound.text = String(Model.SceneLocalService.SceneData.sceneId + 1);
            //TODO: by zhu_jun,2017.02.20.关卡id背景不变了.
            // this.preImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId - 1) % 3));
            // this.currentImage.source = String("guanshu_" + String(Model.SceneLocalService.SceneData.sceneId % 3));
            // this.nextImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId + 1) % 3));
            //调用成就 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE, Model.SceneLocalService.SceneData.sceneId);
        }

        /**
         * @设置boss血量.
         */
        public setMonsterHp() {
            var hp: number = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp;
            var hpMax: number = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hpMax;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            } else {
                this.bossHp.slideDuration = 500;//0
            }
            this.bossHpLabel.text = String(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpAndUnit
                + "/"
                + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpMaxAndUnit);
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            //            console.log("1111111:" + hp)
            this.bossHp.value = hp;
        }

        /**
         * @设置挑战boss血量
         * @by cai_haotian 2016.4.15.
         */
        public setChallengeBoss() {
            var hpMax: number = Model.ChallengeLoaclService.challengeBossData.hpMax;
            var hp: number = Model.ChallengeLoaclService.challengeBossData.hp;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            } else {
                this.bossHp.slideDuration = 500;//0
            }
            var leftHp = Model.MainLocalService.toUnitConversion(hp);
            var maxHp = Model.ChallengeLoaclService.challengeBossData.GetHpMax
            this.bossHpLabel.text = leftHp + "/" + maxHp;
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            this.bossHp.value = hp;
        }

        /**
         * @设置倒计时.
         */
        public setCountDown(_onTimeLeft: Function, _time?: number) {
            if (_time) {

            } else {
                this.onTimeLeft = _onTimeLeft;
            }
            this.currentLeftTime = _time ? _time : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime;
            this.countTimeImage.width = 220;

            this.countDownTimes = _time ? _time * 1000 / 100 : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime * 1000 / 100
            this.countTimePercent = 220 / this.countDownTimes;
            this.bossTimer = new egret.Timer(100, this.countDownTimes);//0.1秒更新一次记时条.
            if (_time) {

            } else {
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
                this.bossTimer.start();
            }
        }



        /**
         * @剩余时间.
         */
        private timeLeftEvent() {
            this.currentLeftTime -= 0.1;
            this.countTimeLabel.text = this.currentLeftTime.toFixed(1);
            this.countTimeImage.width -= this.countTimePercent;
            console.log("每100毫秒执行一次!");
        }

        /**
         * @剩余时间结束时调用.
         */
        public timeLeftComplete() {
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            this.runAwayEvent();
            if (this.onTimeLeft) this.onTimeLeft();
        }


        /**
         *@播放金币呼吸动画 
         */
        public goldIcon() {
            var mcData: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("jinbi_json"), RES.getRes("jinbi_png"));
            this.goldAnimel = new egret.MovieClip(mcData.generateMovieClipData("jinbi"));
            Main.singleton.mainMenuVM.addChild(this.goldAnimel);
        }

        /**
         * @开始播放金币动画
         */
        public goldAnimelStart() {
            if (this.goldAnimel.currentFrame == this.goldAnimel.totalFrames) {
                this.goldAnimel.gotoAndPlay(0);
            } else {
                this.goldAnimel.play();
            }
        }
    }
}