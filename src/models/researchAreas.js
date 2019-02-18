import sequelize from 'sequelize';

const ResearchAreaSchema =
{
  area_id: { type: sequelize.Sequelize.STRING },
  area_text: { type: sequelize.Sequelize.STRING },
  field: { type: sequelize.Sequelize.STRING }
};

export default ResearchAreaSchema;
