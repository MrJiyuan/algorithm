/**
 * @ Author: Chr1s
 * @ Create Time: 2022-11-23 07:00:19
 * @ Modified time: 2023-01-13 18:18:27
 * @ Description:
 */

// degree度:节点的子树个数
// 树的度：树的所有节点中最大的度数
// leaf：度为0的节点(叶子结点)
// parent:父节点
// child:子节点
// sibling:兄弟节点
// level:节点的层次
// depth:树的深度
// 路径和路径长度
// 叶子节点的左子树和右子树都是空的

// 二叉树：每个节点最多只有两个子节点的树
// 第i层的最大节点数为：2^(i-1)  i>=1
// 深度为n的二叉树的最大节点总数为：2ⁿ-1  n>=1
// 对任何非空二叉树T，若n0表示叶节点的个数、n2是度为2的非叶子节点个数，那么两者满足关系n0=n2+1

// 完美二叉树(满二叉树)：除了最下层的叶节点外，每层节点都有2个子节点
// 完全二叉树：除最后一层外，其余层的节点数都达到最大个数，且最后一层从左向右的叶节点连续存在，只缺右侧若干节点
// 二叉搜索树：可为空，若不为空，则：
// 1、非空左子树的所有键值<根节点的键值
// 2、非空右子树的所有键值>根节点的键值
// 3、左右子树都是二叉搜索树

// 非平衡树：连续插入数据后，分布的不均匀，就是非平衡树
// 平衡二叉树的查询效率是O(logN),非平衡二叉树的是O(N)

class Node {
    constructor(keys) {
        this.key = keys
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    // 向树中插入一个新的键(对外调用的方法)
    insert(key) {
        // 根据key创建节点
        let newNode = new Node(key)
        // 判断根节点是否有值
        if (this.root == null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    // 传入树中被用来比较的node，和需要插入的新节点newNode进行比较
    insertNode(node, newNode) {
        if (newNode.key < node.key) { // 向左查找
            if (node.left == null) { // 若左子节点为空
                node.left = newNode // 直接让左子节点等于newNode
            } else { // 若左子节点不为空
                this.insertNode(node.left, newNode) // 递归调用insertNode
            }
        } else { // 若大于等于，向右查找并插入
            if (node.right == null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 在树中查找一个键，如果节点存在，则返回true；若不存在，返回false
    search(key) {
        let node = this.node
        while (node != null) {
            if (key < node.key) { // 若要查找的key小于当前节点的key，继续向左查找
                node = node.left
            } else if (key > node.key) {
                node = node.right
            } else {
                return true
            }
        }
        return false
    }

    // 中序遍历所有节点:有左子树就先访问左子树，没有左子树就处理节点本身，然后再访问右子树。循环（递归）这个过程,
    inOrderTraversal() {
        this.inOrderTraversalNode(this.root, handler)
    }
    inOrderTraversalNode(node, handler) {
        if (node != null) {
            // 处理左子树中的节点
            this.inOrderTraversalNode(node.left, handler)
            // 处理节点
            handler(node.key)
            // 处理右子树中的节点
            this.inOrderTraversalNode(node.right, handler)
        }
    }

    // 1、访问根节点 2、先序遍历左子树 3、先序遍历右子树
    // 先序遍历所有节点
    // 先序遍历（根左右 DLR）
    preOrderTraversal() {
        const result = [];
        this.preOrderTraversalNode(this.root, result);
        return result;
    }

    preOrderTraversalNode(node, result) {
        if (node === null) return result;
        result.push(node.key);
        this.preOrderTraversalNode(node.left, result);
        this.preOrderTraversalNode(node.right, result);
    }

    // 后序遍历所有节点
    // 1、后续遍历左子树 2、后序遍历右子树 3、访问根节点
    postOrderTraversal(handler) {
        this.postOrderTraversalNode(this.root, handler)
    }
    // 遍历节点
    // http://chr1s.oss-cn-hangzhou.aliyuncs.com/dataStructure/%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86.png
    postOrderTraversalNode(node, handler) {
        if (node != null) {
            // 处理经过的节点
            handler(node.key)
            // 处理经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)
            // 处理经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 返回树中最小的键值：找到最左边的子树
    min() {
        if (!this.root) return null;
        let node = this.root;
        while (node.left !== null) {
            node = node.left;
        }
        return node.key;
    }

    // 返回树中最大的键值：找到最右边的子树
    max() {
        if (!this.root) return null;
        let node = this.root;
        while (node.right !== null) {
            node = node.right;
        }
        return node.key;
    }

    // 从树中移除某个键
    //       parent
    //     /       \
    // current
    remove(key) {
        // 先查找到我们要删除的节点,如果没有找到，不需要删除
        // 定义变量，保存一些信息
        let current = this.root
        let parent = null;
        let isLeftChild = true
        // 找到要删除的节点：
        while (current.key != key) {
            parent = current
            if (key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }
            // 某种情况：已经找到了最后的节点，依然没有找到==key
            if (current == null) return false
        }
        // 根据对应的情况删除节点：
        // 1) 删除的节点是叶子节点(没有子节点)
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null
            } else if (isLeftChild) {
                parent.left = null
            } else {
                parent.right = null
            }
        }
        // 2) 删除只有一个子节点的节点 
        else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        } else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.right
            }
        }
        // 3) 删除有两个子节点的节点
        // 需要从下面的子节点中找到一个节点，来替换当前的节点，这个节点应该是current节点下面所有节点中最接近current节点的
        // 规律：比current小一点点的节点,一定是current左子树的最大值(前驱);比current大一点点的节点,一定是current右子树的最小值(后继)
        else {
            // 获取后继节点
            var successor = this.getSuccessor(current)
            // 判断是否为根节点
            if (current == this.root) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }
            // 将删除节点的左子树=current.left
            successor.left = current.left
        }


    }
    // 寻找前驱或者后继节点的函数
    getSuccessor(delNode) {
        // 定义变量，存储临时节点
        let successorParent = delNode;
        let successor = delNode.right;
        let current = delNode.right;
        // 寻找节点
        while (current != null) {
            successorParent = successor;
            successor = current;
            current = current.left
        }
        // 如果后继节点不是被删除节点的右节点
        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }

        return successor; // 后继
    }
}













// method:test
let BST = new BinarySearchTree();
BST.insert(11)
BST.insert(7)
BST.insert(15)
BST.insert(5)
BST.insert(3)
BST.insert(9)
BST.insert(8)
BST.insert(10)
BST.insert(13)
console.log(BST);

// 遍历测试
let preResultString = '';
BST.preOrderTraversal(key => { resultString += key + '' }) // 整合遍历中的所有key
console.log(resultString);








