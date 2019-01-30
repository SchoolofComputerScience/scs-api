import sequelize from 'sequelize';

const ResearchFieldDisciplineSchema =
{
  field: { type: sequelize.Sequelize.STRING },
  field_text: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  discipline: { type: sequelize.Sequelize.STRING }
};

export default ResearchFieldDisciplineSchema;
