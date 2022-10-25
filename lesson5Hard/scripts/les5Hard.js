let arr = ['123', '456', '789', '245', '2365', '8569', '4535'];
for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    }
}

Goto:
for (let i = 2; i < 100; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            continue Goto;
        }
    }
    console.log(i);
}