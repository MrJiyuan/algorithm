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

    }
}