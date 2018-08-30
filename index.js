console.log('Main program starts....');
const result = require('./bucket-sort-simplify').result;
if (result.then) {
    result.then(function(){
        console.log('Main program finished.');
    });    
}
