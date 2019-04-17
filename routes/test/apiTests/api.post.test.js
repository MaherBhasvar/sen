const assert = require('chai').assert;
const post = require('../../api/posts');
const expect = require('chai').expect;
const chairequest = require('chai').request;
const Post = require('../../../models/Post');
const User = require('../../../models/User');
const {ObjectID} = require('mongodb');
const request = require('supertest');
const chai = require('chai');
const {app} = require('./../../../server');
//import chai from 'chai';

id = new ObjectID();

const users = [{
    _id: new ObjectID(),   
    name: 'xyz',
    handle:'xyz_handle',
    email: 'xyz@gmail.com',
    password: 'sdhjs' 

}];

const posts = [{
     _id: id,
    name:  'user1',
    handle: 'userHandle1', 
    url: 'https://www.ndtv.com/india-news/black-trunk-from-pm-modis-chopper-unlocks-congress-conspiracy-theory-2022974',
    headline:  'news headline',
    text: 'first news'
},
{
    _id: new ObjectID(),
   name:  'user2',
   handle: 'userHandle2', 
   url: 'https://www.ndtv.com/entertainment/game-of-thrones-8-episode-1-top-7-moments-including-jon-snow-who-now-knows-something-2023156',
   headline:  'news headline entertainment',
   text: 'second news'
},
{
    _id: new ObjectID(),
   name:  'user3',
   handle: 'userHandle3', 
   url: 'https://sports.ndtv.com/world-cup-2019/india-squad-for-2019-cricket-world-cup-live-updates-2023233',
   headline:  'news headline sports',
   text: 'third news'
}
];

demoreq = {
    body: {
        text: 'New post insert----------',
        url: 'https://www.firstpost.com/politics/lok-sabha-election-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
        name: 'user1',
        headline: 'Headline'
    },
    user: users[0]
};
// console.log(demoreq.body.text);

beforeEach((done) => {
    Post.remove({}).then(() => {
        //console.log("IN");
        Post.insertMany(posts);
        //console.log('after');
    });
    User.remove({}).then(() => {
        //console.log("IN");
        User.insertMany(users);
        //console.log('after');
    }).then(() => done());
  });
  

  describe('GET api/posts', () => {
    it('should get all posts', (done) => {
      request(app)
        .get('/api/posts/')
        .end((err, res) => {
            //console.log(typeof res.body.length);
            //res.should.have.status(200);
            expect(res.body.length).to.equal(3);
            done();
         });
    });

    it('should return 1 post', (done) => {
        request(app)
          .get('/api/posts/'+id)
          .end((err, res) => {
            //   console.log(res.body);
            //   res.should.have.status(200);
              expect(res.body.name).to.equal('user1');
              done();
           });
      });
      
      it('should add a post', (done) => {
        request(app)
          .post('/api/posts/')
          .send(demoreq)
          //.expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            //   console.log(res.body);
            //   res.should.have.status(200);
              expect(res.body.id).to.equal(demoreq.body.id);
              done();
           });
      }).timeout(10000);

  });
  