var args = process.argv.slice(2);
var found = false;
if (args.length === 0) {
    console.log('Please specify words');
}
else if (args[0] === '-i') {
    var stdin = process.openStdin();
    stdin.addListener("data", function (d) {
        if (d.toString().trim() != '/q') {
            read(d.toString().trim());
        }
        else {
            process.exit(0);
        }
    });
}
else {
    for (var i = 0; i < args.length; i++) {
        read(args[i]);
    }
}
function read(arg) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('openthesaurus.txt')
    });
    lineReader.on('line', function (line) {
        getSynonym(line, arg);
    }).on('close', function () {
        if (!found) {
            console.log("No matches found for '" + arg + "' ");
        }
        found = false;
    });
}
function getSynonym(line, arg) {
    if (line[0] != '#' && line.includes(arg)) {
        found = true;
        var lineArr = line.split(';');
        for (var i = 0; i < lineArr.length; i++) {
            var k = 0;
            if (lineArr[i].indexOf(arg) != -1) {
                console.log(arg + ":");
            }
            else {
                console.log(lineArr[i] + ":");
                k++;
            }
            for (; k < lineArr.length; k++) {
                if (lineArr[k] != arg) {
                    console.log("\t" + lineArr[k]);
                }
            }
        }
    }
}
