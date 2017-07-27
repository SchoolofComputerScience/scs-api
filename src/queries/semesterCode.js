import { GraphQLString } from 'graphql'

export default {
  type: GraphQLString,
  description: 'Upcoming Semester Code',
  resolve: function(_, args) {
    let semesterCode = { 0: 'S', 1: 'S', 2: 'S', 3: 'S', 4: 'M', 5: 'M', 6: 'M', 7: 'M', 8: 'F', 9: 'F', 10: 'F', 11: 'F' };
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 4;
    return semesterCode[currentMonth] + currentDate.getFullYear().toString().substr(2,3);
  }
}
