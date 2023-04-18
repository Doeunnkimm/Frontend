import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

  const onDrag = result => {
    if (!result.destination) return;
    const items = [...detailImages];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDetailImages(items);
  };

  const onDeleteItem = index => {
    const newImages = detailImages.filter((image, i) => i !== index);
    setDetailImages(newImages);
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
        <DragDropContext onDragEnd={onDrag}>
          <Droppable droppableId="imageList" direction="horizontal">
            {provided => (
              <ul
                className="imageList"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {detailImages.map((url, i) => {
                  return (
                    <Draggable draggableId={url} index={i} key={url}>
                      {provided => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ImageView imageURL={url}>
                            <DeleteBtn onClick={() => onDeleteItem(i)}>
                              X
                            </DeleteBtn>
                            <MarkImageTag first={i === 0}>
                              대표 이미지
                            </MarkImageTag>
                          </ImageView>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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

  & > ul > li {
    float: left;
    list-style: none;
  }
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
  position: relative;
`;

const MarkImageTag = styled.span`
  display: ${({ first }) => (first ? 'inline-block' : 'none')};
  background-color: rgb(220, 220, 220);
  margin: 5px;
  padding: 3px 5px;
  border-radius: 8px;
`;

const DeleteBtn = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 0;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgb(180, 180, 180);
`;
