/** Object containing 2 players and its icon.
 * It's name is in Upper Case because it's value never changes
*/
export const TURN = { x: 'x', o: 'o' };

export const FIRST_TURN_OWNER = TURN.x;

export const INITIAL_BOARD = [
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null)
];
