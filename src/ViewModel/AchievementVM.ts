module ViewModel {
    /**
     *
     * @author cai_haotian
     * @date 2015.12.29.
     *
     */
    export class AchievementVM extends eui.Component {
        /**
         * @当前窗口
         */
        private window: eui.Group;

        /**
         * @所获钱数
         */
        private earnMoney: eui.Label;

        /**
         * @关闭按钮
         */
        private closeBtn:ViewModel.CloseBtnVM;

        /**
         * @显示列表
         */
        private listGroup: eui.Group;


        /**
         * @父节点
         */
        public uiLayer: eui.UILayer;

        /**
         * @回调方法
         */
        public onCallBack: Function;

        /**
         * @条列表
         */
        private achievementItem: ViewModel.AchievementItemVM[] = [];

        private maskBlackSettings:eui.Rect;

        /**
         * @金币增长时间 
         */
        private timer: egret.Timer;

        public constructor(_uiLayer?: eui.UILayer, _onCallBack?: Function) {
            super();
            this.skinName = View.AchievementView;
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.uiLayer.removeChild(this);
            }, this);

            this.uiLayer.addChild(this);
        }


        /**
         * @初始化窗口
         * @by cai_haotian 2016.3.10
         */ 
        private initWindow(){
            egret.Tween.get(this.maskBlackSettings).to({ alpha: 0.65 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);


        }

        protected createChildren() {
            super.createChildren();
            this.setAchievementList();
            this.setYbCount();
            this.initWindow();
        }

    	/**
    	 * @设置成就钱数
    	 */
        public setYbCount() {
            this.earnMoney.text = Model.PlayerLocalService.PlayerData.dy.treasure + "";
        }

    	/**
    	 * @设置成就列表
    	 */
        public setAchievementList() {

            Model.AchievementLocalService.setAchievementList();//先重新设置数据
            var aData: Array<Model.AchievementData> = Model.AchievementLocalService.AchievementList;
            if (Model.WebServiceBase.isDebug) {
                //                console.log("cai_haotian achievementData "+JSON.stringify(aData));
            }
            if (this.listGroup.numChildren == 0) {
                for (var iteminfo of aData) {
                    var item: ViewModel.AchievementItemVM = new ViewModel.AchievementItemVM(this.listGroup, (_data?: Model.AchievementData) => {
                        _data.dy.stage = _data.matchStage;
                        _data.dy.isComplete = true;
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian dataInfo " + JSON.stringify(_data.dy));
                        }
                        Model.WebService.AchievementInfo(_data.dy, () => {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian AchievementInfo success!!!!!!!");
                            }

                            if (_data.RewardType == Model.RewardType.MONEY_TYPE_YB) {
                                this.treasureAnimel(_data.RewardCount);
                            } else if (_data.RewardType == Model.RewardType.MONEY_TYPE_JEWEL) {
                                Model.PlayerLocalService.PlayerData.AddJewel = _data.RewardCount;
                                //先提交数据
                                Model.WebService.commitData(Model.WebValue.dataDyModel, () => {
                                    if (Model.WebServiceBase.isDebug) {
                                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                                    }
                                }, () => {
                                    if (Model.WebValue.isTraditional) {
                                        alert("數據提交失敗請聯繫管理員！！！！");
                                    } else {
                                        alert("数据提交失败请联系管理员！！！！");
                                    }
                                })
                            } else {
                                alert("cht 奖励类型出错！！！");
                            }

                            this.setAchievementList();
                        }, () => {
                            if (Model.WebValue.isTraditional) {
                                alert("獲取成就信息失敗！！請聯繫管理員！");
                            } else {
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
            } else {
                for (var i = 0; i < aData.length; i++) {
                    this.achievementItem[i].setItemInfo(aData[i]);
                }
            }
        }

    	/**
    	 * @增长动画
    	 */
        private treasureAnimel(_timers: number) {
            for (var i = 0; i < _timers; i++) {//控制掉过个数
                var coin: eui.Image = new eui.Image();
                coin.source = "icon_yuanbao_png";
                coin.scaleX = 0.5;
                coin.scaleY = 0.5;
                coin.x = 458;
                coin.y = 100;
                var endRandomX = 458;//掉落终点的x坐标
                var bezierP1X = endRandomX + Model.Mathf.random(-100, 100);//返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
                var startPos: Model.Vector2 = new Model.Vector2(300, 300);//设置出现点的起始坐标
                var endPos: Model.Vector2 = new Model.Vector2(endRandomX + 18, Model.Mathf.random(130, 140));//设置掉落点的终点坐标
                var finalPos: Model.Vector2 = new Model.Vector2(452, 91);//金币最终飞到的坐标
                var tween = new Model.TweenCustom(coin, this.window, startPos, endPos, finalPos);//进行掉落返回曲线的函数 
                tween.sAnimTime = Model.Mathf.random(1000, 1200);//总时长
                tween.bezierP1Y = 180;
                tween.bezierP1X = bezierP1X;//设置回收动画，贝塞尔曲线的P1点x坐标
                var recycleCallBack = (_bTween: Model.TweenCustom) => {
                    Model.PlayerLocalService.PlayerData.dy.treasure += 1;
                    this.setYbCount();
                }
                tween.GoldRecycleAnim(recycleCallBack);
            }
            egret.setTimeout(() => {
                //先提交数据
                Model.WebService.commitData(Model.WebValue.dataDyModel, () => {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, () => {
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    } else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                })
            }, this, 1300);



        }
    }
}