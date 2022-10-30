/**
 * @ Author: Chr1s
 * @ Create Time: 2022-09-26 14:07:39
 * @ Modified time: 2022-09-26 15:03:15
 * @ Description:
 */

// 栈的封装
class Stack {
    constructor() {
        // 栈中的属性
        this.items = []

        // 压栈
        Stack.prototype.push = (e) => { this.items.push(e) }
        // 取栈
        Stack.prototype.pop = () => { return this.items.pop() }
        // 查栈顶
        Stack.prototype.peek = () => { return this.items[this.items.length - 1] }
        // 判空
        Stack.prototype.isEmpty = () => { return this.items.length == 0 }
        // 判长
        Stack.prototype.size = () => { return this.items.length }
        // toString()
        Stack.prototype.toString = () => {
            let result = ''
            this.items.forEach(element => {
                result += element + ''
            });
            return result
        }
    }
}

// 十进制转二进制
function dec2bin(decNum) {
    let stackUse = new Stack()
    while (decNum > 0) {
        // 把每次的余数压入栈中
        stackUse.push(decNum % 2)
        // 获取整除后的数字，作为下一次运行的数字
        decNum = Math.floor(decNum / 2)
    }
    // 从栈中取出0和1
    let binaryString = ''
    while (!stackUse.isEmpty()) {
        binaryString += stackUse.pop()
    }
    return binaryString
}
console.log(dec2bin(100));