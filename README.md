# ArachnidRobots

Command is recieved via the console and is in the format: initX,initY,movements

mk1.js is run using "node mk1.js" in the terminal, and will first run test cases before asking for a command input

Possible returns:
[x,y]: final location
'Invalid input for initial location!': initX,initY weren't numbers and hence are invalid as an initial location
'Invalid Movement Command!': movement command which wasn't F, B, L or R were entered in the control sequence