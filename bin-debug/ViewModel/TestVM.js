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
    var TestVM = (function (_super) {
        __extends(TestVM, _super);
        function TestVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.TestView;
            return _this;
        }
        return TestVM;
    }(eui.Component));
    ViewModel.TestVM = TestVM;
    __reflect(TestVM.prototype, "ViewModel.TestVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=TestVM.js.map