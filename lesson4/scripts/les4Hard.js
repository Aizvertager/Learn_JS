function Test(a) {
    if (typeof(a) === 'string') {
        console.log('Передана строка');
        a = a.trim();
        console.log(a);
    } else if (a.length > 30) {
        a = a.substring(0, 29);
        a = a + '...';
        console.log(a);
    } else {
        console.log('Передана не строка');
    }
}

Test(5);