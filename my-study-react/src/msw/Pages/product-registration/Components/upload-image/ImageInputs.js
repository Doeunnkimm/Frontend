import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

function ImageInputs({ setFormData }) {
  const input = useRef();
  const [detailImages, setDetailImages] = useState([]);

  const onUploadFile = e => {
    const image = input.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setDetailImages([...detailImages, reader.result].slice(0, 4));
    };
  };

  useEffect(
    () => setFormData(prev => ({ ...prev, images: detailImages })),
    [detailImages]
  );

  return (
    <>
      <input
        type="file"
        multiple
        ref={input}
        name="images"
        onChange={onUploadFile}
        style={{ display: 'none' }}
      />
      <ItemBox>
        <ImageInput onClick={() => input.current.click()}>
          <div></div>
          <div>이미지 등록</div>
        </ImageInput>
        {detailImages.map((url, i) => (
          <ImageView imageURL={url}>
            <MarkImageTag first={i === 0}>대표 이미지</MarkImageTag>
          </ImageView>
        ))}
      </ItemBox>
    </>
  );
}
export default ImageInputs;

const ImageInput = styled.div`
  width: 180px;
  height: 180px;
  background-color: rgb(230, 230, 230);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > div:first-child {
    width: 30px;
    height: 30px;
    background-image: url('https://cdn-icons-png.flaticon.com/512/1829/1829371.png');
    background-repeat: no-repeat;
    background-size: 100%;
    margin-bottom: 5px;
  }
  & > div:last-child {
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  width: 80%;
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const ImageView = styled.div`
  width: 180px;
  height: 180px;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MarkImageTag = styled.span`
  display: ${({ first }) => (first ? 'inline-block' : 'none')};
  background-color: rgb(220, 220, 220);
  margin: 5px;
  padding: 3px 5px;
  border-radius: 8px;
`;
