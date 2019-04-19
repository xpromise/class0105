/*
  Buffer用来存储二进制数据

  里面元素大小为1字节
    1 byte 字节 = 8 bit 位
    1 kb = 1024 byte
    1 mb = 1024 kb
    1 gb = 1024 mb
    1 tb = 1024 gb

  英文 --- 1字节
  中文 --- 3字节

  使用：
    创建Buffer
      Buffer.alloc(10)  创建buffer，安全。里面的数据都是00，都是空。性能稍差
      Buffer.allocUnsafe(10) 创建buffer，不安全。里面可能包含敏感数据，有值。性能最好
      Buffer.from(string)
 */

// 这个方法被废弃（在未来的nodejs版本这个方法不能使用）了
// const buffer = new Buffer(10);
// console.log(buffer);

// const buffer = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// const buffer = Buffer.allocUnsafe(10);  // <Buffer 30 6c ee 67 9b 02 00 00 00 01>
// const buffer = Buffer.from('hello atguigu'); // <Buffer 68 65 6c 6c 6f 20 61 74 67 75 69 67 75>
const buffer = Buffer.from('尚硅谷'); // <Buffer e5 b0 9a e7 a1 85 e8 b0 b7>
console.log(buffer);
console.log(buffer.toString());  // 尚硅谷 能将buffer数据转换为字符串





