// 质数特点：只能被1和自己整除，不能被2~num-1之间的数字整除

// 方法1 低效
function isPrime_low(num) {
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
}
// 方法2 高效
// 一个数n若可以进行因数分解，那么分解时得到的两个数n1、n2,一定是n1=<sqrt(n),n2>=sqrt(n)
// 例: 16分解为2*8,2<sqrt(16),8>sqrt(16),而4*4都是等于sqrt(16)
// 所以只需要遍历到等于sqrt(n)即可
function isPrime_high(num) {
    // 获取num的平方根(开平方后取整)
    const temp = parseInt(Math.sqrt(num))
    for (let i = 2; i <= temp; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
}

// 2 3 5 7 11 13 17 19 23 29 31 37
console.log(parseInt(Math.sqrt(17)));
console.log(isPrime_high(14));