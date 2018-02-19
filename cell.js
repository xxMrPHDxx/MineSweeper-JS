const cellImage = document.createElement('img');
fetch('img/mine.png').then(res => cellImage.src = res.url);

export default class Cell{
	constructor(row,col,w,h){
		this.row = row;
		this.col = col;
		this.padding = 1;

		this.width = w - this.padding * 2;
		this.height = h - this.padding * 2;
		this.x = col * w + this.padding;
		this.y = row * h + this.padding;

		this.mineAround = 0;
		this.isMine = Math.random() < 0.09 ? true : false;
		this.isHidden = true;
	}

	reveal(){
		this.isHidden = false;
	}

	draw(ctx){
		ctx.fillStyle = color(this.isHidden ? 51 : 255);
		if(this.isMine && !this.isHidden){
			ctx.fillStyle = 'red';
		}
		ctx.fillRect(this.x,this.y,this.width,this.height);

		// Draw border
		ctx.strokeStyle = '#000';
		ctx.strokeRect(
			this.x - this.padding,
			this.y - this.padding,
			this.width + this.padding * 2,
			this.height + this.padding * 2
		);

		if(this.isHidden) return;

		if(this.isMine){
			ctx.drawImage(
				cellImage,
				this.x + this.width / 4,
				this.y + this.height / 4,
				this.width / 2 ,
				this.height / 2 
			);
		}else{
			// Show number of mine around
			if(this.mineAround === 0) return;
			ctx.fillStyle = color(0);
			ctx.textAlign = 'center';
			ctx.fillText(
				this.mineAround,
				this.x + this.width / 2,
				this.y + 3 * this.height / 4
			);
		}
	}
}