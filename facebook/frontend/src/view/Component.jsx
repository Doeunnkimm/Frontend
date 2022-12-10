export const Input = (props) => {
  const { type, name, placeholder, onChange } = props;
  return (
    <input
      className="my-input"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export const Image = (props) => {
  const { src, alt } = props;
  return (
    <div className="my-image">
      <img src={src} alt={alt} />
    </div>
  );
};

export const Title = (props) => {
  return <h1 className="my-title">{props.text}</h1>;
};

export const Linebar = (props) => {
  return <div className="my-line"></div>;
};

export const Button = (props) => {
  const { text, onClick } = props;
  return (
    <button className="my-button primary" onClick={onClick}>
      {text}
    </button>
  );
};