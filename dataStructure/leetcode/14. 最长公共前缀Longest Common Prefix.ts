// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1：
// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

// 示例 2：
// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。

// 提示：
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] 仅由小写英文字母组成

// function longestCommonPrefix(strs: string[]): string {
//     let result: string = '';
//     result += strs.sort();
//     return result

// };
function longestCommonPrefix(strs: string[]): string {
    strs = strs.sort();
    let head = strs[0], tail = strs[strs.length - 1];
    let result = '';
    for (let i = 0; i < head.length; i++) {
        if (head[i] === tail[i]) result += head[i];
        else break;
    }
    return result
};

function main(value: string[]): string {
    let res = '';
    for (const iterator of value[0]) {
        const element = `${res}${iterator}`;
        if (value.every(v => v.startsWith(element))) {
            res = element;
        } else {
            break;
        }
    }
    return res;
}

var strs = ["flower", "flow", "flight", "flrplane", "flbus", "flcfffffffity", "flairpods", "flabc"]

console.log(longestCommonPrefix(strs));
