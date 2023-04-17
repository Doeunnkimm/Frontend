import styled from 'styled-components';

function Images({ detailImages }) {
  return (
    <>
      {detailImages.map(url => (
        <ImageView imageURL={url} />
      ))}
    </>
  );
}
export default Images;

const ImageView = styled.div`
  width: 180px;
  height: 180px;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-repeat: no-repeat;
  background-size: 100%;
`;
