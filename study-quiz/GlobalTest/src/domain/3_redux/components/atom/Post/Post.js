import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_POST, EDIT_POST } from '../../../../../store/4_redux';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/Form';
import UserCard from '../UserCard/Card';

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const onChangeEditContent = (e) => setEditContent(e.target.value);

  const onEditPost = () => {
    // 수정상태일 때(완료) 버튼을 누르면
    if (isEdit) dispatch(EDIT_POST({ id: post.id, content: editContent }));
    setIsEdit((prev) => !prev);
  };

  const onDeletePost = () => dispatch(DELETE_POST({ id: post.id }));

  return (
    <div
      style={{
        border: '1px solid #999',
      }}
    >
      <h2>--PostTitle--</h2>
      <h2>{post.title}</h2>
      <UserCard user={post.User} />
      <h2>--PostContent--</h2>
      {isEdit ? (
        <textarea onChange={onChangeEditContent} value={editContent} />
      ) : (
        <p>{post.content}</p>
      )}
      <CommentForm />
      <div
        style={{
          display: 'table',
          borderCollapse: 'collapse',
          border: '1px solid #000',
        }}
      >
        {post.Comments &&
          post.Comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      {post.myPost && (
        <button type="button" onClick={onEditPost}>
          {isEdit ? '완료' : '수정'}
        </button>
      )}
      {post.myPost && (
        <button type="button" onClick={onDeletePost}>
          삭제
        </button>
      )}
    </div>
  );
};
export default Post;
