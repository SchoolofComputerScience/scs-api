import sequelize from 'sequelize';

const EventsSchema =
{
  building_id: { type: sequelize.Sequelize.STRING },
  date: { type: sequelize.Sequelize.DATE },
  timezone: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  id: { type: sequelize.Sequelize.STRING, primaryKey: true },
  name: { type: sequelize.Sequelize.STRING },
  room_number: { type: sequelize.Sequelize.STRING },
  speaker_name: { type: sequelize.Sequelize.STRING },
  speaker_url: { type: sequelize.Sequelize.STRING },
  building_address: { type: sequelize.Sequelize.STRING }
};

export default EventsSchema;