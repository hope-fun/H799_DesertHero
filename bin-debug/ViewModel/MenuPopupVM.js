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
     * @author zhu_jun.
     * @date 2015.12.12.
     */
    var MenuPopupVM = (function (_super) {
        __extends(MenuPopupVM, _super);
        // /**
        //  * @当前灵石数量.
        //  */
        // private jewelLabel: eui.Label;TODO: by zhu_jun,2017.02.19.灵石数量移动到了上面.
        function MenuPopupVM(_onCallBack, _uiLayer) {
            var _this = _super.call(this) || this;
            /**
             * @主角技能对象.
             */
            _this.pSItems = [];
            /**
             * @挚友技能对象.
             */
            _this.fItems = [];
            /**
             * @神器列表对象.
             */
            _this.mWItems = [];
            /**
             * @商城列表对象
             * @by cai_haotian 2016.2.26.
             */
            _this.sItems = [];
            _this.skinName = View.MenuPopup;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            if (_uiLayer) {
                _this.uiLayer.addChild(_this);
            }
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: add main popup vm to ui layer !　");
            return _this;
        }
        MenuPopupVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @初始化或更新主信息数据.
         */
        MenuPopupVM.prototype.setPData = function () {
            var _this = this;
            //            Main.singleton.mainMenuVM.currentPage = PageName.Player;
            //TODO: 传下来执行. 花费过后重新更新ui钱币数 by cai_haotian 2016.2.19.
            //            Main.singleton.mainGameVM.sceneInfo.setMoney(Model.MainInfoLocalService.toUnitConversion(Model.PlayerLocalService.PlayerData.sceneId.gold));
            //更新主界面 by cai_haotian 2016.2.22.
            Main.singleton.mainMenuVM.mainInfo.initMainInfo();
            this.protagonistPopGroup.visible = true;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible = false;
            var pData = Model.PlayerLocalService.PlayerData;
            var pSDatas = Model.PlayerSkillLocalService.PlayerSkillList;
            this.clickDamageLabel.text = pData.ClickDamageAndUnit; //标题点击伤害赋值.
            if (this.protagonistGroup.numChildren == 0) {
                this.pItem = new ViewModel.CharItemVM(this.protagonistGroup, function (_data, _time) {
                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                    Model.PlayerLocalService.upgradeSuccessedCallBack(_data, _time);
                    _this.setPData();
                    if (Model.WebServiceBase.isDebug) {
                        console.log("zhujun: main player create finish ! ");
                    }
                });
                for (var i = 0; i < pSDatas.length; i++) {
                    var item = new ViewModel.CharItemVM(this.protagonistGroup, function (_data, _time) {
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        Model.PlayerSkillLocalService.upgradeSuccessedCallBack(_data, _time);
                        _this.setPData();
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: main player skill upgrade finish ! ");
                        }
                    });
                    item.setPSData(pSDatas[i]);
                    this.pSItems.push(item);
                }
            }
            else {
                for (var i = 0; i < pSDatas.length; i++) {
                    var isUnlock = Model.PlayerLocalService.PlayerData.dy.level >= pSDatas[i].st.openLevel; //主角升级之后的回调，一定是在更新里面.  
                    if (isUnlock && !pSDatas[i].dy) {
                        Model.PlayerSkillLocalService.unlockSuccessedCallBack(pSDatas[i]);
                    }
                    this.pSItems[i].setPSData(pSDatas[i]);
                }
            }
            this.pItem.setPData(pData); //更新主角UI.无论创建还是还是更新都是要执行的，如果有执行顺序问题，可以if else里面都写.
        };
        /**
         * @设置挚友数据,并初始化.
         */
        MenuPopupVM.prototype.setBFData = function () {
            var _this = this;
            //            Main.singleton.mainMenuVM.currentPage = PageName.Friend;
            //TODO:方法传下来执行.  花费过后重新更新ui钱币数 by cai_haotian 2016.2.19.
            //            Main.singleton.mainGameVM.sceneInfo.setMoney(Model.MainInfoLocalService.toUnitConversion(Model.PlayerLocalService.PlayerData.sceneId.gold));
            //更新主界面 by cai_haotian 2016.2.22.
            Main.singleton.mainMenuVM.mainInfo.initMainInfo();
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = true;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible = false;
            var fDatas = Model.FriendLocalService.FriendList;
            this.dpsLabel.text = Model.PlayerLocalService.PlayerData.FriendDamageAndUnit;
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE, Model.PlayerLocalService.PlayerData.dy.friendDamage);
            if (this.bosomFriendGroup.numChildren == 0) {
                for (var i = 0; i < fDatas.length; i++) {
                    Model.FriendLocalService.isShow(fDatas[i], fDatas); //设置显示条件 by cai_haotian 2016.3.29
                    if (Enumerable.From(fDatas).Where(function (x) { return x.dy == null; }).Select(function (x) { return x.reachRecruit; }).FirstOrDefault(null)) {
                        Main.singleton.mainMenuVM.btnBottom.btnBosomFriend.btnNewMark.visible = true; //设置新文字现实by cai_haotian 2016.3.30
                    }
                    else {
                        Main.singleton.mainMenuVM.btnBottom.btnBosomFriend.btnNewMark.visible = false;
                    }
                    if (fDatas[i].dy) {
                        if (fDatas[i].dy.layerId < fDatas[i].layerMatchLevel) {
                            var item = new ViewModel.CharItemVM(this.bosomFriendGroup, function (_data) {
                                if (_data.dy.sealCD == 0) {
                                    Model.FriendLocalService.layerSuccessedCallBack(_data);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个       
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " layer successed ! ");
                                    }
                                }
                                else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton, function (_data) {
                                        if (Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个 
                                        }
                                        else {
                                            new ViewModel.LackGoldVM(Main.singleton, function () {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            });
                        }
                        else {
                            var item = new ViewModel.CharItemVM(this.bosomFriendGroup, function (_data, _time) {
                                if (_data.dy.sealCD == 0) {
                                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                                    Model.FriendLocalService.upgradeSuccessedCallBack(_data, _time);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个       
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " upgrade successed ! ");
                                    }
                                }
                                else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton, function (_data) {
                                        if (Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个 
                                        }
                                        else {
                                            new ViewModel.LackGoldVM(Main.singleton, function () {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            });
                        }
                    }
                    else {
                        var item = new ViewModel.CharItemVM(this.bosomFriendGroup, function (_data) {
                            if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                                if (_data.IsEnoughRecruit) {
                                    Model.FriendLocalService.buySuccessedCallBack(_data);
                                    //显示人物 by cai_haotian 2016.2.22.
                                    Main.singleton.mainGameVM.switchFriend(_data);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个
                                    if (_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                        //调用成就 by cai_haotian 2016.4.5
                                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND, 1);
                                    }
                                    //第一次显示挚友 by cai_haotian 2016.2.22.
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                    }
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
                                    new ViewModel.LackGoldVM(Main.singleton, function () { });
                                }
                            }
                            else {
                                Model.FriendLocalService.buySuccessedCallBack(_data);
                                //显示人物 by cai_haotian 2016.2.22.
                                Main.singleton.mainGameVM.switchFriend(_data);
                                _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个
                                //第一次显示挚友 by cai_haotian 2016.2.22.
                                if (_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                    //调用成就 by cai_haotian 2016.4.5
                                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND, 1);
                                }
                                if (Model.WebServiceBase.isDebug) {
                                    console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                }
                            }
                        });
                    }
                    item.setBFData(fDatas[i]);
                    this.fItems.push(item);
                }
            }
            else {
                for (var i = 0; i < fDatas.length; i++) {
                    Model.FriendLocalService.isShow(fDatas[i], fDatas); //设置显示条件 by cai_haotian 2016.3.29
                    if (Enumerable.From(fDatas).Where(function (x) { return x.dy == null; }).Select(function (x) { return x.reachRecruit; }).FirstOrDefault(null)) {
                        Main.singleton.mainMenuVM.btnBottom.btnBosomFriend.btnNewMark.visible = true; //设置新文字现实by cai_haotian 2016.3.30
                    }
                    else {
                        Main.singleton.mainMenuVM.btnBottom.btnBosomFriend.btnNewMark.visible = false;
                    }
                    if (fDatas[i].dy) {
                        //                        Model.console.log("zhujun: fDatas[i].sceneId.layerId  " + fDatas[i].sceneId.layerId + " fDatas[i].layerMatchLevel " + fDatas[i].layerMatchLevel+ " level " + fDatas[i].sceneId.level);
                        if (fDatas[i].dy.layerId < fDatas[i].layerMatchLevel) {
                            this.fItems[i].onCallback = function (_data) {
                                if (_data.dy.sealCD == 0) {
                                    Model.FriendLocalService.layerSuccessedCallBack(_data);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个    
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " layer successed ! ");
                                    }
                                }
                                else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton, function (_data) {
                                        if (Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个 
                                        }
                                        else {
                                            new ViewModel.LackGoldVM(Main.singleton, function () {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            };
                        }
                        else {
                            this.fItems[i].onCallback = function (_data, _time) {
                                if (_data.dy.sealCD == 0) {
                                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                                    Model.FriendLocalService.upgradeSuccessedCallBack(_data, _time);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个      
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " upgrade successed ! ");
                                    }
                                }
                                else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton, function (_data) {
                                        if (Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个 
                                        }
                                        else {
                                            new ViewModel.LackGoldVM(Main.singleton, function () {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            };
                        }
                    }
                    else {
                        this.fItems[i].onCallback = function (_data) {
                            //                            Model.FriendLocalService.buySuccessedCallBack(_data);
                            //                            //显示人物 by cai_haotian 2016.2.22.
                            //                            Main.singleton.mainGameVM.switchFriend(_data);
                            //                            this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个       
                            //                            console.log("zhujun: friend and skill " + _data.st.dailyId + " add finish ! ");
                            if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                                if (_data.IsEnoughRecruit) {
                                    Model.FriendLocalService.buySuccessedCallBack(_data);
                                    //显示人物 by cai_haotian 2016.2.22.
                                    Main.singleton.mainGameVM.switchFriend(_data);
                                    _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个
                                    //第一次显示挚友 by cai_haotian 2016.2.22.
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                    }
                                    if (_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                        //调用成就 by cai_haotian 2016.4.5
                                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND, 1);
                                    }
                                }
                                else {
                                    new ViewModel.LackGoldVM(Main.singleton, function () { });
                                }
                            }
                            else {
                                Model.FriendLocalService.buySuccessedCallBack(_data);
                                //显示人物 by cai_haotian 2016.2.22.
                                Main.singleton.mainGameVM.switchFriend(_data);
                                _this.setBFData(); //更新UI,减去UI钱，加购买钱， 开下一个
                                //第一次显示挚友 by cai_haotian 2016.2.22.
                                if (Model.WebServiceBase.isDebug) {
                                    console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                }
                                if (_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                    //调用成就 by cai_haotian 2016.4.5
                                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND, 1);
                                }
                            }
                        };
                    }
                    this.fItems[i].setBFData(fDatas[i]);
                }
            }
        };
        /**
         * @设置神器数据,并初始化.
         */
        MenuPopupVM.prototype.setAData = function () {
            var _this = this;
            //            Main.singleton.mainMenuVM.currentPage = PageName.MagicWeapon;
            Main.singleton.mainMenuVM.mainInfo.initMainInfo();
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = true;
            this.shopPopGroup.visible = false;
            var mWDatas = Model.MagicWeaponService.MagicWeaponList;
            this.damageBonusLabel.text = "+" + Model.MagicWeaponService.AddCommon.toString() + "%";
            // this.jewelLabel.text = Model.PlayerLocalService.PlayerData.dy.jewel.toString();//TODO:by zhu_jun,灵石数量移动到了上面.
            if (this.artifactGroup.numChildren == 0) {
                this.mWBuyItem = new ViewModel.MagicWeaponItemVM(this.artifactGroup, function () {
                    Model.MagicWeaponService.buySuccessedCallBack(); //更新动态对象.
                    _this.setAData(); //更新UI,减去UI钱，加购买钱， 开下一个       
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON, 1);
                });
                for (var i = 0; i < mWDatas.length; i++) {
                    var item = new ViewModel.MagicWeaponItemVM(this.artifactGroup, function (_data) {
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        Model.MagicWeaponService.upgradeSuccessedCallBack(_data); //升级更新动态对象.
                        _this.setAData(); //更新UI,减去UI钱，加购买钱， 开下一个    
                        //未提交
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: magic weapon " + _data.dy.magicWeaponId + " add finish ! ");
                        }
                    });
                    item.setMWData(mWDatas[i]);
                    this.mWItems.push(item);
                }
            }
            else {
                for (var i = 0; i < mWDatas.length; i++) {
                    this.mWItems[i].setMWData(mWDatas[i]);
                }
            }
            this.mWBuyItem.setMWBuyData(); //无论初始化还是更新都要执行.
        };
        /**
         * @设置商城数据,并初始化
         * @by cai_haotian 2016.2.26.
         */
        MenuPopupVM.prototype.setMData = function (_isBuyTreasure) {
            var _this = this;
            if (_isBuyTreasure === void 0) { _isBuyTreasure = false; }
            //            Main.singleton.mainMenuVM.currentPage = PageName.Shop;
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible = true;
            if (_isBuyTreasure) {
                this.shopScroller.viewport.scrollV = 80 * 6 + 30; //TODO: 如果列表长度会变，就改成获取元宝的id-1.
            }
            //设置元宝数量
            this.treasureLabel.text = Model.PlayerLocalService.PlayerData.dy.treasure + "";
            var sDatas = Model.ShopLocalService.ShopList;
            if (this.shopGroup.numChildren == 0) {
                this.sBuyItem = new ViewModel.ShopItemVM(this.shopGroup, function () {
                    _this.shopScroller.viewport.scrollV = 74 * 6 + 30; //TODO: 如果列表长度会变，就改成获取元宝的id-1.
                });
                this.sBuyItem.setYBItem();
                for (var i = 0; i < sDatas.length; i++) {
                    var shopItem = new ViewModel.ShopItemVM(this.shopGroup, function (_data, _isFree) {
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        if (_data.Type == Model.ShopType.SHOP_TYPE_YB) {
                            Model.WebService.Recharge(function (_data) {
                                if (Model.WebServiceBase.isDebug) {
                                    console.log("cai_haotian recharge success!!!!!");
                                }
                                for (var i = 0; i < _data.shopList.length; i++) {
                                    Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].cost);
                                    Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].extraGet);
                                }
                                _this.setMData(); //刷新UI，减钱
                                Main.singleton.mainGameVM.sceneInfo.init(); //更新主场景ui
                            }, function () {
                                if (Model.WebValue.isTraditional) {
                                    alert("充值失敗！");
                                }
                                else {
                                    alert("充值失败！");
                                }
                            });
                        }
                        else {
                            if (_isFree) {
                                Model.ShopLocalService.commitShop(_data, _isFree, function () {
                                    _this.setMData(); //刷新UI，减钱
                                    Main.singleton.mainGameVM.sceneInfo.init(); //更新主场景ui
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
                                    Model.PlayerLocalService.PlayerData.shopFlag = true;
                                });
                            }
                            else {
                                //这里是花钱释放技能
                                if (Model.PlayerLocalService.isEnoughSycee(_data.st.cost, function () { })) {
                                    if (Model.PlayerLocalService.PlayerData.shopFlag) {
                                        Model.PlayerLocalService.PlayerData.shopFlag = false;
                                        //设置商城回调
                                        Model.ShopLocalService.commitShop(_data, _isFree, function () {
                                            _this.setMData(); //刷新UI，减钱
                                            Main.singleton.mainGameVM.sceneInfo.init(); //更新主场景ui
                                            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                                                if (Model.WebServiceBase.isDebug) {
                                                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                                }
                                            }, function (data) {
                                                alert(data);
                                                if (Model.WebValue.isTraditional) {
                                                    alert("數據提交失敗請聯繫管理員！！！！");
                                                }
                                                else {
                                                    alert("数据提交失败请联系管理员！！！！");
                                                }
                                            });
                                            Model.PlayerLocalService.PlayerData.shopFlag = true;
                                        });
                                    }
                                }
                                else {
                                    new ViewModel.LackGoldVM(Main.singleton, function () { });
                                }
                            }
                        }
                    });
                    shopItem.setSData(sDatas[i]);
                    this.sItems.push(shopItem);
                }
            }
            else {
                for (var i = 0; i < this.sItems.length; i++) {
                    this.sItems[i].setSData(sDatas[i]);
                }
            }
            this.sBuyItem.setYBItem();
        };
        return MenuPopupVM;
    }(eui.Component));
    ViewModel.MenuPopupVM = MenuPopupVM;
    __reflect(MenuPopupVM.prototype, "ViewModel.MenuPopupVM");
})(ViewModel || (ViewModel = {}));
