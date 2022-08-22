const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const mk1 = {
    name: 'mk2',
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

const compass = ['N', 'E', 'S', 'W']

const mk2 = {
    name: 'mk2',
    location: [0,0],
    facing: 0,
    buildingSize: [0,0],
    recieveCommand(command) {
        const splitCommand = command.split(",");
        if(!(isNaN(splitCommand[0]) || isNaN(splitCommand[1]))) {
            this.location[0] = splitCommand[0];
            this.location[1] = splitCommand[1];
        } else {
            return 'Invalid input for initial location!';
        }

        this.facing = compass.indexOf(splitCommand[2].toUpperCase());
        if(this.facing == -1) {
            return 'Invalid initial direction facing!';
        }

        if(!(isNaN(splitCommand[3]) || isNaN(splitCommand[4]))) {
            this.buildingSize[0] = splitCommand[3];
            this.buildingSize[1] = splitCommand[4];
        } else {
            return 'Invalid input for initial location!';
        }

        for(let i = 0; i < splitCommand[5].length; i++) {
            switch(splitCommand[5][i]) {
                case "F":
                    this.forward();
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
        switch(compass[this.facing]) {
            case 'N':
                if(this.location[1] < this.buildingSize[1]) {
                    this.location[1]++;
                } else {
                    console.log('Nearly killed the bot off the top!');
                }
                break;
            case 'E':
                if(this.location[0] < this.buildingSize[0]) {
                    this.location[0]++;
                } else {
                    console.log('Nearly killed the bot off the right side!');
                }
                break;
            case 'S':
                if(this.location[1] > 0) {
                    this.location[1]--;
                } else {
                    console.log('Nearly killed the bot off the bottom!');
                }
                break;
            case 'W':
                if(this.location[0] > 0) {
                    this.location[0]--;
                } else {
                    console.log('Nearly killed the bot off the left side!');
                }
                break;
        }
    },
    left() {
        this.facing = (this.facing - 1) % 4 
    },
    right() {
        this.facing = (this.facing + 1) % 4
    }
}

const testFunction = (testObj, testCommands, testResults) => {
    console.log("Testing " + testObj.name);
    for(let i = 0; i < testCommands.length; i++) {
        const actual = testObj.recieveCommand(testCommands[i])
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
}

const testCommands = ["0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF", "3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF", 
            "0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR", "A,B,FFBRL", "0,1,FFGHTBSHFJK", "100,100,FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR"];
const testResults = [[-1, 21], [4, 19], [3,15], 'Invalid input for initial location!', 'Invalid Movement Command!', [191, 191]]

const testCommands2 = ["0,0,N,2,2,FFFF", "0,1,S,4,4,LFFRF", "1,5,S,6,6,RFFLFFFFFFF"];
const testResults2 = [[0,2], [2,0], [0,0]];

testFunction(mk1, testCommands, testResults);
testFunction(mk2, testCommands2, testResults2);

rl.question("Please enter bot type followed by a space then the command (with no spaces): " , function (command) {
    const split = command.split(" ");

    if(split[0] === "mk1") {
        console.log(`Bot ends up at: ${mk1.recieveCommand(split[1])}`);
    } else if(split[0] === "mk2") {
        console.log(`Bot ends up at: ${mk2.recieveCommand(split[1])}`);
    } else {
        console.log('Invalid bot type');
    }
  rl.close();
});