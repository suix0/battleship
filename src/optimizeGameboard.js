const markAdjacentCells = (gameboard, adjacentCoordinates, shipLength, direction) => {
  console.table(gameboard);
  console.log(adjacentCoordinates[shipLength].shipCoordinates);
  for (let i = 0; i < shipLength; i++) {
    // Get the x and y coordinates of and store themseparately 
    adjacentCoordinates[shipLength].adjacencies = []; 
    let x = adjacentCoordinates[shipLength].shipCoordinates[0][0];
    let y = adjacentCoordinates[shipLength].shipCoordinates[i][1];

    // Check for adjacencies for horizontal ship placement  
    if (direction.match('Horizontal')) {
      // Mark the bottom-adjacent of current coordinate if it is not undefined and is null
      if (++x !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push(gameboard[x][y]);
        --x;
      }

      // Mark the top-adjacent of current coordinate if it is not undefined and is null
      if (--x !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push(gameboard[x][y]);
        ++x;
      }

       // Mark the left-adjacent of current coordinate if it is not undefined and is null
      if (--y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push(gameboard[x][y]);
        ++y;
      }

       // Mark the top-left-adjacent of current coordinate if it is not undefined and is null
      if (--x !== undefined && --y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push(gameboard[x][y]);
        ++x;
        ++y;
      }

       // Mark the bottom-left-adjacent of current coordinate if it is not undefined and is null
      if (++x !== undefined && --y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push([x, y]);
        ++x;
        --y;
      }

       // Mark the right-adjacent of current coordinate if it is not undefined and is null
       if (++y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push([x, y]);
        --y;
      }

       // Mark the top-right-adjacent of current coordinate if it is not undefined and is null
      if (++x !== undefined && ++y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push([x, y]);
        --x;
        --y;
      }

       // Mark the bottom-right-adjacent of current coordinate if it is not undefined and is null
      if (--x !== undefined && ++y !== undefined && gameboard[x][y] === null) {
        adjacentCoordinates[shipLength].adjacencies.push([x, y]);
        ++x;
        --y;
      }
      // Check for adjacencies for vertical ship placement 
    } else if (direction.match('Vertical')) {
      
    }
  }
  console.log(adjacentCoordinates[shipLength].adjacencies);
}



export { markAdjacentCells };