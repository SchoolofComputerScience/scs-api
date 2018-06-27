import sequelize from 'sequelize';

const PublicationSchema =
{
  scid: { type: sequelize.Sequelize.STRING },
  report_number: { type: sequelize.Sequelize.STRING },
  gs_citation_count: { type: sequelize.Sequelize.STRING },
  gs_citation_guid: { type: sequelize.Sequelize.STRING },
  pub_type: { type: sequelize.Sequelize.STRING },
  book: { type: sequelize.Sequelize.STRING },
  pub_url: { type: sequelize.Sequelize.STRING },
  patent_office: { type: sequelize.Sequelize.STRING },
  patent_number: { type: sequelize.Sequelize.STRING },
  title: { type: sequelize.Sequelize.STRING },
  pub_date: { type: sequelize.Sequelize.STRING },
  gs_profile_guid: { type: sequelize.Sequelize.STRING },
  pub_format: { type: sequelize.Sequelize.STRING },
  publisher: { type: sequelize.Sequelize.STRING },
  pages: { type: sequelize.Sequelize.STRING },
  authors: { type: sequelize.Sequelize.STRING },
  pub_year: { type: sequelize.Sequelize.STRING },
  conference: { type: sequelize.Sequelize.STRING },
  institution: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  application_number: { type: sequelize.Sequelize.STRING },
  journal: { type: sequelize.Sequelize.STRING },
  gs_citation_url: { type: sequelize.Sequelize.STRING },
  inventors: { type: sequelize.Sequelize.STRING },
  source: { type: sequelize.Sequelize.STRING },
  volume: { type: sequelize.Sequelize.STRING }
};

export default PublicationSchema;

