import { useState } from "react"
import { cloneDeep } from "lodash"

/** Object containing 2 players and its icon
 * It's name is in Upper Case because it's value never changes
*/
const TURN = {x: 'x', o: 'o'}

const INITIAL_BOARD = [
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null)
]

const FIRST_TURN_OWNER = TURN.x

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
                  row.map((cellContent, j) =>
                    <button
                      key={i + j}
                      className='cell'
                      onClick={() => updateBoard(i, j)}
                      disabled={isFinish}
                    >
                      {cellContent}
                    </button>
                  )
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

function checkWinner(board) {
  const firstValue = board[0][0]
  if (
    firstValue && (
      // First row
      (firstValue === board[0][1] && firstValue === board[0][2]) ||
      // First diagonal
      (firstValue === board[1][1] && firstValue === board[2][2]) ||
      // First column
      (firstValue === board[1][0] && firstValue === board[2][0])
    )
  ) return true
  
  const firstRowSecondCol = board[0][1]
  if (firstRowSecondCol && (
      // Second column
      firstRowSecondCol === board[1][1] && firstRowSecondCol === board[2][1]
    )
  ) return true

  const firstRowLastCol = board[0][2]
  if (
    firstRowLastCol && (
      // Last column
      (firstRowLastCol === board[1][2] && firstRowLastCol === board[2][2]) ||
      // Last diagonal
      (firstRowLastCol === board[1][1] && firstRowLastCol === board[2][0])
    )
  ) return true

  const secondRowFirstCol = board[1][0]
  if (secondRowFirstCol && (
      // Second row
      (secondRowFirstCol === board[1][1] && secondRowFirstCol === board[1][2])
    )
  ) return true

  const lastRowFirstCol = board[2][0]
  if (lastRowFirstCol && (
      // Last row
      (lastRowFirstCol === board[2][1] && lastRowFirstCol === board[2][2])
    )
  ) return true

  return false
}

function checkTie(board) {
  for (const row of board) {
    for (const value of row) {
      if (!value) return false
    }
  }
  return true
}

export default App
