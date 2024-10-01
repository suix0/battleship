const markAdjacentCells = (gameboard, adjacentCoordinates, shipLength, direction) => {
  console.table(gameboard);
  console.log(direction);
  console.log(adjacentCoordinates[shipLength].shipCoordinates);
  // Get the x and y coordinates of and store themseparately 
  let x1 = adjacentCoordinates[shipLength].shipCoordinates[0][0];
  let y1 = adjacentCoordinates[shipLength].shipCoordinates[0][1];
  let x2 = x1;
  let y2 = y1;
  // Mark adjacencies in the board for horizontal ship placement 
  if (direction.includes('Horizontal')){
    if (direction.includes('left')) {
      --x1;
      ++y1;
      ++x2;
      ++y2;
      for (let i = 0; i < shipLength + 2; i++) {
        if (gameboard[y1] !== undefined) {
          if (i === 0 || i === shipLength + 1) {
            gameboard[++x1][y1] = 'X';
            --x1;
          }
        }
        if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
          gameboard[x1][y1--] = 'X';
        } else {
          continue;
        }
        if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
          gameboard[x2][y2--] = 'X';
        } else {
          continue;
        }
      }
    } else {
      --x1;
      --y1;
      ++x2;
      --y2;
      for (let i = 0; i < shipLength + 2; i++) {
        if (gameboard[y1] !== undefined) {
          if (i === 0 || i === shipLength + 1) {
            gameboard[++x1][y1] = 'X';
            --x1;
          }
        }
        if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
          gameboard[x1][y1++] = 'X';
        } else {
          continue
        }
        if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
          gameboard[x2][y2++] = 'X';
        } else {
          continue
        }
      }
    }
  } else if (direction.includes('Vertical')) {
    if (direction.includes('upward')) {
      ++x1;
      --y1;
      ++x2;
      ++y2;
      for (let i = 0; i < shipLength + 2; i++) {
        if (gameboard[x1] !== undefined) {
          if (i === 0 || i === shipLength + 1) {
            gameboard[x1][++y1] = 'X';
            --y1;
          }
        }
        if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
          gameboard[x1--][y1] = 'X';
        }
        if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
          gameboard[x2--][y2] = 'X';
        }
      }
    } else {
      --x1;
      --y1;
      --x2;
      ++y2;
      for (let i = 0; i < shipLength + 2; i++) {
        if (gameboard[x1] !== undefined) {
          if (i === 0 || i === shipLength + 1) {
            gameboard[x1][++y1] = 'X';
            --y1;
          }
        }
        if (gameboard[x1] !== undefined && gameboard[y1] !== undefined) {
          gameboard[x1++][y1] = 'X';
        }
        if (gameboard[x2] !== undefined && gameboard[y2] !== undefined) {
          gameboard[x2++][y2] = 'X';
        }
      }
    }
  }
  console.table(gameboard)
}



export { markAdjacentCells };