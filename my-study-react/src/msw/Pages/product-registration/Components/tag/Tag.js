import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

function Tag({ setFormData }) {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);

  const onKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const text = e.target.value;
      if (text.indexOf(' ') !== -1 || text === '') return;
      onAddTagItem();
    }
  };

  const onAddTagItem = () => {
    setTagList(prev => [...prev, tagItem]);
    setTagItem('');
  };

  const onDeleteTagItem = index => {
    const newTagList = tagList.filter((tagItem, i) => i !== index);
    setTagList(newTagList);
  };

  useEffect(() => setFormData(prev => ({ ...prev, tag: tagList })), [tagList]);

  return (
    <S.Wrapper>
      {tagList.map((tagItem, i) => (
        <S.TagItem key={i}>
          <span>{tagItem}</span>
          <S.Button onClick={() => onDeleteTagItem(i)}>X</S.Button>
        </S.TagItem>
      ))}
      <span>
        <S.TagInput
          type="text"
          placeholder="태그를 추가해보세요"
          onChange={e => setTagItem(e.target.value)}
          value={tagItem}
          onKeyDown={onKeyPress}
        />
      </span>
    </S.Wrapper>
  );
}
export default Tag;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 100%;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: rgb(230, 230, 230);
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
  border: 1px solid rgb(180, 180, 180);
  cursor: pointer;
  font-weight: bold;
`;

const TagInput = styled.input`
  display: inline-flex;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
`;

const S = { Wrapper, TagItem, Button, TagInput };
