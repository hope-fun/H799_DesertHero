module ViewModel {
	/**
	 *
	 * @author zhu_jun.
	 * @date 2015.12.12.
	 */
    export class MenuPopupVM extends eui.Component {
    	/**
    	 * @父节点.
    	 */
        private uiLayer: eui.UILayer;
        /**
         * @回调函数.
         */
        private onCallBack: Function;
        /**
         * @主角技能滑动列表.
         */
        private protagonistScroller: eui.Scroller;
        /**
         * @主角弹窗组.
         */
        private protagonistPopGroup: eui.Group;
        /**
         * @主动及item父节点.
         */
        private protagonistGroup: eui.Group;
        /**
         * @点击伤害.
         */
        private clickDamageLabel: eui.Label;
        
        /**
         * @挚友滑动列表.
         */
        private bosomFriendScroller: eui.Scroller;
        /**
         * @挚友弹窗组.
         */
        private bosomFriendPopGroup: eui.Group;
        /**
         * @挚友item父节点.
         */
        private bosomFriendGroup: eui.Group;
        /**
         * @秒伤.
         */
        private dpsLabel: eui.Label;
        /**
         * @神器滑动列表.
         */
        private artifactScroller: eui.Scroller;
        /**
         * @神器弹窗组.
         */
        private artifactPopGroup: eui.Group;
        /**
         * @神器item父节点.
         */
        private artifactGroup: eui.Group;
        /**
         * @商城弹窗组
         * @by cai_haotian 2016.2.26. 
         */ 
        private shopPopGroup:eui.Group;
        /**
         * @元宝数量
         * @by cai_haotian 2016.2.26.
         */ 
        private treasureLabel:eui.Label;
        /**
         * @商城滑动列表
         * @by cai_haotian 2016.2.26.
         */ 
        private shopScroller:eui.Scroller;
        /**
         * @商城item父节点
         * @by cai_haotian 2016.2.26.
         */
        private shopGroup: eui.Group;
        /**
         * @主角对象.
         */
        public pItem: CharItemVM;
        /**
         * @主角技能对象.
         */
        public pSItems: CharItemVM[] = []; 
        /**
         * @挚友技能对象.
         */
        public fItems: CharItemVM[] = [];
        /**
         * @神器列表对象.
         */
        public mWItems: MagicWeaponItemVM[] = [];
        /**
         * @商城列表对象
         * @by cai_haotian 2016.2.26.
         */
        private sItems: ShopItemVM[] = [];
        /**
         * @神器购买按钮.
         */
        private mWBuyItem: MagicWeaponItemVM;
        /**
         * @商城购买按钮.
         */
        private sBuyItem: ShopItemVM;
        /**
         * @神器提供的所有伤害加成.
         */
        private damageBonusLabel: eui.Label;
        // /**
        //  * @当前灵石数量.
        //  */
        // private jewelLabel: eui.Label;TODO: by zhu_jun,2017.02.19.灵石数量移动到了上面.
        
        
        
        public constructor(_onCallBack: Function,_uiLayer?: eui.UILayer) {
            super();
            this.skinName = View.MenuPopup;
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            if(_uiLayer) {
                this.uiLayer.addChild(this);
            }
            if(Model.WebServiceBase.isDebug)
                console.log("zhujun: add main popup vm to ui layer !　");
        }

        protected createChildren() {
            super.createChildren();
        }
        
        /**
         * @初始化或更新主信息数据.
         */
        public setPData() {
//            Main.singleton.mainMenuVM.currentPage = PageName.Player;
            //TODO: 传下来执行. 花费过后重新更新ui钱币数 by cai_haotian 2016.2.19.
//            Main.singleton.mainGameVM.setMoney(Model.MainInfoLocalService.toUnitConversion(Model.PlayerLocalService.PlayerData.sceneId.gold));
            //更新主界面 by cai_haotian 2016.2.22.
            Main.singleton.mainMenuVM.initMainInfo();
            
            this.protagonistPopGroup.visible = true;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible=false;
            var pData: Model.PlayerData = Model.PlayerLocalService.PlayerData;
            var pSDatas: Model.PlayerSkillData[] = Model.PlayerSkillLocalService.PlayerSkillList;
            this.clickDamageLabel.text = pData.ClickDamageAndUnit; //标题点击伤害赋值.
            if(this.protagonistGroup.numChildren == 0) {//初始化创建主角和技能.
                this.pItem = new CharItemVM(this.protagonistGroup,(_data:Model.PlayerData,_time?:number) => {//创建主角.
                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                    Model.PlayerLocalService.upgradeSuccessedCallBack(_data,_time);
                    this.setPData();
                    if(Model.WebServiceBase.isDebug) {
                        console.log("zhujun: main player create finish ! ");
                    }
                });
                for(var i = 0;i < pSDatas.length;i++) {//创建并更新技能. 
                    var item = new CharItemVM(this.protagonistGroup,(_data: Model.PlayerSkillData,_time?: number) => {
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        Model.PlayerSkillLocalService.upgradeSuccessedCallBack(_data,_time);
                        this.setPData();
                        if(Model.WebServiceBase.isDebug) {
                            console.log("zhujun: main player skill upgrade finish ! ");
                        }
                    });
                    item.setPSData(pSDatas[i]);
                    this.pSItems.push(item);
                }
            } else {//更新技能UI.
                for(var i = 0;i < pSDatas.length;i++) {
                    var isUnlock: boolean = Model.PlayerLocalService.PlayerData.dy.level >= pSDatas[i].st.openLevel;//主角升级之后的回调，一定是在更新里面.  
                    if(isUnlock&&!pSDatas[i].dy){
                        Model.PlayerSkillLocalService.unlockSuccessedCallBack(pSDatas[i]);
                    }
                    this.pSItems[i].setPSData(pSDatas[i]);
                }
            }
            this.pItem.setPData(pData);//更新主角UI.无论创建还是还是更新都是要执行的，如果有执行顺序问题，可以if else里面都写.
        }
        
        /**
         * @设置挚友数据,并初始化.
         */
        public setBFData() {
//            Main.singleton.mainMenuVM.currentPage = PageName.Friend;
            //TODO:方法传下来执行.  花费过后重新更新ui钱币数 by cai_haotian 2016.2.19.
//            Main.singleton.mainGameVM.setMoney(Model.MainInfoLocalService.toUnitConversion(Model.PlayerLocalService.PlayerData.sceneId.gold));
            //更新主界面 by cai_haotian 2016.2.22.
            Main.singleton.mainMenuVM.initMainInfo();
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = true;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible = false;
            var fDatas: Model.FriendData[] = Model.FriendLocalService.FriendList;
            this.dpsLabel.text = Model.PlayerLocalService.PlayerData.FriendDamageAndUnit;
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE,Model.PlayerLocalService.PlayerData.dy.friendDamage);
            if(this.bosomFriendGroup.numChildren == 0) {
                for(var i = 0;i < fDatas.length;i++) {//挚友技能初始化.
                    Model.FriendLocalService.isShow(fDatas[i],fDatas);//设置显示条件 by cai_haotian 2016.3.29
                    if(Enumerable.From(fDatas).Where(x=>x.dy==null).Select(x=>x.reachRecruit).FirstOrDefault(null)) {
                        Main.singleton.mainMenuVM.btnBosomFriend.btnNewMark.visible = true;//设置新文字现实by cai_haotian 2016.3.30
                    } else {
                        Main.singleton.mainMenuVM.btnBosomFriend.btnNewMark.visible = false;
                    }
                    if(fDatas[i].dy) {
                        if(fDatas[i].dy.layerId < fDatas[i].layerMatchLevel) {
                            var item: CharItemVM = new CharItemVM(this.bosomFriendGroup,(_data: Model.FriendData) => {
                                if(_data.dy.sealCD == 0) {
                                    Model.FriendLocalService.layerSuccessedCallBack(_data);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个       
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " layer successed ! ");
                                    }
                                } else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton,(_data: Model.FriendData) => {
                                        if(Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个 
                                        } else {
                                            new ViewModel.LackGoldVM(Main.singleton,() => {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            });
                        } else {
                            var item: CharItemVM = new CharItemVM(this.bosomFriendGroup,(_data: Model.FriendData,_time: number) => {
                                if(_data.dy.sealCD==0){
                                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                                    Model.FriendLocalService.upgradeSuccessedCallBack(_data,_time);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个       
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " upgrade successed ! ");
                                    }
                                    
                                }else{
                                    var killedView=new ViewModel.KilledViewVM(Main.singleton,(_data:Model.FriendData)=>{
                                            if(Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)){
                                                Model.FriendLocalService.removeSealCD(_data);
                                                this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个 
                                            }else{
                                                new ViewModel.LackGoldVM(Main.singleton,() => {
                                                    Main.singleton.removeChild(killedView);
                                                });
                                            }
                                        });
                                    killedView.setFDataInfo(_data);
                                }
                            });
                        }
                    } else {
                        
                        var item: CharItemVM = new CharItemVM(this.bosomFriendGroup,(_data: Model.FriendData) => {
                            
                            if(_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB){
                                if(_data.IsEnoughRecruit){
                                    Model.FriendLocalService.buySuccessedCallBack(_data);
                                    //显示人物 by cai_haotian 2016.2.22.
                                    Main.singleton.mainGameVM.switchFriend(_data);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个
                                    if(_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                        //调用成就 by cai_haotian 2016.4.5
                                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND,1);
                                    }
                                    
                                    //第一次显示挚友 by cai_haotian 2016.2.22.
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                    }
                                    
                                    Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
                                        if(Model.WebServiceBase.isDebug) {
                                            console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                        }
                                    },() => {
                                        if(Model.WebValue.isTraditional) {
                                            alert("數據提交失敗請聯繫管理員！！！！");
                                        } else {
                                            alert("数据提交失败请联系管理员！！！！");
                                        }
                                    });
                                    
                                }else{
                                    new ViewModel.LackGoldVM(Main.singleton,()=>{});
                                }
                            }else{
                                Model.FriendLocalService.buySuccessedCallBack(_data);
                                //显示人物 by cai_haotian 2016.2.22.
                                Main.singleton.mainGameVM.switchFriend(_data);
                                this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个
                                //第一次显示挚友 by cai_haotian 2016.2.22.
                                if(_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                    //调用成就 by cai_haotian 2016.4.5
                                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND,1);
                                }
                                
                                if(Model.WebServiceBase.isDebug) {
                                    console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                }
                                
                            }
                        });
                    }
                    item.setBFData(fDatas[i]);
                    this.fItems.push(item);
                }
            } else {//更新挚友技能UI.
                for(var i = 0;i < fDatas.length;i++) {
                    Model.FriendLocalService.isShow(fDatas[i],fDatas);//设置显示条件 by cai_haotian 2016.3.29
                    if(Enumerable.From(fDatas).Where(x=> x.dy == null).Select(x=> x.reachRecruit).FirstOrDefault(null)) {
                        Main.singleton.mainMenuVM.btnBosomFriend.btnNewMark.visible = true;//设置新文字现实by cai_haotian 2016.3.30
                    }else{
                        Main.singleton.mainMenuVM.btnBosomFriend.btnNewMark.visible = false;
                    }
                    if(fDatas[i].dy) {
//                        Model.console.log("zhujun: fDatas[i].sceneId.layerId  " + fDatas[i].sceneId.layerId + " fDatas[i].layerMatchLevel " + fDatas[i].layerMatchLevel+ " level " + fDatas[i].sceneId.level);
                        if(fDatas[i].dy.layerId < fDatas[i].layerMatchLevel) {
                            this.fItems[i].onCallback = (_data: Model.FriendData) => {
                                if(_data.dy.sealCD == 0) {
                                    Model.FriendLocalService.layerSuccessedCallBack(_data);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个    
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " layer successed ! ");
                                    }
                                    
                                } else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton,(_data: Model.FriendData) => {
                                        if(Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个 
                                        } else {
                                            new ViewModel.LackGoldVM(Main.singleton,() => {
                                                Main.singleton.removeChild(killedView);
                                                });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                            };
                        } else {
                            this.fItems[i].onCallback = (_data: Model.FriendData,_time:number) => {
                                if(_data.dy.sealCD == 0) {
                                    Model.AudioService.Shared().PlaySound("YX-004_mp3");
                                    Model.FriendLocalService.upgradeSuccessedCallBack(_data,_time);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个      
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " upgrade successed ! ");
                                    }
                                    
                                } else {
                                    var killedView = new ViewModel.KilledViewVM(Main.singleton,(_data: Model.FriendData) => {
                                        if(Model.PlayerLocalService.isEnoughSycee(_data.sealCDMoney)) {
                                            Model.FriendLocalService.removeSealCD(_data);
                                            this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个 
                                        } else {
                                            new ViewModel.LackGoldVM(Main.singleton,() => {
                                                Main.singleton.removeChild(killedView);
                                            });
                                        }
                                    });
                                    killedView.setFDataInfo(_data);
                                }
                                
                            };
                        }
                    } else {
                        this.fItems[i].onCallback = (_data: Model.FriendData) => {
//                            Model.FriendLocalService.buySuccessedCallBack(_data);
//                            //显示人物 by cai_haotian 2016.2.22.
//                            Main.singleton.mainGameVM.switchFriend(_data);
//                            this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个       
//                            console.log("zhujun: friend and skill " + _data.st.dailyId + " add finish ! ");
                            if(_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                                if(_data.IsEnoughRecruit) {
                                    Model.FriendLocalService.buySuccessedCallBack(_data);
                                    //显示人物 by cai_haotian 2016.2.22.
                                    Main.singleton.mainGameVM.switchFriend(_data);
                                    this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个
                                    //第一次显示挚友 by cai_haotian 2016.2.22.
                                    if(Model.WebServiceBase.isDebug) {
                                        console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                    }
                                    
                                    if(_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                        //调用成就 by cai_haotian 2016.4.5
                                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND,1);
                                    }
                                    
                                } else {
                                    new ViewModel.LackGoldVM(Main.singleton,() => { });
                                }
                            } else {
                                Model.FriendLocalService.buySuccessedCallBack(_data);
                                //显示人物 by cai_haotian 2016.2.22.
                                Main.singleton.mainGameVM.switchFriend(_data);
                                this.setBFData();//更新UI,减去UI钱，加购买钱， 开下一个
                                //第一次显示挚友 by cai_haotian 2016.2.22.
                                if(Model.WebServiceBase.isDebug) {
                                    console.log("zhujun: friend and skill " + _data.st.id + " add finish ! ");
                                }
                                
                                
                                if(_data.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                                    //调用成就 by cai_haotian 2016.4.5
                                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND,1);
                                }
                            }
                        };
                    }
                    this.fItems[i].setBFData(fDatas[i]);
                }
            }
        }

        /**
         * @设置神器数据,并初始化.
         */
        public setAData() {
//            Main.singleton.mainMenuVM.currentPage = PageName.MagicWeapon;
            Main.singleton.mainMenuVM.initMainInfo();
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = true;
            this.shopPopGroup.visible = false;
            var mWDatas: Model.MagicWeaponData[] = Model.MagicWeaponService.MagicWeaponList;
            this.damageBonusLabel.text = "+"+Model.MagicWeaponService.AddCommon.toString()+"%";
            // this.jewelLabel.text = Model.PlayerLocalService.PlayerData.dy.jewel.toString();//TODO:by zhu_jun,灵石数量移动到了上面.
            if(this.artifactGroup.numChildren == 0) {
                this.mWBuyItem = new MagicWeaponItemVM(this.artifactGroup,() => {//创建商城购买按钮.
                    Model.MagicWeaponService.buySuccessedCallBack(); //更新动态对象.
                    this.setAData();//更新UI,减去UI钱，加购买钱， 开下一个       
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON,1);
                });
                
                for(var i = 0;i < mWDatas.length;i++) {
                    var item: MagicWeaponItemVM = new MagicWeaponItemVM(this.artifactGroup,(_data: Model.MagicWeaponData) => {
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        Model.MagicWeaponService.upgradeSuccessedCallBack(_data);//升级更新动态对象.
                        this.setAData();//更新UI,减去UI钱，加购买钱， 开下一个    
                        //未提交
                        if(Model.WebServiceBase.isDebug) {
                            console.log("zhujun: magic weapon " + _data.dy.magicWeaponId + " add finish ! ");
                        }
                        
                    });
                    item.setMWData(mWDatas[i]);
                    this.mWItems.push(item);
                }
            } else {
                for(var i = 0;i < mWDatas.length;i++) {
                    this.mWItems[i].setMWData(mWDatas[i]);
                }
            }
            this.mWBuyItem.setMWBuyData();//无论初始化还是更新都要执行.
        }
        
        /**
         * @设置商城数据,并初始化
         * @by cai_haotian 2016.2.26.
         */ 
        public setMData(_isBuyTreasure:boolean = false){
//            Main.singleton.mainMenuVM.currentPage = PageName.Shop;
            this.protagonistPopGroup.visible = false;
            this.bosomFriendPopGroup.visible = false;
            this.artifactPopGroup.visible = false;
            this.shopPopGroup.visible = true;
            if(_isBuyTreasure){
                this.shopScroller.viewport.scrollV = 80 * 6 + 30;//TODO: 如果列表长度会变，就改成获取元宝的id-1.
            }
            //设置元宝数量
            this.treasureLabel.text = Model.PlayerLocalService.PlayerData.dy.treasure+"";
            var sDatas:Model.ShopData[]=Model.ShopLocalService.ShopList;
            if(this.shopGroup.numChildren==0){
                this.sBuyItem=new ShopItemVM(this.shopGroup,()=>{
                        this.shopScroller.viewport.scrollV=74*6+30;//TODO: 如果列表长度会变，就改成获取元宝的id-1.
                    })
                this.sBuyItem.setYBItem();
                for(var i = 0;i < sDatas.length; i++) {
                    var shopItem: ShopItemVM = new ShopItemVM(this.shopGroup,(_data:Model.ShopData,_isFree?:boolean)=>{
                        Model.AudioService.Shared().PlaySound("YX-004_mp3");
                        if(_data.Type==Model.ShopType.SHOP_TYPE_YB){

                                Model.WebService.Recharge((_data: Model.ShopList)=>{
                                    if(Model.WebServiceBase.isDebug){
                                        console.log("cai_haotian recharge success!!!!!");   
                                    }
                                    for(var i = 0;i < _data.shopList.length; i++) {
                                        Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].cost);
                                        Model.PlayerLocalService.PlayerData.dy.treasure += Number(_data.shopList[i].extraGet);
                                    }
                                    this.setMData();//刷新UI，减钱
                                    Main.singleton.mainGameVM.initMainGameInfo();//更新主场景ui
                                },()=>{
                                    if(Model.WebValue.isTraditional){
                                        alert("充值失敗！");
                                    }else{
                                        alert("充值失败！");
                                    }
                                })
                        }else{
                            if(_isFree) {//这里是免费释放技能
                                Model.ShopLocalService.commitShop(_data,_isFree,() => {
                                    this.setMData();//刷新UI，减钱
                                    Main.singleton.mainGameVM.initMainGameInfo();//更新主场景ui
                                    Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
                                        if(Model.WebServiceBase.isDebug) {
                                            console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                        }
                                    },() => {
                                        if(Model.WebValue.isTraditional) {
                                            alert("數據提交失敗請聯繫管理員！！！！");
                                        } else {
                                            alert("数据提交失败请联系管理员！！！！");
                                        }
                                    });
                                    Model.PlayerLocalService.PlayerData.shopFlag = true;
                                });
                            }else{
                                //这里是花钱释放技能
                                if(Model.PlayerLocalService.isEnoughSycee(_data.st.cost,() => { })) {
                                    if(Model.PlayerLocalService.PlayerData.shopFlag){
                                        Model.PlayerLocalService.PlayerData.shopFlag = false;
                                        //设置商城回调
                                        Model.ShopLocalService.commitShop(_data,_isFree,() => {
                                            this.setMData();//刷新UI，减钱
                                            Main.singleton.mainGameVM.initMainGameInfo();//更新主场景ui
                                            Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
                                                if(Model.WebServiceBase.isDebug) {
                                                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                                }
                                            },(data) => {
                                                alert(data);
                                                if(Model.WebValue.isTraditional) {
                                                    alert("數據提交失敗請聯繫管理員！！！！");
                                                } else {
                                                    alert("数据提交失败请联系管理员！！！！");
                                                }
                                            });
                                            Model.PlayerLocalService.PlayerData.shopFlag = true;
                                        });
                                    }
                                } else {
                                    new ViewModel.LackGoldVM(Main.singleton,() => { });
                                }
                            }
                        }
                    })
                    shopItem.setSData(sDatas[i]);
                    this.sItems.push(shopItem);
                }
            }else{
                for(var i = 0;i < this.sItems.length; i++) {
                    this.sItems[i].setSData(sDatas[i]);
                }
            }
            this.sBuyItem.setYBItem();
        }
        
    }
}
