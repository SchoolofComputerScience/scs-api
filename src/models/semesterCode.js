// @TODO: May want to move this to a different directory. Not sure if there are
// other use cases where data does not come from a database or API but must be
// generated.

const getCurrentSemesterCode = function() {
  let semesterCode = { 0: 'S', 1: 'S', 2: 'S', 3: 'M', 4: 'M', 5: 'M', 6: 'M', 7: 'F', 8: 'F', 9: 'F', 10: 'F', 11: 'S' };
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  return semesterCode[currentMonth] + currentDate.getFullYear().toString().substr(2,3);
};

export default getCurrentSemesterCode;
