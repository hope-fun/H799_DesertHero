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
     * @author cai_haotian
     * @2016.3.11
     *
     */
    var ReceiveRewardsVM = (function (_super) {
        __extends(ReceiveRewardsVM, _super);
        function ReceiveRewardsVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.ReceiveRewardsView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        ReceiveRewardsVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initVM();
        };
        /**
         * @初始化
         */
        ReceiveRewardsVM.prototype.initVM = function () {
            var _this = this;
            this.commitBtn.description.text = Model.WebValue.isTraditional ? "確 定" : "确 定";
            this.commitBtn.description.size = 24;
            this.commitBtn.costIcon.visible = false;
            this.commitBtn.costNum.visible = false;
            this.commitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
        };
        /**
         * @获得奖励
         */
        ReceiveRewardsVM.prototype.rewardInfo = function (data) {
            this.rewadCount.visible = true;
            this.errorInfo.visible = false;
            for (var i = 0; i < data.modelList.length; i++) {
                var word = this.changeReward(data.modelList[i]);
                switch (i) {
                    case 0:
                        this.goods0.text = word;
                        break;
                    case 1:
                        this.goods1.text = word;
                        break;
                    case 2:
                        this.goods2.text = word;
                        break;
                    case 3:
                        this.goods3.text = word;
                        break;
                    default: alert("奖励类型出错！");
                }
            }
            //提交数据
            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                }
            }, function () {
                if (Model.WebValue.isTraditional) {
                    alert("數據提交失敗請聯繫管理員！！！！");
                }
                else {
                    alert("数据提交失败请联系管理员！！！！");
                }
            });
        };
        /**
         * @错误的吗
         */
        ReceiveRewardsVM.prototype.wrongInfo = function (data) {
            this.rewadCount.visible = false;
            this.errorInfo.visible = true;
            switch (data.errorCode) {
                case 610:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該兌換碼不存在！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该兑换码不存在！";
                    }
                    break;
                case 611:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該兌換碼已使用過！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该兑换码已使用过！";
                    }
                    break;
                case 612:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該禮包不存在！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该礼包不存在！";
                    }
                    break;
                case 613:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該禮包為空！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该礼包为空！";
                    }
                    break;
                case 614:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，您已經使用過了相同的兌換碼！";
                    }
                    else {
                        this.errorInfo.text = "对不起，您已经使用过了相同的兑换码！";
                    }
                    break;
                case 615:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，同一帳號，同一批次的兌換碼已經使用過了！";
                    }
                    else {
                        this.errorInfo.text = "对不起，同一帐号，同一批次的兑换码已经使用过了！";
                    }
                    break;
                case 616:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，您已經使用了同一禮包中的兌換碼！";
                    }
                    else {
                        this.errorInfo.text = "对不起，您已经使用了同一礼包中的兑换码！";
                    }
                    break;
                case 617:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該兌換碼超過了有效日期！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该兑换码超过了有效日期！";
                    }
                    break;
                case 618:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，該兌換碼不允許在該區使用！";
                    }
                    else {
                        this.errorInfo.text = "对不起，该兑换码不允许在该区使用！";
                    }
                    break;
                default:
                    if (Model.WebValue.isTraditional) {
                        this.errorInfo.text = "對不起，錯誤的兌換碼！";
                    }
                    else {
                        this.errorInfo.text = "对不起，错误的兑换码！";
                    }
            }
        };
        /**
         * @判断当前奖励是什么
         */
        ReceiveRewardsVM.prototype.changeReward = function (data) {
            var word = "";
            if (data.type == "MONEY_TYPE_COIN") {
                Model.PlayerLocalService.PlayerData.dy.gold += data.count;
                if (Model.WebValue.isTraditional) {
                    word = "獲得" + data.count + "金幣";
                }
                else {
                    word = "获得" + data.count + "金币";
                }
            }
            else if (data.type == "MONEY_TYPE_YB") {
                Model.PlayerLocalService.PlayerData.dy.treasure += data.count;
                if (Model.WebValue.isTraditional) {
                    word = "獲得" + data.count + "元寶";
                }
                else {
                    word = "获得" + data.count + "元宝";
                }
            }
            else if (data.type == "MONEY_TYPE_JEWEL") {
                Model.PlayerLocalService.PlayerData.dy.jewel += data.count;
                if (Model.WebValue.isTraditional) {
                    word = "獲得" + data.count + "靈石";
                }
                else {
                    word = "获得" + data.count + "灵石";
                }
            }
            return word;
        };
        return ReceiveRewardsVM;
    }(eui.Component));
    ViewModel.ReceiveRewardsVM = ReceiveRewardsVM;
    __reflect(ReceiveRewardsVM.prototype, "ViewModel.ReceiveRewardsVM");
})(ViewModel || (ViewModel = {}));
