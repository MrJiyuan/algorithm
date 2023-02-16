/**
 * @ Author: Chr1s
 * @ Create Time: 2023-02-10 18:31:03
 * @ Modified time: 2023-02-12 18:51:29
 * @ Description:
 */

// 给定一个整数数组nums和一个整数目标值target，请你在该数组中找出 和为目标值target的那两个整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 示例 2：
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// 提示：
// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// 只会存在一个有效答案

function twoSum(nums: number[], target: number): number[] {
    const len = nums.length
    if (2 <= len) {
        let map: Map<number, any> = new Map(); // map是哈希表结构，使用map取数据会比双重循环更快(该map的第二个泛型不可以是number，因为map.get方法会报错,第一次会存入undefined)
        for (let i = 0; i < len; i++) {
            const current = nums[i];           // 为当前的数添加指针
            const diff = target - current;     // 目标值-当前值=diff作为要寻找的差值
            if (map.has(diff)) {               // 若差值存在
                return [i, map.get(diff)];     // 返回当前索引和差值的索引(map.get会返回索引)
            }
            map.set(current, i)                // 存储 当前值和当前值的索引
        }
    }
    return [];                                 // 若都不符合条件,直接返回空数组
};

console.log(twoSum([3, 2, 4], 6));

// 57 / 57 个通过测试用例
// 执行用时: 68 ms
// 内存消耗: 44.7 MB