export function checkWinner(board) {
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

export function checkTie(board) {
  for (const row of board) {
    for (const value of row) {
      if (!value) return false
    }
  }
  return true
}