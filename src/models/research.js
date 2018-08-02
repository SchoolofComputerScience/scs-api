// import mongoose from 'mongoose';
// mongoose.Promise = Promise;

// const Schema = mongoose.Schema

// const ResearchAreasSchema = new Schema(
//   {
//     _id: mongoose.Schema.Types.ObjectId,
//     area_id: String,
//     courses: [{
//       course_id: String,
//       course_number: String,
//       title: String
//     }],
//     description: {
//       contributors: [String],
//       sources: [{
//           title: String,
//           url: String
//       }],
//       text: String,
//       title: String
//     },
//     gs_count: Number,
//     members: [{
//       scid: String,
//       display_name: String
//     }],
//     title: String,
//     programs: [{
//       program_name: String,
//       program_id: String,
//       tracks: [{
//         track_id: String,
//         track_name: String
//       }]
//     }]
//   },
//   { collection : 'research_areas' }
// )

// export default mongoose.model('research_areas', ResearchAreasSchema, 'research_areas')


import sequelize from 'sequelize';

const ResearchAreaSchema =
{
  area_id: { type: sequelize.Sequelize.STRING },
  description: { type: sequelize.Sequelize.STRING },
  gs_count: { type: sequelize.Sequelize.STRING },
  title: { type: sequelize.Sequelize.STRING }
};

export default ResearchAreaSchema;
