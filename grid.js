import Cell from './cell.js';

export default class Grid{
	constructor(w,h,row=10,col=10){
		this.cells = Array(row).fill().map(() => Array(col).fill());
		this.cell_array = [];

		this.cellWidth = w / col;
		this.cellHeight = h / row;

		this.init(this.cellWidth,this.cellHeight);
	}

	init(width,height){
		this.forEachCell((cell,i,j) => {
			this.cells[i][j] = new Cell(i,j,width,height);
		});
		
		this.cell_array.splice(0);
		this.forEachCell(cell => {
			this.cell_array.push(cell);
		});

		this.countMines();
	}

	countMines(){
		this.forEachCell((cell,row,col) => {
			if(cell.isMine) return;
			let neighbors = this.cell_array.filter((other) => {
				return (other.col <= cell.col + 1 && other.col >= cell.col - 1) &&
						(other.row <= cell.row + 1 && other.row >= cell.row - 1) &&
						!(other.row === cell.row && other.col === cell.col);
			})
			let mineCount = neighbors.filter(c => c.isMine).length;
			this.cells[row][col].mineAround = mineCount;
		});
	}

	forEachCell(callback){
		this.cells.forEach((row,i) => {
			row.forEach((cell,j) => {
				callback(cell,i,j);
			});
		});
	}

	draw(ctx){
		this.forEachCell((cell,row,col) => {
			cell.draw(ctx);
		});
	}

	keyPressed(mouseX,mouseY){
		this.forEachCell((cell,row,col) => {
			if(mouseX > cell.x && mouseX < cell.x + cell.width && 
				mouseY > cell.y && mouseY < cell.y + cell.height){
				this.reveal(cell,true);
			}
		});
	}

	reveal(cell,shouldReveal=false){
		if(shouldReveal) cell.reveal();
		
		if(cell.isMine){
			alert('YOU LOSE');
			grid.init(this.cellWidth,this.cellHeight);
			return;
		}

		if(cell.mineAround !== 0) return;

		let neighbors = this.cell_array.filter(other => {
			return (other.col <= cell.col + 1 && other.col >= cell.col - 1) &&
					(other.row <= cell.row + 1 && other.row >= cell.row - 1) &&
					!(other.row === cell.row && other.col === cell.col);
		})

		let saveNeighbor = neighbors.filter(c => !c.isMine);

		saveNeighbor.forEach(c => {
			if(c.isMine || c.mineAround !== 0 || !c.isHidden) return;
			this.reveal(this.cells[c.row][c.col],true);
		})
	}
}