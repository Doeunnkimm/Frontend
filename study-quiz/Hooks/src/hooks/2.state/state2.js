import {useRef, useState} from 'react';
import styled from 'styled-components';
import Comment from '../../components/2.state/comment';

function State2() {
  /*  
    문제 2.

    Q1. 아래 작성된 state의 mock data를 활용하여
        댓글 목록을 화면에 랜더링 해보세요 :)
        Components는 src/components/state/comment.js를 활용하세요
        
    Q2. 댓글 작성 수정 삭제 기능을 구현해보세요 :)
            1. 댓글 작성 기능
            2. 댓글 수정 기능
            3. 댓글 삭제 기능 ( 본인이 작성한 댓글만 삭제할 수 있습니다, myComment 활용 )
    */

  const [post, setPost] = useState({
    title: '안녕하세요 여러분 김성용 강사입니다 :)',
    content: '오늘도 모두 화이팅입니다!',
    User: {
      nickname: '김성용',
      age: 20,
      height: 190,
    },
    Comments: [
      {
        User: {
          nickname: '김사과',
        },
        content: '오늘도 화이팅입니다!',
        myComment: false,
      },
      {
        User: {
          nickname: '반하나',
        },
        content: '오늘도 화이팅입니다!',
        myComment: false,
      },
      {
        User: {
          nickname: '오렌지',
        },
        content: '오늘도 화이팅입니다!',
        myComment: false,
      },
      {
        User: {
          nickname: '이멜론',
        },
        content: '오늘도 화이팅입니다!',
        myComment: false,
      },
      {
        User: {
          nickname: '박수박',
        },
        content: '오늘도 화이팅입니다!',
        myComment: false,
      },
    ],
  });

  const nicknameRef = useRef();
  const contentRef = useRef();

  const onAddComment = () => {
    if (!contentRef.current.value) return alert('댓글 내용을 작성해주세요');

    const newPost = {...post};

    const newComment = {
      User: {
        nickname: nicknameRef.current.value
          ? nicknameRef.current.value
          : '익명',
      },
      content: contentRef.current.value,
      myComment: true,
    };

    newPost.Comments.push(newComment);
    setPost(newPost);
    nicknameRef.current.value = '';
    contentRef.current.value = '';
  };

  const onDeleteComment = (index) => {
    const newPost = {...post};
    newPost.Comments = newPost.Comments.filter(
      (comment) => newPost.Comments.indexOf(comment) !== index
    );

    setPost(newPost);
  };

  const onEditComment = (index, content) => {
    const newPost = {...post};
    newPost.Comments[index].content = content;

    setPost(newPost);
  };

  return (
    <S.Wrapper>
      <h1>문제2</h1>
      <S.PostBox>
        <S.PostTitle>제목: {post.title}</S.PostTitle>
        <S.PostContent>내용: {post.content}</S.PostContent>
      </S.PostBox>
      <S.PostInfo>
        <p>
          작성자: <span>{post.User.nickname}</span>
        </p>
        <p>
          작성자 나이: <span>{post.User.age}</span>
        </p>
        <p>
          작성자 키: <span>{post.User.height}</span>
        </p>
      </S.PostInfo>
      <div>
        <p>
          댓글 수: <span>{post.Comments.length}</span>
        </p>
        <input placeholder="작성자 *미입력시 익명 처리" ref={nicknameRef} />
        <input placeholder="댓글 내용" ref={contentRef} />
        <button onClick={onAddComment}>댓글 작성</button>
      </div>
      <S.CommentList>
        {post.Comments.map((comment, idx) => (
          <Comment
            key={idx}
            index={idx}
            comment={comment}
            onDelete={onDeleteComment}
            onEdit={onEditComment}
          />
        ))}
      </S.CommentList>
    </S.Wrapper>
  );
}
export default State2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  background-color: #999;
  width: 360px;
  padding: 10px;
`;

const PostTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const PostContent = styled.p`
  color: #fff;
`;

const PostInfo = styled.div`
  width: 360px;
  border: 3px solid #f00;
  padding: 10px;
  margin: 10px;

  p {
    display: flex;
    justify-content: space-around;
  }

  span {
    font-weight: bold;
  }
`;

const CommentList = styled.ul`
  width: 960px;
`;

const S = {
  Wrapper,
  PostBox,
  PostTitle,
  PostContent,
  PostInfo,
  CommentList,
};
