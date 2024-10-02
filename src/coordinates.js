const initializeCordinates = (shipLength, gameBoard) => {
  let x = Math.ceil(Math.random() * 9);
  let y = Math.ceil(Math.random() * 9);
  return [x, y];
}

export default initializeCordinates;