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
  const [board, setBoard] = useState(INITIAL_BOARD)

  const [turnOwner, setTurnOwner] = useState(FIRST_TURN_OWNER)

  const [isFinish, setIsFinish] = useState(false)

  const [winner, setWinner] = useState(null)

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
    if (checkWinner(newBoard)) {
      setIsFinish(true)
      setWinner(turnOwner)
      confetti()
      return
    } else if (checkTie(newBoard)) {
      setIsFinish(true)
      return
    }

    // Change turn owner
    setTurnOwner(turnOwner === TURN.x ? TURN.o : TURN.x)
  }

  function reset() {
    setBoard(INITIAL_BOARD)
    setTurnOwner(FIRST_TURN_OWNER)
    setIsFinish(false)
    setWinner(null)
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
                    const owner = !cellContent ? "" :
                      cellContent === FIRST_TURN_OWNER ? " first" : " second"

                    return (
                      <button
                        key={i + j}
                        className={"cell" + owner}
                        onClick={() => updateBoard(i, j)}
                        disabled={isFinish}
                      >
                        {cellContent}
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
