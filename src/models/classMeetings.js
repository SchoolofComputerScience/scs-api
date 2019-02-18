import sequelize from 'sequelize';

const ClassMeetings =
  {
    course_section_id: { type: sequelize.Sequelize.STRING },
    building_id: { type: sequelize.Sequelize.STRING },
    days: { type: sequelize.Sequelize.STRING },
    start_time: { type: sequelize.Sequelize.STRING },
    end_time: { type: sequelize.Sequelize.STRING },
    room_id: { type: sequelize.Sequelize.STRING }
  };

export default ClassMeetings;