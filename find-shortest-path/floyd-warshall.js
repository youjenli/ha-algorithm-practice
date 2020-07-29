const routes = [
    [0, 2, 6, 4],
    [160, 0, 3, 160],
    [7, 160, 0, 1],
    [5, 160, 12, 0]
];
/*
  注意，路徑不通的部分一定要使用極大的正數表示 (超過路徑數 x 各路徑長度最大值)，
  否則因為 routes[j][k] 有可能列舉出原本路徑不通的點，
  所以在在判斷 routes[j][k] 是否大於 routes[j][i] + routes[i][k] 時，
  就會沒有辦法正確計算最短路徑。
*/

for (let i = 0 ; i < routes[0].length ; i ++) {
    for (let j = 0 ; j < routes[0].length ; j ++) {
        for (let k = 0 ; k < routes[0].length ; k ++) {
            if ( routes[j][i] < 160 && routes[i][k] < 160 &&
                routes[j][k] > routes[j][i] + routes[i][k] ) {
                routes[j][k] = routes[j][i] + routes[i][k];
            }
        }
    }
}

routes.forEach(item => {
    console.log(item);
});