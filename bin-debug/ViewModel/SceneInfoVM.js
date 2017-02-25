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
     * @author cai_haotian
     * @date 2015.12.28.
     */
    var SceneInfoVM = (function (_super) {
        __extends(SceneInfoVM, _super);
        function SceneInfoVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @boss倒计时结束事件.
             */
            _this.onTimeLeft = null;
            /**
             * @当前剩余时间.
             */
            _this.currentLeftTime = 0;
            _this.skinName = View.SceneInfoView;
            _this.uiLayer = _uiLayer;
            return _this;
        }
        SceneInfoVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SceneInfoVM.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.bossHp.labelDisplay.visible = false;
            this.bossInfoGroup.visible = false;
            this.init();
        };
        SceneInfoVM.prototype.init = function () {
            this.setMoney(Model.PlayerLocalService.PlayerData.GoldAndUnit);
            this.setMonsterIndex();
            this.setSceneIndex();
            this.setMonsterHp();
            this.goldIcon();
            this.bossBtn.addEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
            //            this.bossBtn.currentState = "upAndSelected";
            //            console.log("zhujun bossBtn 默认状态: " + this.bossBtn.selected);//默认是false.
        };
        /**
         * @boss按钮切换事件.
         * @false:逃跑状态,进入方法变true,按钮变绿,倒计时去掉.
         * @true:挑战状态,进入方法变false,按钮变红,
         */
        SceneInfoVM.prototype.bossBtnEvent = function () {
            if (this.bossBtn.selected) {
                this.timeLeftComplete(); //重置倒计时.
            }
            else {
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
        };
        /**
         * @boss死亡事件.
         * @切换回普通战斗.
         */
        SceneInfoVM.prototype.bossDeathEvent = function () {
            //终止所有计时.
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            //            this.bossBtn.removeEventListener(egret.Event.CHANGE,this.bossBtnEvent,this);
            //重置为正常战斗UI.
            this.swardIcon.visible = true; //关小剑.
            this.bossInfoGroup.visible = false; //显示倒计时，逃跑按钮，进度条
            this.sceneNumLabel.visible = true;
        };
        /**
         * @倒计时到0,或者点击逃跑,UI重置.
         */
        SceneInfoVM.prototype.runAwayEvent = function () {
            this.bossBtn.currentState = "downAndSelected"; //"down";
            this.countTimeLabel.visible = false;
            this.countTimeImage.visible = false;
            this.sceneNumLabel.visible = false;
            this.swardIcon.visible = false;
        };
        /**
         * @设置金币.
         * @TODO: by zhu_jun,2017.02.19.
         */
        SceneInfoVM.prototype.setMoney = function (_value) {
            // this.charMoney.font = RES.getRes("gold-show-font_fnt");
            // this.charMoney.text = _value;
            Main.singleton.mainMenuVM.refreshMenu(); //改钱之后，会更新相关模块UI.
        };
        /**
         * @设置怪物index.
         * @怪物切换时候更新.
         */
        SceneInfoVM.prototype.setMonsterIndex = function () {
            this.sceneNumLabel.text = String(Model.SceneLocalService.SceneData.currentMonster + 1 + "/" + Model.SceneLocalService.SceneData.monsterCount);
        };
        /**
         * @设置关卡序号.
         */
        SceneInfoVM.prototype.setSceneIndex = function () {
            this.preRound.text = String(Model.SceneLocalService.SceneData.sceneId - 1);
            this.currentRound.text = Model.SceneLocalService.SceneData.sceneId + "";
            this.nextRound.text = String(Model.SceneLocalService.SceneData.sceneId + 1);
            //TODO: by zhu_jun,2017.02.20.关卡id背景不变了.
            // this.preImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId - 1) % 3));
            // this.currentImage.source = String("guanshu_" + String(Model.SceneLocalService.SceneData.sceneId % 3));
            // this.nextImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId + 1) % 3));
            //调用成就 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE, Model.SceneLocalService.SceneData.sceneId);
        };
        /**
         * @设置boss血量.
         */
        SceneInfoVM.prototype.setMonsterHp = function () {
            var hp = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp;
            var hpMax = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hpMax;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            }
            else {
                this.bossHp.slideDuration = 500; //0
            }
            this.bossHpLabel.text = String(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpAndUnit
                + "/"
                + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpMaxAndUnit);
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            //            console.log("1111111:" + hp)
            this.bossHp.value = hp;
        };
        /**
         * @设置挑战boss血量
         * @by cai_haotian 2016.4.15.
         */
        SceneInfoVM.prototype.setChallengeBoss = function () {
            var hpMax = Model.ChallengeLoaclService.challengeBossData.hpMax;
            var hp = Model.ChallengeLoaclService.challengeBossData.hp;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            }
            else {
                this.bossHp.slideDuration = 500; //0
            }
            var leftHp = Model.MainLocalService.toUnitConversion(hp);
            var maxHp = Model.ChallengeLoaclService.challengeBossData.GetHpMax;
            this.bossHpLabel.text = leftHp + "/" + maxHp;
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            this.bossHp.value = hp;
        };
        /**
         * @设置倒计时.
         */
        SceneInfoVM.prototype.setCountDown = function (_onTimeLeft, _time) {
            if (_time) {
            }
            else {
                this.onTimeLeft = _onTimeLeft;
            }
            this.currentLeftTime = _time ? _time : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime;
            this.countTimeImage.width = 220;
            this.countDownTimes = _time ? _time * 1000 / 100 : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime * 1000 / 100;
            this.countTimePercent = 220 / this.countDownTimes;
            this.bossTimer = new egret.Timer(100, this.countDownTimes); //0.1秒更新一次记时条.
            if (_time) {
            }
            else {
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
                this.bossTimer.start();
            }
        };
        /**
         * @剩余时间.
         */
        SceneInfoVM.prototype.timeLeftEvent = function () {
            this.currentLeftTime -= 0.1;
            this.countTimeLabel.text = this.currentLeftTime.toFixed(1);
            this.countTimeImage.width -= this.countTimePercent;
            console.log("每100毫秒执行一次!");
        };
        /**
         * @剩余时间结束时调用.
         */
        SceneInfoVM.prototype.timeLeftComplete = function () {
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            this.runAwayEvent();
            if (this.onTimeLeft)
                this.onTimeLeft();
        };
        /**
         *@播放金币呼吸动画
         */
        SceneInfoVM.prototype.goldIcon = function () {
            var mcData = new egret.MovieClipDataFactory(RES.getRes("jinbi_json"), RES.getRes("jinbi_png"));
            this.goldAnimel = new egret.MovieClip(mcData.generateMovieClipData("jinbi"));
            Main.singleton.mainMenuVM.addChild(this.goldAnimel);
        };
        /**
         * @开始播放金币动画
         */
        SceneInfoVM.prototype.goldAnimelStart = function () {
            if (this.goldAnimel.currentFrame == this.goldAnimel.totalFrames) {
                this.goldAnimel.gotoAndPlay(0);
            }
            else {
                this.goldAnimel.play();
            }
        };
        return SceneInfoVM;
    }(eui.Component));
    ViewModel.SceneInfoVM = SceneInfoVM;
    __reflect(SceneInfoVM.prototype, "ViewModel.SceneInfoVM");
})(ViewModel || (ViewModel = {}));
