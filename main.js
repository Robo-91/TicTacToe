const heading = document.querySelector('h1');
const playerForm = document.getElementById('players-form')
const start = document.getElementById('start');
const message = document.getElementById('message');
const boardContainer = document.getElementById('board-container');
const restart = document.getElementById('restart');
let board = ['','','','','','','','',''];

let numberPlayers = confirm(`Click 'OK' to play against the Computer`);


start.addEventListener('click', () => {

	const playerOneName = document.getElementById('player-one').value;
	const playerTwoName = document.getElementById('player-two').value;

		playerForm.style.display = 'none';
		heading.style.display = 'none';

		// Dynamically Create Tic Tac Toe Board
		const gameBoard = (() => {

			restart.style.display = 'block';
			boardContainer.style.display = 'grid';
			message.style.display = 'block';

			for(let i = 0; i < board.length; i++){
				let createBoard = document.createElement('div');
				createBoard.id = i;
				createBoard.setAttribute(`style`, `border: 3px solid pink;
					text-align: center; 
					font-size: 50px;`);
				createBoard.textContent = '';
				boardContainer.appendChild(createBoard);
			}

		})();

	// Create player objects using factory function
	const Player = (name, marker, isTurn) => {
		return { name, marker, isTurn };
	};

	// Create IIFE to contains logic to the game
	const game = (() => {

		// if((numberPlayers === false) && !playerOneName || !playerTwoName) {
		// 	alert('Please Enter Your Name!');
		// 	message.style.display = 'none';
		// }

		const playerOne = Player(playerOneName, 'X');
		const playerTwo = Player(playerTwoName, 'O');

		// Function randomly assigns which player goes first
		function assignTurn(){
			const arr = [true, false];
			let randomTurn = Math.floor(Math.random() * arr.length);
			return arr[randomTurn];
		}
		
	if(numberPlayers === false) {
		playerOne.isTurn = assignTurn();

		if(playerOne.isTurn === true){
			playerTwo.isTurn = false;
			message.textContent = `${playerOne.name}'s Turn`;
		} else if(playerOne.isTurn === false){
			playerTwo.isTurn = true;
			message.textContent = `${playerTwo.name}'s Turn`;
		}
	}

		boardContainer.addEventListener('click', (e) => {

			const checkWinner = () => {
				// Winning Patterns 
				const winningPatterns = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

				// function that inserts markers on board with array index specified by winning patterns
				function checkCombo (arr, index){
					let combo = [];
		
					index.forEach(function(part) {
						combo.push(arr[part]);
					});
					return combo;
				}	

				// Checks to see if player marks on the board matches any patterns in winningPatterns 
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
			}
			
			// Player Vs Computer

			if (numberPlayers === true) {
				playerOne.isTurn = true;
				let filterChoices = () => {
					let boardNodes = [...boardContainer.childNodes];
					let choicesLeft = boardNodes.filter((item) => {
						return item.textContent === '';
					});
					return choicesLeft;
				}
	
				function computerChoice() {
					let randomChoice = Math.floor(Math.random() * filterChoices().length);
					let gridChoice = document.getElementById(`${filterChoices()[randomChoice].id}`);
					gridChoice.textContent = 'O';
					board.splice(gridChoice.id, 1, gridChoice.textContent);
				}
	
				const playerVsComputer = () => {
					if (playerOne.isTurn === true && e.target.textContent === '') {
						e.target.textContent = playerOne.marker;
						board.splice(e.target.id, 1, playerOne.marker);
						playerOne.isTurn = false;
						message.textContent = `${playerOneName}'s Turn`;
						checkWinner();
					}
					if (playerOne.isTurn === false) {
						message.textContent = `Computer's Turn`;
						computerChoice();
						playerOne.isTurn = true;
						checkWinner();
					}
				}
				
				playerVsComputer();
			}

			
			
			// Player V Player logic

			if (numberPlayers === false) {
				if(playerOne.isTurn === true && e.target.textContent === ''){
					e.target.textContent = playerOne.marker;
					playerOne.isTurn = false;
					playerTwo.isTurn = true;
					board.splice(e.target.id, 1, playerOne.marker);
					message.textContent = `${playerTwo.name}'s Turn`;
					checkWinner();
				} else if(playerTwo.isTurn === true && e.target.textContent === ''){
					e.target.textContent = playerTwo.marker;
					playerTwo.isTurn = false;
					playerOne.isTurn = true;
					board.splice(e.target.id, 1, playerTwo.marker);
					message.textContent = `${playerOne.name}'s Turn`;
					checkWinner();
				} 
			}
	
		});

	})();
	
});	

restart.addEventListener('click', () => {
	numberPlayers;
	board = ['','','','','','','','',''];
	playerForm.style.display = 'block';
	heading.style.display = 'block';
	boardContainer.innerHTML = '';
	message.style.display = 'none';
	restart.style.display = 'none';
	message.textContent = '';
	document.getElementById('player-one').value = '';
	document.getElementById('player-two').value = '';
});
