import Grid from './grid.js';

const canvas = document.querySelector('canvas#Game');
const ctx = canvas.getContext('2d');

window.color = function(value){
	return `rgb(${value},${value},${value})`;
}

let grid = new Grid(canvas.width,canvas.height,30,30);
window.grid = grid;

function update(){
	ctx.fillStyle = color(51);
	ctx.fillRect(0,0,canvas.width,canvas.height);

	grid.draw(ctx);

	requestAnimationFrame(update);
}
update();

let mousepressed = false;
let lastMouseButton = null;
window.onmousedown = function(e){
	if(mousepressed || lastMouseButton !== e.buttons) {
		grid.keyPressed(e.clientX,e.clientY);
		mousepressed = true;
		lastMouseButton = e.buttons;
	}
}