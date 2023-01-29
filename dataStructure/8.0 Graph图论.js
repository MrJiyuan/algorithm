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
}



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











