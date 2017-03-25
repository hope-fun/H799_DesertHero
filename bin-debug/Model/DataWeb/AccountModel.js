var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var AccountModel = (function () {
        function AccountModel(_id) {
            this.id = _id;
        }
        return AccountModel;
    }());
    Model.AccountModel = AccountModel;
    __reflect(AccountModel.prototype, "Model.AccountModel");
})(Model || (Model = {}));
//# sourceMappingURL=AccountModel.js.map