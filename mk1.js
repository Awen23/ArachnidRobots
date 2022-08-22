const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const mk1 = {
    location: [0,0],
    recieveCommand(command) {
        const splitCommand = command.split(",");
        if(!(isNaN(splitCommand[0]) || isNaN(splitCommand[1]))) {
            this.location[0] = splitCommand[0];
            this.location[1] = splitCommand[1];
        } else {
            return 'Invalid input for initial location!';
        }

        for(let i = 0; i < splitCommand[2].length; i++) {
            switch(splitCommand[2][i]) {
                case "F":
                    this.forward();
                    break;
                case "B":
                    this.backwards();
                    break;
                case "L":
                    this.left();
                    break;
                case "R":
                    this.right();
                    break;
                default:
                    return 'Invalid Movement Command!';
            }
        } 

        return this.location;
    },
    forward() {
        this.location[1]++;
    },
    backwards() {
        this.location[1]--;
    },
    left() {
        this.location[0]--;
    },
    right() {
        this.location[0]++;
    }
}

let testCommands = ["0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF", "3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF", 
            "0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR", "A,B,FFBRL", "0,1,FFGHTBSHFJK"];
let testResults = [[-1, 21], [4, 19], [3,15], 'Invalid input for initial location!', 'Invalid Movement Command!']

console.log("Testing..");

for(let i = 0; i < testCommands.length; i++) {
    const actual = mk1.recieveCommand(testCommands[i])
    //console.log(actual.length);
    if(actual.length > 2) {
        if(actual === testResults[i]) {
            console.log(`Test ${i} passed`)
        } else {
            console.log(`Test ${i} failed with expected: ${testResults[i]} and actual: ${actual}`)
        }
    } else if(actual[0] == testResults[i][0] && actual[1] == testResults[i][1]) {
        console.log(`Test ${i} passed`);
    } else {
        console.log(`Test ${i} failed with expected: ${testResults[i]} and actual: ${actual}`)
    }
}

console.log("Test complete!");


rl.question("Please insert a command: " , function (command) {
  console.log(`Bot ends up at: ${mk1.recieveCommand(command)}`);
  rl.close();
});