/**
 * @ Author: Chr1s
 * @ Create Time: 2022-11-02 04:00:19
 * @ Modified time: 2022-11-06 19:59:22
 * @ Description:
 */

// 一个节点既有向前连接的引用，也有一个向后连接的引用
// 可以使用一个head和一个tail分别指向头部和尾部的节点
// 每个node由三部分组成：前一个节点的指针prev/保存的元素item/后一个节点的指针next
// 第一个节点的prev是null，最后一个节点的next是null
// 缺点：每次在插入或删除某个节点时，需要处理四个引用，占用内存更大

// head-> Node(previous->item->next) -> Node(previous->item->next<-|tail) ...->null
// previous用于指向上一个节点  tail用于指向末尾的节点
class DoublyLinkedList {
    constructor() {
        // 属性
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

class DoublyNode extends DoublyLinkedList {
    constructor() {
        super();
        this.previous = null;
        this.data = this.data;
        this.next = null;
    }
}

// method:append
DoublyLinkedList.prototype.append = function (data) {
    // 根据data创建节点
    const newNode = new DoublyNode(data);
    // 判断添加的是否是第一个节点
    if (this.length == 0) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        newNode.previous = this.tail; // 新节点的prev指向当前链表末尾tail
        this.tail.next = newNode;     // 当前链表末尾tail的next指向新节点
        this.tail = newNode;          // 当前链表末尾tail指向新节点
    }
    this.length += 1
}

// method:insert
DoublyLinkedList.prototype.insert = function (position, data) {
    if (position < 0 || position > this.length) return false;
    let newNode = new Node(data)
    if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        // 判断position是否为0,为0的话就在旧节点的前面插入新节点
        if (position === 0) {
            this.head.previous = newNode;       // 使旧节点的previous指向新节点
            newNode.next = this.head;           // 使新节点的next指向旧节点
            this.head = newNode;                // 使指向旧节点的head重新指向新节点

        } else if (position === this.length) {  // 往最后加
            newNode.previous = this.tail;       // 新节点的prev指向当前链表末尾tail
            this.tail.next = newNode;           // 当前链表末尾tail的next指向新节点
            this.tail = newNode;                // 当前链表末尾tail指向新节点
        } else {
            let current = this.head
            let i = 0;
            while (i++ < position) {
                current = current.next;         // 另设一个current代表插入位置的后一个node
            }
            newNode.next = current              // 新节点的next指向后位节点
            newNode.previous = current.previous // 新节点的previous指向后位节点的前一个节点
            current.previous.next = newNode     // 后位节点的previous的next指针指向新节点
            current.previous = newNode          // 后位节点的previous指向新节点
        }
    }
    this.length += 1
    return true
}

// method:get
DoublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null;
    let current = this.head
    let i = 0;
    while (i++ < position) {
        current = current.next;
    }
    return current.data;
}

// method:indexOf
DoublyLinkedList.prototype.indexOf = function (data) {
    let current = this.head
    let i = 0;
    while (current) {
        if (current.data == data) {
            return i
        }
        current = current.next
        i += 1
    }
    return -1
}

// method:update
DoublyLinkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false;
    let current = this.head
    let i = 0;
    while (i++ < position) {
        current = current.next
    }
    // 修改找到的节点信息
    current.data = newData
    return true
}

// method:removeAt
DoublyLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null;
    let current = this.head
    // 情况1：只有一个节点
    if (this.length == 1) {
        this.head = null
        this.tail = null
    } else {// 情况2：判断删除的是否是第一个节点length>1
        if (position == 0) {
            this.head.next = null
            this.head = this.head.next
        } else if (position == this.length - 1) { // 情况3：删除最后一个节点
            current = this.tail
            this.tail.previous.next = null
            this.tail = this.tail.previous
        } else {  // 情况4：删除中间的某个节点
            let i = 0;
            while (i++ < position) { // 找到要被删除的那个节点
                current = current.next
            }
            current.previous.next = current.next
            current.next.previous = current.previous
        }
    }
    this.length -= 1
    return current.data
}

// method:remove 从列表中移除指定内容的一项
DoublyLinkedList.prototype.remove = function (data) {
    // 根据data获取下标值
    let i = this.indexOf(data)
    // 根据index删除对应位置的节点
    return this.removeAt(i)
}


// method:tostring
DoublyLinkedList.prototype.tostring = function () { return this.backwardString(); }

// method:forwardString 由后向前输出
DoublyLinkedList.prototype.forwardString = function () {
    let current = this.tail
    let resultString = ''
    while (current) {
        resultString += current.data + ''
        current = current.previous
    }
    return resultString
}

// method:backwardString 由前向后输出
DoublyLinkedList.prototype.backwardString = function () {
    // 定义变量
    let current = this.head
    let resultString = ''
    // 开始遍历
    while (current) {
        resultString += current.data + ''
        current = current.next
    }
    return resultString
}


