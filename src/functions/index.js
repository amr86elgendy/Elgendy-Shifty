export function checkDayOutOfNumber(employers, date, bird) {
  let fullBirdDays = [];
  employers.map((emp) => fullBirdDays.push(...emp[bird]));
  const count = fullBirdDays.reduce((acc, day) => {
    day === date && acc++;
    return acc;
  }, 0);
  return count;
}

export function checkDayOutOfBird(employers, activeEmp, date, bird) {
  const fullEmployerDays = employers[activeEmp][bird[0]].concat(
    employers[activeEmp][bird[1]]
  );
  return fullEmployerDays.some((day) => day === date);
}
