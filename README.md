# 9takes.com


<!-- <img src="static/9takes.png" href="https://9takes.com"><figcaption>"whoa checkout this sweet site @ 9takes.com" -someone really cool</figcaption></figure> -->

[![9takes.com](static/9takes.png)](https://9takes.com)

Personaity question and answering based on the Enneagram
- Ask questions to community
- Sort Comments By Enneagram type
- Personality Walls- Viewable by anyone, updated only by people of that personality type
- Give a cookie to questions and comments you like
- Subscribe to questions- to be notified of changes on your Dashboard


## Check out work to be done on our [Trello Board](https://trello.com/b/TBY5udwx/personality-app)



## Tech

### Frontend Tech Stack
> [Vue](https://vuejs.org/), [Typescript](https://www.typescriptlang.org/), [Nuxt](https://nuxtjs.org/), [Vuetify](https://vuetifyjs.com/en/), 

### Related Projects
> Backend Rest Client [BE](https://github.com/Wolverine971/personalityBE)
> 
> Backend GraqhQl Client [Apollo](https://github.com/Wolverine971/apollo-backend)

### Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run devt

$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### ToDo


- [x]  <del>Question and Answering
- [x]  <del>Dashboard
- [x]  <del>Hosting- Domain- SSL
- [x]  <del>I relate button- with waving hand
- [x]  <del>Personality type pages
- [x]  <del>Login/ Register
- [x]  <del>Refresh token automatically
- [x]  <del>Personality pages- only people of that personality type can upvote or downvote
- [x]  <del>Add static page for each personality type
- [x]  <del>Comment Pagination
- [x]  <del>Wall Pagination
- [ ]  Enneagram Relationships
- [ ]  Realtime Active User Display
- [ ]  Messaging
- [ ]  User Reveal Request Response



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`ORIGIN` 
http://localhost:3000/

`BE_URL`
Separate Project needed for the Backend 

Located @ https://github.com/Wolverine971/personalityBE
http://localhost:3001/

GraphQL API

Separate Project needed for Backend
Located @ https://github.com/Wolverine971/apollo-backend

`GOOGLE`

Needed for VueGtag- can be commented out

`DEEPAI`

Needed for Image content-moderation
Uses: https://cdnjs.deepai.org/deepai.min.js'

Can be commented out, search for "content-moderation"and remove applicable code



## Thanks for checking this out! :smiley: