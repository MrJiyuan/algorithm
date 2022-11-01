/**
 * @ Author: Chr1s
 * @ Create Time: 2022-10-31 03:19:19
 * @ Modified time: 2022-11-02 03:54:52
 * @ Description:
 */

function LinkedList() {
    // 内部类：节点类
    function Node(data, next) {
        this.data = data
        this.next = null
    }
    this.head = null
    this.length = 0 // 记录链表的长度

    // method:append 向链表的末尾追加节点(找到next指向null的节点(末尾)，然后添加新节点，然后让前一个节点的next指向新加入的节点)
    LinkedList.prototype.append = function (data) {
        // 创建一个新节点
        var newNode = new Node(data)
        // 判断添加的是否是第一个节点
        if (this.length == 0) {
            this.head = newNode
        } else {
            // 使用current遍历链表上的节点直到遍历到最后一个(next===null)
            var current = this.head
            while (current.next) {
                current = current.next
            }
            // 让最后一个节点的next指向新节点
            current.next = newNode
        }
        this.length += 1;
    };

    // method:toString
    LinkedList.prototype.toString = function () {
        // 定义变量
        var current = this.head
        var listSting = ''
        while (current) {
            listSting += current.data + ''
            current = current.next
        }
        return ''
    }

    // method:insert 在指定位置插入新节点
    LinkedList.prototype.insert = function (position, data) {
        // 对position进行越界判断
        if (position < 0 || position > this.length) return false
        var newNode = new Node(data)
        if (position == 0) { // 插入position=0的位置
            newNode.next = this.head
            this.head = newNode
        } else {
            var previous = null     // 指定位置前的节点设为previous
            var current = this.head // 指定位置上的节点设为current
            var i = 0
            while (i++ < position) {// 遍历到指定位置
                previous = current
                current = current.next
            }
            newNode.next = current // 让newNode的next指向原本在这个位置的node
            previous.next = newNode// 让原本这个位置前的node的next指向newNode
        }
        // length+1
        this.length += 1
        return true
    }

    // method:update 修改指定位置的元素
    LinkedList.prototype.update = function (position, newData) {
        // 对position进行越界判断
        if (position < 0 || position >= this.length) return false
        var current = this.head
        var i = 0
        while (i++ < position) {
            current = current.next
        }
        current.data = newData
        return true
    }

    // method:get 获取指定索引的元素
    LinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) return null
        var current = this.head
        var i = 0
        while (i++ < position) {
            current = current.next
        }
        return current.data
    }

    // method:indexOf 返回元素在列表中的索引，若没有该元素则返回-1
    LinkedList.prototype.indexOf = function (element) {
        var current = this.head
        var i = 0
        while (i++ < this.length) {
            if (current.data === element) {
                return i
            }
            current = current.next
        }
        return -1
    }

    // method:removeAt 从列表的特定位置移除一项
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return false
        var current = this.head
        var previous = null // 指定位置的前一个元素
        // 1 若删除的是第一个元素
        if (position === 0) {
            this.head = this.head.next // 让head直接指向后一个节点
        } else {// 2 若删除的是中间的元素
            var i = 0
            while (i++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        // 长度减一
        this.length -= 1
        return current.data
    }

    // method:remove   从列表中移除一项
    LinkedList.prototype.remove = function (element) {
        return this.removeAt(
            this.indexOf(element)
        )
    }

}
// method:testToString
var list = new LinkedList()
// 1.测试append
list.append('abc')
list.append('def')
// LinkedList {
//     head: Node {
//         data: 'abc',
//         next: Node { data: 'def', next: null }
//     },
//     length: 2
// }

// 2.测试insert
// list.insert(0, 'aaa')
// list.insert(3, 'bbb')
// list.insert(5, 'ccc')

// 3.测试get
// console.log(list.get(5));

// 4.测试indexOf
// console.log(list.indexOf('ccc'));


console.log(list.removeAt(1));
console.log(list);

