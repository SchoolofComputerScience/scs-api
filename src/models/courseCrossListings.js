import sequelize from 'sequelize';

const CourseCrossListingsSchema =
  {
    course_id: { type: sequelize.Sequelize.STRING },
    course_number: { type: sequelize.Sequelize.STRING },
    course_section_id: { type: sequelize.Sequelize.STRING },
    cross_listed_course_number: { type: sequelize.Sequelize.STRING },
    cross_listed_section: { type: sequelize.Sequelize.STRING },
    cross_listed_semester_code: { type: sequelize.Sequelize.STRING }
  };

export default CourseCrossListingsSchema;