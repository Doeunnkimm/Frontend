export const Image = (props) => {
  // return <div className={'my-image'}>
  //   <img src={props.src} alt={props.alt} />
  // </div>

  return (
    <div className={`my-image ${props.className}`}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export const Title = (props) => {
  return <h1 className="my-title">{props.text}</h1>;
};

export const Input = (props) => {
  const { type, name, placeholder, onChange = null } = props;
  return (
    <input
      className="my-input"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export const Linebar = (props) => {
  return <div className="my-line" />;
};

export const Button = (props) => {
  return (
    <button className={'my-button ' + props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export const TextLink = (props) => {
  return (
    <a className="my-textlink" href={props.url} onClick={props.onClick}>
      {props.text}
    </a>
  );
};

// 2차 컴포넌트
export const Subtitle = (props) => {
  return <div className="my-subtitle">{props.text}</div>;
};

export const Select = (props) => {
  return (
    <select
      className="my-select"
      name={props.name}
      title={props.title}
      onChange={props.onChange}
    >
      {/* <option value="2021">2021</option> */}
      {props.list.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export const Radio = (props) => {
  return (
    <span className="my-radio">
      <label>{props.text}</label>
      <input
        type="radio"
        name={props.name}
        value={props.value}
        onClick={props.onClick}
      />
    </span>
  );
};
