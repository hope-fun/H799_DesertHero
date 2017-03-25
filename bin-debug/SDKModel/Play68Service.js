var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author
     * http://www.luckywings.net/game/h005/?channel=3
     * http://www.play68.com/play/ly_axb
     * appid:656
     * 爱学霸
     * key:b92ababa363be1e416db0ace8f16fe33
     */
    var Play68Service = (function () {
        function Play68Service() {
        }
        /*
         * 获取Play68游戏基本信息.
         */
        Play68Service.assignmentPlay68Model = function () {
            var paramKey = ["openid", "pf", "ts"];
            paramKey.sort();
            var hash = new Model.HashMap();
            hash.Set(paramKey[0], Model.Tools.getURLParam(paramKey[0]));
            hash.Set(paramKey[1], Model.Tools.getURLParam(paramKey[1]));
            hash.Set(paramKey[2], Model.Tools.getURLParam(paramKey[2]));
            hash.Set("sign", Model.Tools.getURLParam("sign"));
            Model.Play68Value.p68Model = hash;
            var md5 = new Model.MD5();
            var localSign = md5.hex_md5(String(hash.Get(paramKey[0]) + hash.Get(paramKey[1]) + hash.Get(paramKey[2]) + Play68Service.play68key));
            Model.WebValue.accountM.id = Model.Play68Value.p68Model.openid;
            Model.WebValue.accountM.thirdAccountId = Model.Play68Value.p68Model.openid;
            Model.WebValue.accountM.platform = Model.Play68Value.p68Model.pf;
            Model.WebValue.accountM.time = Model.Play68Value.p68Model.ts;
            Model.WebValue.accountM.sign = Model.Play68Value.p68Model.sign;
            //            Play68Value.p68Model.appid = 656;//appid前台没用,by zhu_jun,2015.11.25.
            if (Model.Play68Value.p68Model.sign != localSign) {
                alert("当前平台不合法，请勿充值!");
                return;
            }
        };
        return Play68Service;
    }());
    Play68Service.play68Url = "http://www.play68.com/";
    Play68Service.play68key = "b92ababa363be1e416db0ace8f16fe33";
    Model.Play68Service = Play68Service;
    __reflect(Play68Service.prototype, "Model.Play68Service");
})(Model || (Model = {}));
//# sourceMappingURL=Play68Service.js.map