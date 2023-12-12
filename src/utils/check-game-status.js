export function checkWinner(board) {
  const firstValue = board[0][0]
  if (firstValue) {
    let firstPosition = {i: 0, j: 0}

    // First row
    if (checkCells(firstValue, [board[0][1], board[0][2]])) {
      return [firstPosition, {i: 0, j: 1}, {i: 0, j: 2}]
    }
    // First diagonal
    if (checkCells(firstValue, [board[1][1], board[2][2]])) {
      return [firstPosition, {i: 1, j: 1}, {i: 2, j: 2}]
    }
    // First column
    if (checkCells(firstValue, [board[1][0], board[2][0]])) {
      return [firstPosition, {i: 1, j: 0}, {i: 2, j: 0}]
    }
  }

  const firstRowSecondCol = board[0][1]
  if (firstRowSecondCol) {
    let firstPosition = {i: 0, j: 1}

    // Second column
    if (checkCells(firstRowSecondCol, [board[1][1], board[2][1]])) {
      return [firstPosition, {i: 1, j: 1}, {i: 2, j: 1}]
    }
  }

  const firstRowLastCol = board[0][2]
  if (firstRowLastCol) {
    let firstPosition = {i: 0, j: 2}

    // Last column
    if (checkCells(firstRowLastCol, [board[1][2], board[2][2]])) {
      return [firstPosition, {i: 1, j: 2}, {i: 2, j: 2}]
    }
    // Last diagonal
    if (checkCells(firstRowLastCol, [board[1][1], board[2][0]])) {
      return [firstPosition, {i: 1, j: 1}, {i: 2, j: 0}]
    }
  }

  const secondRowFirstCol = board[1][0]
  if (secondRowFirstCol) {
    let firstPosition = {i: 1, j: 0}

    // Second row
    if (checkCells(secondRowFirstCol, [board[1][1], board[1][2]])) {
      return [firstPosition, {i: 1, j: 1}, {i: 1, j: 2}]
    }
  }

  const lastRowFirstCol = board[2][0]
  if (lastRowFirstCol) {
    let firstPosition = {i: 2, j: 0}

    // Last row
    if (checkCells(lastRowFirstCol, [board[2][1], board[2][2]])) {
      return [firstPosition, {i: 2, j: 1}, {i: 2, j: 2}]
    }
  }

  return null
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