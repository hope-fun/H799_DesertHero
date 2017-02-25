module ViewModel {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export class BtnBottomVM extends eui.Component {
        /**
         * @按钮回调方法.
         */
        public onCallBack: Function;
        /**
         * @下方各模块弹窗父节点.
         */
        private menuPopupGroup: eui.Group;

        /**
         * @技能按钮事件.
         */
        public btnSkill: BtnBottomItemVM;
        /**
         * @主角按钮.
         */
        public btnProtagonist: BtnBottomItemVM;
        /**
         * @挚友按钮.
         */
        public btnBosomFriend: BtnBottomItemVM;
        /**
         * @神器按钮.
         */
        public btnArtifact: BtnBottomItemVM;
        /**
         * @商城按钮.
         */
        public btnMall: BtnBottomItemVM;



        public constructor(_onCallBack?: Function) {
            super();
            this.skinName = View.BtnBottomView;
            this.onCallBack = _onCallBack;
        }

        protected createChildren() {
            super.createChildren();

        }

        protected childrenCreated() {
            super.childrenCreated();
        }
    }
}
