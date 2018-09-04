import sequelize from 'sequelize';

const CoursesSchema =
  {
    course_id: { type: sequelize.Sequelize.STRING },
    course_number: { type: sequelize.Sequelize.STRING },
    semester_code: { type: sequelize.Sequelize.STRING },
    college: { type: sequelize.Sequelize.STRING },
    department: { type: sequelize.Sequelize.STRING },
    description: { type: sequelize.Sequelize.STRING },
    graduate_level: { type: sequelize.Sequelize.STRING },
    long_title: { type: sequelize.Sequelize.STRING },
    s3_dept: { type: sequelize.Sequelize.STRING },
    title: { type: sequelize.Sequelize.STRING },
    units: { type: sequelize.Sequelize.STRING },
    lecture_distinction: { type: sequelize.Sequelize.STRING }
  };

export default CoursesSchema; 