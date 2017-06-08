var myRover = {
  position: [0,0],
  direction: 'N'
};

var planet = {
  //grid will be the property space
  space : []

};

//in order to set the space, we will add inner arrays as the vertical rows
//and inside each row, empty spaces will be the width.
var setSpace = function(height, width) {
  for(var i = 0; i < height; i++) {
    planet.space.push([]);
  }
  planet.space.forEach(function(row) {
    for(var j = 0; j < width; j++) {
      row.push(' ');
    }
  });
};

var setObstacles = function() {
  planet.space.forEach(function(row) {
    var i = Math.floor(Math.random() * row.length);
    row[i] = '*';
  });
};

var changeDirection = {
  f : function() {myRover.direction = 'N';},
  b : function() {myRover.direction = 'S';},
  r : function() {myRover.direction = 'E';},
  l : function() {myRover.direction = 'W';}
};

function goForward(rover) {
  var previousPos = myRover.position;
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]--;
      break;
  }

  //if rover finds an obstacle it shoud stop executing the commands, stop at the las
  //possible position and report that it found an obsacle.
  if(planet.space[myRover.position] === '*') {
    myRover.position = previousPos;
    return "Obstacle found.";
  }
  //the rover needs to wrap from one edge of the grid to another
  if(myRover.position[0] === planet.space.length) myRover.position[0] = 0;
  if(myRover.position[0] < 0) myRover.position[0] = planet.space.length - 1;
  if(myRover.position[1] === planet.space[0].length) myRover.position[0] = 0;
  if(myRover.position[1] < 0) myRover.position[1] = planet.space[0].length - 1;

  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");

}

function move(commands) {
  //function move will take a list of commands as input
  for (var i = 0; i < commands.length; i++) {
    //each element in the list will be a new direction command for the rover
    var dir = commands[i];
    //therefore we call the changeDirection object and change rover's direction according to the command (n b r l)
    changeDirection[dir]();
    //we finally ask for the rover to move forward with the updated direction
    goForward(myRover);
    //it will move once for each command on the list and will eventually display its new position
  }
}

//goForward(myRover);
