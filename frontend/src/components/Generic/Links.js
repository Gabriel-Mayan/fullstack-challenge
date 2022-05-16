import { Link } from 'react-router-dom';

export default function Links({
  label,
  destination,
  ...rest
}) {
  return (
    <div className={rest.className}>
      {rest.prefixLabel}
      <Link className="link" to={destination} style={rest.style}>{label}</Link>
    </div>
  );
}