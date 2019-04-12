import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePostFromView, addLikeFromView, removeLikeFromView, removeDislikeFromView, addDislikeFromView, addReportFromView, removeReportFromView} from '../../actions/postActions';
 
import {withRouter} from 'react-router-dom'

class CommentPostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePostFromView(id);
    this.props.history.push('/feed');
  }

  onLikeClick(post) {
    if(this.findUserLike(post.likes)) {
      this.props.removeLikeFromView(post._id);
    } else {
      this.props.addLikeFromView(post._id);
    }
  }

  onDislikeClick(post) {
    if(this.findUserDislike(post.dislikes)) {
      this.props.removeDislikeFromView(post._id);
    } else {
      this.props.addDislikeFromView(post._id);
    }    
  }

  onReportClick(post) {
    if(this.findUserReport(post.reports)) {
      this.props.removeReport(post._id);
    } else {
      this.props.addReport(post._id);
    }    
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findUserDislike(dislikes) {
    const { auth } = this.props;
    if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findUserReport(reports) {
    const { auth } = this.props;
    if (reports.filter(report => report.user === auth.user.id).length > 0) {
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
                  onClick={this.onLikeClick.bind(this, post)}
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
                  onClick={this.onDislikeClick.bind(this, post)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i 
                  className={classnames('fas fa-thumbs-down', {
                    'text-info': this.findUserDislike(post.dislikes)
                  })}
                  />
                  <span className="badge badge-light">{post.dislikes.length}</span>
                </button>
                {auth.user.isAdmin || auth.user.isModerator ? (
                  <div>
                    <button
                      onClick={this.onReportClick.bind(this, post)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <i 
                      className={classnames('fas fa-flag', {
                        'text-info': this.findUserReport(post.reports)
                      })}
                      />
                      <span className="badge badge-light">{post.reports.length}</span>
                    </button>
                  </div>
                ) : null}
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
                
                {post.user === auth.user.id || auth.user.isAdmin ? (
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

  deletePostFromView: PropTypes.func.isRequired,
  addLikeFromView: PropTypes.func.isRequired,

  removeLikeFromView: PropTypes.func.isRequired,

  removeDislikeFromView: PropTypes.func.isRequired,
  addDislikeFromView: PropTypes.func.isRequired,

  addReportFromView: PropTypes.func.isRequired,
  removeReportFromView: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deletePostFromView, addLikeFromView, removeLikeFromView, removeDislikeFromView, addDislikeFromView, removeReportFromView, addReportFromView})(
  withRouter(CommentPostItem)
);
