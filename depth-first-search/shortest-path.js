const map = [
    [0, 2, -1, -1, 10],
    [-1, 0, 3, -1, 7],
    [4, -1, 0, 4, -1],
    [-1, -1, -1, 0, 5],
    [-1, -1, 3, -1, 0]
];

//搜尋目標 4 號球
const points = [1, 1, 1, 1, 1];
let distance = 0;//路徑長度
const path = [];

const dfs = (point, target) => {
    if (point == target) {//找到目標球
        console.log(`找到目標點 ${target + 1}, 總步數: ${distance}, 路徑 ${path}`);
        return;
    }
    for (let i = 0 ; i < map[0].length ; i ++) {
        if ( map[point][i] != 0 && //排除自己
            map[point][i] >= 1 && //有路能走
            points[i] == 1 ) {//還沒走過
            points[i] = 0;
            path.push(i + 1);
            distance += map[point][i];
            dfs(i, target);
            path.pop();
            distance -= map[point][i];
            points[i] = 1;
        }
    }
}

points[0] = 0;
path.push(1);
dfs(0, 4);