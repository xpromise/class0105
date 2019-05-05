import add from './module1';

import { name, age } from './module2';
import { mul, count } from './module3';

/* eslint-disable */
// 注释包含的代码，会被eslint忽略掉，不检查
console.log(add(6, 6));
console.log(name, age);
console.log(mul(2, 3));
console.log(count(2, 1));
/* eslint-enable */