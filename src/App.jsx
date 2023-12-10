import { useState } from "react"

/** Object containing 2 players and its icon
 * It's name is in Upper Case because it's value never changes
*/
const TURN = {x: 'x', o: 'o'}

function Cell({children, updateBoard, isFinish}) {
  return (
    <button className='cell' onClick={updateBoard} disabled={isFinish}>
      <span>{children}</span>
    </button>
  )
}

function App() {
  // Midudev called this variables "states".
  /** An array of objects that will store game status
   * - At the beginning, is an array on `null`
   * - At the end could contain:
   *  [
   *    o, x, null,
   *    o, x, null,
   *    null, x, null
   *  ]
   * - [<variable name>, <fn to change it>]
   * - useState() <= Allows to change the variable and sets a default value
  */
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turnOwner, setTurnOwner] = useState(TURN.x)

  const [isFinish, setIsFinish] = useState(false)

  const [winner, setWinner] = useState(null)

  function updateBoard(position) {
    // Can't override positions that were selected before
    if (board[position]) return

    /** It's a bad idea to mutate directly the state:
     * board[0] = 'x'
     * instead of that, a better approach is to create a new value and use the
     * mutation function (2nd item on the array)
     * To do so, as the board contains primitives, it can be cloned using spread
     * operator
     */
    const newBoard = [...board]

    // Set the turn owner icon on this position and update the board
    newBoard[position] = turnOwner
    setBoard(newBoard)

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

  function checkWinner(board) {
    // Check rows
    for (let i = 0; i <= 9; i += 3) {
      if (check(i, i + 3, 1, board)) return true
    }

    // Check columns
    for (let i = 0; i <= 9; i++) {
      if (check(i, i + 7, 3, board)) return true
    }
    
    // First diagonal
    if (check(0, 9, 4, board)) return true

    // Second diagonal
    if (check(2, 7, 2, board)) return true

    return false

    function check(init, fin, update, board) {
      let lastPiece = board[init];
      let count = 1;
      for (let i = init + update; i < fin; i += update) {
        if (lastPiece && lastPiece === board[i]) count++
        
        if (count === 3) return true
      }
      return false
    }
  }

  function checkTie(board) {
    return board.every(position => position !== null)
  }

  function reset() {
    setBoard(Array(9).fill(null))
    setTurnOwner(TURN.x)
    setIsFinish(false)
    setWinner(null)
  }

  return (
    <>
      <header>
        <h1>React Tic Tac Toe</h1>
      </header>

      <main>
        <h2>Board</h2>
        {
          !isFinish ? <p>Turn owner: {turnOwner}</p> :
            winner ? <p>The winner is {turnOwner}</p> :
              <p>No winners</p>
        }
        <div className="board">
          {
            board.map((cellContent, i) =>
              <Cell
                key={i}
                updateBoard={() => updateBoard(i)}
                isFinish={isFinish}
              >
                {cellContent}
              </Cell>
            )
          }
        </div>
        <button onClick={reset}>Reset</button>
      </main>
    </>
  )
}

export default App
