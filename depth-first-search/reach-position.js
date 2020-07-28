const map /*row, column*/ = [
    [0, 0, -1, 0],
    [-1, 0, 0, 0],
    [0, 0, 0, -1],
    [0, -1, 1, 0]
];
const rows = map.length;
const cols = map[0].length;
const record = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
//const footPrint = [];

const dfs = (rowIndex, colIndex, steps) => {
    console.log(`查找 ${rowIndex + 1}, ${colIndex + 1}, 先前累計步數 ${steps}`);
    if ( rowIndex < 0 || rowIndex == rows 
        || colIndex < 0 || colIndex == cols) {
        //超出邊界
        return 0;
    } else {
        if ( map[rowIndex][colIndex] == 1 ) {//到達目的地
            //footPrint.push(`(${rowIndex}, ${colIndex})`);
            return steps ++;
        } else if (map[rowIndex][colIndex] == -1) {
            //障礙物
            record[rowIndex][colIndex] = 1;
            return 0;
        } else {//沒有東西
            if (record[rowIndex][colIndex] == 0) {
                steps ++;
                record[rowIndex][colIndex] = 1;
                let latestSteps = 0;
                latestSteps = dfs(rowIndex, colIndex + 1, steps);
                if (latestSteps > 0) {
                    record[rowIndex][colIndex] = 0;
                    return latestSteps;
                }
                latestSteps = dfs(rowIndex + 1, colIndex, steps);
                if (latestSteps > 0) {
                    record[rowIndex][colIndex] = 0;
                    return latestSteps;
                }
                latestSteps = dfs(rowIndex, colIndex - 1, steps);
                if (latestSteps > 0) {
                    record[rowIndex][colIndex] = 0;
                    return latestSteps;
                }
                latestSteps = dfs(rowIndex - 1, colIndex, steps);
                if (latestSteps > 0) {
                    record[rowIndex][colIndex] = 0;
                    return latestSteps;
                }
            } else { //找過了
                return 0;
            }
        }
    }
}

console.log(`到達目的地，移動步數: ${dfs(0, 0, 0)}`);
