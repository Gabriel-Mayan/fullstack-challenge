import './style.css';
import Links from '../../components/Generic/Links';

export function Page404() {
	return (
		<div className='container-error'>
			<p className='status-error'>404</p>
			<p className='message-error'>Página não encontrada...</p>
			<Links destination='/' prefixLabel='Desculpe, a página que você está procurando não existe nesse blog... ' label='Página inicial' />
		</div>
	);
}
