import sequelize from 'sequelize';

const PositionSchema =
  {
    department: { type: sequelize.Sequelize.STRING },
    scid: { type: sequelize.Sequelize.STRING },
    scs_position_desc: { type: sequelize.Sequelize.STRING },
    scs_position_short_title: { type: sequelize.Sequelize.STRING },
    performance_supervisor_scid: { type: sequelize.Sequelize.STRING },
    room_id: { type: sequelize.Sequelize.STRING },
    primary_position_indicator: { type: sequelize.Sequelize.STRING },
    building_id: { type: sequelize.Sequelize.STRING },
    title: { type: sequelize.Sequelize.STRING },
    scs_position_class: { type: sequelize.Sequelize.STRING },
    hr_department_id: { type: sequelize.Sequelize.STRING }
  };

export default PositionSchema;
