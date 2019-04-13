import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    const {errors} = this.props;

    let postContent;

    if (errors.search || errors.nopostsfound) {
      console.log("errors in post");
      console.log(errors);
      postContent = (<h1>{errors.search || errors.nopostsfound}</h1>);
    } else if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
       postContent =( 
         <div>
          <PostForm />
          <PostFeed posts={posts} />
        </div>
        );
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
});

export default connect(mapStateToProps, {getPosts} )(Posts);