module Model {
	/**
	 *
	 * @author: zhu_jun
	 * @date: 2016.02.03.
	 * @怪物动态信息，在SceneData.
	 */
	export class MonsterData {
		public constructor(_st: MonsterStModel) {
			this.st = _st;
		}

		// /**
		//  * @主角攻击.
		//  */
		// public get Attack(): string {
		// 	return this.st.dragonBones + "_attack";
		// }

		/**
		 * @主角待机.
		 */
		public get Idle(): string {
			return this.st.dragonBones + "_idle";
		}
		/**
		 * @受击动画名称.
		 */
		public get Hit(): string {
			return this.st.dragonBones + "_hit";
		}

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

		// /**
		//  * @待机动画json文件.
		//  */
		// public get IdleJson(): string {
		// 	return String("monster_00" + this.st.pic + "_idle_json");
		// }
		// /**
		//  * @待机动画png文件.
		//  */
		// public get IdlePng(): string {
		// 	return String("monster_00" + this.st.pic + "_idle_png");
		// }
		// /**
		//  * @待机动画名称.
		//  */
		// public get Idle(): string {
		// 	return String("monster_00" + this.st.pic + "_idle");
		// }
		// /**
		//  * @受击动画json文件.
		//  */
		// public get HitJson(): string {
		// 	return String("monster_00" + this.st.pic + "_gethit_json");
		// }
		// /**
		//  * @受击动画png文件.
		//  */
		// public get HitPng(): string {
		// 	return String("monster_00" + this.st.pic + "_gethit_png");
		// }

		/**
		 * @怪物血量.
		 */
		public hp: number;
		/**
		 * @怪物血量设置.
		 */
		public set AddHp(_value: number) {
			this.hp += _value;
			if (Model.WebServiceBase.isDebug) {
				// console.log("zhujun: this.hp += _value  " + this.hp);
			}

			if (this.hp < 0) {
				this.hp = 0;
			}
		}

		/**
		 * @带单位怪物血量.
		 */
		public get HpAndUnit(): string {
			return MainLocalService.toUnitConversion(this.hp);
		}
		/**
		 * @boss血量最大值.
		 */
		public hpMax: number;

		public get HpMaxAndUnit(): string {
			return MainLocalService.toUnitConversion(this.hpMax);
		}

		/**
		 * @boss倒计时.
		 */
		public leftTime: number;
		/**
		 * @怪物掉落金币.
		 */
		public dropMoney: number;
		/**
		 * @带单位怪物金币掉落数量.
		 */
		public get DropMoneyAndUnit(): string {
			return MainLocalService.toUnitConversion(this.dropMoney);
		}

		/**
		 * @怪物类型.
		 */
		public get MonsterType(): MonsterType {
			return <MonsterType>MonsterType[this.st.monsterType];
		}


		public st: MonsterStModel;
	}
}
