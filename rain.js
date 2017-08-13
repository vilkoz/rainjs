var canvas = document.getElementById('canvas');
canvas.width = document.querySelector('body').clientWidth;
var ctx = canvas.getContext('2d');

function random(from, to) {
	return Math.floor((Math.random() * (to - from)) + from);
}

class Particle {
	constructor(ctx) {
		this.ctx = ctx;
		this.genValues();
	}

	genValues() {
		this.x = random(0, this.ctx.canvas.width);
		this.y = random(-500, 0);
		this.velocity = random(5, 20);
	}

	fall() {
		this.y += 1 * this.velocity;
		if (this.y >= this.ctx.canvas.height) {
			this.genValues();
		}
	}

	draw() {
		this.ctx.fillStyle = 'purple';
		this.ctx.fillRect(this.x, this.y, 2, 10);
	}
}

var p = [];
for (var i = 0; i < 500; i++) {
	p[i] = new Particle(ctx);
}

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < p.length; i++) {
		p[i].fall()
		p[i].draw()
	}
}

gameLoop();
