export const Ship = () => {
  let shipLength;
  let hitCount = 0;
  let isHit = false;

  const hit = () => {
    hitCount++;
    isHit = true;
  }

  const isShipHit = () => {
    return isHit;
  }

  const isSunk = () => {
    return shipLength === hitCount;
  }

  const getHitCount = () => {
    return hitCount;
  }
  return { shipLength, getHitCount, isShipHit, hit, isSunk };
}
