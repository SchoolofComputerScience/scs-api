const mongoose = require('mongoose');
const pris = require('prismic.io');
const dotenv = require('dotenv');
const prismicApi = process.env.PRISMIC;

dotenv.load({ path: '.env' });

mongoose.Promise = Promise;

mongoose.connection.on('connected',
  console.error.bind(console, '> scs:cmu / mongo connected\n'))

mongoose.connection.on('error',
  console.error.bind(console, '> scs:cmu / mongo error'))

if(!process.env.NODE_ENV === 'production')
  mongoose.set('debug', true)

let mongo = mongoose.connect(process.env.DB_CONNECT)

const directorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    fullname: String,
    person: String,
    room: String,
    department: String,
    fulldepartment: String,
    job: String,
    short_jobtitle: String
  },
  { collection : 'directory'}
);

const biographySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    andrewid: String,
    bio: String,
    department: String,
    email: String,
    homepage: String,
    name: String,
    photo_URL: String,
    title: String,
    scid: String
  },
  { collection : 'biography'}
);

const newsArchiveSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    uid: String,
    title: String,
    date: String,
    image: String,
    body: String,
    subtitle: String,
    image: String,
    author: String,
    subtext: String
  },
  { collection : 'newsarchive'}
);

const eventsArchiveSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    room: String,
    title: String,
    slug: String,
    abstract: String,
    startdate: String,
    talkTitle: String,
    speakerTitle1: String,
    speakerTitle2: String,
    speakerTitle3: String,
    type: String,
    keywords: String,
    speakerUrl: String,
    speakerName: String,
    speakerSite: String,
    speakerSiteText: String,
    poster: String,
    posterText: String
  },
  { collection : 'eventdata'}
);

const coursesSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    courseNumber: String,
    meetings: [
      mongoose.Schema({
        endTime: String,
        building: String,
        room: String,
        startTime: String,
        days: String,
      })
    ],
    childCourses: [
      mongoose.Schema({
        section: String,
        semesterCode: String,
        detailUri: String,
        courseNumber: String
      })
    ],
    deliveryMode: String,
    s3Department: String,
    courseCode: String,
    title: String,
    parentCourse: mongoose.Schema({
      section: String,
      semesterCode: String,
      detailUri: String,
      courseNumber: String
    }),
    programLocation: String,
    level: String,
    isStudentPresenceRequired: String,
    crossListedCourses: [
      mongoose.Schema({
        section: String,
        semesterCode: String,
        detailUri: String,
        courseNumber: String
      })
    ],
    units:  String,
    longTitle:  String,
    instructors: [
      mongoose.Schema({
        andrewId: String,
        scid: String,
        lastName: String,
        firstName: String,
        email: String,
      })
    ],
    college: String,
    section: String,
    semesterCode: String,
    semester: String,
    year: Number,
  },
  { collection : 'courses'}
)


const gsProfileSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    scid: String,
    gs_affiliation: String,
    gs_areas: String,
    gs_citation_count: Number,
    gs_citation_count_five_year: Number,
    gs_fullname: String,
    gs_hindex: Number,
    gs_hindex_five_year: Number,
    gs_homepage_url: String,
    gs_i10index: Number,
    gs_i10index_five_year: Number,
    gs_image_url: String,
    gs_profile_guid: String,
    gs_profile_url: String,
  },
  { collection : 'gs_profile'}
);

const gsPublicationSchema = mongoose.Schema(
  {
    _id:  mongoose.Schema.Types.ObjectId,
    authors:  String,
    desc:  String,
    gs_citation_count: Number,
    gs_citation_guid:  String,
    gs_citation_url:  String,
    gs_profile_guid:  String,
    journal:  String,
    pages:  String,
    pub_date:  String,
    pub_format:  String,
    pub_url:  String,
    pub_year: Number,
    publisher:  String,
    timestamp:  String,
    title:  String,
    scid:  String,
  },
  { collection : 'gs_profile'}
);

module.exports = {

  directory(){
    return mongoose.model('directory', directorySchema, 'directory');
  },

  getBiographyData(){
    return mongoose.model('biographies', biographySchema, 'biographies');
  },

  getGsProfileData(){
    return mongoose.model('gs_profiles', gsProfileSchema, 'gs_profiles');
  },

  getGsPublicationData(){
    return mongoose.model('gs_publications', gsPublicationSchema, 'gs_publications');
  },

  getNewsArchive(){
    return mongoose.model('newsarchive', newsArchiveSchema, 'newsarchive')
  },

  getEventsArchive(){
    return mongoose.model('eventdata', eventsArchiveSchema, 'eventdata')
  },

  getCourses(){
    return mongoose.model('courses', coursesSchema, 'courses')
  },

  getNews(){
    return pris.api(prismicApi).then(function(api) {
      return api.query(
        pris.Predicates.at("document.type", "news")
      )})
    .then((res) => res.results);
  },

  getEvents(){
    return pris.api(prismicApi).then(function(api) {
      return api.query(
        pris.Predicates.at("document.type", "events")
      )})
    .then((res) => res.results)
  },

  getEventsWithTag(tag){
    return pris.api(prismicApi)
      .then(function(api) {
        return api.query(
          `[[:d = at(document.type, "events")][:d = any(document.tags, ["${tag}"])]]`
        )})
      .then((res) => res.results)
  },

  getNewsWithTag(tag){
    return pris.api(prismicApi)
      .then(function(api) {
        return api.query(
          `[[:d = at(document.type, "news")][:d = any(document.tags, ["${tag}"])]]`
        )})
      .then((res) => res.results)
  },

  getNewsWithId(uid){
    return pris.api(prismicApi)
      .then(function(api) {
        return api.query(
          `[[:d = at(my.news.uid,"${uid}")]]`
        )}, function(err){
         err
        })
      .then((res) => [res])
  },

  getEventsWithId(uid){
    return pris.api(prismicApi)
      .then(function(api) {
        return api.query(
          `[[:d = at(my.events.uid,"${uid}")]]`
        )}, function(err){
         err
        })
      .then((res) => [res])
  },

  getDepartmentWithId(uid){
    return pris.api(prismicApi)
      .then(function(api) {
        return api.query(
          `[[:d = at(my.departments.uid,"${uid}")]]`
        )}, function(err){
         err
        })
      .then((res) => [res])
  },
}
