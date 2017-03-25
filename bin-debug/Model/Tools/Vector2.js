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
    var Vector2 = (function () {
        function Vector2(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        return Vector2;
    }());
    Model.Vector2 = Vector2;
    __reflect(Vector2.prototype, "Model.Vector2");
})(Model || (Model = {}));
//# sourceMappingURL=Vector2.js.map