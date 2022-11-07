/**
 * @ Author: Chr1s
 * @ Create Time: 2022-11-07 23:25:45
 * @ Modified time: 2022-11-08 00:20:26
 * @ Description:
 */

//  集合通常是由一组无序的、不能重复的元素构成。
//  数学中常指的集合中的元素是可以重复的，但是计算机中集合的元素不能重复。
//  集合是特殊的数组。
//  特殊之处在于里面的元素没有顺序，也不能重复。
//  没有顺序意味着不能通过下标值进行访问，不能重复意味着相同的对象在集合中只会存在一份。

// 集合结构的封装
class Set {
    constructor() {
        this.items = {};
    }

    // method:has(value) 判断集合中是否存在 value 值，存在返回 true，否则返回 false
    has(value) {
        return this.items.hasOwnProperty(value);
    }

    // method:add(value) 往集合中添加 value
    add(value) {
        if (this.has(value)) return false;
        this.items[value] = value;
        return true;
    }

    // method:remove(value) 删除集合中指定的 value
    remove(value) {
        // 如果集合不存在该 value，返回 false
        if (!this.has(value)) return false;
        delete this.items[value];
    }

    // method:clear() 清空集合中所有 value
    clear() {
        this.items = {};
    }

    // method:size() 获取集合中的 value 个数
    size() {
        return Object.keys(this.items).length;
    }

    // method:values() 获取集合中所有的 value
    values() {
        return Object.keys(this.items);
    }
}

// method:test
const set = new Set();

// add() 测试
set.add("abc");
set.add("abc");
set.add("123");
set.add("zxc");
console.log(set); //--> {items: {123: "123", abc: "abc", zxc: "zxc"}}

// has() 测试
console.log(set.has("123")); //--> true
console.log(set.has("456")); //--> false

// remove() 测试
set.remove("abc");
console.log(set); //--> {items: {123: "123", zxc: "zxc"}}

// size() 测试
console.log(set.size()); //--> 2

// values() 测试
console.log(set.values()); //--> ["123", "zxc"]

// clear() 测试
set.clear();
console.log(set.values()); //--> []