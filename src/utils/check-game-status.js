export function checkWinner(board) {
  const firstValue = board[0][0]
  if (
    firstValue && (
      // First row
      checkCells(firstValue, [board[0][1], board[0][2]]) ||
      // First diagonal
      checkCells(firstValue, [board[1][1], board[2][2]]) ||
      // First column
      checkCells(firstValue, [board[1][0], board[2][0]])
    )
  ) return true

  const firstRowSecondCol = board[0][1]
  if (firstRowSecondCol &&
    // Second column
    checkCells(firstRowSecondCol, [board[1][1], board[2][1]])
  ) return true

  const firstRowLastCol = board[0][2]
  if (
    firstRowLastCol && (
      // Last column
      checkCells(firstRowLastCol, [board[1][2], board[2][2]]) ||
      // Last diagonal
      checkCells(firstRowLastCol, [board[1][1], board[2][0]])
    )
  ) return true

  const secondRowFirstCol = board[1][0]
  if (secondRowFirstCol &&
    // Second row
    checkCells(secondRowFirstCol, [board[1][1], board[1][2]])
  ) return true

  const lastRowFirstCol = board[2][0]
  if (lastRowFirstCol &&
    // Last row
    checkCells(lastRowFirstCol, [board[2][1], board[2][2]])
  ) return true

  return false
}

function checkCells(value, cells) {
  for (const cell of cells) {
    if (cell !== value) return false
  }
  return true
}

export function checkTie(board) {
  for (const row of board) {
    for (const value of row) {
      if (!value) return false
    }
  }
  return true
}