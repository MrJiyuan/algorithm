// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// 提示：
// 1 <= s.length <= 104
// s 仅由括号 '()[]{}' 组成

// 后进先出
function isValid(s: string): boolean {
    let Stack: string[] = [];
    const ParenthesesDict: Record<string, string> = {
        '(': ')',
        '[': ']',
        '{': '}',
    }
    for (let i = 0; i < s.length; i++) {
        const element: string = s[i];
        // 遍历到的括号是否与某个key吻合
        if (ParenthesesDict[element]) {
            // 吻合就将对应的反括号入栈
            Stack.unshift(ParenthesesDict[element])
        } else {
            // 不吻合就把当前括号与栈顶比对，相同则出栈
            if (element === Stack[0]) {
                Stack.shift()
            } else {
                // 不相同则括号错误
                return false
            }
        }
    }
    return Stack.length == 0
}
// 执行用时：60 ms, 在所有 TypeScript 提交中击败了95.27 % 的用户
// 内存消耗：42.2 MB, 在所有 TypeScript 提交中击败了98.99 % 的用户