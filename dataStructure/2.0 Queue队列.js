/**
 * @ Author: Chr1s
 * @ Create Time: 2022-09-26 15:55:07
 * @ Modified time: 2022-09-26 21:48:55
 * @ Description:
 */

class Queue {
    constructor() {
        this.list = [];
        // 后端添加元素
        Queue.prototype.enqueue = (e) => { this.list.push(e) }
        // 删除前端元素
        Queue.prototype.dequeue = () => { return this.list.shift() }
        // 查看前端元素
        Queue.prototype.front = () => { return this.list[0] }
        // 查看队列是否为空
        Queue.prototype.isEmpty = () => { return this.list.length == 0 }
        // 查看元素个数
        Queue.prototype.size = () => { return this.list.length }
        // toString方法
        Queue.prototype.toString = () => {
            let result = ''
            this.list.forEach(element => {
                result += element + ''
            });
            return result
        }
    }
}
// 击鼓传花，传入参与者名单与一个数num，开启队列循环，每第num个被循环到的前端参与者被淘汰，直至淘汰至最后一人
function passGame(nameList, num) {
    var queue = new Queue();
    // 所有人依次加入遍历 
    nameList.forEach(x => { queue.enqueue(x) })
    while (queue.size() > 1) {
        // 开始数数，不是num的时候，重新加入队列末尾
        for (let i = 0; i < num - 1; i++) {
            // num数字之前的人重新放入到队列的末尾
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue() // 是num的时候，从队列中删除
        console.log('当前队列：' + queue);
    }
    console.log('最后剩下的人：' + queue.front() + '，他的下标是：' + nameList.indexOf(queue.front()));
}
passGame(['lyy', 'hxy', 'shy', 'zhq'], 7)