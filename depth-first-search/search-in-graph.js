const linksBetweenPoints = [
    [0, 1, 1, -1, 1],//1
    [1, 0, -1, 1, -1],//2
    [1, -1, 0, -1, 1],//3
    [-1, 1, -1, 0, -1],//4
    [1, -1, 1, -1, 0]//5
]
//搜尋目標 4 號球
const points = [1, 1, 1, 1, 1];
let sum = 0;
const path = [];

const dfs = (point, target) => {
    if (point == target) {//找到目標球
        console.log(`找到目標點 ${target + 1}`);
        console.log(`總步數: ${sum}, 路徑 ${path}`);
        return;
    }
    for (let i = 0 ; i < linksBetweenPoints[0].length ; i ++) {
        if ( linksBetweenPoints[point][i] != 0 && //排除自己
            linksBetweenPoints[point][i] == 1 && //有路能走
            points[i] == 1 ) {//還沒走過
            points[i] = 0;
            path.push(i + 1);
            sum++;
            dfs(i, target);
            path.pop();
            sum --;
            points[i] = 1;
        }
    }
}

points[0] = 0;
path.push(1);
dfs(0, 3);