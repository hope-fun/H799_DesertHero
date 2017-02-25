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
     * @author by cai_haotian 2015.12.23.
     *
     */
    var BtnShareVM = (function (_super) {
        __extends(BtnShareVM, _super);
        function BtnShareVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnShareItem;
            return _this;
        }
        BtnShareVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                Model.AudioService.Shared().PlaySound("YX-002_mp3");
            }, this);
        };
        /**
         * @设置消耗Icon图标.
         */
        BtnShareVM.prototype.setCostIcon = function (_source, _width, _height) {
            this.costIcon.source = _source;
            this.costIcon.width = _width;
            this.costIcon.height = _height;
        };
        /**
         * @按下时为蓝色.
         */
        BtnShareVM.prototype.downAuto = function () {
            //            Model.console.log("当前状态不存在,请及时联系客服处理 ! " + this.currentState);
            switch (this.currentState) {
                case "upBlue":
                    this.currentState = "downBlue";
                    break;
                case "up":
                    this.currentState = "down";
                    break;
                //                case "upOrange":
                //                    this.currentState = "downOrange";
                //                    break;
                default:
                    //                    alert("当前状态不存在,请及时联系客服处理 ! " + this.currentState);
                    break;
            }
        };
        /**
         * @主角解锁状态.
         */
        BtnShareVM.prototype.setPUpgrade = function (_gold, _damageBonus, _isEnough) {
            if (_isEnough === void 0) { _isEnough = false; }
            this.costNum.text = _gold; // _gold.toString();
            this.setCostIcon("icon_yinbi_png", 20, 20);
            if (Model.WebValue.isTraditional) {
                this.valueLabel.text = String("+" + _damageBonus + "點擊傷害");
                this.valueDesLabel.text = "升級";
            }
            else {
                this.valueLabel.text = String("+" + _damageBonus + "点击伤害");
                this.valueDesLabel.text = "升级";
            }
            if (_isEnough) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
        };
        /**
         * @主角未解锁状态.
         * @_gold:解锁花费.
         * @_level:解锁需要的玩家等级.
         */
        BtnShareVM.prototype.setPSLock = function (_gold, _unLocklevel) {
            this.costNum.text = _gold; //Model.MainInfoLocalService.toUnitConversion(_gold);
            this.setCostIcon("icon_yinbi_png", 20, 20);
            if (Model.WebValue.isTraditional) {
                this.description.text = String("達到" + _unLocklevel + "級時解鎖");
            }
            else {
                this.description.text = String("达到" + _unLocklevel + "级时解锁");
            }
            this.valueDesLabel.text = "";
            this.valueLabel.text = "";
            this.touchEnabled = false;
            this.currentState = "disabled";
        };
        /**
         * @设置玩家技能未解锁状态.
         */
        BtnShareVM.prototype.setPSUnlock = function (_gold, _deltaDamage, _isEnough) {
            this.costNum.text = _gold; //Model.MainInfoLocalService.toUnitConversion(_gold);
            this.setCostIcon("icon_yinbi_png", 20, 20);
            this.description.text = "";
            if (Model.WebValue.isTraditional) {
                this.valueDesLabel.text = "升級";
            }
            else {
                this.valueDesLabel.text = "升级";
            }
            this.valueLabel.text = String("+" + _deltaDamage);
            ;
            if (_isEnough) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
        };
        /**
         * @挚友以及挚友技能,已招募情况下升级状态设置.
         */
        BtnShareVM.prototype.setFUpgrade = function (_costNum, _deltaDps, _isEnough, _layer) {
            this.costNum.text = _costNum;
            this.setCostIcon("icon_yinbi_png", 20, 20);
            if (_layer) {
                this.valueLabel.text = _layer;
                if (Model.WebValue.isTraditional) {
                    this.valueDesLabel.text = "解鎖技能";
                }
                else {
                    this.valueDesLabel.text = "解锁技能";
                }
                if (_isEnough) {
                    this.touchEnabled = true;
                    this.currentState = "upBlue";
                }
                else {
                    this.touchEnabled = false;
                    this.currentState = "disabled";
                }
            }
            else {
                if (Model.WebValue.isTraditional) {
                    this.valueLabel.text = String("+" + _deltaDps + "秒傷");
                    this.valueDesLabel.text = "升級";
                }
                else {
                    this.valueLabel.text = String("+" + _deltaDps + "秒伤");
                    this.valueDesLabel.text = "升级";
                }
                if (_isEnough) {
                    this.touchEnabled = true;
                    this.currentState = "up";
                }
                else {
                    this.touchEnabled = false;
                    this.currentState = "disabled";
                }
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
        };
        /**
         * @_isEnough:true挚友以及挚友技能,未招募情况下满足招募条件:亮
         * @_isEnough:false挚友以及挚友技能,未招募情况下不满足招募条件:灰
         */
        BtnShareVM.prototype.setFLock = function (_costType, _costNum, _deltaDps, _isEnough) {
            this.costNum.text = _costNum; //Model.MainInfoLocalService.toUnitConversion(_costNum);
            if (Model.WebValue.isTraditional) {
                this.valueLabel.text = String("+" + _deltaDps + "秒傷");
                this.valueDesLabel.text = "招募";
            }
            else {
                this.valueLabel.text = String("+" + _deltaDps + "秒伤");
                this.valueDesLabel.text = "招募";
            }
            if (_isEnough) {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this); //这边不需要重置回up,是因为在大循环里面会reset.
                this.touchEnabled = true;
                this.currentState = "up";
                if (_costType == Model.MoneyType.MONEY_TYPE_YB) {
                    this.setCostIcon("icon_yuanbao_png", 20, 15);
                }
                else {
                    this.setCostIcon("icon_yinbi_png", 20, 20);
                }
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
                if (_costType == Model.MoneyType.MONEY_TYPE_YB) {
                    this.setCostIcon("icon_yuanbao_png", 20, 15);
                }
                else {
                    this.setCostIcon("icon_yinbi_png", 20, 20);
                }
            }
        };
        /**
         * @购买神兵.
         */
        BtnShareVM.prototype.setMWBuy = function (_costNum, _isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.costIcon.source = "icon_lingshi";
            this.costNum.text = _costNum.toString();
            if (Model.WebValue.isTraditional) {
                this.description.text = "購買神器";
            }
            else {
                this.description.text = "购买神器";
            }
            if (_isDisable) {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
            else {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this); //这边不需要重置回up,是因为在大循环里面会reset.
        };
        /**
         * @设置神器未锁定状态.
         */
        BtnShareVM.prototype.setMWUnlock = function (_costNum, _isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_lingshi", 18, 18);
            if (Model.WebValue.isTraditional) {
                this.description.text = "升級";
            }
            else {
                this.description.text = "升级";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this); //这边不需要重置回up,是因为在大循环里面会reset.
            if (_isDisable) {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
            else {
                this.touchEnabled = true;
                this.currentState = "up";
            }
        };
        /**
         * @设置神器锁定状态.
         */
        BtnShareVM.prototype.setMWLock = function (_costNum) {
            this.costNum.text = "";
            this.costIcon.source = "";
            this.costIcon.width = 20;
            this.costIcon.height = 20;
            if (Model.WebValue.isTraditional) {
                this.description.text = "未獲得";
            }
            else {
                this.description.text = "未获得";
            }
            this.touchEnabled = false;
            this.currentState = "disabled";
        };
        /**
         * @设置购买元宝的按钮
         * @by cai_haotian 2016.3.22
         */
        BtnShareVM.prototype.setYBBtn = function () {
            this.costNum.text = "";
            this.costIcon.source = "";
            if (Model.WebValue.isTraditional) {
                this.description.text = "購買元寶";
            }
            else {
                this.description.text = "购买元宝";
            }
            this.touchEnabled = true;
            this.currentState = "up";
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
        };
        /**
         * @设置商城状态
         * @by cai_haotian 2016.2.26.
         */
        BtnShareVM.prototype.setSBuy = function (_costNum, _isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_yuanbao_png", 20, 15);
            if (Model.WebValue.isTraditional) {
                this.description.text = "購買道具";
            }
            else {
                this.description.text = "购买道具";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @设置商城购买元宝
         */
        BtnShareVM.prototype.setYBBuy = function (_costNum, _isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.costIcon.visible = false;
            this.costNum.visible = false;
            if (Model.WebValue.isTraditional) {
                this.description.text = "購買道具";
            }
            else {
                this.description.text = "购买道具";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @技能持续中
         * @by cai_haotian 2016.2.29
         */
        BtnShareVM.prototype.skillUsing = function () {
            this.touchEnabled = false;
            this.currentState = "disabled";
            if (Model.WebValue.isTraditional) {
                this.description.text = "技能持續中...";
            }
            else {
                this.description.text = "技能持续中...";
            }
        };
        /**
         * @重置玩家技能cd
         * @by cai_haotian 2016.3.7.
         */
        BtnShareVM.prototype.setReduceCD = function (_isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @领取累充奖励
         * @by cai_haotian 2016.3.7
         */
        BtnShareVM.prototype.setCumulativeBtn = function (_costNum, _isDisable) {
            if (_isDisable === void 0) { _isDisable = false; }
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_lingshi", 18, 18);
            if (Model.WebValue.isTraditional) {
                this.description.text = "獎 勵";
            }
            else {
                this.description.text = "奖 励";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @领取每日充值
         */
        BtnShareVM.prototype.setDailyRecharge = function (_isDisable) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
                if (Model.WebValue.isTraditional) {
                    this.description.text = "可領取";
                }
                else {
                    this.description.text = "可领取";
                }
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
                if (Model.WebValue.isTraditional) {
                    this.description.text = "未達成";
                }
                else {
                    this.description.text = "未达成";
                }
            }
        };
        /**
         * @成就元宝按钮
         */
        BtnShareVM.prototype.setAchievementYBBtn = function (_costNum, _isDisable) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_yuanbao_png", 20, 15);
            if (Model.WebValue.isTraditional) {
                this.description.text = "獎  勵";
            }
            else {
                this.description.text = "奖  励";
            }
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @成就灵石按钮
         */
        BtnShareVM.prototype.setAchievementJWBtn = function (_costNum, _isDisable) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_lingshi", 18, 18);
            if (Model.WebValue.isTraditional) {
                this.description.text = "獎  勵";
            }
            else {
                this.description.text = "奖  励";
            }
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @家族按钮
         */
        BtnShareVM.prototype.setClanBtn = function (_costNum) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            this.costNum.text = Model.MainLocalService.toUnitConversion(_costNum);
            this.setCostIcon("icon_yuanbao_png", 20, 15);
            this.touchEnabled = true;
            this.currentState = "up";
            if (Model.WebValue.isTraditional) {
                this.description.text = "立即激活";
            }
            else {
                this.description.text = "立即激活";
            }
        };
        /**
         * @离线奖励按钮
         */
        BtnShareVM.prototype.setOffLineBtn = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            this.touchEnabled = true;
            this.costIcon.visible = false;
            this.costNum.visible = false;
            this.currentState = "up";
            if (Model.WebValue.isTraditional) {
                this.description.text = "我知道了";
            }
            else {
                this.description.text = "我知道了";
            }
        };
        /**
         * @每日挑战
         * @by cai_haotian 2016.4.18.
         */
        BtnShareVM.prototype.setChallengBtn = function (_isDisable) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (Model.WebValue.isTraditional) {
                this.description.text = "開始挑戰";
            }
            else {
                this.description.text = "开始挑战";
            }
            this.costIcon.visible = false;
            this.costNum.visible = false;
            if (_isDisable) {
                this.touchEnabled = true;
                this.currentState = "up";
            }
            else {
                this.touchEnabled = false;
                this.currentState = "disabled";
            }
        };
        /**
         * @免费释放技能
         * @by cai_haotian 2016.4.18
         */
        BtnShareVM.prototype.setFreeSkill = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downAuto, this);
            if (Model.WebValue.isTraditional) {
                this.description.text = "免費釋放技能";
            }
            else {
                this.description.text = "免费释放技能";
            }
            this.costIcon.visible = false;
            this.costNum.visible = false;
            this.touchEnabled = true;
            this.currentState = "up";
        };
        return BtnShareVM;
    }(eui.Button));
    ViewModel.BtnShareVM = BtnShareVM;
    __reflect(BtnShareVM.prototype, "ViewModel.BtnShareVM");
})(ViewModel || (ViewModel = {}));
