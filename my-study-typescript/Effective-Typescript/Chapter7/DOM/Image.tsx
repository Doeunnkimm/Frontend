import React from 'react';

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const CustomImage: React.FC<ImageProps> = ({ src, alt, ...rest }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/150';
  };

  return <img src={src} alt={alt} onError={handleError} {...rest} />;
};

export default CustomImage;
