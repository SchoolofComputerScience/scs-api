import Sequelize from 'sequelize';
import Models from './data';

const config = {
  host: process.env.SQL_HOST,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const DB_Connection = new Sequelize(config);
const exlusion_list = ['id', 'updatedAt', 'createdAt']

DB_Connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//Models
// const Member = DB_Connection.define('directory', Models.members, 
// { 
//   freezeTableName: true,
//   defaultScope: {
//     attributes: { exclude: exlusion_list }
//   }
// });

// const Position = DB_Connection.define('positions', Models.positions, 
// {
//   freezeTableName: true,
//   defaultScope: {
//     attributes: { exclude: exlusion_list }
//   }
// });

const CoursesBySemester = DB_Connection.define('courses_by_semester', Models.courses, 
{ 
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
});

const CoursesSection = DB_Connection.define('course_sections', Models.courseSections,
{
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
});

const CrossListedCourses = DB_Connection.define('cross_listed_courses', Models.courseCrossListings,
{
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
});

const ClassMeetings = DB_Connection.define('class_meetings', Models.classMeetings,
{
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
});


//Relationships
// Member.hasMany(Position, { foreignKey: 'scid', sourceKey: 'scid', as: 'positions' });
// Position.belongsTo(Member, { foreignKey: 'scid', sourceKey: 'scid' });

CoursesBySemester.hasMany(CoursesSection, { foreignKey: 'course_id', sourceKey: 'course_id', as: 'course_sections' });
CoursesSection.belongsTo(CoursesBySemester, { foreignKey: 'course_id', sourceKey: 'course_id' });
CoursesSection.hasMany(CrossListedCourses, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'cross_listed_courses' });
CrossListedCourses.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });
CoursesSection.hasMany(ClassMeetings, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'class_meetings' });
ClassMeetings.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });





export default DB_Connection;