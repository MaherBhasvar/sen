import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {addViewCount, deletePost, addLike, removeLike, addDislike, removeDislike, addReport, removeReport } from '../../actions/postActions';
 
import {withRouter} from 'react-router-dom'

class PostItem extends Component {
  onDeleteClick(id) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    this.props.deletePost(id);
  }

  onLikeClick(post) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    if(this.findUserLike(post.likes)) {
      this.props.removeLike(post._id);
    } else {
      this.props.addLike(post._id);
    }
  }

  onDislikeClick(post) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
    if(this.findUserDislike(post.dislikes)) {
      this.props.removeDislike(post._id);
    } else {
      this.props.addDislike(post._id);
    }    
  }

  onReportClick(post) {
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/landing');
    }
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
  // findUserDisLike(dislikes) {
  //   const { auth } = this.props;
  //   if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card shadow mb-3 rounded">
      <div className="card-header">
        <div className="row">
          <div className="col-md-9">
            {post.handle}
          </div>
          <div className="col-md-3">
           {post.date} </div>

          </div>
        </div>
      <div className="card-body">
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
          </div>
          <div className="col-md-10">

            <p className="lead">URL: <a href={post.url}>{post.headline}</a></p>
            <p className="lead">{post.text}</p>
            <p className="lead">Tags: {post.tags.map(tag => (
              <span key={tag[0]}>
              <span className="badge badge-secondary"><a style={{ color: 'white' }} href= {'../search/'+tag[0]} className="text-decoration-none" >{tag[0]}</a> </span> 
              <span className="badge badge-light" > </span>
              </span>
            ))}</p>
            
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
       
                ) : null} 
                <i className="fas fa-eye"></i><span className="badge badge-light">{post.views}</span>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1" onClick={(e) => {this.props.addViewCount(post._id);}}>
                    Make a Comment <span className="badge badge-light">{post.comments.length}</span>
                    </Link>
                
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
        
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addViewCount: PropTypes.func.isRequired,

  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,

  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,

  addReport: PropTypes.func.isRequired,
  removeReport: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {addViewCount, deletePost, addLike, removeLike, addDislike, removeDislike, addReport, removeReport})(
  withRouter(PostItem)
);
