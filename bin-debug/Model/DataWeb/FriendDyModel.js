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
    var FriendDyModel = (function () {
        function FriendDyModel(_friendId, _level, _layerId, _sealCD) {
            if (_sealCD === void 0) { _sealCD = 0; }
            this.friendId = _friendId;
            this.level = _level;
            this.layerId = _layerId;
            this.sealCD = _sealCD;
        }
        return FriendDyModel;
    }());
    Model.FriendDyModel = FriendDyModel;
    __reflect(FriendDyModel.prototype, "Model.FriendDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=FriendDyModel.js.map