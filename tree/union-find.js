const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let initailized = false;
let items = null;

rl.on('line', (input) => {
    const tokens = input.split(' ');
    if (tokens.length == 1 ) {
        let itemCount = parseInt(tokens[0]);
        if (!isNaN(itemCount)) {
            if (initailized) {
                console.log('invalid input');
            } else {
                items = new Array(itemCount);
                for (let i = 0 ; i < items.length ; i ++) {
                    items[i] = i;
                }
                initailized = true;
            }
        } else if (tokens[0] == 'ok')  {
            if (items != null) {
                let count = 0;
                for ( let i = 0 ; i < items.length ; i ++) {
                    if (items[i] == i) {
                        count ++;
                    }
                }
                console.log(`共有 ${count} 個集團`);
                console.log(`${items}`);
                process.exit();
            } else {
                console.error('app has not been initialized.');
                process.exit();
            }
        } else {
            console.error('invalid input.');
            process.exit();
        }
    } else if (tokens.length == 2 && initailized == true) {
        let parent = parseInt(tokens[0]), child = parseInt(tokens[1]);
        if (!isNaN(parent) && !isNaN(child)
                && parent <= items.length && child <= items.length) {
                parent --, child --;

                if (items[child] != child) {
                    console.log(`將 items[items[${child}]] 從 ${items[items[child]]} 設為 ${items[parent]}`);
                    items[items[child]] = items[parent];
                }
                console.log(`將 items[${child}] 從 ${items[child]} 設為 ${items[parent]}`);
                items[child] = items[parent];
                console.log(`${items}`);
        } else {
            console.error('invalid input.');
            process.exit();
        }
    } else {
        console.error('invalid input.');
        process.exit();
    }
})