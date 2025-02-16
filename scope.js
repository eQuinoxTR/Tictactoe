function TicTacToe(){
    let domModule = (function() {
        
        let grid = document.querySelectorAll(".grid");
        let playerOneScoreTxt = document.querySelector(".playerA");
        let playerTwoScoreTxt = document.querySelector(".playerB");
        let clearing;
        grid.forEach((tile, tileNumber) => {
            tile.addEventListener("click", (e) => {
                if (clearing === true) {
                    e.preventDefault; // to avoid bugs
                } else if (gameModule.turnsMadeByX == gameModule.turnsMadeByO) {
                    play("x", tileNumber, e);
                } else if (gameModule.turnsMadeByO < gameModule.turnsMadeByX){
                    play("o", tileNumber, e);
                } 
            });
        });

        function clear() {
            clearing = true;
            setTimeout(() => {
                clearing = false;
                grid.forEach((tile) => {
                tile.textContent = "";
                gameModule.board = [ " ", " ", " ",
                                     " ", " ", " ",
                                     " ", " ", " " ];
                })}, 1000);

            if (gameModule.win === true) {
                grid.forEach((tile, index) => {
                    if (gameModule.storeCombination.includes(index)) {
                        tile.style.backgroundColor = 'rgb(' + 188 + ',' + 245 + ',' + 193 + ')';
                        setTimeout(() => {
                            tile.style.backgroundColor = 'white'
                        }, 1000)
                    }
                })  
                gameModule.win = false;
            }
        }

        return {playerOneScoreTxt, playerTwoScoreTxt, clear}
    })();

    let gameModule = (function(){
        
        let win;
        let loss;
        let turnsMadeByX = 0; let turnsMadeByO = 0;
        let storeCombination = "";
        let board = [ " ", " ", " ",
                      " ", " ", " ",
                      " ", " ", " " ];
        return {board, turnsMadeByX, turnsMadeByO, win, loss, storeCombination}
    })()

    function play(play, position, e) {
        if ((play == "x") && (gameModule.board[position].includes(" "))) {
            gameModule.turnsMadeByX++; 
            gameModule.board[position] = play;
            e.target.textContent = "x";
            detectIfTheresWinner();
            return;
        } else if ((play == "o") && (gameModule.board[position].includes(" "))) {
            gameModule.turnsMadeByO++; 
            gameModule.board[position] = play;
            e.target.textContent = "o";
            detectIfTheresWinner();
            return;
        } else {
            e.target.style.backgroundColor = 'rgb(' + 236 + ',' + 90 + ',' + 79 + ')';
            setTimeout(()=>{e.target.style.backgroundColor = "white"}, 250); 
            return;
        }
    }

    let detectIfTheresWinner = function() {
        let winningCombinations = ["012", "345", "678", "036", "147", "258", "048", "246"];
            for (let combination of winningCombinations){
                let checkForLine = gameModule.board.filter((XO, index) => combination.includes(index));
                    if(checkForLine[0] == "x" && checkForLine[1] == "x" && checkForLine[2] == "x") {
                        gameModule.storeCombination = `${combination}`;
                        gameModule.win = true;
                        domModule.clear()
                        domModule.playerOneScoreTxt.textContent = +domModule.playerOneScoreTxt.textContent + 1
                        return;
                    } else if (checkForLine[0] == "o" && checkForLine[1] == "o" && checkForLine[2] == "o") {
                        gameModule.storeCombination = `${combination}`;
                        gameModule.win = true;
                        domModule.clear()
                        domModule.playerTwoScoreTxt.textContent = +domModule.playerTwoScoreTxt.textContent + 1
                        return;
                    }
            }   

    let checkForTie = function(){
            if (gameModule.board.includes(" ")) {return;} 
            else {
                domModule.clear();
                domModule.playerOneScoreTxt.textContent = +domModule.playerOneScoreTxt.textContent + 1;
                domModule.playerTwoScoreTxt.textContent = +domModule.playerTwoScoreTxt.textContent + 1;
                return;
            }
        }();
    }
    return{ play }
}

TicTacToe()

