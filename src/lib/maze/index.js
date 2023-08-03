import { __copyVar, __isArrayInArray } from '../helpers';

class MazeBoard {
	constructor(board, updateCallback) {
		this.b = board;
		this.current_c = this.__getCoordinates(this.b, 2);
		this.updateCallback = (typeof updateCallback == undefined) ? null : updateCallback;
		// heading spec
		//   1
		// 4 0 2
		//   3
		this.heading = 1;

		// board spec:
		// 0: no path
		// 1: path
		// 2: start
		// 3: end
		// 4: current pos
		// 5: legal moves
		// 6: imminent move pos -- illegal
		// 7: imminent move pos -- legal
		this.__updateState();
		/*setInterval(() => {
			this.updateHeading((this.heading + 1) % 4 ? (this.heading + 1) % 4 : 4);
			//console.log(this.heading)
		}, 1000);*/
	}



	updateHeading(change) {
		var newHeading = this.heading+change;
		this.heading = ((newHeading % 4) ? newHeading % 4 : 4);
		this.__updateState();
	}

	move() {
		if (!this.__isNextMoveLegal()) return false;

		this.current_c = this.__getNextMovePos();
		this.__updateState();

		return true;
	}

	__getBoardText() {
		var textRepr = '';
		for (const row of this.current_board_state) {
			for (const e of row) {
				switch (e) {
				case 0:
					textRepr += `<span style="color: rgba(255, 255, 255, 0.25);">[${e}]</span>`;
					break;
				case 1:
					textRepr += `<span style="color: #ccc;">[${e}]</span>`;
					break;
				case 2:
					textRepr += `<span style="color: yellow;">[${e}]</span>`;
					break;
				case 3:
					textRepr += `<span style="color: green;">[${e}]</span>`;
					break;
				case 4:
					textRepr += `<span style="color: blue;">[${e}]</span>`;
					break;
				case 5:
					textRepr += `<span style="color: white;">[${e}]</span>`;
					break;
				case 6:
					textRepr += `<span style="color: red;">[${e}]</span>`;
					break;
				case 7:
					textRepr += `<span style="color: lightgreen;">[${e}]</span>`;
					break;
				}
			}
			textRepr += '<br>';
		}

		textRepr += `<br>heading ${this.heading}<br>legalMoves ${JSON.stringify(this.__computeLegalMoves())}<br>nextMove ${JSON.stringify(this.__getNextMovePos())}<br>nextMoveLegal ${this.__isNextMoveLegal()}<br>`;
		return textRepr;
	}

	__getCoordinates(array, char) {
		for (let i = 0; i < array.length; i++) {
			const i2 = array[i].indexOf(char);
			if (i2 !== -1)
				return [i, i2];
		}
		return undefined;
	}

	__computeLegalMoves() {
		var moves = [];

		//x
		if (this.b[this.current_c[0]][this.current_c[1] + 1] == 1) {
			moves.push([this.current_c[0], this.current_c[1] + 1]);
		}
		if (this.b[this.current_c[0]][this.current_c[1] - 1] == 1) {
			moves.push([this.current_c[0], this.current_c[1] - 1]);
		}

		//y
		if (this.b[this.current_c[0] + 1][this.current_c[1]] == 1) {
			moves.push([this.current_c[0] + 1, this.current_c[1]]);
		}
		if (this.b[this.current_c[0] - 1][this.current_c[1]] == 1) {
			moves.push([this.current_c[0] - 1, this.current_c[1]]);
		}
		//console.log(this.b, this.current_board_state, moves)
		return moves;
	}

	__isNextMoveLegal() {
		if (__isArrayInArray(this.__computeLegalMoves(), this.__getNextMovePos())) {
			return true;
		} else {
			return false;
		}
	}

	__getNextMovePos() {
		switch (this.heading) {
		case 0:
			return [this.current_c[0], this.current_c[1]];
		case 1:
			return [this.current_c[0] - 1, this.current_c[1]];
		case 4:
			return [this.current_c[0], this.current_c[1] - 1];
		case 2:
			return [this.current_c[0], this.current_c[1] + 1];
		case 3:
			return [this.current_c[0] + 1, this.current_c[1]];
		}
	}



	__updateState() {
		this.current_board_state = __copyVar(this.b);
		this.current_board_state[this.current_c[0]][this.current_c[1]] = 4;
		this.__computeLegalMoves().forEach(element => {
			this.current_board_state[element[0]][element[1]] = 5;
		});
		if (!this.__isNextMoveLegal()) {
			this.current_board_state[this.__getNextMovePos()[0]][this.__getNextMovePos()[1]] = 6;
		} else {
			this.current_board_state[this.__getNextMovePos()[0]][this.__getNextMovePos()[1]] = 7;
		}
		

		if (this.updateCallback) {
			this.updateCallback();
		}
	}
}

export default MazeBoard;

