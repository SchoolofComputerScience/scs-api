const mongoose = require('mongoose');
const pris = require('prismic.io');
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const prismicApi = process.env.PRISMIC;

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
    andrew_id: String,
    biography: String,
    email: String,
    family_name: String,
    fax_phone: String,
    given_name: String,
    homepage_url: String,
    hr_relationship: String,
    hr_relationship_class: String,
    hr_relationship_desc: String,
    image_url: String,
    middle_name: String,
    name_suffix: String,
    phone_area_code: Number,
    phone_area_code_secondary: Number,
    phone_exchange: Number,
    phone_extension: String,
    phone_extension_secondary: String,
    positions: [{
      building: String,
      department: String,
      department_name: String,
      hr_department: String,
      performance_supervisor: String,
      performance_supervisor_scid: String,
      primary_position: Boolean,
      room: String,
      scs_position_class: String,
      scs_position_desc: String,
      title: String
    }],
    research_areas: [String],
    scid: String,
    scs_relationship_class: String,
    scs_relationship_desc: String
  },
  { collection : 'directory_hris'}
);

const biographySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    andrew_id: String,
    biography: String,
    department: String,
    email: String,
    homepage_url: String,
    name: String,
    image_url: String,
    title: String,
    scid: String
  },
  { collection : 'biographies'}
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
    department: String,
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

const programsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    additional_degree: Boolean,
    degree_level: String,
    department: [String],
    description: String,
    graduate_level: String,
    program_alias: String,
    program_id: String,
    program_name: String,
    url: String
  },
  { collection : 'programs'}
);

const departmentsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    college: String,
    college_name: String,
    department: String,
    department_name: String,
    scs_relationship: String,
    type: String
  },
  { collection : 'departments'}
);

module.exports = {

  directory(){
    return mongoose.model('directory', directorySchema, 'directory_hris');
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

  getPrograms(){
    return mongoose.model('programs', programsSchema, 'programs')
  },

  getDepartments(){
    return mongoose.model('departments', departmentsSchema, 'departments')
  },

  getNews(){
    return pris.api(prismicApi).then(function(api) {
      return api.query(
        pris.Predicates.at('document.type', 'news'),
        { pageSize : 20, orderings : '[my.news.publish_date desc]' }
      )
    })
    .then((res) => res.results);
  },

  getEvents(){
    return pris.api(prismicApi).then(function(api) {
      return api.query(
        pris.Predicates.at('document.type', 'events'),
        { pageSize : 20, orderings : '[my.events.starttime desc]' }
      )
    })
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

  getNewsWithSearch(topic){
    return pris.api(prismicApi).then(function(api) {
      return api.query([
        pris.Predicates.at('document.type', 'news'),
        pris.Predicates.fulltext('document', `${topic}`)
      ],{ pageSize: 20, orderings :'[my.news.publish_date desc]' })
    }).then((res) => {
      return res.results
    })
  },

  getEventsWithSearch(topic){
    return pris.api(prismicApi).then(function(api) {
      return api.query([
        pris.Predicates.at('document.type', 'events'),
        pris.Predicates.fulltext('document', `${topic}`)
      ],{ pageSize: 20, orderings :'[my.events.starttime desc]' })
    }).then((res) => {
      return res.results
    })
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
