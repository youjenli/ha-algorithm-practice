const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let availableNumbers = [1, 1, 1, 1, 1];

rl.question('這個數是由幾位不重複數值所組成?', (input) => { 
    if ( input <= availableNumbers.length ) {
        let permutations = 0;
        const arrangement = new Array(input);

        const dfs = (digit) => {
            if (digit == input) {
                permutations += 1;
                console.log(`${arrangement}`);
                return;
            }
            for (let i = 0 ; i < availableNumbers.length ; i ++) {
                if (availableNumbers[i] == 1) {
                    availableNumbers[i] = 0;
                    arrangement[digit] = i + 1;

                    dfs(digit + 1);

                    availableNumbers[i] = 1;
                }
            }
        }

        dfs(0);
        console.log(`共有 ${permutations} 種組合。`);
    } else {
        console.log(`位數上限不能超過 ${availableNumbers.length}`);
    }
    rl.close();
})