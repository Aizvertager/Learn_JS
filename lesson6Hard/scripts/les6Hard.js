let week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    day = new Date();

for (let i = 0; i < week.length; i++) {
    if (i === 6 || i === 0) {
        document.write(week[i].italics() + '<br \/>');
    } else if (i === day.getDay()) {
        document.write(week[i].bold() + '<br \/>');
    } else if (i != 6 || i != 0) {
        document.write(week[i] + '<br \/>');
    }
}


