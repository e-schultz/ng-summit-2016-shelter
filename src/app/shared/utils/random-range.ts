export function randomRange(min, max) {
  /* tslint:disable */
  // I'll bitwise if I want to
  return ~~(Math.random() * (max - min + 1)) + min
  /* tslint:enable */
};
