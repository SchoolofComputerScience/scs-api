
# CMU:SCS GraphQL API
Welcome to the GraphQL API Endpoint from the School Of Computer Science

[![Build Status](https://travis-ci.org/SchoolofComputerScience/scs-api.svg?branch=master)](https://travis-ci.org/SchoolofComputerScience/scs-api)

## Requirements
[Node.js 7.7.1](https://nodejs.org/en/)

## Getting Started

`git clone git@github.com:SchoolofComputerScience/scs-api.git`.

`cd scs-api`.

`npm install`

`npm run dev`

navigate to `localhost:5000/graph`

## Technologies Used In This Repo
1. Node (https://nodejs.org/)

2. Express (https://expressjs.com/)

3. Sequilize (http://docs.sequelizejs.com)

4. GraphQL (https://graphql.org/)

## Hosting
Google Cloud Platform - App Flex - modify https://github.com/SchoolofComputerScience/scs-api/blob/master/app.yaml to configure service when deploying to GCP.

## Deployment
Travis (https://travis-ci.org/) is used to deploy straight to Google Cloud Platform after a Pull Request is accepted and merged.

## Repository Structure
1. https://github.com/SchoolofComputerScience/scs-api/blob/master/src/db.js - This file is used to connect to the database and define all relationship between Sequilize models (1-to-1, 1-to-many, many-to-many).

2. https://github.com/SchoolofComputerScience/scs-api/tree/master/src/queries - Sequilize queries that use models and GraphQL types to connect data from a relational database.
   
3. https://github.com/SchoolofComputerScience/scs-api/tree/master/src/models - Sequilize models used to model table structures from a relational database.

4. https://github.com/SchoolofComputerScience/scs-api/tree/master/src/types - GraphQL types used to model API Endpoints.
   
5. https://github.com/SchoolofComputerScience/scs-api/tree/master/src/content - Markdown files used for static content pages.

