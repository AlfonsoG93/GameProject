var canvas = document.querySelector(".my-game");
canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var ctx = canvas.getContext("2d");

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
  return color;
}

function Planet() {
  this.startDeg = 0;
  this.radians = 2 * Math.PI;
  this.color = getRandomColor();
  this.dx = 4;
  this.dy = 4;
}
Planet.prototype.getRadius = function (obj) {
  this.radius = getRandom(20, (obj.radius));
};


Planet.prototype.location = function () {
  var border = getRandom(0, 3);
  switch (border) {
    case 0:
      this.y = 0;
      this.x = getRandom(0, canvas.width);
      break;
    case 1:
      this.x = 0;
      this.y = getRandom(0, canvas.height);
      break;
    case 2:
      this.y = canvas.height;
      this.x = getRandom(0, canvas.width);
      break;
    case 3:
      this.x = canvas.width;
      this.y = getRandom(0, canvas.height);
      break;
  }
};

Planet.prototype.collision = function (obj) {
  
};


Planet.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, this.startDeg, this.radians, false);
  ctx.fill();
  ctx.closePath();
  if (this.x > canvas.width || this.x < 0) {
    this.dx = -this.dx;
  }
  if (this.y > canvas.height || this.y < 0) {
    this.dy = -this.dy;
  }
  this.x += this.dx;
  this.y += this.dy;

};


var player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  startDeg: 0,
  radius: 30,
  radians: 2 * Math.PI,
  dx: 5,
  dy: 5,
  direction: "",


  move: function (direction) {
    if (direction === "up") {
      this.y += this.dy;
    } else if (direction === "down") {
      this.y -= this.dy;
    } else if (direction === "left") {
      this.x -= this.dx;
    } else if (direction === "right") {
      this.x += this.dx;
    } else if (direction === "") {
      this.x = this.x;
      this.y = this.y;
    }
  },

  draw: function () {
    var grd = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    grd.addColorStop(0, "#fceabb");
    grd.addColorStop(1, "#f8b500");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startDeg, this.radians, false);
    ctx.fill();
    ctx.closePath();
    player.move(this.direction);

    // player movement boundaries with border stops at margin
    if (this.x + this.radius > canvas.width) {
      player.move("left");
    } else if (this.x - this.radius < 0) {
      player.move("right");
    } else if (this.y + this.radius > canvas.height) {
      player.move("down");
    } else if (this.y - this.radius < 0) {
      player.move("up");
    }
  }
};


var planetArr = [];
for (var index = 0; index < 20; index++) {
  planetArr[index] = new Planet();
  planetArr[index].location();
  planetArr[index].getRadius(player);

}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

$(document).ready(function () {
  $(document).keydown(function () {
    switch (event.keyCode) {
      case 37:
        player.direction = "left";
        break;
      case 38:
        player.direction = "down";
        break;
      case 39:
        player.direction = "right";
        break;
      case 40:
        player.direction = "up";
        break;
    }
  });
});