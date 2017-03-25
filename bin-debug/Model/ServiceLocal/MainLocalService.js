var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @Service增删改查.
     * @author: zhu_jun.
     * @date:2016.01.05.
     * @添加数据,更新数据,保存数据,获取数据,计算
     */
    var MainLocalService = (function () {
        function MainLocalService() {
        }
        /**
         * @by cai_haotian
         * @2016.1.13.
         * @modification: by zhu_jun,2016.01.15.
         * @从10进制到有单位换算
         * @返回的是一个数组0是数值1是单位
         */
        MainLocalService.toUnitConversion = function (value) {
            var unitId = 1;
            while (value >= 1000) {
                value /= 1000;
                unitId += 1;
            }
            var num = Number(value.toFixed(2)) == parseInt(value.toFixed(2)) ? parseInt(value.toFixed(2)) : value.toFixed(2);
            var result = String(num + MainLocalService.getMagnitudeListById(unitId));
            return result;
        };
        /**
         * @by cai_haotian
         * @2016.1.13.
         * @modification: by zhu_jun,2016.01.15.
         * @从有单位到10进制换算
         * @返回的是一个10进制数
         */
        MainLocalService.toTenConversion = function (value, unitId) {
            var result = value * Math.pow(1000, unitId - 1);
            return result;
        };
        /**
         * @by zhu_jun,2016.01.15.
         * @根据id，获取单位.
         */
        MainLocalService.getMagnitudeListById = function (_id) {
            if (_id == undefined) {
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: unit shopId is undefined ! " + _id);
                }
                return;
            }
            var list = Enumerable.From(Model.WebValue.dataStModel.magnitudeList);
            var result = list.Where(function (l) { return l.id == _id; }).First();
            var unit = result.magnitude;
            if (unit == "0") {
                unit = "";
            }
            return unit;
        };
        /**
         * @判断点击频率
         * @by cai_haotian 2016.3.9.
         */
        MainLocalService.cheatingDetection = function (clickTimes) {
            if (clickTimes >= 35) {
                return true;
            }
            else {
                return false;
            }
        };
        return MainLocalService;
    }());
    /**
     * @mainInfo界面所需要的数据对象.
     */
    MainLocalService.mainInfoData = new Model.MainInfoData();
    Model.MainLocalService = MainLocalService;
    __reflect(MainLocalService.prototype, "Model.MainLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=MainLocalService.js.map