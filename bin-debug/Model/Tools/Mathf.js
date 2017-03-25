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
    var Mathf = (function () {
        function Mathf() {
        }
        /*
         * Linearly interpolates between a and b by t.
         * The parameter t is clamped to the range [0, 1].
         *When t = 0 returns a.
         *When t = 1 return b.
         *When t = 0.5 returns the midpoint of a and b.
         */
        Mathf.lerp = function (a, b, t) {
            t = t < 0 ? 0 : t;
            t = t > 1 ? 1 : t;
            return a + (b - a) * t;
        };
        /*
         * Clamps a value between a minimum float and maximum float value.
         */
        Mathf.clamp = function (value, min, max) {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            else {
                return value;
            }
        };
        /**
         * @区间随机.
         * @_min:包含.
         * @_max:不包含.
         * @_isfloor:默认是true.
         */
        Mathf.random = function (_min, _max, _isfloor) {
            if (_isfloor === void 0) { _isfloor = true; }
            var result = Math.random() * (_max - _min) + _min;
            return _isfloor ? Math.floor(result) : result;
        };
        return Mathf;
    }());
    Model.Mathf = Mathf;
    __reflect(Mathf.prototype, "Model.Mathf");
})(Model || (Model = {}));
//# sourceMappingURL=Mathf.js.map