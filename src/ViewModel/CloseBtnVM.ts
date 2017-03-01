module ViewModel { 
    /**
     *
     * @author cai_haotian 
     * @date 2015.12.24.
     *
     */
    export class CloseBtnVM extends eui.Button{
        /**
         * @按钮图片
         */ 
        public btnImg:eui.Image;
        
        /**
         * @按钮图片路径 默认是关闭按钮
         */ 
        public btnImgSource: string ="btn_tanchuang_png";
        
        /**
         * @效果层
         */ 
        public effectGroup:eui.Group;
        
        public constructor() {
            super();
            this.skinName = View.CloseBtn;
             this.setSkinPart("btnImgSource", this.btnImgSource);
        }
        protected createChildren() { 
            super.createChildren();
            
        }

        protected childrenCreated(){
            super.childrenCreated();
            this.btnImg.source=this.btnImgSource;
        }
        
        /**
         * @设置特效
         */ 
        public setEffect(){//by zhu_jun,2017.01.24.特效格式报错.
            //TODO: by zhu_jun,2017.02.17.
            // var factory = new ViewModel.EffectSkillVM(this.effectGroup,() => { });
            // var armature = factory.initDragonBone("Tx_lixianjiangli_tex_json","Tx_lixianjiangli_tex_png","Tx_lixianjiangli_ske_json",0);
            // armature.display.x=this.width/2;
            // armature.display.y = this.height / 2;
        }
    }
}