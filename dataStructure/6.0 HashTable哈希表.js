// 基于数组实现，但比数组操作更快，时间复杂度O(1)
// 插入和删除速度非常快
// 无序，不可重复
// 冲突：要存入的两个元素，哈希化后的下标值相同
// 解决冲突的方法：链地址法、开放地址法

// 链地址法:如果冲突，就在相同哈希地址新增bucket，里面是一个数组或一个链表
// 开放地址法：寻找空白单元，找到后结束查找
// 1、线性探测(步长=x+1)
// 2、二次探测(步长=x²)
// 3、再哈希法(步长=constant质数-(key关键字的大小 % constant质数)质数应小于数组的容量)

// 装填因子=总数据项/哈希表长度
// 优秀的哈希表：分布均匀，计算快速

// 设计哈希函数
// 将大的数字hashCode压缩到数组范围之内
// 将字符串转换成比较大的数字hashCode

class HashTable {
    constructor() {
        this.storage = []   // 总数组
        this.count = 0      // 记录元素数量
        this.limit = 7       // 记录数组总长度(质数)
        // loadFactor(装填因子) = count / limit, loadFactor > 0.75 扩容 loadFactor < 0.25 缩容
        // 扩容时，所有的数据项一定要同时进行修改(重新调用哈希函数，来获取到不同的位置)
        // ↑比如 在length=8的哈希表中,hashCode=12的数据项index=5,但当length=16时,index=12
    }
    hashFunc(str, size) {
        // 定义hashCode的变量
        let hashCode = 0

        // 霍纳算法,计算hashCode的值
        for (let i = 0; i < str.length; i++) {
            // 使用质数37
            hashCode = 37 * hashCode + str.charCodeAt(i)// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
        }

        // 取余操作
        let index = hashCode % size
        return index
    }
    // 插入&修改
    put(key, value) {
        // 根据KEY获取索引值：将数据插入到对应的位置
        let index = this.hashFunc(key, this.limit)
        // 根据索引值取出bucket
        let bucket = this.storage[index]
        // 如果bucket不存在，则创建桶，并且防止在索引的位置
        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }
        // 判断新增还是修改原来的值，如果已经有值，则修改，如果没有，则执行后续的添加操作
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value
                return
            }
        }
        // 新增操作
        bucket.push([key, value])
        this.count += 1

        // 判断是否需要扩容操作
        if (this.count > this.limit * 0.75) {
            const newSize = this.limit * 2
            const newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }

    }
    // 获取
    get(key) {
        // 根据key获取对应的index
        let index = this.hashFunc(key, this.limit)
        // 根据index获取对应的bucket
        let bucket = this.storage[index]
        // 判断bucket是否为null，如果为null，直接返回null
        if (bucket == null) {
            return null
        }

        // 线性查找bucket中每一个key是否等于传入的key，如果等于，那么直接返回对应的value
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i];
            if (tuple[0] == key) {
                return tuple[1]
            }
        }
        // 遍历完后，依然没有找到对应的key，直接return null即可
        return null
    }

    remove(key) {
        // 根据key获取对应的index
        let index = this.hashFunc(key, this.limit)
        // 根据index获取bucket
        let bucket = this.storage[index]
        // 判断bucket是否存在，如果不存在，那么直接返回null
        if (bucket == null) {
            return null
        }
        // 线性查找bucket，寻找对应的数据，并且删除
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i];
            if (tuple[0] == key) {
                bucket.splice(i, 1)
                this.count--
                // 缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    const newSize = Math.floor(this.limit / 2)
                    const newPrime = this.getPrime(newSize)
                    this.resize(newPrime)
                }
                return tuple[1]
            }
        }
        // 依然没有找到，返回null
        return null
    }

    isEmpty() {
        return this.count == 0
    }

    size() {
        return this.count
    }
    // 哈希表扩容
    resize(newLimit) {
        // 令一个变量oldStorages指向原来的数组
        let oldStorage = this.storages
        // 重置所有的属性
        this.storage = []
        this.count = 0
        this.limit = newLimit
        // 遍历oldStorages中所有的bucket
        for (let i = 0; i < oldStorage.length; i++) {
            const bucket = oldStorage[i];
            // 判断bucket是否为null
            if (bucket == null) {
                continue
            }
            // bucket中有数据，那么就去除数据，重新插入
            for (let j = 0; j < bucket.length; j++) {
                const element = bucket[j];
                this.put(tuple[0], tuple[1])
            }
        }
    }

    // 判断是否为质数
    isPrime(num) {
        // 获取num的平方根(开平方后取整)
        const temp = parseInt(Math.sqrt(num))
        for (let i = 2; i <= temp; i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }

    // 转化为质数
    getPrime(num) {
        while (!this.isPrime(num)) {
            num++
        }
        return num
    }
}

// test:put
var ht = new HashTable();
ht.put('abc', '123')
ht.put('cba', '321')
ht.put('nba', '521')
ht.put('mba', '520')
console.log(ht.get('abc')); // 123

ht.put('abc', '111')
console.log(ht.get('abc')); // 111

// test:remove
ht.remove('abc')
console.log(ht.get('abc')); // null

console.log(ht);
// HashTable {
//     storage: [
//       <1 empty item>,
//       [ [Array] ],
//       <1 empty item>,
//       [ [Array] ],
//       [],
//       [ [Array] ]
//     ],
//     count: 3,
//     limit: 7
// }