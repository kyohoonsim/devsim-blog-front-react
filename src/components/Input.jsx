import "./Input.css";

const Input = ({ placeholder, type, onChange, value }) => {
  return (
    <input
      value={value}
      className="Input"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
