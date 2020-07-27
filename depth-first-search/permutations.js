
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const numbers = [1,1,1,1,1,1,1,1,1,1];

rl.question('這個數是由幾位不重複數值所組成?', (input) => {
    if (input <= numbers.length) {
        const arrangement = new Array(input);
        let permutations = 0;//組合的數目

        function dfs(digit/* 要在 arrangement 陣列排列的位子 */){
            if (digit == input) {
                permutations += 1;
                for (let j = 0 ; j < arrangement.length ; j ++){
                    process.stdout.write(`${arrangement[j]}`);
                }
                process.stdout.write('\n');
                return;
            }
            /* 在 dfs 最外層的遞迴時，這層迴圈額外負責決定排列的第一位數 */
            for (let i = 0 ; i <= numbers.length ; i ++) {
                if (numbers[i] == 1) {
                    numbers[i] = 0;
                    arrangement[digit] = i;
                    //將目前找到可用的數字填入排序結果

                    dfs(digit + 1);
                    //然後再用相同函式排下一位數

                    numbers[i] = 1;//將佔用數字的狀態復元。
                }
            }
        }

        dfs(0);
        console.log(`共計${permutations}種組合。`);
    } else {
        console.log('位數上限不能超過 10');
    }
    rl.close();
});