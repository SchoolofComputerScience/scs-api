import Sequelize from 'sequelize';
import Models from './data';

const config = {
  host: process.env.SQL_HOST,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const DB_Connection = new Sequelize(config);
const exlusion_list = ['id', 'updatedAt', 'createdAt']

DB_Connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//Models
const Member = DB_Connection.define('test_directory', Models.members, 
{ 
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
});

const Position = DB_Connection.define('test_positions', Models.positions, 
{
  freezeTableName: true,
  defaultScope: {
    attributes: { exclude: exlusion_list }
  }
}); 


//Relationships
Member.hasMany(Position, { foreignKey: 'scid', sourceKey: 'scid', as: 'positions' });
Position.belongsTo(Member, { foreignKey: 'scid', sourceKey: 'scid' });

export default DB_Connection;