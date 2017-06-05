const graphql = require('graphql')
const data = require('./data.js')

let aggregateType = new graphql.GraphQLObjectType({
  name: 'Aggregate',
  description: 'Aggregation of fields',
  fields: () => ({
    _id: {type: graphql.GraphQLString}
  })
})

let aggregateCourseYearType = new graphql.GraphQLObjectType({
  name: 'AggregateCourseYears',
  description: 'Aggregation of fields',
  fields: () => ({
    _id: {type: graphql.GraphQLInt}
  })
})
let aggregateCourseDepartmentType = new graphql.GraphQLObjectType({
  name: 'AggregateCourseDepartment',
  description: 'Aggregation of fields',
  fields: () => ({
    _id: {type: graphql.GraphQLString}
  })
})

let memberPositionType = new graphql.GraphQLObjectType({
  name: 'MemberPosition',
  description: 'Positions of a Member Schema',
  fields: () => ({
    building: {type: graphql.GraphQLString},
    department: {type: graphql.GraphQLString},
    department_name: {type: graphql.GraphQLString},
    employee_type: {type: graphql.GraphQLString},
    full_part_time_indicator: {type: graphql.GraphQLString},
    hr_department: {type: graphql.GraphQLString},
    performance_supervisor: {type: graphql.GraphQLString},
    primary_position: {type: graphql.GraphQLString},
    room: {type: graphql.GraphQLString},
    title: {type: graphql.GraphQLString}
  })
})

let memberType = new graphql.GraphQLObjectType({
  name: 'Member',
  description: 'Available properties for SCS members',
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    andrew_id: { type: graphql.GraphQLString },
    biography: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    employee_status: { type: graphql.GraphQLString },
    employee_status_desc: { type: graphql.GraphQLString },
    family_name: { type: graphql.GraphQLString },
    fax_phone: { type: graphql.GraphQLString },
    given_name: { type: graphql.GraphQLString },
    homepage_url: { type: graphql.GraphQLString },
    image_url: { type: graphql.GraphQLString },
    middle_name: { type: graphql.GraphQLString },
    name_suffix: { type: graphql.GraphQLString },
    phone_area_code: { type: graphql.GraphQLFloat },
    phone_area_code_secondary: { type: graphql.GraphQLFloat },
    phone_exchange: { type: graphql.GraphQLFloat },
    phone_extension: { type: graphql.GraphQLString },
    phone_extension_secondary: { type: graphql.GraphQLString },
    positions: { type: new graphql.GraphQLList(memberPositionType) },
    relationship: { type: graphql.GraphQLString },
    relationship_class: { type: graphql.GraphQLString },
    relationship_desc: { type: graphql.GraphQLString },
    research_areas: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    phone_full: {
      type: graphql.GraphQLString,
      resolve: function(member){
        return `(${member.phone_area_code}) ${member.phone_exchange} - ${member.phone_extension}`
      }
    },
    phone_full_call: {
      type: graphql.GraphQLString,
      resolve: function(member){
        return `${member.phone_area_code}${member.phone_exchange}${member.phone_extension}`
      }
    },
    full_name: {
      type: graphql.GraphQLString,
      resolve: function(member){
        return member.given_name + ' ' + member.family_name;
      }
    },
    scid: { type: graphql.GraphQLString },
    gsProfile: {
      type: new graphql.GraphQLList(gsProfileType),
      resolve: function(args){
        if(args.scid)
          return data.getGsProfileData()
            .find({scid :`${args.scid}`})
            .then((data) => data)
            .catch(err =>  err)
      }
    },
    gsPublication: {
      type: new graphql.GraphQLList(gsPublicationType),
      resolve: function(args){
        if(args.scid)
          return data.getGsPublicationData()
            .find({scid :`${args.scid}`,
              pub_year: {$exists: true},
              authors: {$exists: true}
            })
            .then((data) => data)
            .catch(err =>  err)
      }
    },
    news: {
      type: new graphql.GraphQLList(newsType),
      resolve: function(args){
        return data.getNewsWithTag(args.scid);
      }
    },
    events: {
      type: new graphql.GraphQLList(newsType),
      resolve: function(args){
        return data.getEventsWithTag(args.scid);
      }
    }
  })
})

let courseMeetingType = new graphql.GraphQLObjectType({
  name: 'courseMeeting',
  description: 'Course Meeting',
  fields: () => ({
    endTime: { type: graphql.GraphQLString },
    building: { type: graphql.GraphQLString },
    room: { type: graphql.GraphQLString },
    startTime: { type: graphql.GraphQLString },
    days: { type: graphql.GraphQLString }
  })
})

let biographiesType = new graphql.GraphQLObjectType({
  name: 'biographies',
  description: 'Biographies for professor',
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    andrew_id: { type: graphql.GraphQLString },
    biography: { type: graphql.GraphQLString },
    department: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    homepage_url: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    image_url: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    scid: { type: graphql.GraphQLString },
  })
})

let courseListType = new graphql.GraphQLObjectType({
  name: 'courseList',
  description: 'Course list schema',
  fields: () => ({
    section: { type: graphql.GraphQLString },
    semesterCode: { type: graphql.GraphQLString },
    detailUri: { type: graphql.GraphQLString },
    courseNumber: { type: graphql.GraphQLString }
  })
})

let courseInstructorType = new graphql.GraphQLObjectType({
  name: 'courseInstructor',
  description: 'List of our course instructors',
  fields: () => ({
    andrewId: { type: graphql.GraphQLString },
    scid: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    firstName: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString }
  })
})

let coursesType = new graphql.GraphQLObjectType({
  name: 'courses',
  description: 'List of SCS courses',
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    courseNumber: { type: graphql.GraphQLString },
    meetings: {
      type: new graphql.GraphQLList(courseMeetingType)
    },
    childCourses: {
      type: new graphql.GraphQLList(courseListType)
    },
    deliveryMode: { type: graphql.GraphQLString },
    s3Department: { type: graphql.GraphQLString },
    department: { type: graphql.GraphQLString },
    courseCode: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    parentCourse: {
      type: new graphql.GraphQLList(courseListType)
    },
    programLocation: { type: graphql.GraphQLString },
    level: { type: graphql.GraphQLString },
    isStudentPresenceRequired: { type: graphql.GraphQLString },
    crossListedCourses: {
      type: new graphql.GraphQLList(courseListType)
    },
    units:  { type: graphql.GraphQLString },
    longTitle:  { type: graphql.GraphQLString },
    instructors: {
      description: 'class instructors',
      type: new graphql.GraphQLList(courseInstructorType),
      resolve: (args) => args.instructors
    },
    college: { type: graphql.GraphQLString },
    section: { type: graphql.GraphQLString },
    semesterCode: { type: graphql.GraphQLString },
    semester: { type: graphql.GraphQLString },
    year: { type: graphql.GraphQLInt }
   })
})

let gsProfileType = new graphql.GraphQLObjectType({
  name: 'GoogleScholarProfile',
  description: 'Google Scholar Profile',
  args: {
    name: { type: graphql.GraphQLString }
  },
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    authors: { type: graphql.GraphQLString },
    scid: { type: graphql.GraphQLString },
    gs_affiliation: { type: graphql.GraphQLString },
    gs_areas: { type: graphql.GraphQLString },
    gs_citation_count: { type: graphql.GraphQLInt },
    gs_citation_count_five_year: { type: graphql.GraphQLInt },
    gs_fullname: { type: graphql.GraphQLString },
    gs_hindex: { type: graphql.GraphQLInt },
    gs_hindex_five_year: { type: graphql.GraphQLInt },
    gs_homepage_url: { type: graphql.GraphQLString },
    gs_i10index: { type: graphql.GraphQLInt },
    gs_i10index_five_year: { type: graphql.GraphQLInt },
    gs_image_url: { type: graphql.GraphQLString },
    gs_profile_guid: { type: graphql.GraphQLString },
    gs_profile_url: { type: graphql.GraphQLString },
    pub_year_agg: {
      type: new graphql.GraphQLList(aggregateType),
      resolve: function(args){
        if(args.scid)
          return data.getGsPublicationData().aggregate([
            {$match: { scid : `${args.scid}`, pub_year:{ $ne: null}} },
            {$group: { _id: '$pub_year'}},
            {$sort: {'_id' :-1}}
          ])
      }
    }
  })
})

let gsPublicationType = new graphql.GraphQLObjectType({
  name: 'GoogleScholarPublication',
  description: 'Google Scholar Publication',
  args: {
    name: { type: graphql.GraphQLString }
  },
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    authors: { type: graphql.GraphQLString },
    desc: { type: graphql.GraphQLString },
    gs_citation_count: { type: graphql.GraphQLInt },
    gs_citation_guid: { type: graphql.GraphQLString },
    gs_citation_url: { type: graphql.GraphQLString },
    gs_profile_guid: { type: graphql.GraphQLString },
    journal: { type: graphql.GraphQLString },
    pages: { type: graphql.GraphQLString },
    pub_date: { type: graphql.GraphQLString },
    pub_format: { type: graphql.GraphQLString },
    pub_url: { type: graphql.GraphQLString },
    pub_year: { type: graphql.GraphQLInt },
    publisher: { type: graphql.GraphQLString },
    timestamp: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    scid: { type: graphql.GraphQLString },
  })
})

let departmentType = new graphql.GraphQLObjectType({
  name: 'Department',
  description: 'department describing information',
  arg: {
    uid: {type: graphql.GraphQLString}
  },
  fields: () => ({
    uid: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].uid
    },
    name: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].data['departments.name'].value[0].text
    },
    description: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].data['departments.description'].value[0].text
    },
    mainimg: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].data['departments.mainimg'].value.main.url
    },
    logo: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].data['departments.logo'] ? _[0].data['departments.logo'].value.main.url : ''
    },
    url: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _[0].data['departments.url'].value.url
    }

  })

})

let articleType = new graphql.GraphQLObjectType({
  name: 'Article',
  description: 'SCS Campus Article',
  args: {
    uid: { type: graphql.GraphQLString }
  },
  fields: () => ({
    title: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].data['news.title'].value[0].text : _.title
    },
    uid: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].uid : _.uid
    },
    image: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].data['news.image'].value.main.url : _.image
    },
    author: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].data['news.author'].value : _.author
    },
    subtext: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].data['news.caption'].value[0].text : _.subtext
    },
    date: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].data['news.publish_date'].value : _.date
    },
    body: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.results ? _.results[0].getStructuredText('news.eventbody').asHtml() : _.body
    },
  })
})

let newsType = new graphql.GraphQLObjectType({
  name: 'news',
  description: 'News feed from Prismic.io',
  fields: () => ({
    id:{ type: graphql.GraphQLString },
    uid: { type: graphql.GraphQLString},
    tags:{ type: new graphql.GraphQLList(graphql.GraphQLString) },
    image: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['news.image'].value.main.url : _.image
    },
    date: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['news.publish_date'].value : _.date
    },
    title: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['news.title'].value[0].text : _.title
    }

  })
})

let eventsType = new graphql.GraphQLObjectType({
  name: 'events',
  description: 'Events feed',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    uid: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.uid : _.slug
    },
    room: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['events.room'].value[0].text : _.room
    },
    building: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data && _.data['events.location'] ? _.data['events.location'].value[0].text : ''
    },
    title: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['events.title'].value[0].text : _.title
    },
    abstract: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['events.description'].value[0].text : _.abstract
    },
    startDate: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data ? _.data['events.starttime'].value : _.startdate || ''
      }
    },
    endDate: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data &&  _.data['events.endtime'] ? _.data['events.endtime'].value : ''
    },
    talkTitle: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data && _.data['events.subtitle']
        ? _.data['events.subtitle'].value[0].text
        : _.talkTitle || ''
      }
    },
    speakerName: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data && _.data['events.speakerName']
        ? _.data['events.speakerName'].value[0].text
        : _.speakerTitle1 || ''
      }
    },
    speakerCompany: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data && _.data['events.speakerCompany']
        ? _.data['events.speakerCompany'].value[0].text
        : _.speakerTitle2 || ''
      }
    },
    speakerCompanyTeam: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data && _.data['events.speakerCompanyTeam']
        ? _.data['events.speakerCompanyTeam'].value[0].text
        : _.speakerTitle3 || ''
      }
    },
    type: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? _.data['events.eventtype'].value : _.type || ''
    },
    tags: {
      type: new graphql.GraphQLList(graphql.GraphQLString),
      resolve: (_,args) => _.data ? _.tags : [_.keywords] || []
    },
    eventUrl: {
      type: graphql.GraphQLString,
      resolve: (_,args) => {
        return _.data &&  _.data['events.eventurl']
        ? _.data['events.eventurl'].value[0].text
        : _.speakerSite || ''
      }
    },
    poster: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data && _.data['events.posterurlpdf'] ? _.data['events.posterurlpdf'].value.url : _.poster || ''
    },
    posterText: {
      type: graphql.GraphQLString,
      resolve: (_,args) => _.data ? '' : _.posterText || ''
    }
  })
})

let queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'SCS top level data points',
  fields: {
    directory: {
      type: new graphql.GraphQLList(memberType),
      description: 'Directory listing of SCS, sortable by name / department.',
      args: {
        scid: { type: graphql.GraphQLString  },
        department: { type: graphql.GraphQLString  },
        starts_with: { type: graphql.GraphQLString  }
      },
      resolve: function(_, args) {
        if(args.scid)
          return data.directory().find({'scid': args.scid})
            .then((data) => data)
            .catch(err => err)

        else if(args.department)
          return data.directory().find({'positions': {$elemMatch: {'department': args.department }}})
            .then((data) => data)
            .catch(err => err)

        // else if(args.starts_with)
        //   return data.directory().find({'last_name' : { $regex : /^`${args.starts_with}`/ }})
        //     .then((data) => data)
        //     .catch(err => err)

        else
          return data.directory().find({}).sort({scid:1})
          .then((data) => data)
          .catch(err => err)
      }
    },
    biographies: {
      type: new graphql.GraphQLList(biographiesType),
      description: 'Information from department sites including bios, photo url, published email, etc.',
      args: {
        scid: { type: graphql.GraphQLString },
      },
      resolve: function(_, args){
        if(args.scid)
          return data.getBiographyData().find({'scid': args.scid})
            .then((data) => data)
            .catch(err =>  err)
        else
          return data.getBiographyData().find({}).sort({scid:1})
          .then((data) => data)
          .catch(err => err)
      }
    },
    directoryAggregate: {
      type: new graphql.GraphQLList(aggregateType),
      description: 'aggregate of Available fields',
      args: {
        field: { type: graphql.GraphQLString }
      },
      resolve: function(_, args) {
        if(args.field)
          return data.directory().aggregate([{$group:{_id : `$${args.field}`}}])
            .then((data) => data)
            .catch(err => err)
      }
    },
    courseYearAggregate: {
      type: new graphql.GraphQLList(aggregateCourseYearType),
      description: 'aggregate of Available years',
      resolve: function(_, args) {
        return data.getCourses().aggregate([
          {$group:{ _id : `$year`}},
          {$sort:{ _id: -1 }}
        ])
        .then((data) => data)
        .catch(err => err)
      }
    },
    courseDepartmentAggregate: {
      type: new graphql.GraphQLList(aggregateCourseDepartmentType),
      description: 'aggregate of Available departements',
      resolve: function(_, args) {
        return data.getCourses().aggregate([
          {$group:{ _id : `$s3Department`}},
          {$sort:{ _id: 1 }}
        ])
        .then((data) => data)
        .catch(err => err)
      }
    },
    article: {
      type: new graphql.GraphQLList(articleType),
      description: 'Individual news article',
      args: {
        uid: { type: graphql.GraphQLString },
        article: { type: graphql.GraphQLInt }
      },
      resolve: function(_,args){
        return data.getNewsWithId(args.uid).then((res, err) => {
          if(res[0].results.length !== 0)
            return res
          else
            return data.getNewsArchive().find({uid :`${args.uid}`})
            .then((article) => article)
        }).catch((err) => err)
      }
    },
    event: {
      type: new graphql.GraphQLList(eventsType),
      description: 'Individual event',
      args: {
        uid: { type: graphql.GraphQLString }
      },
      resolve: function(_,args){
        return data.getEventsWithId(args.uid).then((res, err) => {
          if(res[0].results.length !== 0)
            return res[0].results
          else
            return data.getEventsArchive().find({slug :`${args.uid}`})
            .then((event) => event)
        }).catch((err) => err)
      }
    },
    department: {
      type: departmentType,
      description: 'Department Data from Prismic',
      args:{
        uid: { type : graphql.GraphQLString }
      },
      resolve: (_, args) => {
        return data.getDepartmentWithId(args.uid).then((res, err) => {
          return res[0].results
        }).catch((err) => err)
      }
    },
    publication: {
      type: gsPublicationType,
      description: 'publication',
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function(_,args){
        return data.getGsPublicationData().findById(args.id)
      }
    },
    course: {
      type: coursesType,
      description: 'course',
      args: {
        courseCode: { type: graphql.GraphQLString },
      },
      resolve: function(_,args){
        let semCode = args.semesterCode || "S17"
        return data.getCourses().findOne({courseCode: `${args.courseCode}` })
      }
    },
    courses: {
      type: new graphql.GraphQLList(coursesType),
      description: 'course listing',
      args: {
        courseNumber: { type: graphql.GraphQLString },
        s3Department: { type: graphql.GraphQLString },
        semesterCode: { type : graphql.GraphQLString }
      },
      resolve: function(_,args){
        let semCode = args.semesterCode || "S17"
        return data.getCourses().find({semesterCode: `${semCode}` })
      }
    },
    newsByTag:{
      type: new graphql.GraphQLList(newsType),
      args: {
        department: { type: graphql.GraphQLString }
      },
      description: 'list of news articles associated to a tag',
      resolve: function(_,args){
        return data.getNewsWithTag(args.department);
      }
    },
    news: {
      type: new graphql.GraphQLList(newsType),
      description: 'List of News',
      args: {
        first: { type: graphql.GraphQLInt }
      },
      resolve: function(_,args) {
        let count;
        let news = [];
        let limit = args.first || 20;
        return data.getNews().then((res) => {
          res.map((item) => news.push(item))
          limit -= res.length
          return data.getNewsArchive().find().sort({date: -1}).limit(limit)
            .then((res) => {
              res.map((item) => news.push(item))
              return news
            })
            .catch((err) => err)
        })
        .catch(err => err)
      }
    },
    events: {
      type: new graphql.GraphQLList(eventsType),
      description: 'List of Events',
      resolve: function(_,args){
        let count;
        let events = [];
        let limit = args.first || 40;
        return data.getEvents().then((res) => {
          res.map((item) => events.push(item))
          limit -= res.length
          return data.getEventsArchive().find().limit(limit)
            .then((res) => {
              res.map((item) => events.push(item))
              return events
            })
            .catch((err) => err)
        })
        .catch(err => err)
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: queryType
})
