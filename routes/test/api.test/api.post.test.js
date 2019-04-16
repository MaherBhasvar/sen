const assert = require('chai').assert;
const post = require('../../api/posts');
const expect = require('chai').expect;
const chairequest = require('chai').request;
const Post = require('../../../models/Post');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
const {ObjectID} = require('mongodb');
const request = require('supertest');
const chai = require('chai');
const {app} = require('../../../server');

id = new ObjectID();
id2 = new ObjectID();
notvalidid = new ObjectID();
const users = [{
  _id: id,  
  id: id, 
  name: 'xyz',
  handle:'xyz_handle',
  email: 'xyz@gmail.com',
  password: 'sdhjs' 

},
{
  _id: id2,  
  id: id2,  
  name: 'user2',
  handle:'xyz_handle2',
  email: 'xyz2@gmail.com',
  password: 'fsefe_fsfs',
  isAdmin: true,
  isModerator: true, 

}];

const profiles = [{
  id : users[0]._id,
  user : users[0]._id,
  handle: 'xyz_handle',
  age: 20
},
{
  id : users[1]._id,
  user : users[1]._id,
  handle: 'xyz_handle2',
  age: 20
}
];



const posts = [{
  _id: id, 
  user: users[0]._id,
  name:  'user1',
  handle: 'userHandle1', 
  url: 'https://www.ndtv.com/india-news/black-trunk-from-pm-modis-chopper-unlocks-congress-conspiracy-theory-2022974',
  headline:  'news headline',
  text: 'first news'
},
{
  _id: new ObjectID(),
  user: users[0]._id,
  name:  'user2',
  handle: 'userHandle2', 
  url: 'https://www.ndtv.com/entertainment/game-of-thrones-8-episode-1-top-7-moments-including-jon-snow-who-now-knows-something-2023156',
  headline:  'news headline entertainment',
  text: 'second news',
  likes: [users[0]]
},
{
  _id: new ObjectID(),
  user: users[1]._id,
  name:  'user3',
  handle: 'userHandle3', 
  url: 'https://sports.ndtv.com/world-cup-2019/india-squad-for-2019-cricket-world-cup-live-updates-2023233',
  headline:  'news headline sports',
  text: 'third news',
  likes: [users[0]]
}
];

demoreq = {
  body: {
      text: 'New post insert',
      url: 'https://www.firstpost.com/politics/lok-sabha-election-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
      name: 'user1',
      headline: 'Headline'
  },
  user: users[0]
};

demoreq = {
  body: {
      text: 'New post insert',
      url: 'https://www.firstpost.com/politics/lok-sabha-election-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
      name: 'user1',
      headline: 'Headline'
  },
  user: users[0]
};
demoreq2 = {
  body: {
      text: 'New post insert2',
      url: 'https://www.firstpost.com/politics/lok-sabha-election-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
      name: 'user2',
      headline: 'Headline'
  },
  user: users[1]
};

invalidreq = {
  body: {
      text: 'New',
      url: 'https://www.firstpost.com/politics/lok-sabha-election-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
      name: 'user1',
      headline: 'Headline'
  },
  user: users[0]
};

invalidreq2 = {
  body: {
      text: 'New Post inset',
      url: 'https://www.firstpost/lokection-2019-live-updates-ahead-of-phase-2-ec-bans-adityanath-from-campaigning-for-3-days-mayawati-for-2-poll-panel-is-toothless-sc-told-6448491.html',
      name: 'user1',
      headline: 'Headline'
  },
  user: users[0]
};


adminUser = {
  user: users[1]
  
};

notAdminUser = {
  
  user: users[0]
  
};

// demouser = {
//   user: user[0]
// };


beforeEach((done) => {
 


  
  User.remove({}).then(() => {
    User.insertMany(users);
  }, 
  Post.remove({}).then(() => {
    Post.insertMany(posts);
  },  Profile.remove({}).then(() => {
    Profile.insertMany(profiles);
  }))).then(() => done());


});
  


describe('GET api/posts', () => {
  it('should get all posts', (done) => {
    request(app)
      .get('/api/posts/')
      .end((err, res) => {
          // console.log(typeof res.body.length);
          expect(res.body.length).to.equal(posts.length);
          done();
        });
  });

  it('should return a posts with specific id', (done) => {
    request(app)
      .get('/api/posts/'+id)
      .end((err, res) => {
          // console.log(res.body);
          expect(res.body._id).equals(id.toString());
          done();
        });
  });


  
  it('should return error', (done) => {
    request(app)
      .get('/api/posts/'+notvalidid)
      .end((err, res) => {
          expect(404);
            done();
        });
  });

 
});    

describe('post api/posts/:id', () => {
  it('should add a post', (done) => {
    request(app)
      .post('/api/posts/')
      .send(demoreq)
      //.expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
          //  console.log(res.body);
        //   res.should.have.status(200);
          expect(res.body.id).to.equal(demoreq.body.id);
          done();
      });
  }).timeout(10000);

  it('should not add a post with len(text) < 10', (done) => {
    request(app)
      .post('/api/posts/')
      .send(invalidreq)
      // .expect(400)
      //.expect('Content-Type', /json/)
      .end((err, res) => {

        expect(res.statusCode).to.equal(400);
          //  console.log(res.body);
        //   res.should.have.status(200);
          expect(res.body.id).to.equal(demoreq.body.id);
          done();
      });
  }).timeout(10000);

  it('should not add a post with invalidurl', (done) => {
    request(app)
      .post('/api/posts/')
      .send(invalidreq2)
      // .expect(400)
      //.expect('Content-Type', /json/)
      .end((err, res) => {
        
          expect(res.statusCode).to.equal(400);
        //   res.should.have.status(200);
          // expect(res.body.id).to.equal(demoreq.body.id);
          done();
      });
  }).timeout(10000);

});

describe('delete api/posts/:id', () => {
  
  it('delete a post that belong to that user', (done) => {
    request(app)
      .delete('/api/posts/'+posts[0]._id)
      .send(demoreq)
      .end((err, res) => {
          expect({sucess: true});
          done();
        });
  });


  it('delete a post that does not belong to that user', (done) => {
    request(app)
      .delete('/api/posts/'+posts[2]._id)
      .send(demoreq)
      .end((err, res) => {
          expect(401);
          
          done();
        });
  });

});



describe('post api/posts/like/:id', () => {
  
  it('like a post', (done) => {
    request(app)
      .post('/api/posts/like/'+posts[0]._id)
      .send(demoreq)
      .end((err, res) => {
          expect(res.body.id).to.equal(demoreq.body.id);
          done();
        });
  });


  it('like a already liked post', (done) => {
    request(app)
      .post('/api/posts/like/'+posts[1]._id)
      .send(demoreq)
      .end((err, res) => {

          expect(res.statusCode).to.equal(404);
        
          done();
        });
  });

});



describe('post api/posts/dislike/:id', () => {
  
  it('dislike a post', (done) => {
    request(app)
      .post('/api/posts/dislike/'+posts[0]._id)
      .send(demoreq)
      .end((err, res) => {
          expect(res.body.id).to.equal(demoreq.body.id);
          done();
        });
  });


  it('dislike a already liked post', (done) => {
    request(app)
      .post('/api/posts/dislike/'+posts[2]._id)
      .send(demoreq)
      .end((err, res) => {
          expect(400);
          done();
        });
  });

});


describe('post api/posts/report/:id', () => {
  
  it('admin reports a post', (done) => {
    request(app)
      .post('/api/posts/report/'+posts[0]._id)
      .send(adminUser)
      .end((err, res) => {
          expect(res.body.id).to.equal(demoreq.body.id);
          done();
        });
  });


  it('nonAdmin reports  post returns err', (done) => {
    request(app)
      .post('/api/posts/report/'+posts[2]._id)
      .send(notAdminUser)
      .end((err, res) => {
          expect(401);
          done();
        });
  });

});