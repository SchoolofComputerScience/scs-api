import sequelize from 'sequelize';

const CourseSectionsSchema =
  {
    course_id: { type: sequelize.Sequelize.STRING },
    course_number: { type: sequelize.Sequelize.STRING },
    course_section_id: { type: sequelize.Sequelize.STRING },
    delivery_mode: { type: sequelize.Sequelize.STRING },
    location: { type: sequelize.Sequelize.STRING },
    long_title: { type: sequelize.Sequelize.STRING },
    presence_required: { type: sequelize.Sequelize.STRING },
    section_type: { type: sequelize.Sequelize.STRING },
    title: { type: sequelize.Sequelize.STRING },
    section: { type: sequelize.Sequelize.STRING },
    semester_code: { type: sequelize.Sequelize.STRING }
  };

export default CourseSectionsSchema;