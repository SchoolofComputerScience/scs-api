import sequelize from 'sequelize';

const ProgramsSchema =
{
  additional_degree: { type: sequelize.Sequelize.BOOLEAN },
  active: { type: sequelize.Sequelize.BOOLEAN },
  degree_level: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  department: { type: sequelize.Sequelize.STRING },
  graduate_level: { type: sequelize.Sequelize.STRING },
  program_alias: { type: sequelize.Sequelize.STRING },
  program_id: { type: sequelize.Sequelize.STRING },
  program_name: { type: sequelize.Sequelize.STRING },
  url: { type: sequelize.Sequelize.STRING }
};

export default ProgramsSchema;

