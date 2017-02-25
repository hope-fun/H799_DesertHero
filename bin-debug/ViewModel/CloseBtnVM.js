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
     * @date 2015.12.24.
     *
     */
    var CloseBtnVM = (function (_super) {
        __extends(CloseBtnVM, _super);
        function CloseBtnVM() {
            var _this = _super.call(this) || this;
            /**
             * @按钮图片路径 默认是关闭按钮
             */
            _this.btnImgSource = "icon_guanbi";
            _this.skinName = View.CloseBtn;
            return _this;
        }
        CloseBtnVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnImg.source = this.btnImgSource;
        };
        /**
         * @设置特效
         */
        CloseBtnVM.prototype.setEffect = function () {
            //TODO: by zhu_jun,2017.02.17.
            // var factory = new ViewModel.EffectSkillVM(this.effectGroup,() => { });
            // var armature = factory.initDragonBone("Tx_lixianjiangli_tex_json","Tx_lixianjiangli_tex_png","Tx_lixianjiangli_ske_json",0);
            // armature.display.x=this.width/2;
            // armature.display.y = this.height / 2;
        };
        return CloseBtnVM;
    }(eui.Button));
    ViewModel.CloseBtnVM = CloseBtnVM;
    __reflect(CloseBtnVM.prototype, "ViewModel.CloseBtnVM");
})(ViewModel || (ViewModel = {}));
