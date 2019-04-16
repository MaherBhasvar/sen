const assert = require('chai').assert;
const post = require('../../api/posts');
const search = require('../../api/search');

const expect = require('chai').expect;
const chairequest = require('chai').request;
const Post = require('../../../models/Post');
const User = require('../../../models/User');
const Tag = require('../../../models/Tag');
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
  text: 'first news',
  tags: [
    ['election', 0.01],
    ['lok', 0.01],
    ['sabha', 0.01],
    ['mayawati', 0.01],
    ['india', 0.01],
    
]
},
{
  _id: new ObjectID(),
  user: users[0]._id,
  name:  'user2',
  handle: 'userHandle2', 
  url: 'https://www.ndtv.com/entertainment/game-of-thrones-8-episode-1-top-7-moments-including-jon-snow-who-now-knows-something-2023156',
  headline:  'news headline entertainment',
  text: 'second news',
  likes: [users[0]],
  tags: [
    ['game', 0.01],
    ['throne', 0.01],
    ['episode', 0.01],
    ['snow', 0.01],
    ['jon', 0.01],
    
]
  
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
      text: 'sabha sabha sabha sabha sabha sabhasabha sabha sabhasabha sabha',
      url: 'https://www.hindustantimes.com/lok-sabha-elections/lok-sabha-elections-2019-in-tamil-nadu-bjp-s-strategy-is-up-against-farm-anger/story-LbZRk1HQkfTWrgkPxyxrcI.html',
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

const tags = [
    {
        tag:'election',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'lok',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'sabha',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'mayawati',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'india',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'election',
        postid: posts[0]._id,
        score: 0.01
    },
    {
        tag:'game',
        postid: posts[1]._id,
        score: 0.01
    },
    {
        tag:'throne',
        postid: posts[1]._id,
        score: 0.01
    },
    {
        tag:'episode',
        postid: posts[1]._id,
        score: 0.01
    },
    {
        tag:'jon',
        postid: posts[1]._id,
        score: 0.01
    },{
        tag:'snow',
        postid: posts[1]._id,
        score: 0.01
    },
];


beforeEach((done) => {
 


  
    User.remove({}).then(() => {
    User.insertMany(users);
    }, 
        Post.remove({}).then(() => {
        Post.insertMany(posts);
        },
            Profile.remove({}).then(() => {
            Profile.insertMany(profiles);
            },
            Tag.remove({}).then(() => {
                Tag.insertMany(tags);
                })))).then(() => done());


});
  
describe('GET api/search/', () => {
    it('should return empty search response', (done) => {
        request(app)
        .get('/api/search/')
        .end((err, res) => {
            // console.log(res.body);
            expect(res.statusCode).to.equal(400);
            expect({search: "Empty Search"});
            
            done();
        });
    });
}); 


invalidsearchText = 'mayavatidawdwa';
validsearchText = 'sabha';
undefineText = '';
describe('GET api/search/', () => {
    it('should return empty search response', (done) => {
      request(app)
        .get('/api/search/'+invalidsearchText)
        .end((err, res) => {
            // console.log(res.body);
            expect(res.statusCode).to.equal(404);
            expect({nopostfound: "No posts found"});
            done();
          });
    });


    it('should return nonempty search response', (done) => {
        request(app)
          .get('/api/search/'+validsearchText)
          .end((err, res) => {
            //   console.log(res.body);
              expect(res.body.length).to.not.equal(0);
          
  
              done();
            });
      });

    

      
}); 


emptysearchReq = {
    
};


validsearchReq = {
        search: 'election'

};

validsearchReq2 = {
        search: 'elefafdawadction'
    
};


describe('Post api/search/', () => {
    it('should return empty search response', (done) => {
      request(app)
        .post('/api/search')
        .send(emptysearchReq)
        .end((err, res) => {
            // console.log(res.body);
            expect(res.statusCode).to.equal(400);
            expect({nopostfound: "No posts found"});

            done();
          });
    });


    it('should return nonempty search response', (done) => {
        request(app)
          .post('/api/search')
          .send(validsearchReq)
          .end((err, res) => {
            //   console.log(res.body);
              expect(res.body.length).to.not.equal(0);
          
  
              done();
            });
      });

      it('should return Enpty search response', (done) => {
        request(app)
            .post('/api/search')
            .send(validsearchReq2)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                // console.log(res);
                expect({nopostsfound: 'No posts found'});
                done();
            });
      });


      
}); 
