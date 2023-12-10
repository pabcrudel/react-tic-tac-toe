import { useState } from "react"

/** Object containing 2 players and its icon
 * It's name is in Upper Case because it's value never changes
*/
const TURN = {x: 'x', o: 'o'}

function Cell({children, updateBoard}) {
  return (
    <button className='cell' onClick={updateBoard}>
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

  function updateBoard(position) {
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

    // Change turn owner
    setTurnOwner(turnOwner === TURN.x ? TURN.o : TURN.x)
  }

  return (
    <>
      <header>
        <h1>React Tic Tac Toe</h1>
      </header>

      <main>
        <h2>Board</h2>
        <p>Turn owner: {turnOwner}</p>
        <div className="board">
          {
            board.map((cellContent, i) =>
              <Cell
                key={i}
                updateBoard={() => updateBoard(i)}
              >
                {cellContent}
              </Cell>
            )
          }
        </div>
      </main>
    </>
  )
}

export default App
