var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @by 2016.2.26.
     *
     */
    var ShopLocalService = (function () {
        function ShopLocalService() {
        }
        Object.defineProperty(ShopLocalService, "ShopList", {
            /**
             * @获得商城列表数据
             */
            get: function () {
                return ShopLocalService.setShopList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @设置商城数据
         */
        ShopLocalService.setShopList = function () {
            if (ShopLocalService.shopList) {
                for (var i = 0; i < ShopLocalService.shopList.length; i++) {
                    ShopLocalService.shopList[i].gold = ShopLocalService.setShopGold(ShopLocalService.shopList[i].st);
                }
            }
            else {
                ShopLocalService.shopList = [];
                for (var i = 0; i < Model.WebValue.dataStModel.shopList.length; i++) {
                    var dy = Enumerable.From(Model.WebValue.dataDyModel.shopModelList).Where(function (x) { return x.shopId == Model.WebValue.dataStModel.shopList[i].id; }).FirstOrDefault(null);
                    var data = new Model.ShopData(dy, Model.WebValue.dataStModel.shopList[i]);
                    data.gold = ShopLocalService.setShopGold(Model.WebValue.dataStModel.shopList[i]);
                    ShopLocalService.initProtectFriend(data);
                    ShopLocalService.shopList.push(data);
                }
            }
            return ShopLocalService.shopList;
        };
        /**
         * @根据元宝数来计算不同档次的铜钱数量
         * @商城100元宝购买金币= monsterHpRatio^关卡序号/4*（1+铜币掉落加成）*100
       * @注：其实100前面一段公式就是当前关卡非BOX小怪掉钱公式）
       * @商城1000元宝购买金币=100元宝购钱*30
       * @商城5000元宝购买金币=100元宝购钱*1000000
         */
        ShopLocalService.setShopGold = function (_data) {
            var baseMoney = Math.pow(Number(Model.WebValue.dataStModel.sysConfigModel.monsterHpRatio), Number(Model.WebValue.dataDyModel.playerModel.sceneId)) / 4 * (1 + Model.FriendLocalService.FriendSkillTypeCoin / 100 + Model.MagicWeaponService.AddCoin / 100) * 100;
            switch (_data.id) {
                case 1:
                    //100元宝
                    return baseMoney;
                case 2:
                    //1000元宝
                    return baseMoney * 30;
                case 3:
                    //5000元宝
                    return baseMoney * 1000000;
                default: return 0;
            }
        };
        /**
         * @初始化是否挚友技能可以被封印
         */
        ShopLocalService.initProtectFriend = function (_data) {
            if (_data.st.id == 4 && _data.dy) {
                var myDate = new Date();
                var now = myDate.getTime() / 1000;
                if (now - _data.dy.lastShopTime <= 86400) {
                    ShopLocalService.protectFriend();
                }
            }
        };
        /**
         * @商城购买提交函数
         */
        ShopLocalService.commitShop = function (_data, _isFree, _onCallBack) {
            var myDate = new Date();
            _data.dy = new Model.ShopDyModel(_data.st.id, Math.round(myDate.getTime() / 1000), _data.gold); //这里获得的时间是ms，到最终用于计算的是s
            Model.WebService.commitShop(_data.dy, function () {
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian commitShop success！");
                }
                ShopLocalService.upGradeShop(_data, _isFree, _onCallBack);
            }, function () {
                alert("购买道具失败！！");
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian commitShop failed！！！");
                }
            });
        };
        /**
         * @商城购买成功回调函数
         */
        ShopLocalService.upGradeShop = function (_data, _isFree, _onCallBack) {
            if (_isFree) {
                //免费
                Model.PlayerLocalService.changeSycee(0);
                Model.PlayerLocalService.PlayerData.dy.freeSkillTime = 0; //用完之后免费释放重新置为0
            }
            else {
                //减钱
                Model.PlayerLocalService.changeSycee(-_data.st.cost);
            }
            switch (_data.st.id) {
                case 1:
                    ShopLocalService.addMoney(_data.gold, 2);
                    break;
                case 2:
                    ShopLocalService.addMoney(_data.gold, 5);
                    break;
                case 3:
                    ShopLocalService.addMoney(_data.gold, 10);
                    break;
                case 4:
                    ShopLocalService.protectFriend();
                    break;
                case 5:
                    ShopLocalService.hugeDamage();
                    break;
                default: alert("商城购买出错！请联系管理员！c");
            }
            _onCallBack();
        };
        /**
         * @前三个购物选项单纯是给玩家加钱
         */
        ShopLocalService.addMoney = function (_gold, _timer) {
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, _gold);
        };
        /**
         * @技能4保护挚友不会被杀
         */
        ShopLocalService.protectFriend = function () {
            Model.PlayerLocalService.PlayerData.protectFriend = true;
        };
        /**
         * @技能5对敌人造成巨大伤害
         */
        ShopLocalService.hugeDamage = function () {
            var changeHp = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp * 0.9;
            Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].AddHp = -changeHp;
        };
        return ShopLocalService;
    }());
    /**
     * @商城列表数据
     */
    ShopLocalService.shopList = null;
    Model.ShopLocalService = ShopLocalService;
    __reflect(ShopLocalService.prototype, "Model.ShopLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=ShopLocalService.js.map