const process = require('process');

const linksBetweenPoints = [
    [0, 1, 1, -1, 1],//1
    [1, 0, -1, 1, -1],//2
    [1, -1, 0, -1, 1],//3
    [-1, 1, -1, 0, -1],//4
    [1, -1, 1, -1, 0]//5
]

let steps = 0;
const status = [];
for ( let i = 0 ; i < linksBetweenPoints[0].length ; i ++) {
    status[i] = [];
    for (let j = 0 ; j < linksBetweenPoints[0].length ; j ++) {
        status[i][j] = false;
    }
}
let track = [];
const target = 3;

track.push(0);
do {
    if ( track[0] != target ) {
        steps ++;
        for ( let i = 0 ; i < linksBetweenPoints[0].length ; i ++ ) {
            if ( linksBetweenPoints[track[0]][i] != 0 && //排除自己
                linksBetweenPoints[track[0]][i] == 1 && //有路能走
                status[track[0]][i] == false ) {//沒有走過
                track.push(i);
            }
        }
        track.shift();
    } else {
        console.log(`found target ${target} in ${steps} steps.`);
        process.exit();
    }
} while (track.length > 0);
console.log('沒有找到特定的點');