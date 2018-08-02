import sequelize from 'sequelize';

const ResearchAreaCoursesSchema =
{
  area_id: { type: sequelize.Sequelize.STRING },
  course_id: { type: sequelize.Sequelize.STRING },
  course_number: { type: sequelize.Sequelize.STRING },
  title: { type: sequelize.Sequelize.STRING }
};

export default ResearchAreaCoursesSchema;