const playerForm = document.getElementById('players-form')
const start = document.getElementById('start');
const message = document.getElementById('message');
const boardContainer = document.getElementById('board-container');
const restart = document.getElementById('restart');
let board = ['','','','','','','','',''];

start.addEventListener('click', () => {

	const playerOneName = document.getElementById('player-one').value;
	const playerTwoName = document.getElementById('player-two').value;

	if(!playerOneName || !playerTwoName) {
		alert('Please Enter Your Name!');
		message.style.display = 'none';
	}

	if(playerOneName && playerTwoName) {

		playerForm.style.display = 'none';

		const gameBoard = (() => {

			restart.style.display = 'block';
			boardContainer.style.display = 'grid';
			message.style.display = 'block';

			for(let i = 0; i < board.length; i++){
				let createBoard = document.createElement('div');
				createBoard.id = i;
				createBoard.setAttribute(`style`, `border: 3px solid pink;
					text-align: center; 
					line-height: 150px;
					font-size: 50px;`);
				createBoard.textContent = '';
				boardContainer.appendChild(createBoard);
			}

		})();
		
	const Player = (name, marker, isTurn) => {
		return { name, marker, isTurn };
	};


	const game = (() => {

		const playerOne = Player(playerOneName, 'X');
		const playerTwo = Player(playerTwoName, 'O');

		function assignTurn(){
			const arr = [true, false];
			let randomTurn = Math.floor(Math.random() * arr.length);
			return arr[randomTurn];
		}

		playerOne.isTurn = assignTurn();

		if(playerOne.isTurn === true){
			playerTwo.isTurn = false;
			message.textContent = `${playerOne.name}'s Turn`;
		} else if(playerOne.isTurn === false){
			playerTwo.isTurn = true;
			message.textContent = `${playerTwo.name}'s Turn`;
		}

		boardContainer.addEventListener('click', (e) => {

			const winningPatterns = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7]
				, [2,5,8], [0,4,8], [2,4,6] ];

			if(playerOne.isTurn === true && e.target.textContent === ''){
				e.target.textContent = playerOne.marker;
				playerOne.isTurn = false;
				playerTwo.isTurn = true;
				board.splice(e.target.id, 1, playerOne.marker);
				message.textContent = `${playerTwo.name}'s Turn`;
			} else if(playerTwo.isTurn === true && e.target.textContent === ''){
				e.target.textContent = playerTwo.marker;
				playerTwo.isTurn = false;
				playerOne.isTurn = true;
				board.splice(e.target.id, 1, playerTwo.marker);
				message.textContent = `${playerOne.name}'s Turn`
			}

			for(let i = 0; i < winningPatterns.length; i++){

				let patterns = checkCombo(board, winningPatterns[i]);
					const a = patterns[0];
					const b = patterns[1];
					const c = patterns[2];

					if(a === 'X' || a === 'O') {
						if(b === a && c === a) {
							message.textContent = `${a} is the Winner!`;
							playerOne.isTurn = false;
							playerTwo.isTurn = false;
							break;
						}
					}

					if(!board.includes('')){
						if(b !== a && c !== a){
							message.textContent = `It's a Tie!`;
							break;
						}
					}

			}
		
		});

	})();

	function checkCombo (arr, index){
		let combo = [];

		index.forEach(function(part) {
			combo.push(arr[part]);
		});

		return combo;
	}

	}

});

restart.addEventListener('click', () => {
	board = ['','','','','','','','',''];
	playerForm.style.display = 'block';
	boardContainer.innerHTML = '';
	message.style.display = 'none';
	restart.style.display = 'none';
});

