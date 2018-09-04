import sequelize from 'sequelize';

const ResearchAreaSchema =
{
  area_id: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  gs_count: { type: sequelize.Sequelize.STRING },
  title: { type: sequelize.Sequelize.STRING }
};

export default ResearchAreaSchema;
