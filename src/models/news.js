import sequelize from 'sequelize';

const NewsSchema =
{
  id: { type: sequelize.Sequelize.STRING, primaryKey: true },
  image: { type: sequelize.Sequelize.STRING },
  image_alt: { type: sequelize.Sequelize.STRING },
  image_caption: { type: sequelize.Sequelize.STRING },
  copy: { type: sequelize.Sequelize.STRING },
  headline: { type: sequelize.Sequelize.STRING },
  subheading: { type: sequelize.Sequelize.STRING },
  summary: { type: sequelize.Sequelize.STRING },
  date: { type: sequelize.Sequelize.DATE },
  author: { type: sequelize.Sequelize.STRING },
  contact_person_scid: { type: sequelize.Sequelize.STRING }
};

export default NewsSchema;
