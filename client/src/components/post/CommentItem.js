import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, replyComment } from '../../actions/postActions';
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
              {eachReply.text}
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

export default connect(mapStateToProps, { deleteComment, replyComment })(CommentItem);

