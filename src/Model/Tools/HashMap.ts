module Model {
	/**
	 *
	 * @author 
	 * @TODO: by zhu_jun,delete key的方法.
	 */
    export class HashMap {
        public constructor() {
        }

        public Set(key,value) {
            this[key] = value;
        }
        public Get(key){
            return this[key];
        }
        public Contains(key) { 
            return this.Get(key) == null ? false : true;
        }
        public Remove(key){
            delete this[key];
        }
        /**
         * @未實現.
         */ 
        public Clear() {
            
        }
        
    }
}
