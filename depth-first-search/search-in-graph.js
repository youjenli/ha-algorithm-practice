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

const dfs = (point, target) => {
    points[point] = 0;
    if (point == target) {//找到目標球
        console.log(`找到目標球 ${target + 1}`);
        return true;
    }
    for (let i = 0 ; i < linksBetweenPoints[0].length ; i ++) {
        if ( linksBetweenPoints[point][i] != 0 && //排除自己
            linksBetweenPoints[point][i] == 1 && //有路能走
            points[i] == 1 ) {//還沒走過
            console.log(`查找點 ${point+1}`);
            sum++;
            if (dfs(i, target)) {
                return true;
            };
        }
    }
    return false;
}

if(dfs(0, 3)) {
    console.log(`總計步數: ${sum}`);
}