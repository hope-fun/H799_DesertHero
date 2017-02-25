var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian 2016.3.17
     * @description particle  effect
     *
     */
    var Particles = (function () {
        /**
         * @_texture:粒子图片数据
         * @_config:粒子特效JSON文件
         * @_uiGroup:播放父节点
         * @_x:设置播放所在x坐标
         * @_y:设置播放所在y坐标
         */
        function Particles(_uiGroup, _texture, _config, _onCallBack) {
            this.uiGroup = _uiGroup;
            this.texture = _texture;
            this.config = _config;
            this.onCallBack = _onCallBack;
        }
        Particles.prototype.setParticlesPos = function (_x, _y) {
            var texture = RES.getRes(this.texture);
            var config = RES.getRes(this.config);
            this.system = new particle.GravityParticleSystem(texture, config);
            this.uiGroup.addChild(this.system);
            this.system.x = _x;
            this.system.y = _y;
            this.system.start();
            return this.system;
        };
        return Particles;
    }());
    Model.Particles = Particles;
    __reflect(Particles.prototype, "Model.Particles");
})(Model || (Model = {}));
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
