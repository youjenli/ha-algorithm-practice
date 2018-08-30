const rl = require('./readline').readline;

rl.setPrompt('Please input numbers : ');
rl.prompt();
module.exports = {
    result:new Promise(function(resolve, reject){
        rl.on('line', function(line){
            const numbers = line.split(' ');
            const ranges = new Array(10);
            for (let i = 0 ; i < numbers.length ; i ++) {
                let number = numbers[i];
                if(ranges[number] == null) {
                    ranges[number] = 1;
                } else {
                    ranges[number] += 1;
                }
            }

            for (let j = 10 ; j < ranges.length ; j --) {
                if (ranges[j] != null) {
                    for (let k = 0; k < ranges[j] ; k ++) {
                        console.log(j + " ");
                    }
                }
            }
            rl.close();
            resolve();
        });
    })
} 
