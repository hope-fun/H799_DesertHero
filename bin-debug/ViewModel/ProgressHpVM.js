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
     * @date 2015.1.6.
     *
     */
    var ProgressHp = (function (_super) {
        __extends(ProgressHp, _super);
        function ProgressHp() {
            var _this = _super.call(this) || this;
            _this.skinName = View.ProgressHp;
            return _this;
        }
        ProgressHp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return ProgressHp;
    }(eui.ProgressBar));
    ViewModel.ProgressHp = ProgressHp;
    __reflect(ProgressHp.prototype, "ViewModel.ProgressHp");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=ProgressHpVM.js.map