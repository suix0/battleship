export const Ship = () => {
  let shipLength;
  let hitCount = 0;

  const hit = () => {
    hitCount++;
  }

  const isSunk = () => {
    return shipLength === hitCount;
  }

  const getHitCount = () => {
    return hitCount;
  }
  return { shipLength, getHitCount, hit, isSunk };
}
