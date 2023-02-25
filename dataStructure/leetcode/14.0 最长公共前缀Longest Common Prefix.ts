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

// sort()头尾比较
function longestCommonPrefix(strs: string[]): string {
    strs = strs.sort();
    let head = strs[0],
        tail = strs[strs.length - 1],
        result = '';
    for (let i = 0; i < head.length; i++) {
        if (head[i] === tail[i]) result += head[i];
        else break;
    }
    return result
};

// 执行用时：56 ms, 在所有 TypeScript 提交中击败了99.20%的用户
// 内存消耗：43.7 MB, 在所有 TypeScript 提交中击败了25.76%的用户

var strs = ["flower", "flow", "flight", "flrplane", "flbus", "flcfffffffity", "flairpods", "flabc"]

console.log(longestCommonPrefix(strs));


// startsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。
// 参数:
// str.startsWith(searchString [, position]);
// searchString
// 要搜索的子字符串。
// position
// 在 str 中搜索 searchString 的开始位置，默认值为 0，也就是真正的字符串开头处。

// 示例:
// var str = "To be, or not to be, that is the question.";
// alert(str.startsWith("To be"));         // true
// alert(str.startsWith("not to be"));     // false
// alert(str.startsWith("not to be", 10)); // true

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