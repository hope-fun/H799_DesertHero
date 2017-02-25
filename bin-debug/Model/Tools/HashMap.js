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
    var HashMap = (function () {
        function HashMap() {
        }
        HashMap.prototype.Set = function (key, value) {
            this[key] = value;
        };
        HashMap.prototype.Get = function (key) {
            return this[key];
        };
        HashMap.prototype.Contains = function (key) {
            return this.Get(key) == null ? false : true;
        };
        HashMap.prototype.Remove = function (key) {
            delete this[key];
        };
        /**
         * @未實現.
         */
        HashMap.prototype.Clear = function () {
        };
        return HashMap;
    }());
    Model.HashMap = HashMap;
    __reflect(HashMap.prototype, "Model.HashMap");
})(Model || (Model = {}));
