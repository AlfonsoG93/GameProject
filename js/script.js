
var canvas = document.querySelector(".my-game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var player = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  startDeg: 0,
  radius: 50,
  radians: 2 * Math.PI,

  draw: function() {
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
  }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    player.draw();

    requestAnimationFrame(draw);
  }
  
  requestAnimationFrame(draw);
  
  $(document).ready(function() {
    $(document).keydown(function() {
      switch (event.keyCode) {
        case 37:
          player.x -= 20;
          break;
        case 38:
          player.y -= 20;
          break;
        case 39:
          player.x += 20;
          break;
        case 40:
          player.y += 20;
          break;
      }
    });
  });
