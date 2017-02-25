module Model {
	/**
	 * @author: zhu_jun
	 * @date: 2016.01.15.
	 */
    export class FriendData {
        public constructor(_dy: FriendDyModel, _st: FriendStModel) {
            this.dy = _dy;
            this.st = _st;
        }
		/**
		 * @基础伤害值.
		 */
        public dpsBase: number;
		/**
		 * @dps下一级差值.
		 */
        public dpsDelta: number;
		/**
		 * @dps带单位下一级差值.
		 */
        public get DpsDeltaUnit(): string {
            return MainLocalService.toUnitConversion(this.dpsDelta);
        }
		/**
		 * @下一级的dps.
		 */
        public dpsNext: number;
        /**
         * @带单位的下一级dps.
         */
        public get DpsNextAndUnit(): string {
            return MainLocalService.toUnitConversion(this.dpsNext);
        }
		/**
		 * @当前挚友最终dps.
		 */
        public dps: number;
		/**
		 * @带单位的秒伤.
		 */
        public get DpsAndUnit(): string {
            //            _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);
            return MainLocalService.toUnitConversion(this.dps);
        }
		/**
		 * @根据等级匹配到的可解锁层级.
		 */
        public layerMatchLevel: number;
		/**
		 * @可解锁重级显示的文字.
		 */

        public get LayerStr(): string {
            switch (this.layerMatchLevel) {
                case 1:
                    return "第一重";
                case 2:
                    return "第二重";
                case 3:
                    return "第三重";
                case 4:
                    return "第四重";
                case 5:
                    return "第五重";
                case 6:
                    return "第六重";
                case 7:
                    return "第七重";
                default:
                    return "满重";
            }
        }
		/**
		 * @挚友层级加成值百分比.
		 */
        public layerPercent: number;
		/**
		 * @层级解锁花费(十进制).
		 */
        public layerCost: number;
	    /**
	     * @带单位层级cost.
	     */
        public get LayerCostAndUnit(): string {
            return MainLocalService.toUnitConversion(this.layerCost);;
            //            _data.LayerCostAndUnit = MainLocalService.toUnitConversion(_data.layerCost);
        }
		/**
		 * @挚友基础升级花费(十进制)
		 */
        public upgradeBaseCost: number;
        /**
		 * @挚友升级花费.
		 */
        public upgradeCost: number;
        //        /**
        //         * @只有升级花费单位.
        //         */ 
        //        public get UpgradeCostUnit():string{
        //            return MainLocalService.toUnitConversion(this.upgradeCost);
        //        }
        /**
         * @带单位的挚友升级花费.
         */
        public get UpgradeCostAndUnit(): string {
            return MainLocalService.toUnitConversion(this.upgradeCost);
            //            _data.UpgradeCostAndUnit = MainLocalService.toUnitConversion(_data.upgradeCost);
        };

        /**
         * @十连升挚友升级花费
         * @by cai_haotian 2016.3.9
         */
        public tenUpgradeCost: number = 0;
        /**
         * @十连升挚友升级花费带单位
         * @by cai_haotian 2016.3.9
         */
        public get TenUpgradeCostAndUnit(): string {
            return MainLocalService.toUnitConversion(this.tenUpgradeCost);
        }

        /**
         * @百连升挚友升级花费
         * @by cai_haotian 2016.3.9
         */
        public hundredUpgradeCost: number = 0;
        /**
         * @百连升挚友升级花费带单位
         * @by cai_haotian 2016.3.9
         */
        public get hundredUpgradeCostAndUnit(): string {
            return MainLocalService.toUnitConversion(this.hundredUpgradeCost);
        }

        /**
         * @是否显示item招募
         * @by cai_haotian 2016.3.28.
         */
        public isShow: boolean = false;

        /**
         * @解封钱数
         * @by cai_haotian 2016.4.18.
         */
        public sealCDMoney: number = 0;

        /**
         * @是否达到招募条件
         * @by cai_haotian 2016.3.28.
         */
        public reachRecruit: boolean = false;

        /**
         * @招募条件
         * @by cai_haotian 2016.3.28.
         */
        public recruitDemand: number = 0;

        /**
         * @招募条件
         * @by cai_haotian 2016.3.28
         */
        public get RecruitDemand(): string {
            return MainLocalService.toUnitConversion(this.recruitDemand);
        }

		/**
		 * @技能一层加成类型.
		 */
        public get FirstLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.firstLayerType];
        }
		/**
		 * @技能二层加成类型.
		 */
        public get SecondLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.secondLayerType];
        }
		/**
		 * @技能三层加成类型.
		 */
        public get ThirdLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.thirdLayerType];
            // this.st.sixthLayerType
            // this.st.seventhLayerType
        }
		/**
		 * @技能四层加成类型.
		 */
        public get FourthLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.fourthLayerType];
        }
		/**
		 * @技能五层加成类型.
		 */
        public get FifthLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.fifthLayerType];
        }
		/**
		 * @技能六层加成类型.
		 */
        public get SixthLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.sixthLayerType];
        }
		/**
		 * @技能七层加成类型.
		 */
        public get SeventhLayerType() {
            return <SkillFloorType>SkillFloorType[this.st.seventhLayerType];
        }

		/**
         * @招募货币消耗类型枚举.
         */
        public get RecruitMoneyType(): MoneyType {
            return <MoneyType>MoneyType[this.st.recruitMoneyType];
        }
        /**
         * @挚友招募花费.
         */
        public get RecruitCost(): number {
            return MainLocalService.toTenConversion(this.st.recruitCost, this.st.recruitCostMagnitude);
        }
        /**
		 * @带单位招募花费的钱.
		 */
        public get RecruitCostAndUnit(): string {
            return String(this.st.recruitCost + MainLocalService.getMagnitudeListById(this.st.recruitCostMagnitude));
        }


        /**
         * @是够够金币招募.
         * @金币和元宝都通过这里判断.
         */
        public get IsEnoughRecruit(): boolean {
            if (this.RecruitMoneyType == MoneyType.MONEY_TYPE_COIN) {//钱不够未解锁暗，不可点击.
                return PlayerLocalService.isEnoughGold(this.RecruitCost);
                //                return PlayerLocalService.isEnoughGold(this.st.recruitCost,this.st.recruitCostMagnitude); 
            } else if (this.RecruitMoneyType == MoneyType.MONEY_TYPE_YB) {//元宝不够未解锁暗，不可点击.
                return PlayerLocalService.isEnoughSycee(this.RecruitCost);
            } else {
                return false;
                // alert("您的货币类型错误，请及时联系客服 ! ");
            }
        }

        /**
         * @挚友类型.
         */
        public get Type() {
            return <FriendType>FriendType[this.st.type];
        }

        //         _data.DBJson,
        // Model.PlayerLocalService.PlayerData.DBPngJson,
        // Model.PlayerLocalService.PlayerData.DBPng,
        // Model.PlayerLocalService.PlayerData.st.playerDragonBones,


        // /**
        //  * @待机配置.
        //  */
        // public get IdleJson(): string {
        //     return this.st.idle + "_json";
        // }
        // /**
        //  * @待机图片.
        //  */
        // public get IdlePng(): string {
        //     return this.st.idle + "_png";
        // }

        // /**
        //  * @攻击配置
        //  */
        // public get AttackJson(): string {
        //     return this.st.attack + "_json";
        // }

        // /**
        //  * @攻击图片
        //  */
        // public get AttackPng(): string {
        //     return this.st.attack + "_png";
        // }
        /**
         * @特效配置
         */
        public get EffectJson(): string {
            return this.st.effect + "_json";
        }
        /**
         * @特效图片
         */
        public get EffectPng(): string {
            return this.st.effect + "_png";
        }

        /**
         * @特效粒子
         */
        public get Effect(): string {
            return this.st.effect + "_texiao";
        }

        public get Icon(): string {
            return this.st.icon + "_png";
        }

        /**
         * @主角攻击.
         */
        public get Attack(): string {
        	return this.st.dragonBones + "_attack";
        }

		/**
		 * @主角待机.
		 */
        public get Idle(): string {
            return this.st.dragonBones + "_idle";
        }
		// /**
		//  * @受击动画名称.
		//  */
        // public get Hit(): string {
        //     return this.st.dragonBones + "_hit";
        // }

		/**
		 * @主角龙骨配置.
		 * @bodyGuanYu_ske_json
		 */
        public get DBJson(): string {
            return this.st.dragonBones + "_ske_json";
        }

		/**
		 * @主角待机图片配置.
		 * @bodyGuanYu_tex_json
		 */
        public get DBPngJson(): string {
            return this.st.dragonBones + "_tex_json";
        }

		/**
		 * @主角待机图片.
		 * @示例:bodyGuanYu_tex_png
		 */
        public get DBPng(): string {
            return this.st.dragonBones + "_tex_png";
        }

		/**
		 * @挚友技能动态数据.
		 */
        public dy: FriendDyModel;
		/**
		 * @挚友技能静态数据.
		 */
        public st: FriendStModel;
    }
}
