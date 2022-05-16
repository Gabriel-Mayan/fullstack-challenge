import './style.css';
import Links from '../../components/Generic/Links';

export function Page404() {
	return (
		<div className='container-404'>
			<p className='status-404'>404</p>
			<p className='message-404'>Oops! Página não encontrada...</p>
			<Links className='text-404' destination='/' prefixLabel='Desculpe, a página que você está procurando não existe nesse blog... ' label='Voltar à Página inicial' />
		</div>
	);
}
