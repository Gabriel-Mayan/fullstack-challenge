import './style.css';

import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import IWhatsapp from '../../assets/icon_whatsapp.svg';
import IFacebook from '../../assets/icon_facebook.svg';
import IInstagram from '../../assets/icon_instagram.svg';

export function Header() {
	const navigate = useNavigate();
	const redirect = (link) => navigate(link);

	return (
		<div className='header'>
			<div className='logo'>
				<img className='logo_image' src={Logo} alt='Logo da Eco' onClick={() => redirect('/homepage')} />
				<h1>Ubiclock</h1>
			</div>
			<div className='menu'>
				<img className='social-icon' src={IWhatsapp} alt='Whatsapp Icon' />
				<img className='social-icon' src={IFacebook} alt='Facebook Icon' />
				<img className='social-icon' src={IInstagram} alt='Instagram Icon' />
			</div>
		</div>
	);
}