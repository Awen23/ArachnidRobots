# ArachnidRobots

Run using 'node robots.js'
Will first run tests to confirm all bots are working, then will ask for bot type, then ask for command

# MK1
Command is recieved via the console and is in the format: initX,initY,movements

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

Possible returns:
[x,y]: final location
'Invalid input for initial location!': initX,initY weren't numbers and hence are invalid as an initial location
'Invalid initial direction facing!': initFacing wasn't N, E, S or W
'Invalid input for building size!': buildingSizeX,buildingSizeY weren't numbers
'Invalid Movement Command!': movement command which wasn't F, B, L or R were entered in the control sequence


# MK3

Assumptions:
If a propel of more than 5 is given, the bot will split it past the 5 to avoid overheating and gives a warning
Bot always starts facing North 
If a command of more fuel is given, it will use remaining fuel only

Command structure: initX,initY,commands

Possible returns:
[x,y]: final location
'Invalid input for initial location!': initX,initY weren't numbers and hence are invalid as an initial location
'Invalid Movement Command!': movement command which wasn't F, B, L or R were entered in the control sequence

Known Bugs:
Doesn't deal with propel numbers over 9