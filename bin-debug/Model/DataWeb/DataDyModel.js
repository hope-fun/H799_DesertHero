var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.03.04.
     */
    var DataDyModel = (function () {
        function DataDyModel(_playerModel, _sceneModel, _skillModelList, _friendModelList, _magicWeaponModelList, _achievementModelList, _shopModelList, _clanModelList) {
            if (_playerModel === void 0) { _playerModel = null; }
            if (_sceneModel === void 0) { _sceneModel = null; }
            if (_skillModelList === void 0) { _skillModelList = null; }
            if (_friendModelList === void 0) { _friendModelList = null; }
            if (_magicWeaponModelList === void 0) { _magicWeaponModelList = null; }
            if (_achievementModelList === void 0) { _achievementModelList = null; }
            if (_shopModelList === void 0) { _shopModelList = null; }
            if (_clanModelList === void 0) { _clanModelList = null; }
        }
        return DataDyModel;
    }());
    Model.DataDyModel = DataDyModel;
    __reflect(DataDyModel.prototype, "Model.DataDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=DataDyModel.js.map