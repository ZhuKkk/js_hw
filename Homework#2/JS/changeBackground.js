let logo = document.getElementById('add');
logo.onmouseover = function() {rndColor()};
	
function rndColor() {
	let r = Math.floor(Math.random()*200),
		g = Math.floor(Math.random()*200),
		b = Math.floor(Math.random()*200);
	setColor(r, g, b);	
}

function setColor (r, g, b){
	let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
	logo.style.color = (r > 128 && g > 128 && b > 128) ? 'black' : 'white';
	logo.style.backgroundColor = rgb;
}

setInterval(() => {
	let colors = logo.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
	if (colors.length == 1) rndColor();
	else {
		let	r = +colors[0],
			g = +colors[1],
			b = +colors[2];
		if (b+3 < 255) b += 3;
		else if (g+2 < 255) g += 2;
		else if (r+1 < 255) r += 1;
		else { 
			rndColor();
			return;
		}		
		setColor(r, g, b);
	}
}, 1000);
