module Model {
	/**
	 *
	 * @author 
	 *
	 */
	export class Mathf {
		public constructor() {
    		
		}
		
		/*
		 * Linearly interpolates between a and b by t.
         * The parameter t is clamped to the range [0, 1].
         *When t = 0 returns a. 
         *When t = 1 return b. 
         *When t = 0.5 returns the midpoint of a and b.
		 */ 
        public static lerp(a:number,b:number,t:number) { 
            t = t < 0 ? 0 : t;
            t = t > 1 ? 1 : t;
            return a + (b - a) * t;
        }
        
        /*
         * Clamps a value between a minimum float and maximum float value.
         */ 
        public static clamp(value:number,min:number,max:number) { 
            if(value < min) {
                return min;
            } else if(value > max) {
                return max;
            } else { 
                return value;
            }
        }
        
        /**
         * @区间随机.
         * @_min:包含.
         * @_max:不包含.
         * @_isfloor:默认是true.
         */ 
        public static random(_min:number,_max:number,_isfloor:boolean = true):number { 
            var result = Math.random() * (_max - _min) + _min;
            return _isfloor?Math.floor(result):result;
        }
        
	}
}


        

