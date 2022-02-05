export const getMovementDirection = (e, d) => {
  if (Math.sign(d.deltaY) === 1) {
    return { y: 'up' };
  } else if (Math.sign(d.deltaY) === -1) {
    return { y: 'down' };
  }

  if (Math.sign(d.deltaX) === 1) {
    return { x: 'right' };
  } else if (Math.sign(d.deltaX) === -1) {
    return { x: 'left' };
  }
};