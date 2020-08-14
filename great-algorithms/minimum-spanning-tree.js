const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let initailized = false;
let items = null;
let routes = null;
let pointer = 0;

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
                routes = new Array(itemCount);
                initailized = true;
            }
        } else if (tokens[0] == 'ok')  {
            if (items != null) {
                routes.sort((f, s) => {
                    if (f[2] > s[2]) {
                        return 1;
                    } else if (f[2] == s[2]) {
                        return 0;
                    } else {
                        return -1;
                    }
                });

                const setParent = (idx) => {
                    let promise = null;
                    if (items[idx] != idx) {
                        promise = new Promise(resolve => {
                            setTimeout(() => {
                                setParent(items[idx])
                                    .then(() => {
                                        resolve();
                                    });
                            }, 0);
                        })
                    }
                    if (promise != null) {
                        promise.then(() => {
                            console.log(`將 items[${idx}] 從 ${items[idx]} 設為 ${ancestor}`);
                            items[idx] = ancestor;
                            console.log(`${items}`);
                        });
                    } else {
                        return new Promise(resolve => {
                            console.log(`將 items[${idx}] 從 ${items[idx]} 設為 ${ancestor}`);
                            items[idx] = ancestor;
                            console.log(`${items}`);
                            resolve();
                        });
                    }
                    return promise;
                }
                // setParent(descendent)
                for ( let i = 0 ; i < items.length - 1 ; i ++) {
                    setParent(items[routes[i][1]]);
                }

                // let count = 0;
                // for ( let i = 0 ; i < items.length ; i ++) {
                //     if (items[i] == i) {
                //         count ++;
                //     }
                // }
                // console.log(`共有 ${count} 個集團`);
                // console.log(`${items}`);
                // process.exit();
            } else {
                console.error('app has not been initialized.');
                process.exit();
            }
        } else {
            console.error('invalid input.');
            process.exit();
        }
    } else if (tokens.length == 3 && initailized == true) {
        let startPoint = parseInt(tokens[0]), destination = parseInt(tokens[1])
                , lengthOfRoute = parseInt(tokens[2]);
        if (!isNaN(startPoint) && !isNaN(destination) && !isNaN(lengthOfRoute)
                && startPoint <= items.length && destination <= items.length
                && pointer < routes.length) {
                startPoint --, destination --;
                routes[pointer] = [startPoint, destination, lengthOfRoute];
                pointer ++;
        } else {
            console.error('invalid input.');
        }
    } else {
        console.error('invalid input.');
        process.exit();
    }
})