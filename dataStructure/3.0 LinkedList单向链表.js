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

    // method:insert
    LinkedList.prototype.insert = function (position, data) {
        // 对position进行越界判断
        if (position < 0 && position > this.length) return false
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
}
// method:testToString
var list = new LinkedList()
list.append('abc')
list.append('def')
list.insert(1, 'ghi')
console.log(list);
// LinkedList {
//     head: Node {
//         data: 'abc',
//         next: Node { data: 'def', next: null }
//     },
//     length: 2
// }
