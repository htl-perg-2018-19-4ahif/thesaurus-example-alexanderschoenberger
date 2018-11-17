let args = process.argv.slice(2);
let found: boolean = false;
if (args.length === 0) {
    console.log('Please specify words');
} else if (args[0] === '-i') {
    let stdin = process.openStdin();
    stdin.addListener("data", function (d) {
        if (d.toString().trim() != '/q') {
            read(d.toString().trim());
        } else {
            process.exit(0);
        }
    });
} else {
    for (let i: number = 0; i < args.length; i++) {
        read(args[i]);
    }
}

function read(arg: string) {
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('openthesaurus.txt')
    });
    lineReader.on('line', function (line) {
        getSynonym(line, arg);
    });
    if (!found) {
        console.log(`No matches found for '${arg}' `);
    }
    found = false;
}

function getSynonym(line: string, arg: string) {
    if (line[0] != '#' && line.toLowerCase().match(arg.toLowerCase())) {
        found = true;
        let lineArr: string[] = line.split(';');
        for (let i: number = 0; i < lineArr.length; i++) {
            let k: number = 0;
            if (lineArr[i].toLowerCase().indexOf(arg.toLowerCase()) != -1) {
                console.log(`${arg}:`);
            } else {
                console.log(`${lineArr[i]}:`);
                k++;
            }
            for (; k < lineArr.length; k++) {
                if (lineArr[k].toLowerCase() != arg.toLowerCase()) {
                    console.log(`\t${lineArr[k]}`);
                }
            }
        }
    }
}