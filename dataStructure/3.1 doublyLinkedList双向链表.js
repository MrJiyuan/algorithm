/**
 * @ Author: Chr1s
 * @ Create Time: 2022-11-02 04:00:19
 * @ Modified time: 2022-11-03 02:11:18
 * @ Description:
 */

// 一个节点既有向前连接的引用，也有一个向后连接的引用
// 可以使用一个head和一个tail分别指向头部和尾部的节点
// 每个node由三部分组成：前一个节点的指针prev/保存的元素item/后一个节点的指针next
// 第一个节点的prev是null，最后一个节点的next是null
// 缺点：每次在插入或删除某个节点时，需要处理四个引用，占用内存更大





