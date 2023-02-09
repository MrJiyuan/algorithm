class ArrayList {
    constructor() {
        this.array = [];
    }

    insert(item) { this.array.push(item); };

    toString() { return this.array.join('-'); };

    // 交换两个位置的顺序
    swap(currentIndex, nextIndex) {
        // const temp = this.array[currentIndex]
        // this.array[currentIndex] = this.array[nextIndex];
        // this.array[nextIndex] = temp
        [this.array[currentIndex], this.array[nextIndex]] = [this.array[nextIndex], this.array[currentIndex]]
    }

    // 冒泡排序 O(N²)   比较次数N*(N-1)/2  交换次数N*(N-1)/4
    bubbleSort() {
        for (let i = this.array.length - 1; i >= 0; i--) { // i: 5    |4   |3  |2 |1
            for (let j = 0; j < i; j++) {                  // j: 01234|0123|012|01|0
                const current = this.array[j];
                const next = this.array[j + 1]
                if (current > next) { // 当前的大于后一位
                    // 交换两个数据
                    // this.array[j] = next;
                    // this.array[j + 1] = current;
                    this.swap(j, j + 1)
                }
            }
        }

    }
    // 选择排序 O(N)   比较次数O(N²)   交换次数N-1
    selectionSort() {
        let length = this.array.length
        // 外层循环：从0开始取数据
        for (let j = 0; j < length - 1; j++) {
            // 内层循环：从j+1位置开始，找到最小值
            let min = j // 最小值将被置入的数组下标
            for (let i = min + 1; i < length; i++) {
                if (this.array[min] > this.array[i]) {
                    min = i
                }
            }
            this.swap(min, j)
        }
    }
    // 插入排序

    // 希尔排序

    // 快速排序
    quickSort = arr => {
        if (arr.length <= 1) {
            return arr;
        }
        //取基准点
        const midIndex = Math.floor(arr.length / 2);
        //取基准点的值，splice(index,1) 则返回的是含有被删除的元素的数组。
        const valArr = arr.splice(midIndex, 1);
        const midIndexVal = valArr[0];
        const left = []; //存放比基准点小的数组
        const right = []; //存放比基准点大的数组
        //遍历数组，进行判断分配
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < midIndexVal) {
                left.push(arr[i]); //比基准点小的放在左边数组
            } else {
                right.push(arr[i]); //比基准点大的放在右边数组
            }
        }
        //递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
        return this.quickSort(left).concat(midIndexVal, this.quickSort(right));
    };

}

var list = new ArrayList();
list.insert(66);
list.insert(88);
list.insert(16);
list.insert(36);
list.insert(57);
list.insert(19);
console.log(list);

console.log(list.quickSort(list.array));