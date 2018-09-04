import sequelize from 'sequelize';

const ProfileSchema =
{
  scid: { type: sequelize.Sequelize.STRING },
  cmu_email: { type: sequelize.Sequelize.STRING },
  cmu_firstname: { type: sequelize.Sequelize.STRING },
  cmu_lastname: { type: sequelize.Sequelize.STRING },
  cmu_fullname: { type: sequelize.Sequelize.STRING },
  cmu_username: { type: sequelize.Sequelize.STRING },
  gs_affiliation: { type: sequelize.Sequelize.STRING },
  gs_citation_count: { type: sequelize.Sequelize.STRING },
  gs_citation_count_five_year: { type: sequelize.Sequelize.STRING },
  gs_fullname: { type: sequelize.Sequelize.STRING },
  gs_hindex: { type: sequelize.Sequelize.STRING },
  gs_hindex_five_year: { type: sequelize.Sequelize.STRING },
  gs_homepage_url: { type: sequelize.Sequelize.STRING },
  gs_i10index: { type: sequelize.Sequelize.STRING },
  gs_i10index_five_year: { type: sequelize.Sequelize.STRING },
  gs_image_url: { type: sequelize.Sequelize.STRING },
  gs_profile_guid: { type: sequelize.Sequelize.STRING },
  gs_profile_url: { type: sequelize.Sequelize.STRING }
};

export default ProfileSchema;
