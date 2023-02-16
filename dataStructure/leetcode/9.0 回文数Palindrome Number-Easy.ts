// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
// 例如，121 是回文，而 123 不是。

// 示例1：
// 输入：x = 121
// 输出：true

// 示例2：
// 输入：x = -121
// 输出：false
// 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

// 示例3：
// 输入：x = 10
// 输出：false
// 解释：从右向左读, 为 01 。因此它不是一个回文数。

// 提示：
// -231 <= x <= 231 - 1


// 双指针解法 160ms 50.4 MB
function isPalindrome(x: number): boolean {
    if (x < 0) return false;
    const string = x.toString();
    let head = 0, tail = string.length - 1;
    while (head < tail) {
        if (string[head] !== string[tail]) return false;
        ++head, --tail;
    }
    return true;
};


// 字符串反转比较
function isPalindrome_2(x: number): boolean {
    return x === +x.toString().split('').reverse().join('') // 140 ms 50.6 MB
    // return String(x) === String(x).split("").reverse().join(''); // 164ms 50.7 MB
}


// 进阶：你能不将整数转为字符串来解决这个问题吗？

function isPalindrome_3(x: number): boolean {
    // 当x为负数或者为10的倍数时，不可能为回文数
    if (x < 0 || (x != 0 && x % 10 == 0)) return false
    let reverse: number = 0;
    // 当目标数字的前半段小于反转数时循环终止
    while (x > reverse) {
        // 利用除法和求余取得反转数reverse,原理：例如一个三位数abc，x第一次%10就是把个位数c拿出来，然后进入下次循环的时候把C*10放在十位数，再把通过%10求余把b提出来，相加得到bc
        reverse = Math.floor(reverse * 10 + x % 10);
        // 因为c已被取出，所以x同样的也要去除个位数
        x = Math.floor(x /= 10);
    }
    // 当数字长度为偶数时，前半段x==反转数reverse的时候即为回文数；当数字长度为奇数时，通过r/10去除处于中位的数字再进行比较
    return x == reverse || x == Math.floor(reverse / 10);
}


console.log(isPalindrome_3(616)); // true

