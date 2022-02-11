import React, { useContext, useEffect } from "react";
import { CommentContext } from "./CommentProvider";
import { useHistory, useParams, Link } from "react-router-dom";

export const CommentList = (props) => {
  const { comments, getComments } = useContext(CommentContext);
  const history = useHistory();
  const { rareuserId } = useParams();

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <section
        className="commentList"
        key={comments.id}
        id={`comments--${comments.id}`}
      >
        <Link className="comment_author" to={`/profile/${rareuserId}`}>
          {comments.post?.title}
        </Link>
        {comments.map((comment) => {
          return (
            <div
              className="commentList_author"
              key={comment.id}
              id={`author--${comment.id}`}
            >
              <div>
                {comment.content}
                <br />
                {comment.created_on}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
