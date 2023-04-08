const gameBoard=(()=>{
    let board = ['','','','','','','','','']
    const tiles = Array.from(document.querySelectorAll('.game-box'))
    const reset = document.querySelector(".restart")
    const status = document.querySelector(".game-status")
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    return{board, tiles, reset, status, winningConditions}
})();

const gameController=(()=>{

    let isGameActive= true;
    let currentPlayer = 'X'
    gameBoard.status.textContent = currentPlayer + "'s turn!" 

    let updateBoard = (index) =>{
        gameBoard.board[index] = currentPlayer
    }

    let changePlayer = ()=>{
        if(isGameActive){
            if(currentPlayer==='X'){
                currentPlayer='O'
            }else{
                currentPlayer='X'
            }
            gameBoard.status.textContent = currentPlayer + "'s turn!" 
        }

    }

    const userAction= (tile, index)=>{
        console.log(currentPlayer)
        if(inputValid(tile) && isGameActive){
            tile.innerText = currentPlayer
            updateBoard(index)
            handleResult();
            changePlayer();
        }
    }

    const inputValid=(tile)=>{
        if(tile.innerText==='X' || tile.innerText==='O'){
            return false;
        }else{
            return true
        }
    }


    const gameStatus = (whichPlayer)=>{
        console.log("Here")
        switch(whichPlayer){
            case 'X':
                gameBoard.status.textContent = "Player " + whichPlayer + " wins. Congrats!"
                break;
            case 'O':
                gameBoard.status.textContent = "Player " + whichPlayer + " wins. Congrats!"
                break;
            case 'Tie':
                gameBoard.status.textContent = "It's a draw!"
                break;
        }
    }

    const handleResult = ()=>{
        console.log("Hello")
        let roundWon;
        for(let i=0;i<=7;i++){
            let winningConditionsSub = gameBoard.winningConditions[i]
            let a = gameBoard.board[winningConditionsSub[0]]
            let b = gameBoard.board[winningConditionsSub[1]]
            let c = gameBoard.board[winningConditionsSub[2]]
            if(a==='' || b==='' || c===''){
                continue
            }if(a===b && b===c){
                console.log("Ssup")
                roundWon=true;
                break
            }
        }
        if(roundWon){
            console.log("Gotcha")
            gameStatus(currentPlayer)
            isGameActive = false;
            return
        }
        if(!roundWon && !gameBoard.board.includes('')){
            gameStatus('Tie')
            isGameActive = false;
        }

    }

    const tilesListener = ()=>{
        gameBoard.tiles.forEach((tile, index)=>{
            tile.addEventListener('click', ()=>userAction(tile, index))
        })
    }


    const reset = ()=>{
        console.log("Reset?")
        gameBoard.board = ['','','','','','','','',''];
        isGameActive=true;
        currentPlayer='X'
        gameBoard.status.textContent = currentPlayer + "'s turn!" 
        gameBoard.tiles.forEach((tile =>{
            tile.innerText='';
        }))
    }


    return{tilesListener, reset}
})();

gameController.tilesListener();
gameBoard.reset.addEventListener('click', ()=>gameController.reset());