var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author
     *
     */
    var Play68Value = (function () {
        function Play68Value() {
        }
        return Play68Value;
    }());
    Play68Value.p68Model = new Model.Play68Model();
    Play68Value.p68UserInfo = new Model.P68UserInfo();
    Model.Play68Value = Play68Value;
    __reflect(Play68Value.prototype, "Model.Play68Value");
})(Model || (Model = {}));
//# sourceMappingURL=Play68Value.js.map