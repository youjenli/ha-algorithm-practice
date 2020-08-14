console.log(['he', 'world'].sort());
console.log(['apple', 'pie'].sort());
console.log(['an', 'egg'].sort());
console.log(['just', 'do', 'it'].sort());
console.log([10000, 5, 1, 1000].sort((first, second) => {
    if (first > second) {
        return -1;
    } else if (first == second) {
        return 0;
    } else {
        return 1;
    }
}));