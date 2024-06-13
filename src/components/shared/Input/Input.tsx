import "./Input.scss";

interface IInput {
  name: string;
  value: string;
  setValue: (value: string) => void;
  label?: string;
}

const Input = ({ name, value, setValue, label }: IInput) => {
  return (
    <div className="input-container">
      <label htmlFor="customer-name" className="input-name">{name}:</label>
      <input
        type="text"
        name="customer-name"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="input"
      />
      {label && <p className="label">{label}</p>}
    </div>
  );
};

export default Input;
