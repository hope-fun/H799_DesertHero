module ViewModel {
    /**
     * @author cai_haotian 
     * @date 2015.12.28.
     */
    export class MainInfoVM extends eui.Component {
        /**
         * @主信息数据.
         */
        private mData: Model.MainInfoData = null;
        /**
         * @目前DPS
         */
        private currentDps: eui.Label;
        /**
         * @点击攻击力
         */
        private tapDps: eui.Label;
        /**
         * @挚友DPS
         */
        private friendDps: eui.Label;
        /**
         * @主角技能组
         */
        public skillGroup: eui.Group;
        /**
         * @父节点
         */
        private uiLayer: eui.UILayer;
        /**
         * @回调方法
         */
        private onCallBack: Function;
        /**
         * @粒子系统
         * @by cai_haotian 2016.2.23.
         */
        public system: particle.ParticleSystem;

        public constructor(_uiLayer?: eui.UILayer, _onCallBack?: Function) {
            super();

            this.skinName = View.MainInfoView;


            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
        }

        protected createChildren() {
            super.createChildren();
            this.initMainInfo();
        }

        /**
         * @设置主信息数据,并初始化.
         */
        public initMainInfo() {
            this.tapDps.text = Model.PlayerLocalService.PlayerData.ClickDamageAndUnit;
            this.friendDps.text = Model.PlayerLocalService.PlayerData.FriendDamageAndUnit;
            this.currentDps.text = Model.PlayerLocalService.PlayerData.CurrentDpsAndUnit;
            //获得主角技能列表
            var pSDatas: Model.PlayerSkillData[] = Model.PlayerSkillLocalService.PlayerSkillList;
            this.setSkillItem(pSDatas);
        }

        /**
         * @设置当前dps.
         */
        public setCurrentDps(_value: string) {
            this.currentDps.text = _value;
        }

        /**
         * @设置点击伤害.
         */
        public setTapDamage(_value: string) {
            this.tapDps.text = _value;
        }

        public setFriendDps(_value: string) {
            this.friendDps.text = _value;
        }

        /**
         * @设置主角6个技能
         * @by cai_haotian 2016.2.1.
         */
        public setSkillItem(_data: Model.PlayerSkillData[]) {
            var skillItem: ViewModel.BtnActiveSkillVM;
            for (var i = 0; i < _data.length; i++) {
                skillItem = <ViewModel.BtnActiveSkillVM>this.skillGroup.getChildAt(i);
                if (skillItem.currentState != "during" && skillItem.currentState != "disabled") {
                    //初始化技能
                    skillItem.onCallBack = (_data?: Model.PlayerSkillData, _item?: ViewModel.BtnActiveSkillVM) => {
                        Model.WebService.ReleaseSkillCD(_data.st.id, () => {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian releaseSkill Success!!!!!");
                            }
                            //通过item的状态来实现不同函数
                            if (_item.currentState == "disabled" && _data.dy.cdTime != 0) {
                                this.resetCD(_data, _item);
                            } else if (_item.currentState == "enabled") {
                                this.skillAnimel(_data, _item);
                            }
                        }, () => {
                            if (Model.WebValue.isTraditional) {
                                alert("釋放技能失敗！請聯繫管理員");
                            } else {
                                alert("释放技能失败！请联系管理员！")
                            }

                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian releaseSkill failed!!!!!!");
                            }
                        })
                    };
                }
                //初始化技能信息
                skillItem.initSkill(_data[i]);
            }
        }

        /**
         * @技能动画
         * @by cai_haotian 2016.3.15.
         */
        public skillAnimel(_data?: Model.PlayerSkillData, _item?: ViewModel.BtnActiveSkillVM, _flag: boolean = true, _onCallBack?: Function) {
            var mc: egret.MovieClip;
            var mcItem: Model.MovieClipService;
            var armature: dragonBones.Armature;
            var duringTime = _flag ? _data.continueTime : 15;
            var cd: number = null;

            var enemyHit = () => { Main.singleton.mainGameVM.enemyHit() };

            if (_flag) {
                _item.touchEnabled = false;
                _item.currentState = "during";
                _item.counterCD.text = Model.PlayerSkillLocalService.timeDes(duringTime);
            } else {
                _item.touchEnabled = false;
                if (_item.currentState == "enabled") {
                    _item.currentState = "disabled";
                    egret.setTimeout(() => {
                        _item.currentState = "enabled";
                    }, this, duringTime)
                }
                if (_onCallBack) {
                    _onCallBack(_data, duringTime);
                }
            }
            //技能特效
            switch (_data.st.id) {
                case 1:
                    //技能1 是单次点击后直接播放 并且开始计时cd
                    //3秒后实现攻击
                    egret.setTimeout(() => {
                        mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeFrontSkill);
                        mc = mcItem.initMovieClip("Tx_zhujue_0" + _data.st.id + "_json", "Tx_zhujue_0" + _data.st.id + "_png", "Tx_zhujue_0" + _data.st.id, 1, () => {
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(mcItem.movieClip);
                        });
                        duringTime = 0;
                        Model.AudioService.Shared().PlaySound("YX-007_mp3");
                        Model.PlayerSkillLocalService.PlayerSkillEffect(_data, () => {
                            Main.singleton.mainGameVM.cutHp(true);
                        }, _flag);
                    }, this, duringTime * 1000);

                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1, 1);
                    }

                    //调用技能逻辑效果

                    break;
                case 2:
                    mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeFrontSkill);
                    mc = mcItem.initMovieClip("Tx_zhujue_0" + _data.st.id + "_json", "Tx_zhujue_0" + _data.st.id + "_png", "Tx_zhujue_0" + _data.st.id, -1, () => { });
                    mc.addEventListener(egret.Event.LOOP_COMPLETE, enemyHit, this);

                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2, 1);
                    }

                    //调用技能逻辑效果
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, () => {
                        Main.singleton.mainGameVM.cutHp(true);
                    }, _flag);
                    break;
                case 3:
                    var particleEffects = new Model.Particles(Main.singleton.mainGameVM.yungeFrontSkill, "Tx_zhujue_03_particle_png", "Tx_zhujue_03_particle_json");
                    var partcleObject = particleEffects.setParticlesPos(272, 280);
                    partcleObject.start();
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3, 1);
                    }
                    // by zhu_jun,2017.02.21.,技能特效.
                    var skill3DB = new Model.DragonBones(Main.singleton.mainGameVM.yungeFrontSkill,
                        "Tx_zhujue_03_json", "Tx_zhujue_03_part_json", "Tx_zhujue_03_part_png", "Tx_zhujue_03",
                        720, 360)
                    skill3DB.play("Tx_zhujue_03");
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, () => {//调用技能逻辑效果
                    }, _flag);
                    break;
                case 4://龙骨动画,by zhu_jun,2017.02.22.
                    mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeSkill0);
                    mc = mcItem.initMovieClip("Tx_zhujue_04_json", "Tx_zhujue_04_png", "Tx_zhujue_04", -1, () => { });
                    if (_flag) {//调用成就 by cai_haotian 2016.4.5.
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, () => {
                    }, _flag);
                    break;
                case 5:
                    this.bufferAnimel(Main.singleton.mainGameVM.yungeFrontSkill, () => {
                        var skill3DB = new Model.DragonBones(Main.singleton.mainGameVM.yungeSkill0,//by zhu_jun,2017.02.21.
                            "Tx_zhujue_05_json", "Tx_zhujue_05_part_json", "Tx_zhujue_05_part_png", "Tx_zhujue_05",
                            720, 360)
                        skill3DB.play("Tx_zhujue_05");
                    });
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, () => {//调用技能逻辑效果
                    }, _flag);
                    break;
                case 6:
                    //最后一个特效为粒子特效
                    var particleEffects = new Model.Particles(Main.singleton.mainGameVM.yungeFrontSkill, "Tx_zhujue_06_2_png", "Tx_zhujue_06_2_json");
                    var partcleObject = particleEffects.setParticlesPos(272, 142);
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, (_gold: number, _goldAndunit: string) => {//调用技能逻辑效果
                        Main.singleton.mainGameVM.goldAnimel(_gold, _goldAndunit);
                    }, _flag);
                    break;
                default:
                    alert("主角技能使用出错！请联系管理员！！");
            }

            //技能处在持续时间中
            var during = egret.setInterval(() => {
                duringTime--
                if (_flag) {
                    _item.counterCD.text = Model.PlayerSkillLocalService.timeDes(duringTime);
                }

                if (_onCallBack) {
                    _onCallBack(_data, duringTime);
                }
                //技能持续时间过完
                if (duringTime <= 0) {
                    egret.clearInterval(during);
                    _item.touchEnabled = true;
                    switch (_data.st.id) {
                        case 1:
                            //移除技能1的监听事件
                            //                            Main.singleton.mainGameVM.clickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,skillOncAnimate,this);
                            break;
                        case 2:
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(mc);
                            mc.removeEventListener(egret.Event.LOOP_COMPLETE, enemyHit, this);
                            break;
                        case 3://TODO：by zhu_jun,2017.01.24.下面一行会报错.
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(armature.display);
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(partcleObject);
                            break;
                        case 4:
                            Main.singleton.mainGameVM.yungeSkill0.removeChild(mc);
                            break;
                        case 5:
                            //此层级在后面
                            Main.singleton.mainGameVM.yungeSkill0.removeChild(armature.display);
                            break;
                        case 6:
                            //粒子动画特效移除
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(partcleObject);
                            break;
                        default:
                            alert("主角技能使用出错！请联系管理员！！");
                    }
                    if (_flag) {
                        _item.currentState = "disabled";
                        _item.initSkillCD(_data);
                    }
                }
            }, this, 1000);
        }


        /**
         * @缓冲动画
         * @by cai_haotian 2016.2.19.
         * @by zhu_jun,2017.02.22.
         */
        public bufferAnimel(_uiGroup: eui.Group, _onCallBack: Function = null) {
            var db: Model.DragonBones = new Model.DragonBones(_uiGroup,
                "Tx_zhujue_hc0405_ske_json",
                "Tx_zhujue_hc0405_tex_json",
                "Tx_zhujue_hc0405_tex_png",
                "Tx_zhujue_hc0405",
                640, 360);//1280,720//640,360
            db.play("Tx_zhujue_hc0405", 1, (evt: dragonBones.AnimationEvent) => {
                _uiGroup.removeChild(evt.armature.display);
                dragonBones.WorldClock.clock.remove(evt.armature);
                evt.armature.dispose();
                if (_onCallBack != null) _onCallBack();
            });
            //TODO: by zhu_jun可能要加帧事件.
            // bufferArmature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT,(evt: dragonBones.FrameEvent) => {
            //     _uiGroup.removeChild(bufferArmature.display);
            //     _onCallback();
            // },this);
        }

        /**
         * @重置技能cd
         * @by cai_haotian 2016.2.24.
         */
        public resetCD(_data: Model.PlayerSkillData, _item?: ViewModel.BtnActiveSkillVM) {
            var resetCD = new ViewModel.ResetSkillVM(Main.singleton, _data, (_data: Model.PlayerSkillData) => {
                Model.PlayerSkillLocalService.reduceCD(_data, () => {
                    this.initMainInfo();
                    egret.clearInterval(_item.cd);
                });
            });
        }
    }
}