/**
 * @ Author: Chr1s
 * @ Create Time: 2022-10-31 03:19:19
 * @ Modified time: 2022-11-02 03:59:50
 * @ Description:
 */

// 每个元素不再只是一个数据，还包含优先级。
// 在添加元素过程中，根据优先级放入到正确位置。
class QueueElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }

}
class Queue {
    constructor() {
        this.items = [];
        // 后端添加元素
        Queue.prototype.enqueue = (e) => { this.items.push(e) }
        // 删除前端元素
        Queue.prototype.dequeue = () => { return this.items.shift() }
        // 查看前端元素
        Queue.prototype.front = () => { return this.items[0] }
        // 查看队列是否为空
        Queue.prototype.isEmpty = () => { return this.items.length == 0 }
        // 查看元素个数
        Queue.prototype.size = () => { return this.items.length }
        // toString方法
        Queue.prototype.toString = () => {
            let result = ''
            this.items.forEach(element => {
                result += element + ''
            });
            return result
        }
    }
}
// 优先队列类（继承 Queue 类）
class PriorityQueue extends Queue {
    constructor() {
        super();
    }

    // enqueue(element, priority) 入队，将元素按优先级加入到队列中
    // 重写 enqueue()
    enqueue(element, priority) {
        // 根据传入的元素，创建 QueueElement 对象
        const queueElement = new QueueElement(element, priority);

        // 判断队列是否为空
        if (this.isEmpty()) {
            // 如果为空，不用判断优先级，直接添加
            this.items.push(queueElement);
        } else {
            // 定义一个变量记录是否成功添加了新元素
            let added = false;

            for (let i = 0; i < this.items.length; i++) {
                // 让新插入的元素进行优先级比较，priority 值越小，优先级越大
                if (queueElement.priority < this.items[i].priority) {
                    // 在指定的位置插入元素
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }

            // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
            if (!added) {
                this.items.push(queueElement);
            }
        }
    }

    // dequeue() 出队，从队列中删除前端元素，返回删除的元素
    // 继承 Queue 类的 dequeue()
    dequeue() {
        return super.dequeue();
    }

    // front() 查看队列的前端元素
    // 继承 Queue 类的 front()
    front() {
        return super.front();
    }

    // isEmpty() 查看队列是否为空
    // 继承 Queue 类的 isEmpty()
    isEmpty() {
        return super.isEmpty();
    }

    // size() 查看队列中元素的个数
    // 继承 Queue 类的 size()
    size() {
        return super.size();
    }

    // toString() 将队列中元素以字符串形式返回
    // 重写 toString()
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item.element + "-" + item.priority + " ";
        }
        return result;
    }
}

const priorityQueue = new PriorityQueue();

// 入队 enqueue() 测试
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 15);
priorityQueue.enqueue("C", 11);
priorityQueue.enqueue("D", 20);
priorityQueue.enqueue("E", 18);
console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "A", priority: 10}
// QueueElement {element: "C", priority: 11}
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// 出队 dequeue() 测试
priorityQueue.dequeue();
priorityQueue.dequeue();
console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// isEmpty() 测试
console.log(priorityQueue.isEmpty()); //--> false

// size() 测试
console.log(priorityQueue.size()); //--> 3

// toString() 测试
console.log(priorityQueue.toString()); //--> B-15 E-18 D-20