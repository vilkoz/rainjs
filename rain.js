var canvas = document.getElementById('canvas');
canvas.width = document.querySelector('body').clientWidth;
var ctx = canvas.getContext('2d');

function random(from, to) {
	return Math.floor((Math.random() * (to - from)) + from);
}

function map(num, a1, a2, b1, b2) {
	if ((num >= a1 && num <= a2) || (num >= a2 && num <= a1)) {
		return ((Math.abs(num - a1) / (Math.abs(a1 - a2))) * (b2 - b1)) + b1;
	} else {
		return b1;
	}
}

class Particle {
	constructor(ctx) {
		this.ctx = ctx;
		this.genValues();
	}

	genValues() {
		this.dx = 0;
		this.x = random(-200, this.ctx.canvas.width + 200);
		this.y = random(-500, 0);
		this.z = random(1, 100);
		this.velocity = map(this.z, 1, 100, 5, 10);
		this.size = map(this.z, 1, 100, 1, 4);
	}

	fall() {
		this.y += 1 * this.velocity;
		this.x += this.dx * this.velocity / 10;
		if (this.y >= this.ctx.canvas.height + 10) {
			this.genValues();
		}
	}

	draw() {
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(-this.dx / this.velocity);
		this.ctx.fillStyle = 'purple';
		this.ctx.fillRect(this.x, this.y, 1 * this.size, 7 * this.size);
		this.ctx.rotate(this.dx / this.velocity);
		this.ctx.translate(-this.x, -this.y);
	}
}

var pArray = new Array(1000);
for (var i = 0; i < pArray.length; i++) {
	pArray[i] = new Particle(ctx);
}

var mx;

window.addEventListener('mousemove', function(e) {
	if (mx) {
		var shift = e.screenX - mx > 0 ? 5 : -5;
		pArray.map(function(particle) {
			particle.dx = shift;
		});
	}
	mx = e.screenX;
});

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	pArray.map(function(particle) {
		particle.fall()
		particle.draw()
	});
}

gameLoop();
