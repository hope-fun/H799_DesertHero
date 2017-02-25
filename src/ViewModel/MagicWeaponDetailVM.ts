module ViewModel {
	/**
	 *
	 * @author  fangchao
	 * @date 2015.12.30
	 *
	 */
    export class MagicWeaponDetailVM extends eui.Component {
        /**
        * @父节点.
        */
        private uiLayer: egret.DisplayObjectContainer;
        /**
        * @回调函数.
        */
        private onCallBack: Function;
        /**
        * @窗口关闭按钮
        */
        private magicCloseBtn: eui.Button;
        /**
        * @黑色背景图片
        */
        private mask_black_detail: eui.Image;
        /**
        * @主体界面
        */
        private window: eui.Group;

        /**
        * @神器图标
        */
        private magicWeapon: eui.Image;
        /**
        * @神器名称
        */
        private weaponName: eui.Label;
        /**
        * @神器等级
        */
        private weaponLevel: eui.Label;
        /**
        * @消耗元宝
        */
        private weaponCost: eui.Label;
        /**
        * @返还灵石
        */
        private weaponReturn: eui.Label;
        /**
        * @当前等级攻击力加成
        */
        private weaponAddNow: eui.Label;
        /**
        * @当前等级减少关卡
        */
        private weaponRemoveNow: eui.Label;
        /**
        * @下一等级攻击力加成  
        * */
        private weaponAddNext: eui.Label;
        /**
        * @下一等级减少关卡
        */
        private weaponRemoveNext: eui.Label;
        /**
         * @拆解消耗元宝
         */
        private consumption: eui.Label;
        /**
         * @返还灵石
         */
        private restitution: eui.Label;
        /**
         * @拆解按钮
         */
        private decomposeBtn: ViewModel.BtnShareVM;

        /**
         * @数据
         */
        private mWData: Model.MagicWeaponData;

        public constructor(_uiLayer: egret.DisplayObjectContainer, _onCallBack?: Function) {
            super();

            this.skinName = View.MagicWeaponDetailView;


            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
            /**
             * @添加按钮关闭事件
             */
            this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.uiLayer.removeChild(this);
            }, this);
        }
		/**
		 * @设置按钮内容
		 */
        public setMWData(_mWData?: Model.MagicWeaponData) {
            this.mWData = _mWData;
            //            console.log("cai_haotian mwData is" + JSON.stringify(this.mWData));
            this.magicWeapon.source = this.mWData.Icon;
            this.weaponName.text = this.mWData.st.name;

            if (this.mWData.dy) {
                this.weaponLevel.text = "Lv." + this.mWData.dy.level;
            } else {
                this.weaponLevel.text = "Lv.0";
            }

            this.weaponAddNow.text = this.mWData.st.descriptionFirst.replace("{}", this.mWData.effectFirst + "");
            this.weaponRemoveNow.text = this.mWData.st.descriptionSecond.replace("{}", this.mWData.effectSecond + "");
            this.weaponAddNext.text = this.mWData.st.descriptionFirst.replace("{}", this.mWData.effectFirstNext + "");
            this.weaponRemoveNext.text = this.mWData.st.descriptionSecond.replace("{}", this.mWData.effectSecondNext + "");
        }
    }
}

