import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import {connect} from 'react-redux'
import {setSortType} from '../../actions/postActions';

class PostFeed extends Component {
  state = {
    sortType1: '',
    sortType2: ''
  }

    // componentWillReceiveProps (nextProps) {
    //   this.setState({
    //     sortType1: nextProps.post.sortType1,
    //     sortType2: nextProps.post.sortType2,
    //   });
    // }
    // componentDidMount () {
    //   console.log("component did mount", this.state);
    //   const sort = {...this.state};
    //   if (this.state.sortType1 === '') {
    //     sort.sortType1 = 'Date';
    //     sort.sortType2 = 'Descending';
    //   }
    //   this.props.setSortType(sort)
    // }

    // componentWillReceiveProps (nextProps) {
    //   console.log("component will receive", nextProps)
    //   this.setState ({
    //     sortType1: nextProps.post.sortType1,
    //     sortType2: nextProps.post.sortType2,
    //   })
    // }

    componentWillMount () {
      console.log("will mount")
      if (this.state.sortType1 === '') {
        console.log("change in will mount")
        this.setState ({
          sortType1: this.props.post.sortTypes.sortType1,
          sortType2: this.props.post.sortTypes.sortType2,
        });
      } else {
        console.log("change in will mount")
        this.setState({
          sortType1: this.props.post.sortTypes.sortType1,
          sortType2: this.props.post.sortTypes.sortType2,
        })
      }      
    }

  async onClickSortType1 (value) {
    console.log(value);
    await this.setState(prevState => {return {...prevState, sortType1: value}});
    const sort = {...this.state};
    this.props.setSortType(sort);
    console.log(value);
  }
  onClickSortType2 (value) {
    console.log(value);
    this.setState({sortType2: value});
    const sort = {...this.state};
    this.props.setSortType(sort);
  }
  render() {
    const { posts } = this.props;

    console.log(this.state);
    console.log(this.props.post);
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
          <span className="pt-2 mt-2">Sort:</span> 
          <span className="px-3 pb-3 mt-2">
          
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
          <span className="mt-2">
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
  setSortType: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  post : state.post,
});

export default connect(mapStateToProps, {setSortType})(PostFeed);
