const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const isPrime = (num) => {
    if (num == 1) {
        return false;
    } else if (num == 2) {
        return true;
    } else {
        if (num % 2 == 0) {
            return false;
        }
        const sqrtRoot = Math.floor(Math.sqrt(num));
        for (let i = 3; i <= sqrtRoot ; i += 2) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}

rl.question('小於目標數字的質數: ', (input) => {

    if (input == 1 || input == 2) {
        console.log('沒有質數');
    } else {// 4 以上的數字
        const primes = [2];

        for (let i = 3 ; i < input ; i += 2) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }

        console.log(primes);
    }
    rl.close();
});