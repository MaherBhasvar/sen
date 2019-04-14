const assert = require('chai').assert;
const post = require('../../api/posts');
const expect = require('chai').expect;
const chairequest = require('chai').request;
const Post = require('../../../models/Post');
const {ObjectID} = require('mongodb');
const request = require('supertest');
const chai = require('chai');
const {app} = require('./../../../server');
//import chai from 'chai';

id = new ObjectID();
const posts = [{
     _id: new ObjectID(),
    name:  'user1',
    handle: 'userHandle1', 
    url: 'https://www.ndtv.com/india-news/black-trunk-from-pm-modis-chopper-unlocks-congress-conspiracy-theory-2022974',
    headline:  'news headline',
    text: 'first news'
}];



beforeEach((done) => {
    Post.remove({}).then(() => {
        console.log("IN");
        Post.insertMany([{
            _id: id,
           name:  'user1',
           handle: 'userHandle1', 
           url: 'https://www.ndtv.com/india-news/black-trunk-from-pm-modis-chopper-unlocks-congress-conspiracy-theory-2022974',
           headline:  'news headline',
           text: 'first news'
       }]);
        console.log('after');
    }).then(() => done());
  });
  

  describe('GET api/posts', () => {
    it('should get all posts', (done) => {
      request(app)
        .get('/api/posts/')
        .end((err, res) => {
            console.log(typeof res.body.length);
            //res.should.have.status(200);
            expect(res.body.length).to.equal(1);
            done();
         });
    });
  });
  