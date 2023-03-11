import {useRef, useState} from 'react';
import styled from 'styled-components';

function Comment({index, comment, onDelete, onEdit}) {
  const {User, content, myComment} = comment;

  const [isEditComment, setIsEditComment] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const onEditComment = () => {
    setIsEditComment((prev) => !prev);
    if (isEditComment) onEdit(index, editContent);
  };

  const onChangeEditComment = (e) => {
    setEditContent(e.target.value);
  };

  return (
    <S.CommentItem>
      <p>
        작성자: <span>{User.nickname}</span>
      </p>
      <p>
        댓글 내용:{' '}
        {isEditComment ? (
          <textarea value={editContent} onChange={onChangeEditComment} />
        ) : (
          <span>{content}</span>
        )}
      </p>
      <button disabled={!myComment} onClick={onEditComment}>
        {isEditComment ? '완료' : '수정'}
      </button>
      <button disabled={!myComment} onClick={() => onDelete(index)}>
        삭제
      </button>
    </S.CommentItem>
  );
}
export default Comment;

const CommentItem = styled.li`
  border: 1px solid #000;
  padding: 10px;
  margin: 10px;
`;
const S = {
  CommentItem,
};
