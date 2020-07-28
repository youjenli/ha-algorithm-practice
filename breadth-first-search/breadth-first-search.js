const b/*barrier */ = -1;
const t/*target */ = 2
const c1 = [0, 0, b, 0],
      c2 = [0, 0, 0, 0],
      c3 = [0, b, 0, t],
      c4 = [0, 0, b, 0];
const map = [c1,c2,c3,c4];

const notSearched = 0;
const searched = 1;
const record = new Array(map.length);
for (let i = 0 ; i < map.length ; i ++) {
    record[i] = new Array(c1.length);
    for (let j = 0; j < c1.length ; j ++) {
        record[i][j] = notSearched;
    }
}

let track = [];

if (map[0][0] == t) {
    console.log(`Target has been found at 0,0.`);
} else {
    track.push({
        x:0,
        y:0,
        step:0
    });
    let head = 0; tail = 0;

    const addition = [{
        a:0, b:-1
    },{
        a:1, b:0
    },{
        a:0, b:1
    },{
        a:-1, b:0
    }];

    let found = false;
    do {
        for (let i = 0 ; i < addition.length && !found ; i ++) {
            let pointToSearch = {
                x:track[head].x + addition[i].a,
                y:track[head].y + addition[i].b,
                step:track[head].step + Math.abs(addition[i].a) + Math.abs(addition[i].b)
            }
            console.log(`開始搜尋 ${pointToSearch.x},${pointToSearch.y}`);
            if (pointToSearch.x >= 0 && pointToSearch.x < c1.length /*檢查是否越界 */
                && pointToSearch.y >= 0 && pointToSearch.y < c1.length) {
                if (record[pointToSearch.x][pointToSearch.y] != searched) {/* 檢查是否已找過 */
                    if (map[pointToSearch.x][pointToSearch.y] == b) {
                        console.log(`${pointToSearch.x},${pointToSearch.y} 是障礙物，跳過`);
                        continue;
                    } else if (map[pointToSearch.x][pointToSearch.y] == t) {//檢查是否已找到目標
                        console.log(`在 ${pointToSearch.x},${pointToSearch.y} 找到目標，它距離原點的步數是: ${pointToSearch.step}.`);
                        found = true;
                        break;
                    } else {
                        track.push(pointToSearch);
                        record[pointToSearch.x][pointToSearch.y] = searched;
                        tail++;
                        console.log(`加入 ${pointToSearch.x},${pointToSearch.y} step:${pointToSearch.step} 到佇列中。`);
                    }
                } else {
                    console.log(`因為已找過 ${pointToSearch.x},${pointToSearch.y}，所以跳過這個點`);
                    continue;
                }
            } else {
                console.log(`${pointToSearch.x},${pointToSearch.y} 已越界，跳過`);
                continue;
            }
        }// end for
        head ++;
    } while(head <= tail && !found);
    if (!found) {
        console.log('目標不在圖上');
    }
}