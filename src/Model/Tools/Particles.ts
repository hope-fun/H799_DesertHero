module Model {
    /**
     *
     * @author cai_haotian 2016.3.17
     * @description particle  effect
     *
     */
    export class Particles {
        /**
         * @粒子系统
         */
        public system: particle.ParticleSystem;
        
        /**
         * @父节点
         */ 
        private uiGroup:egret.DisplayObjectContainer;
        
        /**
         * @纹理集名称
         */ 
        private texture:string;
        
        /**
         * @配置表名称 
         */ 
        private config:string;
        
        /**
         * @回调函数
         */ 
        private onCallBack:Function;

        /**
         * @_texture:粒子图片数据
         * @_config:粒子特效JSON文件
         * @_uiGroup:播放父节点
         * @_x:设置播放所在x坐标
         * @_y:设置播放所在y坐标
         */
        public constructor(_uiGroup?: egret.DisplayObjectContainer,_texture?: string,_config?: string,_onCallBack?:Function) {
            this.uiGroup=_uiGroup;
            this.texture=_texture;
            this.config=_config;
            this.onCallBack=_onCallBack;
        }
    	  
        
        public setParticlesPos(_x?: number,_y?: number):particle.ParticleSystem{
            var texture = RES.getRes(this.texture);
            var config = RES.getRes(this.config);
            this.system = new particle.GravityParticleSystem(texture,config);
            this.uiGroup.addChild(this.system);
            this.system.x = _x;
            this.system.y = _y;
            this.system.start();
            return this.system;
        }


    }
}

// module ViewModel {
// 	/**
// 	 *
// 	 * @author fangchao 
// 	 *
// 	 */
// 	export class EffectParticleVM extends eui.Component{
// 		/**
//     	 * @父元素
//     	 */
//         private uiGroup: eui.Group;
//         /**
//          * @粒子系统对象
//          */ 
//         public system: particle.GravityParticleSystem;
//         /**
//          * @回调函数
//          */
//         private onCallBack: Function;
//         public constructor(_uiGroup: eui.Group,_onCallBack?: Function) {
//             super();
//             this.uiGroup = _uiGroup;
//             this.onCallBack = _onCallBack;
//         }
//         public initParticle(_json: string,_png:string) {
//             //获取纹理
//             var texture = RES.getRes(_png);
//             //获取配置
//             var config = RES.getRes(_json);
//             //创建 GravityParticleSystem
//             this.system = new particle.GravityParticleSystem(texture,config);
//             //启动粒子库
//             this.system.start();
//             this.system.addEventListener(egret.Event.LOOP_COMPLETE,() => {
//                 this.uiGroup.removeChild(this.system);
//                 },this);
//             //将例子系统添加到舞台
//             this.uiGroup.addChild(this.system);
//         }
// 	}
// }
