const fs = require('fs');
fs.readFile('data.txt', function(err, data) {
    let arr1 = [];
    let arr2 = [];
    if (err) throw err;
    let temp = data.toString();
    temp = temp.split(' ');
    temp.map(function(item) {
        if (item % 2 === 0) {
            arr1.push(item);
        }
    });
    temp.map(function(item) {
        arr2.push(Math.pow(item, 3));

    });
    console.log(arr1.join(" "));
    console.log(arr2.join(" "));
    fs.writeFileSync("out-1.txt", arr1.join(" "));
    fs.writeFileSync("out-2.txt", arr2.join(" "));
});