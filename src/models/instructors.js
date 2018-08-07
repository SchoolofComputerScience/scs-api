import sequelize from 'sequelize';

const InstructorsSchema =
{
  course_section_id: { type: sequelize.Sequelize.STRING },
  scid: { type: sequelize.Sequelize.STRING }
};

export default InstructorsSchema;