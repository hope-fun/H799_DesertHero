module Model {
	/**
	 *
	 * @author cai_haotian 2015.12.24.
	 * @by zhu_jun,2017.02.21.
	 */
        export class MonsterStModel {
    	/**
    	 * @怪物id
    	 */
                public id: number;
                /**
                 * @怪物名称
                 */
                public name: string;
                /**
                 * @怪物类型
                 */
                public monsterType: string;
                /**
                 * @怪物图片.
                 * @TODO:这个字段可能用不到了.
                 */
                public pic: string;
                /**
                 * @怪物龙骨.
                 */
                public dragonBones:string;

                public constructor() {

                }


        }
}
