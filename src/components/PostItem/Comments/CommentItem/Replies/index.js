import Comment from "../";

// given a list of replies, render them:
const Replies = (props) => {
  return (
    <div>
      {props.replies.map((reply) => (
        <div className="row" key={reply.id}>
          <div className="col-1"></div>
          <div className="col-11">
            <Comment
              postId={props.postId}
              comment={reply}
              comments={props.replies}
              setComments={props.setReplies}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Replies;
