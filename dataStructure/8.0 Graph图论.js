// 顶点代表事物，边代表两个事物之间的关系
// A---B代表无向   A-->B代表有向
// 一个点的边的数目如果是奇数，就是奇点，是偶数条，就是偶点
// 一个顶点的度是相邻顶点的数量
// 简单路径：顶点的连续序列，如V1 V2 V3 V4 V5
// 回路：回流到相同顶点的路径，如v1 v2 v3 v4 v1
// 无向图：所有的边都没有方向 0->1 1->0
// 有向图：图中的边是有方向的 0->1
// 无权图：边没有权重(优先级)
// 带权图：边有一定的权重(优先级)，如距离，时间，票价
// 领接矩阵：每个节点和一个整数相关联，该整数作为数组的下标值，通常用一个二维数组来表示顶点之间的连接
// 邻接表：由图中每个顶点以及和顶点相邻的顶点列表组成，这个列表可以是数组、链表、哈希表
// 出度：指向别人的数量  入度：指向自己的数量
// 邻接表计算出度比较简单，计算入度非常麻烦，必须构造一个逆邻接表才能计算，但开发过程中入度相对用的比较少
// 广度优先搜索BFS：基于队列，入队列的顶点先被探索
// 深度优先搜索DFS：基于栈或使用递归，通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
// 白色：表示该顶点还没有被访问  灰色：表示该顶点被访问过，但并未被探索过   黑色：表示该顶点被访问过且被完全探索过

class Dictionary {
    constructor() {
        this.items = {};
    }
    // has(key) 判断字典中是否存在某个 key
    has(key) {
        return this.items.hasOwnProperty(key);
    }
    // set(key, value) 在字典中添加键值对
    set(key, value) {
        this.items[key] = value;
    }
    // remove(key) 在字典中删除指定的 key
    remove(key) {
        // 如果集合不存在该 key，返回 false
        if (!this.has(key)) return false;
        delete this.items[key];
    }
    // get(key) 获取指定 key 的 value，如果没有，返回 undefined
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }
    // 获取所有的 key
    keys() {
        return Object.keys(this.items);
    }
    // 获取所有的 value
    values() {
        return Object.values(this.items);
    }
    // size() 获取字典中的键值对个数
    size() {
        return this.keys().length;
    }
    // clear() 清空字典中所有的键值对
    clear() {
        this.items = {};
    }
}

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
class Graph {
    constructor(graph) {
        // 属性：顶点(数组)/边(字典)
        this.vertexes = []; // 顶点
        this.edges = new Dictionary(); // 边
    }
    // method:addVertex
    addVertex(v) {
        this.vertexes.push(v);
        this.edges.set(v, []);
    }
    // method:addEdge
    addEdge(vertex1, vertex2) {
        this.edges.get(vertex1).push(vertex2); // 有向图的话只写这一行
        this.edges.get(vertex2).push(vertex1); // 无向图需要添加双边
    }

    // method:toString
    toString() {
        // 定义字符串，保存最终的结果
        var resultString = ""
        // 遍历所有顶点和顶点对应的边
        for (let i = 0; i < this.vertexes.length; i++) {
            const vertex = this.vertexes[i];
            resultString += vertex + '->'
            let vEdges = this.edges.get(vertex)
            for (let j = 0; j < vEdges.length; j++) {
                const edge = vEdges[j];
                resultString += edge + ' '
            }
            resultString += '\n'
        }
        return resultString
    }
    // 初始化图中所有顶点的颜色为白色
    initializeColor() {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            const element = this.vertexes[i];
            colors[element] = 'white'
        }
        return colors
    }

    // 广度优先搜索BFS
    bfs(initVertex, handler) {
        // 初始化颜色
        let colors = this.initializeColor()
        // 创建队列
        let queue = new Queue()
        // 将顶点加入队列中
        queue.enqueue(initVertex)
        // 循环从队列中取出元素
        while (!queue.isEmpty()) {
            // 从队列中取出一个顶点
            let v = queue.dequeue()
            // 获取和顶点相连的其他顶点
            let vList = this.edges.get(v)
            // 将V的颜色设置成灰色
            colors[v] = 'grey'
            // 遍历所有的顶点，并且加入到队列中
            for (let i = 0; i < vList.length; i++) {
                const element = vList[i];
                if (colors[element] == 'white') {
                    colors[element] = 'grey'
                    queue.enqueue(element)
                }
            }
            // v已经被探测，访问顶点
            handler(v)
            // 将顶点设置为黑色
            colors[v] = 'black'
        }
    }
    // 深度优先搜索DFS
    dfs(initVertex, handler) {
        // 初始化颜色
        let colors = this.initializeColor()
        // 从某个顶点开始依次递归访问
        this.dfsVisit(initV, colors, handler)
    }
    dfsVisit(v, colors, handler) {
        // 将颜色设置为灰色
        colors[v] = 'grey'
        // 处理V顶点
        handler(v)
        // 访问V相连的其他顶点
        let vList = this.edges.get(v)
        for (let i = 0; i < vList.length; i++) {
            const element = vList[i];
            if (colors[e] == 'white') { // 是白色就继续探测
                this.dfsVisit(element, colors, handler) // 递归调用
            }
        }
        // 将V设置为黑色
        colors[v] = 'black'
    }
}

// method:test
const graph = new Graph();
var vertexArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < vertexArray.length; i++) {
    const element = vertexArray[i];
    graph.addVertex(element)
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.edges);
// Dictionary {
//     items: {
//         A: [ 'B', 'C', 'D' ],
//         B: [ 'A', 'E', 'F' ],
//         C: [ 'A', 'D', 'G' ],
//         D: [ 'A', 'C', 'G', 'H' ],
//         E: [ 'B', 'I' ],
//         F: [ 'B' ],
//         G: [ 'C', 'D' ],
//         H: [ 'D' ],
//         I: [ 'E' ]
//     }
// }

// 测试bfs
var bfsResult = ''
graph.bfs(graph.vertexes[0], function (v) {
    bfsResult += v + '';
})
console.log(bfsResult);

// 测试dfs
var dfsResult = ''
graph.dfs(graph.vertexes[0], function (v) {
    dfsResult += v + '';
})
console.log(dfsResult);









