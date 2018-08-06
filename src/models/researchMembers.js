import sequelize from 'sequelize';

const ResearchAreaMembersSchema =
{
  area_id: { type: sequelize.Sequelize.STRING },
  scid: { type: sequelize.Sequelize.STRING }
};

export default ResearchAreaMembersSchema;