import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, replyComment } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup'

class CommentItem extends Component {

  state = {
    commentId: this.props.comment._id,
    postId: this.props.postId,
    reply: 'thisisreply',
    errors: {},
};
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

onSubmit(e) {
    e.preventDefault();
    const reply = {
        ...this.state,
    }
    console.log(reply);

    this.props.replyComment(reply);

}

  render() {
    const { comment, postId, auth } = this.props;
    const {errors} = this.props;
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
              > Delete This Comment
                
              </button>
            ) : null}
            </div>


        </div>
      </div>
      <form onSubmit={e => this.onSubmit(e)}>
            <TextFieldGroup 
                      placeholder="Name"
                      name="reply"
                      type="text"
                      value={this.state.reply}
                      onChange={e => this.onChange(e)}
                      error={errors.reply}
                    />
                    <button type="submit" className="btn btn-dark">
                Submit Reply
              </button>
            </form>
      <div class="card-body">
          <div className="col-md-10">
          <div className = "card-text">
            <p className="lead">{comment.text}</p> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { deleteComment, replyComment })(CommentItem);

