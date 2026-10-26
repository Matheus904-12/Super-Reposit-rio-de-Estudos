let currentPlayer = 'X'; //jogador humano, indica d qm é a vez no jogo
let board = ['', '', '', '', '', '', '', '', '']; //estado atual do tabuleiro
let gameActive = true; //mostra se o jogo está em andamento ou finalizado
let mascotImage = "../fotos2/Mascote.png"; // add o caminho da imagem do mascote
let mascotMoves = [0, 2, 4, 6, 8]; // espaços onde o mascote pode jogar

function makeMove(index) {
    if (board[index] === '' && gameActive) { //mostra se o jogo ainda está ativo
        board[index] = currentPlayer; //atualiza o tabuleiro
        const cell = document.getElementsByClassName('cell')[index];
        cell.innerHTML = `<span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span>`; //seleciona o espaço e insere o símbolo do jogador
        checkWinner(); //verifica se há jogador ou empate

        if (gameActive && currentPlayer === 'X') {
            currentPlayer = 'O'; // mascote joga
            showMascotMove(); // mostra o mascote jogando 
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ]; //lista das combinações

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('status').innerText = `${currentPlayer === 'X' ? 'Jogador' : 'Mascote'} venceu!`;
            return; //o jogo termina e mostra qm venceu
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        document.getElementById('status').innerText = 'Empate!';
    }
}

function showMascotMove() {
    // O mascote joga em um espaço vazio
    let availableMoves = mascotMoves.filter(index => board[index] === '');
    if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        let mascoteDiv = document.getElementsByClassName('cell')[move];

        // mostra o mascote
        mascoteDiv.innerHTML = `<img src="${mascotImage}" alt="Mascote">`;

        // dps da imagem, o mascote faz a jogada
        setTimeout(function() {
            mascoteDiv.innerHTML = `<span class="o">O</span>`;
            board[move] = 'O'; // mascote faz a jogada
            checkWinner();

            // Depois da jogada, o mascote desaparece e volta à vez do jogador
            setTimeout(function() {
                currentPlayer = 'X'; // vez d jogar
            }, 500);
        }, 500); // O mascote joga dps d um tempo
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = '';
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerHTML = ''; // Limpa os espaços
    } //reseta todas as variáveis e limpa o tabuleiro
}
