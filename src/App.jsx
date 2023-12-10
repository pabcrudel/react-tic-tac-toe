/** Object containing 2 players and its icon
 * It's name is in Upper Case because it's value never changes
*/
const TURN = {x: 'x', o: 'o'}

/** An array of objects that will store game status
 * - At the beginning, is an array on `null`
 * - At the end could contain:
 *  [
 *    o, x, null,
 *    o, x, null,
 *    null, x, null
 *  ]
*/
const board = Array(9).fill(null)

function App() {

  return (
    <>
      <header>
        <h1>React Tic Tac Toe</h1>
      </header>

      <main className="board">
        <h2>Board</h2>
        <div className="game">
          {
            board.map((cell, i) =>
              <div className="cell" key={i}>
                <span className="cellContent">{i}</span>
              </div>
            )
          }
        </div>
      </main>
    </>
  )
}

export default App
