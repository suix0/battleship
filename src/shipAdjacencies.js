const markAdjacentCells = (gameboard, shipCoordinates, shipLength, direction) => {
  // Get the x and y coordinates of and store themseparately 
  let x1 = shipCoordinates[0][0];
  let y1 = shipCoordinates[0][1];
  let x2 = x1;
  let y2 = y1;
  // Mark adjacencies in the board for horizontal ship placement 
  if (direction.includes('Horizontal')){
    if (direction.includes('left')) {
      --x1;
      ++y1;
      ++x2;
      ++y2;
    } else {
      --x1;
      --y1;
      ++x2;
      --y2;
    }
    for (let i = 0; i < shipLength + 2; i++) {
      if (gameboard[y1] !== undefined) {
        if (i === 0 || i === shipLength + 1) {
          gameboard[++x1][y1] = 'X';
          --x1;
        }
      }
      // Mark the adjacencies by incrementing or decrementing y depending on direction
      if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
        direction.includes('left') ? gameboard[x1][y1--] = 'X' : gameboard[x1][y1++] = 'X';
      } else {
        direction.includes('left') ? y1-- : y1++;
      }
      if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
        direction.includes('left') ? gameboard[x2][y2--] = 'X' : gameboard[x2][y2++] = 'X';
      } else {
        direction.includes('left') ? y2-- : y2++;
      }
    }
  } else if (direction.includes('Vertical')) {
    if (direction.includes('upward')) {
      ++x1;
      --y1;
      ++x2;
      ++y2;
    } else {
      --x1;
      --y1;
      --x2;
      ++y2;
    }
    for (let i = 0; i < shipLength + 2; i++) {
      if (gameboard[x1] !== undefined) {
        if (i === 0 || i === shipLength + 1) {
          gameboard[x1][++y1] = 'X';
          --y1;
        }
      }
       // Mark the adjacencies by incrementing or decrementing x depending on direction
      if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
        direction.includes('upward') ? gameboard[x1--][y1] = 'X' : gameboard[x1++][y1] = 'X';
      } else {
        direction.includes('upward') ? x1-- : x1++;
      }
      if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
        direction.includes('upward') ? gameboard[x2--][y2] = 'X' : gameboard[x2++][y2] = 'X';
      } else {
        direction.includes('upward') ? x2-- : x2++;
      }
    }
  }
  return gameboard;
}

export { markAdjacentCells };