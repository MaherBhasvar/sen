import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class PostFeed extends Component {
  state = {
    sortType1: 'Date',
    sortType2: 'Descending'
  }
  onClickSortType1 (value) {
    console.log(value);
    this.setState({sortType1: value});
  }
  onClickSortType2 (value) {
    console.log(value);
    this.setState({sortType2: value});
  }
  render() {
    const { posts } = this.props;


    // return posts.sort((a,b) => {
    //   console.log(a.date < b.date);
    //   return -1
    // }).map(post => <PostItem key={post._id} post={post} />);

    // return posts.sort((a,b) =>{ 
    //   if (a.likes.length < b.likes.length)  return 1 
    //   else return -1}).map(post => <PostItem key={post._id} post={post} />);

    let displayPosts;
    if (this.state.sortType1 === "Date" && this.state.sortType2 === "Descending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.date < b.date)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
        </div>
      );
    } else if (this.state.sortType1 === "Date" && this.state.sortType2 === "Ascending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.date > b.date)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
          
        </div>
      );
    } else if (this.state.sortType1 === "Likes" && this.state.sortType2 === "Descending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.likes.length < b.likes.length)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
        </div>
      );
    } else if (this.state.sortType1 === "Likes" && this.state.sortType2 === "Ascending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.likes.length > b.likes.length)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
        </div>
      );
    } else if (this.state.sortType1 === "Dislikes" && this.state.sortType2 === "Descending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.dislikes.length < b.dislikes.length)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
        </div>
        );
    } else if (this.state.sortType1 === "Dislikes" && this.state.sortType2 === "Ascending") {
      displayPosts = (
        <div>
          {posts.sort((a,b) =>{ if (a.dislikes.length > b.dislikes.length)  return 1; else return -1;}).map(post => <PostItem key={post._id} post={post} />)}
        </div>
      );
    }
      return (
          <span>
          
          <ButtonToolbar>
          Sort: 
          <span className="px-3 pb-3">
          
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" > 
              {this.state.sortType1}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item onClick={e => this.onClickSortType1("Date") }>Date</Dropdown.Item>
              <Dropdown.Item onClick={e => this.onClickSortType1("Likes")}>Likes</Dropdown.Item>
              <Dropdown.Item onClick={e => this.onClickSortType1("Dislikes")}>Dislikes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </span>
          <span> </span>
          <span>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" > 
              {this.state.sortType2}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item onClick={e => this.onClickSortType2("Ascending") }>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={e => this.onClickSortType2("Descending") }>Descending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          </span>
          </ButtonToolbar>
          {displayPosts}
          </span>
          
      );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
