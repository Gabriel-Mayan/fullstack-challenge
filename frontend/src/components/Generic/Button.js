import '../../styles/buttons.css';

export default function Button({
	type,
	label,
	...rest
}) {
	return (
		<button type={type} className={rest.className} onClick={rest.onClick}>
			{label}
		</button>
	);
}