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
     * @date 2015.12.29.
     *
     */
    var ProgressMineVM = (function (_super) {
        __extends(ProgressMineVM, _super);
        function ProgressMineVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.ProgressMineView;
            return _this;
        }
        ProgressMineVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return ProgressMineVM;
    }(eui.ProgressBar));
    ViewModel.ProgressMineVM = ProgressMineVM;
    __reflect(ProgressMineVM.prototype, "ViewModel.ProgressMineVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=ProgressMineVM.js.map