import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePostComment, addLikeComment, removeLikeComment,  } from '../../actions/postActions';
 
import {withRouter} from 'react-router-dom'

class CommentPostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePostComment(id);
    this.props.history.push('/feed');
  }

  onLikeClick(id) {
    this.props.addLikeComment(id);
  }

  onUnlikeClick(id) {
    this.props.removeLikeComment(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }



  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">

            <p className="lead">URL: <a href={post.url}>{post.url}</a></p>
            <p className="lead">{post.text}</p>
            
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                {window.location.href === 'http://localhost:3000/feed' ?
                  (
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Make a Comment <span className="badge badge-light">{post.comments.length}</span>
                    </Link>
                  ) :
                  (
                    <a href="#text-area" className="btn btn-info mr-1"> Make a Comment <span className="badge badge-light">{post.comments.length}</span></a>
                  )
                }
                
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  > Delete This Post
                    
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentPostItem.defaultProps = {
  showActions: true
};

CommentPostItem.propTypes = {

  deletePostComment: PropTypes.func.isRequired,
  addLikeComment: PropTypes.func.isRequired,
  removeLikeComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deletePostComment, addLikeComment, removeLikeComment, })(
  withRouter(CommentPostItem)
);
