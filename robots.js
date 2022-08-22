const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  //WOULD BE MUCH BETTER IF THESE WERE SEPARATE FILES WITH A CONTROLLER 
const mk1 = {
    name: 'mk1',
    location: [0,0],
    recieveCommand(command) {
        //command format: initX,initY,movements
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
        //command format: initX,initY,initFacing,buildingSizeX,buildingSizeY,commands
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
            return 'Invalid input for building size!';
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
        if(this.facing == 0) {
            this.facing = 3;
        } else {
            this.facing = this.facing - 1;
        }
    },
    right() {
        this.facing = (this.facing + 1) % 4
    }
}

const mk3 = {
    name: 'mk3',
    location: [0,0],
    facing: 0,
    fuelRemaining: 0,
    recieveCommand(command) {
        //command format: initX,initY,commands
        const splitCommand = command.split(",");
        this.fuelRemaining = 30;
        if(!(isNaN(splitCommand[0]) || isNaN(splitCommand[1]))) {
            this.location[0] = Number(splitCommand[0]);
            this.location[1] = Number(splitCommand[1]);
        } else {
            return 'Invalid input for initial location!';
        }

        this.facing = 0;

        let curCommand; 
        for(let i = 0; i < splitCommand[2].length; i++) {
            curCommand = splitCommand[2][i]
            switch(curCommand) {
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
                    if(!isNaN(curCommand)) {
                        //if it's a number
                        let numPropel = Number(curCommand);
                        if(numPropel < 6) {
                            this.forward(numPropel);
                        } else {
                            console.log("Warning: Tried to send command that would've overheated bot");
                            //input of two digits would fail so for now assuming < 10
                            this.forward(5);
                            this.forward(numPropel - 5);
                        }
                        //add one to i so that it skips the F
                        i++;
                    } else {
                        console.log("invalid " + curCommand);
                        return 'Invalid Movement Command!';
                    }
            }
        } 

        return this.location;
    },
    forward(num = 1) {
        //num here default to one so it can be propelled 
        if(this.fuelRemaining >= num) {
            switch(compass[this.facing]) {
                case 'N':
                    this.location[1] += num;
                    break;
                case 'E':
                    this.location[0] += num;
                    break;
                case 'S':
                    this.location[1] -= num;
                    break;
                case 'W':
                    this.location[0] -= num;
                    break;
            }
            this.fuelRemaining -= num;
        } else if(this.fuelRemaining > 0) {
            //if it's trying to do a number of F higher than remaining fuel, use leftover fuel then return location
            switch(compass[this.facing]) {
                case 'N':
                    this.location[1] += this.fuelRemaining;
                    break;
                case 'E':
                    this.location[0] += this.fuelRemaining;
                    break;
                case 'S':
                    this.location[1] -= this.fuelRemaining;
                    break;
                case 'W':
                    this.location[0] -= this.fuelRemaining;
                    break;
            }
            this.fuelRemaining = 0;
        }
    },
    left() {
        if(this.facing == 0) {
            this.facing = 3;
        } else {
            this.facing = this.facing - 1;
        }
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

const testCommands3 = ["0,0,9FFFFFFFFFF4F3F2F9FFFFF", "0,0,FFFFFF3FLFFFFFFR5FL", "4,3,FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF"];
const testResults3 = [[0,30], [-6, 14], [15,10]];

testFunction(mk1, testCommands, testResults);
testFunction(mk2, testCommands2, testResults2);
testFunction(mk3, testCommands3, testResults3);


rl.question('What is the bot type?: ' , function (botType) {
    rl.question('Please enter the command: ' , function (command) {
        if(botType === "mk1") {
            console.log(`Bot ends up at: ${mk1.recieveCommand(command)}`);
        } else if(botType === "mk2") {
            console.log(`Bot ends up at: ${mk2.recieveCommand(command)}`);
        } else if(botType === "mk3") {
            console.log(`Bot ends up at: ${mk3.recieveCommand(command)}`);
        } else {
            console.log('Invalid bot type');
        }
      rl.close();
    });
  });