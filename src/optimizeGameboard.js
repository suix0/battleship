const markAdjacentCells = (gameboard, adjacentCoordinates, shipLength, direction) => {
  console.table(gameboard);
  adjacentCoordinates[shipLength].adjacencies = []; 
  adjacentCoordinates = checkAdjacency(gameboard, adjacentCoordinates, direction, shipLength);
  console.log(adjacentCoordinates[shipLength].adjacencies);
}


const checkAdjacency = (gameboard, adjacentCoordinates, direction, shipLength) => {
  for (let i = 0; i < shipLength; i++) {
    // Get the x and y coordinates of and store themseparately 
    let x = adjacentCoordinates[shipLength].shipCoordinates[i][0];
    let y = adjacentCoordinates[shipLength].shipCoordinates[i][1];
    // Check for adjacencies for horizontal ship placement  
    if (direction === 'rightHorizontal') {
      if (i === 0) {
         // Mark the bottom-adjacent of current coordinate if it is not undefined and is null
         if (++x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --x;
        }
        // Mark the top-adjacent of current coordinate if it is not undefined and is null
        if (--x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++x;
        }
        // Mark the top-left-adjacent of current coordinate if it is not undefined and is null
        if (--x !== undefined && --y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++x;
          ++y;
        }
        // Mark the bottom-left-adjacent of current coordinate if it is not undefined and is null
        if (++x !== undefined && --y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --x;
          ++y;
        }
         // Mark the left-adjacent of current coordinate if it is not undefined and is null
         if (--y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++y;
        }
      } else if (i === (shipLength - 1)) {
        // Mark the bottom-adjacent of current coordinate if it is not undefined and is null
        if (++x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --x;
        }
        // Mark the top-adjacent of current coordinate if it is not undefined and is null
        if (--x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++x;
        }
        // Mark the top-right-adjacent of current coordinate if it is not undefined and is null
        if (++x !== undefined && ++y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --x;
          --y;
        } 
        // Mark the bottom-right-adjacent of current coordinate if it is not undefined and is null
        if (--x !== undefined && ++y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++x;
          --y;
        }
        // Mark the right-adjacent of current coordinate if it is not undefined and is null
        if (++y !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --y;
        }
      } else {
          // Mark the bottom-adjacent of current coordinate if it is not undefined and is null
        if (++x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          --x;
        }
        // Mark the top-adjacent of current coordinate if it is not undefined and is null
        if (--x !== undefined && gameboard[x][y] !== undefined && gameboard[x][y] === null) {
          adjacentCoordinates[shipLength].adjacencies.push([x, y]);
          ++x;
        }
      }
    }
  }
  return adjacentCoordinates;
}


export { markAdjacentCells };