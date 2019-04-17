import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, replyComment, deleteReplyComment } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup'

class CommentItem extends Component {

  state = {
    commentId: this.props.comment._id,
    postId: this.props.postId,
    reply: '',
    errors: {},
};
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  onChangeReply(e) {
    this.setState({[e.target.name]: e.target.value});
  }

onSubmitReply(e) {
    e.preventDefault();
    const reply = {
        ...this.state,
    }
    console.log(reply);

    this.props.replyComment(this.state.postId, this.state.commentId, reply);
    this.setState({reply: ''});
}

onDeleteReply(postId, commentId, replyId) {
  this.props.deleteReplyComment(postId, commentId, replyId);
}

  render() {
    const { comment, postId, auth } = this.props;
    const {errors} = this.props;
    const showReplies = (
      <div>
        {this.props.post.post.comments
          .find(comment => comment._id.toString() == this.state.commentId.toString())
          .reply.map( eachReply => (
            <div className="alert alert-secondary" key={eachReply._id}>

              <div className="card mb-3" >
                <div className="row no-gutters">

                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{eachReply.name}</h5>
                      <p className="card-text">{eachReply.text}</p>
                      <p className="card-text"><small className="text-muted"></small></p>
                    </div>
                  </div>

                  <div className="col-md-3 mr-md-3">
                    <div>
                    <button
                      onClick={this.onDeleteReply.bind(this, this.state.postId, this.state.commentId, eachReply._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    > 
                      <i className="fas fa-times" />
                    </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          ))}
      </div>
    )
    return (
      <div className="card shadow mb-3 rounded">
      <div className="card-header">
      <div className="row">
      <div className="col-md-11">
            {comment.name}
          </div>
          <div className="col-md-1">
            {(comment.user === auth.user.id) || (auth.user.isAdmin === true) ? (
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

      <div className="card-body">
          <div className="col-md-10">
          <div className = "card-text">
            <p className="lead">{comment.text}</p> 
            <div >
            <h3>
              <span className="badge badge-dark">Replies:</span>
              
            </h3>
            </div>
            <div>
              {showReplies}
              </div>
            <div>
              <form onSubmit={e => this.onSubmitReply(e)}>
              <TextFieldGroup 
                        placeholder="Name"
                        name="reply"
                        type="text"
                        placeholder="Add a reply"
                        value={this.state.reply}
                        onChange={e => this.onChangeReply(e)}
                        error={errors.reply}
                      />
                      <button type="submit" className="btn btn-dark">
                  Submit Reply
                </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  replyComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, { deleteComment, replyComment, deleteReplyComment })(CommentItem);

