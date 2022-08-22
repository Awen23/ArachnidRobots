const mk1 = {
    location: [0,0],
    recieveCommand(command) {
        const splitCommand = command.split(",");
        this.location[0] = splitCommand[0];
        this.location[1] = splitCommand[1];

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
                    console.log("Invalid command");
                    break;
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

let commands = ["0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF", "3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF", 
            "0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR"];


for(let i = 0; i < commands.length; i++) {
    console.log(mk1.recieveCommand(commands[i]));
}