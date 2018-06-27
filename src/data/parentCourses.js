import sequelize from 'sequelize';

const ParentCoursesSchema =
{
  course_section_id: { type: sequelize.Sequelize.STRING },
  course_num: { type: sequelize.Sequelize.STRING },
  section: { type: sequelize.Sequelize.STRING },
  semester: { type: sequelize.Sequelize.STRING }
};

export default ParentCoursesSchema;