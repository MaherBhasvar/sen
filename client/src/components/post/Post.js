import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import CommentPostItem from './CommentPostItem';

import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <CommentPostItem post={post} showActions={true} />
          
          <CommentFeed postId={post._id} comments={post.comments} />
          <CommentForm id={post._id} postId={post._id} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {
                this.props.search.searchData === '' ?
                  (<Link to='/feed' className="btn btn-light mb-3 mt-4">
                  Back To Feed
                  </Link>) :
                  (<Link to={`/search/${this.props.search.searchData}`} className="btn btn-light mb-3">
                  Back To Search
                  </Link>)
              }
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  search: state.search
});

export default connect(mapStateToProps, { getPost })(Post);
