import { useState } from "react"
import { cloneDeep } from "lodash"
import confetti from "canvas-confetti"
import { TURN, FIRST_TURN_OWNER, INITIAL_BOARD } from './constants'
import { checkWinner, checkTie } from './utils/check-game-status'

function App() {
  /** Midudev called this variables "states".
   * - [<variable name>, <fn to change it>]
   * - useState() <= Allows to change the variable and sets a default value
  */
  /** An array of objects that will store game status
   * - At the beginning, is a 3x3 matrix filled with `null`:
   *  [
   *    [null, null, null],
   *    [null, null, null],
   *    [null, null, null]
   *  ]
   * - At the end could contain:
   *  [
   *    [x, null, null],
   *    [null, x, null],
   *    [o, o, x]
   *  ]
  */
  const [board, setBoard] = useState(() => {
    const storedBoard = window.localStorage.getItem('board')

    // Initial value assigned depending on if there is one stored yet
    return storedBoard ? JSON.parse(storedBoard) : INITIAL_BOARD
  })

  const [turnOwner, setTurnOwner] = useState(() => {
    const storedTurnOwner = window.localStorage.getItem('turnOwner')

    /* Using Nullish Coalescing, if `storedTurnOwner` is `null` or `undefined`
     * then the initial value will be set
    */
    return storedTurnOwner ? JSON.parse(storedTurnOwner) : FIRST_TURN_OWNER
  })

  const [isFinish, setIsFinish] = useState(false)

  const [winner, setWinner] = useState(null)

  const [winnerPositions, setWinnerPositions] = useState(null)

  function updateBoard(row, column) {
    // Can't override positions that were selected before
    if (board[row][column]) return

    /** It's a bad idea to mutate directly the state. It's better to create a
     * new value and use the mutation function (2nd item on the array)
     */
    /** Using `cloneDeep` from `Lodash` to copy recursively */
    const newBoard = cloneDeep(board)

    // Set the turn owner icon on this position and update the board
    newBoard[row][column] = turnOwner
    setBoard(newBoard)

    // Checking the current status of the game
    const winnerPositions = checkWinner(newBoard)
    if (winnerPositions) {
      setWinnerPositions(winnerPositions)
      setWinner(turnOwner)
      confetti()
      endGame()
      return
    } else if (checkTie(newBoard)) {
      endGame()
      return
    }

    // Change turn owner
    const newTurnOwner = turnOwner === TURN.x ? TURN.o : TURN.x
    setTurnOwner(newTurnOwner)

    // Save game on Local Storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turnOwner', JSON.stringify(newTurnOwner))
  }

  function checkCellStatus(i, j) {
    if(isFinish) {
      for (const position of winnerPositions) {
        if (i === position.i && j === position.j) return true
      }
    }
    return false
  }

  /** Sets all the states to it's initial value and clears the Local Storage */
  function reset() {
    setBoard(INITIAL_BOARD)
    setTurnOwner(FIRST_TURN_OWNER)
    setIsFinish(false)
    setWinner(null)
    setWinnerPositions(null)

    clearStorage()
  }

  /** Removes all data stored on Local Storage */
  function clearStorage() {
    /** Local Storage can be cleaned using `window.localStorage.clear()`
     * however, it's a bad idea because could erase all the stored data.
     */
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turnOwner')
  }

  /** Finish the game and clears the Local Storage */
  function endGame() {
    setIsFinish(true)
    clearStorage()
  }

  return (
    <>
      <header>
        <h1>React Tic Tac Toe</h1>
      </header>

      <main className="game">
        <h2>
          {
            !isFinish ? `Turn owner: ${turnOwner}` :
              winner ? `The winner is ${turnOwner}` : 'No winners'
          }
        </h2>

        <div className="board">
          {
            board.map((row, i) =>
              <div className="row" key={i}>
                {
                  row.map((cellContent, j) => {
                    const owner = !cellContent ? "empty" :
                      cellContent === FIRST_TURN_OWNER ? "first" : "second"

                    const isWinnerCell = checkCellStatus(i, j)

                    return (
                      <button
                        key={i + j}
                        className={"cell " + owner}
                        onClick={() => updateBoard(i, j)}
                        disabled={isFinish && !isWinnerCell}
                      >
                        {cellContent ? cellContent : '-'}
                      </button>
                    )
                  })
                }
              </div>
            )
          }
        </div>

        <button onClick={reset}>Reset</button>
      </main>
    </>
  )
}

export default App
