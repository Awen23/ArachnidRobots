# ArachnidRobots

# MK1
Command is recieved via the console and is in the format: initX,initY,movements

mk1.js is run using "node mk1.js" in the terminal, and will first run test cases before asking for a command input

Possible returns:
[x,y]: final location
'Invalid input for initial location!': initX,initY weren't numbers and hence are invalid as an initial location
'Invalid Movement Command!': movement command which wasn't F, B, L or R were entered in the control sequence

# MK2

Assumptions:
There's no longer a B command (might get very confusing if you want to go backwards twice in a row!)
The bot is solely navigating an X,Y sized glass pane - it doesn't want to go back onto the ground 
Want something in the logs for when bot is stopped going off the edge

Command Structure:
initX,initY,initFacing,buildingSizeX,buildingSizeY,commands
initX: initial X location of bot
initY: initial Y location of bot
initFacing: direction bot is initially facing of N,E,S,W (North, East, South, West)
buildingSizeX: length of glass (inclusive; the bot can safely go to (buildingSizeX, buildingSizeY))
buildingSizeY: height of glass
commands: string of characters F, L & R denoting the instructions to the bot