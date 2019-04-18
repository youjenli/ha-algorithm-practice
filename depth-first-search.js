//深度優先搜尋演算法練習

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const numbers = [1,1,1,1,1,1,1,1,1,1];

rl.question('這個數是由幾位不重複數值所組成?', (input) => {
    if (input <= numbers.length) {
        const arrangement = new Array(input);
        let arrangementCount = 0;

        function dfs(digit){
            if (digit == input) {
                arrangementCount += 1;
                for (let j = 0 ; j < arrangement.length ; j ++){
                    process.stdout.write(`${arrangement[j]}`);
                }
                process.stdout.write('\n');
                return;
            }
            for (let i = 0 ; i <= numbers.length ; i ++) {
                if (numbers[i] == 1) {
                    numbers[i] = 0;
                    arrangement[digit] = i;
                    dfs(digit + 1);
                    numbers[i] = 1;//重要的一步
                }
            }
        }

        dfs(0);
        console.log(`共計${arrangementCount}種組合。`);
    } else {
        console.log('數值太多，請再重新執行一次。');
    }
    rl.close();
});