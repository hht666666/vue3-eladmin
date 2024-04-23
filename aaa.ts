//10进制
const a: Number = 1
//16进制
const b: number = 0xf00d
//2进制
const c: number = 0b1010
//8进制
const d: number = 0o744
//不是数字的数字
const e: number = NaN
//无穷大
const f: number = Infinity
//科学计数法
const g: number = 1.23e4

//数组
const arr2: Array<number> = [1, 2, 3, 3.5]
const arr: number[] = [1, 2, 3, 3.5]

// 函数
function add(x: number, y: number): number {
  return x + y
}
//不需要返回值就设置void
function add2(): void {}

//交叉类型
interface use {
  name: string
  age: number
}

interface use1 {
  gender: string
}
//必须满足上面两个类型
const user: use & use1 = {
  name: '张三',
  age: 18,
  gender: '男'
}

//联合类型
let num: number | string
num = 1
num = '1'
