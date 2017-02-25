var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author cai_haotian
     * @date 2015.12.29.
     *
     */
    var AchievementVM = (function (_super) {
        __extends(AchievementVM, _super);
        function AchievementVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @条列表
             */
            _this.achievementItem = [];
            _this.skinName = View.AchievementView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, _this);
            _this.uiLayer.addChild(_this);
            return _this;
        }
        AchievementVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setAchievementList();
            this.setYbCount();
        };
        /**
         * @设置成就钱数
         */
        AchievementVM.prototype.setYbCount = function () {
            this.earnMoney.text = Model.PlayerLocalService.PlayerData.dy.treasure + "";
        };
        /**
         * @设置成就列表
         */
        AchievementVM.prototype.setAchievementList = function () {
            var _this = this;
            Model.AchievementLocalService.setAchievementList(); //先重新设置数据
            var aData = Model.AchievementLocalService.AchievementList;
            if (Model.WebServiceBase.isDebug) {
            }
            if (this.listGroup.numChildren == 0) {
                for (var _i = 0, aData_1 = aData; _i < aData_1.length; _i++) {
                    var iteminfo = aData_1[_i];
                    var item = new ViewModel.AchievementItemVM(this.listGroup, function (_data) {
                        _data.dy.stage = _data.matchStage;
                        _data.dy.isComplete = true;
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian dataInfo " + JSON.stringify(_data.dy));
                        }
                        Model.WebService.AchievementInfo(_data.dy, function () {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian AchievementInfo success!!!!!!!");
                            }
                            if (_data.RewardType == Model.RewardType.MONEY_TYPE_YB) {
                                _this.treasureAnimel(_data.RewardCount);
                            }
                            else if (_data.RewardType == Model.RewardType.MONEY_TYPE_JEWEL) {
                                Model.PlayerLocalService.PlayerData.AddJewel = _data.RewardCount;
                                //先提交数据
                                Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                    }
                                }, function () {
                                    if (Model.WebValue.isTraditional) {
                                        alert("數據提交失敗請聯繫管理員！！！！");
                                    }
                                    else {
                                        alert("数据提交失败请联系管理员！！！！");
                                    }
                                });
                            }
                            else {
                                alert("cht 奖励类型出错！！！");
                            }
                            _this.setAchievementList();
                        }, function () {
                            if (Model.WebValue.isTraditional) {
                                alert("獲取成就信息失敗！！請聯繫管理員！");
                            }
                            else {
                                alert("获取成就信息失败！！请联系管理员！");
                            }
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian AchievementInfo failed!!!!!!!");
                            }
                        });
                    });
                    item.setItemInfo(iteminfo);
                    this.achievementItem.push(item);
                }
            }
            else {
                for (var i = 0; i < aData.length; i++) {
                    this.achievementItem[i].setItemInfo(aData[i]);
                }
            }
        };
        /**
         * @增长动画
         */
        AchievementVM.prototype.treasureAnimel = function (_timers) {
            var _this = this;
            for (var i = 0; i < _timers; i++) {
                var coin = new eui.Image();
                coin.source = "icon_yuanbao_png";
                coin.scaleX = 0.5;
                coin.scaleY = 0.5;
                coin.x = 458;
                coin.y = 100;
                var endRandomX = 458; //掉落终点的x坐标
                var bezierP1X = endRandomX + Model.Mathf.random(-100, 100); //返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
                var startPos = new Model.Vector2(300, 300); //设置出现点的起始坐标
                var endPos = new Model.Vector2(endRandomX + 18, Model.Mathf.random(130, 140)); //设置掉落点的终点坐标
                var finalPos = new Model.Vector2(452, 91); //金币最终飞到的坐标
                var tween = new Model.TweenCustom(coin, this.window, startPos, endPos, finalPos); //进行掉落返回曲线的函数 
                tween.sAnimTime = Model.Mathf.random(1000, 1200); //总时长
                tween.bezierP1Y = 180;
                tween.bezierP1X = bezierP1X; //设置回收动画，贝塞尔曲线的P1点x坐标
                var recycleCallBack = function (_bTween) {
                    Model.PlayerLocalService.PlayerData.dy.treasure += 1;
                    _this.setYbCount();
                };
                tween.GoldRecycleAnim(recycleCallBack);
            }
            egret.setTimeout(function () {
                //先提交数据
                Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, function () {
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    }
                    else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                });
            }, this, 1300);
        };
        return AchievementVM;
    }(eui.Component));
    ViewModel.AchievementVM = AchievementVM;
    __reflect(AchievementVM.prototype, "ViewModel.AchievementVM");
})(ViewModel || (ViewModel = {}));
