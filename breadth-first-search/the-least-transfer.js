const process = require('process');
const map = [
    [0, 1, 1, -1, -1],
    [1, 0, 1, 1, -1],
    [1, 1, 0, 1, 1],
    [-1, 1, 1, 0, 1],
    [-1, -1, 1, 1, 0]
]

const pending = [];
const transferTimes = [];
const status = [false, false, false, false, false];

/*
  查詢抵達目的地的步數，含最後一步。
*/
const destination = 4;
pending.push(0);
transferTimes.push(0);
status[0] = true;
let head = 0, tail = 0;

do {
    const point = pending[head];
    console.log(`new iteration for point ${point}`);
    if (point == destination) {
        //console.log(`The path to destination ${destination + 1} requires the least transfer times ${transferTimes[head]}. head is at ${head}`);
        process.exit();
    } else {
        for ( let i = 0 ; i < map[0].length ; i ++ ) {
            if ( map[point][i] > 0 &&
                status[i] == false ) {
                pending.push(i);
                tail ++;
                transferTimes.push(transferTimes[head] + 1);
                status[i] = true;
                //console.log(`i ${i} p ${pending} pending ${pending.slice(head, tail)} head ${head} tail ${tail} trans ${transferTimes}`);
            }
        }
        head++
    }
} while (tail >= head);
console.log(`Can not reach the destination from the starting point.`);
