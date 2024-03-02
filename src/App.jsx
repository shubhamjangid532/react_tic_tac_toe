import { useState } from 'react'
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const Initial_Game_Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const derviedActivePlayer = (gameTurns) => {
  let currentPlayer = "X"
  if (gameTurns.length && gameTurns[0].player === "X"){
    currentPlayer = "O"
  }
  return currentPlayer
}

const derivedGameBoard = (gameTurns) => {
  let gameBoard = [...Initial_Game_Board.map(array => [...array])]

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col }  = square
      gameBoard[row][col] = player 
  }

  return gameBoard
}

const derivedWinner = (gameBoard, players) => {
  let winner

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol &&  firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derviedActivePlayer(gameTurns)

  const gameBoard = derivedGameBoard(gameTurns)
  
  const winner = derivedWinner(gameBoard, players)

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => ({...prevPlayers, [symbol]: newName}))
  }


  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIdx, colIdx){

    setGameTurns(prevTurns => {
      let currentPlayer = derviedActivePlayer(prevTurns)
      const updateTurns = [{square: {row: rowIdx, col: colIdx}, player: currentPlayer} ,...prevTurns]
      return updateTurns;
    })
  }

  const handleRestart = () => {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player 
            initailName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initailName={PLAYERS.O}
            symbol="0"
            isActive={activePlayer === "O"} 
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} 
          board={gameBoard}

        />
      </div>
      <Log turns={gameTurns}/>
    </main>
    
  )
}

export default App
