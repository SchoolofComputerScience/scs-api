import dotenv from 'dotenv';
dotenv.load({ path: '.env' });
import Sequelize from 'sequelize';
import Models from './models';

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

const DB_CONNECTION = new Sequelize(config);
const EXCLUSION_LIST = ['id', 'updatedAt', 'createdAt'];

DB_CONNECTION.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//Models
const Member = DB_CONNECTION.define('directory', Models.members, { 
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Position = DB_CONNECTION.define('positions', Models.positions, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Profile = DB_CONNECTION.define('gs_profiles', Models.profile, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Publications = DB_CONNECTION.define('gs_publications', Models.publications, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const CoursesBySemester = DB_CONNECTION.define('courses_by_semester', Models.courses, { 
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const CoursesSection = DB_CONNECTION.define('course_sections', Models.courseSections, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const CrossListedCourses = DB_CONNECTION.define('cross_listed_courses', Models.courseCrossListings, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ClassMeetings = DB_CONNECTION.define('class_meetings', Models.classMeetings, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ChildCourses = DB_CONNECTION.define('child_courses', Models.childCourses, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ParentCourses = DB_CONNECTION.define('parent_courses', Models.parentCourses, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ResearchAreas = DB_CONNECTION.define('research_areas', Models.researchAreas, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ResearchAreaCourses = DB_CONNECTION.define('research_courses', Models.researchAreaCourses, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const ResearchAreaMembers = DB_CONNECTION.define('research_members', Models.researchAreaMembers, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Instructors = DB_CONNECTION.define('instructors', Models.instructors, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Events = DB_CONNECTION.define('events', Models.events, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  }
});

const News = DB_CONNECTION.define('news', Models.news, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  }
});

const Departments = DB_CONNECTION.define('departments', Models.departments, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});

const Programs = DB_CONNECTION.define('programs', Models.programs, {
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: EXCLUSION_LIST }
  }
});



//Relationships

//------DIRECTORY------//
Member.hasMany(Position, { foreignKey: 'scid', sourceKey: 'scid', as: 'positions' });
Position.belongsTo(Member, { foreignKey: 'scid', sourceKey: 'scid' });

Member.hasMany(Profile, { foreignKey: 'scid', sourceKey: 'scid', as: 'gs_profiles' });
Profile.belongsTo(Member, { foreignKey: 'scid', sourceKey: 'scid' });

Member.hasMany(Publications, { foreignKey: 'scid', sourceKey: 'scid', as: 'gs_publications' });
Publications.belongsTo(Member, { foreignKey: 'scid', sourceKey: 'scid' });


//------COURSES------//
CoursesBySemester.hasMany(CoursesSection, { foreignKey: 'course_id', sourceKey: 'course_id', as: 'course_sections' });
CoursesSection.belongsTo(CoursesBySemester, { foreignKey: 'course_id', sourceKey: 'course_id' });

CoursesSection.hasMany(CoursesBySemester, { foreignKey: 'course_id', sourceKey: 'course_id', as: 'course_section_courses' });
CoursesBySemester.belongsTo(CoursesSection, { foreignKey: 'course_id', sourceKey: 'course_id' });

CoursesSection.hasMany(CrossListedCourses, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'cross_listed_courses' });
CrossListedCourses.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });

CoursesSection.hasMany(ClassMeetings, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'class_meetings' });
ClassMeetings.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });

CoursesSection.hasMany(ChildCourses, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'child_courses' });
ChildCourses.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });

CoursesSection.hasMany(ParentCourses, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'parent_courses' });
ParentCourses.belongsTo(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });

Instructors.hasMany(CoursesSection, { foreignKey: 'course_section_id', sourceKey: 'course_section_id', as: 'instructor_course_sections' });
CoursesSection.belongsTo(Instructors, { foreignKey: 'course_section_id', sourceKey: 'course_section_id' });


//------RESEARCH AREAS------//
ResearchAreaCourses.hasMany(CoursesBySemester, { foreignKey: 'course_id', sourceKey: 'course_id', as: 'research_area_courses' });
CoursesBySemester.belongsTo(ResearchAreaCourses, { foreignKey: 'course_id', sourceKey: 'course_id' });

ResearchAreaMembers.hasMany(Member, { foreignKey: 'scid', sourceKey: 'scid', as: 'research_area_members' });
Member.belongsTo(ResearchAreaMembers, { foreignKey: 'scid', sourceKey: 'scid' });



export default DB_CONNECTION;