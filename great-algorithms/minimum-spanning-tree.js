/* 註： 執行此程式時，要加上參數 --harmony 和 --use-strict，否則後面遞迴部分可能導致程式掛掉。
*/
const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let initailized = false;
let items = null;
let routes = null;
let maxRoutes = null;
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
                routes = [];
                maxRoutes = itemCount * (itemCount - 1) / 2;
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
                console.log(`sorted order:`);
                routes.forEach((route, idx) => {
                    console.log(`${idx} ： ${route[0] + 1}, ${route[1] + 1}, ${route[2]}`);
                });

                const setParent = (parent, childIdx) => {
                    if (items[childIdx] != childIdx) {
                        //要被連接的節點有其父節點，因此要連帶令其父節點切換父節點至新的父節點
                        setParent(parent, items[childIdx]);
                    }
                    items[childIdx] = parent;
                }

                let lengthOfPath = 0;
                const leastRoute = items.length - 1;
                let count = 0; //已採用的線路
                for (let index = 0 /* 目前讀取的路徑排序結果 */ ; index < routes.length && count < leastRoute ; index ++) {
                    console.log(`${index} : ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                    console.log(`items[routes[${index}][0]] ${items[routes[index][0]]} vs items[routes[${index}][1]] ${items[routes[index][1]]}`);
                    if (items[routes[index][0]] == routes[index][0]) {
                        if (items[routes[index][1]] == routes[index][1]) {
                            /* 路徑首尾的父節點都是自己，直接把尾端列入新線路 */
                            console.log(`採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                            setParent(items[routes[index][0]], routes[index][1]);
                            count++;
                            lengthOfPath += routes[index][2];
                        } else {
                            /* 路徑首的父節點是自己，尾則不是 */
                            if (items[routes[index][0]] != items[routes[index][1]]) {
                                /* 但首尾的父節點不同，因此把首節點併至尾節點形成的路線中 */
                                console.log(`採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                                setParent(items[routes[index][1]], routes[index][0]);
                                count++;
                                lengthOfPath += routes[index][2];
                            } else {
                                /* 但尾的父節點是首，這表示兩者已在同一線路中 */
                                console.log(`不採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                            }
                        }
                    } else {
                        // 首節點已被加到其他路線中
                        if (items[routes[index][1]] == routes[index][1]) {
                            /* 而尾節點不在任何路線中，因此把它加到首節點所在的線路 */
                           console.log(`採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                           setParent(items[routes[index][0]], routes[index][1]);
                           count++;
                           lengthOfPath += routes[index][2];
                        } else if (items[routes[index][0]] != items[routes[index][1]]) {
                            /* 尾節點在暨有路線中，而且該路線與首節點所屬的路線不同，
                               這表示需要透過重設首或尾節點的父節點，以及目前父節點的父節點至另一條線路的根以便把兩線路串起來。
                            */
                            console.log(`採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                            setParent(items[routes[index][0]], routes[index][1]);
                            count++;
                            lengthOfPath += routes[index][2];
                        } else {
                            /* 尾節點在暨有路線中，而且該路線與首節點所屬的路線相同，
                               這表示兩點已在暨有的線路中，故不採用此線路。
                            */
                            console.log(`不採用 ${routes[index][0] + 1}, ${routes[index][1] + 1}, ${routes[index][2]}`);
                        }
                    }
                }
                console.log(`length of path : ${lengthOfPath}`);
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
    } else if (tokens.length == 3 && initailized == true) {
        let startPoint = parseInt(tokens[0]), destination = parseInt(tokens[1]),
            lengthOfRoute = parseInt(tokens[2]);
        if (!isNaN(startPoint) && !isNaN(destination) && !isNaN(lengthOfRoute)
                && startPoint <= items.length && destination <= items.length
                && pointer < maxRoutes) {
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