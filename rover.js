var myRover = {
  position: [0,0],
  direction: 'N'
};

var planet = {
  //grid will be the property space
  space : []

};

//in order to set the space, we will add inner arrays as the rows
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

//this function will add obstacles in the space of the planet
//the difficulty will determine how many obstacles will be in each row
var setObstacles = function(difficulty) {
  for(var j = 0; j < difficulty; j++) {
    for(var k = 0; k < planet.space.length; k ++) {
      var row = planet.space[k];
      var i = Math.floor(Math.random() * row.length);
      row[i] = '*';
    }
  }
};

var changeDirection = {
  f : function() {myRover.direction = 'N';},
  b : function() {myRover.direction = 'S';},
  r : function() {myRover.direction = 'E';},
  l : function() {myRover.direction = 'W';}
};

function goForward(rover) {

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


  //the rover needs to wrap from one edge of the grid to another
  if(myRover.position[0] === planet.space.length) myRover.position[0] = 0;
  if(myRover.position[0] < 0) myRover.position[0] = planet.space.length - 1;
  if(myRover.position[1] === planet.space[0].length) myRover.position[1] = 0;
  if(myRover.position[1] < 0) myRover.position[1] = planet.space[0].length - 1;

  //if rover finds an obstacle it shoud stop executing the commands, stop at the las
  //possible position and report that it found an obsacle.
  if(planet.space[myRover.position[0]][myRover.position[1]] === '*') {

    return "Obstacle found.";
  }

  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");

}

function move(commands) {
  var obst = 'not found';

  //function move will take a list of commands as input
  for (var i = 0; i < commands.length; i++) {
    //each element in the list will be a new direction command for the rover
    var dir = commands[i];
    //therefore we call the changeDirection object and change rover's direction according to the command (n b r l)
    changeDirection[dir]();
    //we finally ask for the rover to move forward with the updated direction
    //but if next position has an obstacle in it, we return that we found an obstacle
    if (goForward(myRover) === "Obstacle found.") {
      obst = 'Found';
      break;
    }

    //it will move once for each command on the list and will eventually display its new position
  }
  return obst;
}

//goForward(myRover);
