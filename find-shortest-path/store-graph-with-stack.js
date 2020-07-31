const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let startPoint = null;
let destination = null;
let distance = null;
let nextIdx = 0;
let lastPathOfEachPoint = null;
let pathsOfEachPoint = null;
let initialized = false;

rl.on('line', (input) => {
    const tokens = input.split(' ');
    if (tokens.length == 1 
        && tokens[0] == 'ok') {
        // console.log(`stop program startPoint.length = ${startPoint.length}`);
        for (let i = 0 ; i < startPoint.length ; i ++) {
            let str = ' ';
            if (lastPathOfEachPoint[i] != undefined) {
                str = `${lastPathOfEachPoint[i]}`;
            }
            console.log(`${startPoint[i]} ${destination[i]} ${distance[i]} ${str} ${pathsOfEachPoint[i]}`);
        }
        process.exit();
    } else if (tokens.length == 2 
        && initialized == false) {
        const numbers = tokens.map(token => parseInt(token));
        if (numbers.every(number => !isNaN(number))
            && numbers[1] <= numbers[0]*(numbers[0] - 1)/2) {
                // console.log(`points : ${numbers[0]} routes : ${numbers[1]}`);
                startPoint = new Array(numbers[1]);
                destination = new Array(numbers[1]);
                distance = new Array(numbers[1]);
                lastPathOfEachPoint = new Array(numbers[0]);
                lastPathOfEachPoint = lastPathOfEachPoint.map(() => -1);
                pathsOfEachPoint = new Array(numbers[1]);
                pathsOfEachPoint = pathsOfEachPoint.map(() => -1);
                initialized = true;
        } else {
            console.log('invalid input');
            process.exit();
        }
    } else if ( tokens.length == 3
                && initialized == true ) {
        const numbers = tokens.map(token => parseInt(token));
        if (numbers.every(string => !isNaN(string))
            && numbers[0] <= lastPathOfEachPoint.length
            && numbers[1] <= lastPathOfEachPoint.length ) {
            startPoint[nextIdx] = numbers[0];
            destination[nextIdx] = numbers[1];
            distance[nextIdx] = numbers[2];
            
            if (lastPathOfEachPoint[numbers[0] - 1] >= 0) {
                pathsOfEachPoint[nextIdx] = lastPathOfEachPoint[numbers[0] - 1];
            }
            lastPathOfEachPoint[numbers[0] - 1] = nextIdx;
            nextIdx ++;
        } else {
            console.log('invalid input');
            process.exit();
        }
    } else {
        console.log('invalid input');
        process.exit();
    }
});