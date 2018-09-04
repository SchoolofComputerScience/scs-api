import sequelize from 'sequelize';

const DepartmentsSchema =
{
  dept_id: { type: sequelize.Sequelize.STRING },
  dept_name: { type: sequelize.Sequelize.STRING },
  college_id: { type: sequelize.Sequelize.STRING },
  college_name: { type: sequelize.Sequelize.STRING },
  scs_relationship: { type: sequelize.Sequelize.STRING },
  scs_type: { type: sequelize.Sequelize.STRING },
  cmu_type: { type: sequelize.Sequelize.STRING },
  dept_url: { type: sequelize.Sequelize.STRING }
};

export default DepartmentsSchema;
