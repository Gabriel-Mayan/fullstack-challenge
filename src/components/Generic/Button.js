import '../../styles/buttons.css';

export default function Button({
  type,
  label,
  ...rest
}) {
  return (
    <button type={type} className="btn" style={rest.style} onClick={rest.onClick}>
      {label}
    </button>
  );
}