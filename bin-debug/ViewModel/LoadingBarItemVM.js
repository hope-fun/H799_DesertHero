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
     * @author zhu_jun.
     * @date: 2015.12.25.
     */
    var LoadingBarItemVM = (function (_super) {
        __extends(LoadingBarItemVM, _super);
        function LoadingBarItemVM() {
            return _super.call(this) || this;
        }
        LoadingBarItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.skinName = "View.LoadingBarItem";
            this.thumb = this.loadingBar;
            this.labelDisplay = this.loadingLabel;
            this.minimum = 0;
            this.value = 0;
            this.maximum = 100;
        };
        LoadingBarItemVM.prototype.setProgress = function (current, total) {
            //            console.log("Test: current value is " + current + " total " + total + " value is " + Math.floor(current / total * 100));
            this.value = Math.floor(current / total * 100);
        };
        return LoadingBarItemVM;
    }(eui.ProgressBar));
    ViewModel.LoadingBarItemVM = LoadingBarItemVM;
    __reflect(LoadingBarItemVM.prototype, "ViewModel.LoadingBarItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=LoadingBarItemVM.js.map