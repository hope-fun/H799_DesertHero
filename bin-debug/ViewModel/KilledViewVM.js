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
     * @author
     *
     */
    var KilledViewVM = (function (_super) {
        __extends(KilledViewVM, _super);
        function KilledViewVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.KilledView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        KilledViewVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initVM();
        };
        /**
         * @初始化
         */
        KilledViewVM.prototype.initVM = function () {
            var _this = this;
            this.commit.costIcon.visible = false;
            this.commit.costNum.visible = false;
            if (Model.WebValue.isTraditional) {
                this.commit.description.text = "現在復活！";
            }
            else {
                this.commit.description.text = "现在复活！";
            }
            this.CloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
                if (_this.countTime) {
                    egret.clearInterval(_this.countTime);
                }
            }, this);
        };
        /**
         * @设置信息
         */
        KilledViewVM.prototype.setFDataInfo = function (_data) {
            var _this = this;
            this.fData = _data;
            this.skillIcon.source = _data.Icon;
            if (Model.WebValue.isTraditional) {
                this.skillName.textFlow = [
                    { text: _data.st.name, style: { "textColor": 0xFF0000 } }, { text: "被首領殺掉了！" }
                ];
            }
            else {
                this.skillName.textFlow = [
                    { text: _data.st.name, style: { "textColor": 0xFF0000 } }, { text: "被首领杀掉了！" }
                ];
            }
            var myDate = new Date();
            var now = myDate.getTime() / 1000;
            this.leftDps.text = "-" + _data.DpsAndUnit;
            var lastTime = _data.dy.sealCD - now;
            var des = Model.TimeSpan.FromSeconds(lastTime);
            this.leftTime.text = des.toString();
            this.countTime = egret.setInterval(function () {
                var des = Model.TimeSpan.FromSeconds(lastTime);
                _this.leftTime.text = des.toString();
                lastTime--;
            }, this, 1000);
            Model.FriendLocalService.setResurgenceMoney(_data, lastTime);
            this.needMoney.text = _data.sealCDMoney + "";
            this.commit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callBackFunc, this);
        };
        KilledViewVM.prototype.callBackFunc = function () {
            if (this.onCallBack) {
                this.onCallBack(this.fData);
                if (this.fData.dy.sealCD == 0) {
                    this.uiLayer.removeChild(this);
                    if (this.countTime) {
                        egret.clearInterval(this.countTime);
                    }
                }
            }
        };
        return KilledViewVM;
    }(eui.Component));
    ViewModel.KilledViewVM = KilledViewVM;
    __reflect(KilledViewVM.prototype, "ViewModel.KilledViewVM");
})(ViewModel || (ViewModel = {}));
