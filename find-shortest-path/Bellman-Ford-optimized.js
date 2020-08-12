const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let startPoint = null;//各路徑的起點
let destination = null;//各路徑的終點
let distance = null;//路徑長度
let nextIdx = 0;
let lastPathOfEachPoint = null;//記錄各起始點最後讀入的路徑代號
let pathsOfEachPoint = null;//記錄各路徑之間的連接關係
let initialized = false;

rl.on('line', (input) => {
    const tokens = input.split(' ');
    if (tokens.length == 1 
        && tokens[0] == 'ok') {
        
        //這邊一定要給明確的陣列長度，否則後面賦值會失敗。
        const distBetweenOrigin = new Array(lastPathOfEachPoint.length);
        distBetweenOrigin[0] = 0;
        for ( let i = 1 ; i < distBetweenOrigin.length ; i ++ ) {
            distBetweenOrigin[i] = 1000;
        }
        const queuedNodes = [];
        let head = 0, tail = 1;
        queuedNodes.push(0);
        const processStatusOfEachNode = new Array(lastPathOfEachPoint.length);
        processStatusOfEachNode[0] = true;
        for ( let j = 1 ; j < processStatusOfEachNode.length ; j ++ ) {
            processStatusOfEachNode[j] = false;
        }

        while (head < tail) {
            let k = lastPathOfEachPoint[queuedNodes[head]];
            while (k >= 0) {
                if ( distBetweenOrigin[destination[k]] > distBetweenOrigin[startPoint[k]] + distance[k] ) {
                    distBetweenOrigin[destination[k]] = distBetweenOrigin[startPoint[k]] + distance[k];
                    if (processStatusOfEachNode[destination[k]] == false) {
                        queuedNodes.push(destination[k]);
                        tail ++;
                        processStatusOfEachNode[destination[k]] = true;
                    }
                }
                k = pathsOfEachPoint[k];
            }
            // processStatusOfEachNode[queuedNodes[head]] = false;//todo
            head ++;
        }

        console.log(`${distBetweenOrigin}`);

        process.exit();
    } else if (tokens.length == 2 
        && initialized == false) {
        const numbers = tokens.map(token => parseInt(token));
        if (numbers.every(number => !isNaN(number))
            && numbers[1] <= numbers[0]*(numbers[0] - 1)/2) {
                startPoint = new Array(numbers[1]);
                destination = new Array(numbers[1]);
                distance = new Array(numbers[1]);
                lastPathOfEachPoint = (new Array(numbers[0]));
                //不知為何一定要使用陣列迭代方法提供初始值，否則會無效
                for (let i = 0 ; i < lastPathOfEachPoint.length ; i ++) {
                    lastPathOfEachPoint[i] = -1;
                }
                pathsOfEachPoint = (new Array(numbers[1])).map(() => -1);
                //不知為何一定要使用陣列迭代方法提供初始值，否則會無效
                for (let j = 0 ; j < pathsOfEachPoint.length ; j ++) {
                    pathsOfEachPoint[j] = -1;
                }
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
            startPoint[nextIdx] = numbers[0] - 1;
            destination[nextIdx] = numbers[1] - 1;
            distance[nextIdx] = numbers[2];
            
            if (lastPathOfEachPoint[numbers[0] - 1] !== undefined && lastPathOfEachPoint[numbers[0] - 1] >= 0) {
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