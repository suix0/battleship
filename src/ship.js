export const Ship = () => {
  let shipLength;
  let hitCount;

  const hit = () => {
    hitCount++;
  }

  const isSunk = () => {
    return shipLength === hitCount;
  }

  return { shipLength, hit, isSunk };
}
