import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, addLikeComment, removeLikeComment, removeDislikeComment, addDislikeComment, addReportComment, removeReportComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  onLikeClick(comment) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    if(this.findUserLike(comment.likes)) {
      this.props.removeLikeComment(comment._id);
    } else {
      this.props.addLikeComment(comment._id);
    }
  }

  onDislikeClick(comment) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    if(this.findUserDislike(comment.dislikes)) {
      this.props.removeDislikeComment(comment._id);
    } else {
      this.props.addDislikeComment(comment._id);
    }    
  }

  onReportClick(comment) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    if(this.findUserReport(comment.reports)) {
      this.props.removeReportComment(comment._id);
    } else {
      this.props.addReportComment(comment._id);
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
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            <span>
                <button
                  onClick={this.onLikeClick.bind(this, comment)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(comment.likes)
                    })}
                  />
                  <span className="badge badge-light">{comment.likes.length}</span>
                </button>
                <button
                  onClick={this.onDislikeClick.bind(this, comment)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i 
                  className={classnames('fas fa-thumbs-down', {
                    'text-info': this.findUserDislike(comment.dislikes)
                  })}
                  />
                  <span className="badge badge-light">{comment.dislikes.length}</span>
                </button>
                {auth.user.isAdmin || auth.user.isModerator ? (
                  
                  <button
                    onClick={this.onReportClick.bind(this, comment)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i 
                    className={classnames('fas fa-flag', {
                      'text-info': this.findUserReport(comment.reports)
                    })}
                    />
                    <span className="badge badge-light">{comment.reports.length}</span>
                  </button>
                
                ) : null}

              </span>



            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,

  addLikeComment: PropTypes.func.isRequired,
  removeLikeComment: PropTypes.func.isRequired,

  removeDislikeComment: PropTypes.func.isRequired,
  addDislikeComment: PropTypes.func.isRequired,

  addReportComment: PropTypes.func.isRequired,
  removeReportComment: PropTypes.func.isRequired,

  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {addLikeComment, removeLikeComment, removeDislikeComment, addDislikeComment, addReportComment, removeReportComment, deleteComment })(CommentItem);
